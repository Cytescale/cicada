import React,{useEffect, useRef, useState} from "react";
import Head from "next/head";
import { withRouter, NextRouter,useRouter } from 'next/router'
import user from "../../../comp/utils/user";
import { BurgerMenu,ProfilePopover,NavBarCont,BottomCont } from "../../../comp/elements";
import { _BASE_CLIENT_URL } from "../../../comp/helpers/api.routes";
import firebaseHelper,{getUid,checkToken} from "../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../comp/helpers/backendHelper";
import FullHeiLoading from '../fullHeightLoading';
import { ToastContainer,toast } from "react-toastify";

const User = new user();
const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();

function timeDifference(current, previous) {

     var msPerMinute = 60 * 1000;
     var msPerHour = msPerMinute * 60;
     var msPerDay = msPerHour * 24;
     var msPerMonth = msPerDay * 30;
     var msPerYear = msPerDay * 365;
 
     var elapsed = current - previous;
 
     if (elapsed < msPerMinute) {
          return Math.round(elapsed/1000) + ' seconds ago';   
     }
 
     else if (elapsed < msPerHour) {
          return Math.round(elapsed/msPerMinute) + ' minutes ago';   
     }
 
     else if (elapsed < msPerDay ) {
          return Math.round(elapsed/msPerHour ) + ' hours ago';   
     }
 
     else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' days ago';   
     }
 
     else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' months ago';   
     }
 
     else {
         return Math.round(elapsed/msPerYear ) + ' years ago';   
     }
 }

async function processActiveLinkData(lData,bool){
     let updateDat ={
          "active_bool": bool,
     }
     let resp = await BackendHelper._updateLinkData(User.getUserUid(),lData._id,updateDat);
     return resp;
}
const LinkCard=(props)=>{
     const [active , setactive] = useState(null);
     const [activeLoading,setactiveLoading] = useState(false);
     const [d,setD] = useState(null);

     useEffect(async()=>{
          if(props.id){
               const uid = await getUid();
               BackendHelper._getLinkDatabyId(uid,props.id).then((res)=>{
                    if(!res.errBool){
                         setD(res.responseData.gotData);
                         setactive(res.responseData.gotData.active_bool);
                    }
               })
          }
     },[props.id])
     if(d){
     return(
          <div className='lnk-lnk-main-cont  clust-link-head-outer-cont' onClick={()=>{
               props.setoverlayVisi(true);
               props.setselecInd(props.ind)
          }}
               style={{
                    zIndex:props.selecInd==props.ind?'900':'20'
               }}
          
          >
          <div className='lnk-lnk-head-main-cont clust-link-head-cont'>
                         {
                              d.deeplink_bool !== 'undefined' && d.deeplink_bool !== false?
                              <div className='lnk-lnk-head-link-ico-cont'>
                               <svg className='lnk-lnk-head-link-ico' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M17,7h-3c-0.55,0-1,0.45-1,1s0.45,1,1,1h3c1.65,0,3,1.35,3,3s-1.35,3-3,3h-3c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h3 c2.76,0,5-2.24,5-5S19.76,7,17,7z M8,12c0,0.55,0.45,1,1,1h6c0.55,0,1-0.45,1-1s-0.45-1-1-1H9C8.45,11,8,11.45,8,12z M10,15H7 c-1.65,0-3-1.35-3-3s1.35-3,3-3h3c0.55,0,1-0.45,1-1s-0.45-1-1-1H7c-2.76,0-5,2.24-5,5s2.24,5,5,5h3c0.55,0,1-0.45,1-1 C11,15.45,10.55,15,10,15z"/></g></g></svg>
                              </div>:<span/>
                         }
                    <div className='lnk-lnk-head-main-cont-name-cont'>
                          <span style={{
                              textDecoration:active?'none':'line-through'
                          }}>
                          {d.name}
                         </span>  
                    </div>

                    <button
                    className='lnk-lnk-head-edit-butt'
                    >
                         <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M2.375 13.8225V16.2292C2.375 16.4508 2.54917 16.625 2.77083 16.625H5.1775C5.28042 16.625 5.38333 16.5854 5.45458 16.5062L14.0996 7.86916L11.1308 4.90041L2.49375 13.5375C2.41458 13.6167 2.375 13.7117 2.375 13.8225ZM16.3954 5.57333C16.7042 5.26458 16.7042 4.76583 16.3954 4.45708L14.5429 2.60458C14.2342 2.29583 13.7354 2.29583 13.4267 2.60458L11.9779 4.05333L14.9467 7.02208L16.3954 5.57333Z" fill="white"/>
                         </svg>
                    
                    </button>
                    <div  className='lnk-lnk-head-right-butt-cont'>
                    <label className="switch">
                         <input type="checkbox" 
                         disabled={activeLoading}
                         defaultChecked={active}
                         onClick={async ()=>{
                              await setactive(!active);
                              await setactiveLoading(true);
                              await processActiveLinkData(d,!active).then(async (res)=>{
                                   if(!res.errBool){ }
                              else{
                                   toast.error(res.errMess, {
                                        position: toast.POSITION.TOP_CENTER,
                                        autoClose: 2500,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                   });  
                                   console.log(res.errMess);
                              }
                              
                    }).catch(e=>{
                         toast.error(e, {
                              position: toast.POSITION.TOP_CENTER,
                              autoClose: 2500,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                         });  
                              console.log(e);
                     })
                     await setactiveLoading(false);
                    }}
                         />
                         <span className="slider round"></span>
                    </label>
                    </div>
          </div>
          {
               props.selecInd==props.ind?
               <div className='app-clust-link-more-menu'>
                    <button className='app-clust-link-more-menu-butt'>
                    Move Up
                    <svg className='app-clust-link-more-menu-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z"/></svg>
                    </button>
                    <button className='app-clust-link-more-menu-butt'>
                    Move Down
                    <svg  className='app-clust-link-more-menu-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"/></svg>
                    </button>
               </div>:<span/>
          }
          
       
     </div>
     )}
     else{
          return(<div className='app-loading-skt-main-cont' style={{height:'62px'}}></div>)
     }
}
async function loadUserData(setLoading){
     if(!User.getUserData()){
          if(backendHelper){
               await BackendHelper._getUserInfo(await getUid(),true).then((res)=>{
                    if(res){
                         if(!res.errBool){
                               User.setUserData(res.responseData);
                               console.log(res.responseData);
                         }
                         else{
                              toast.error(res.errMess, {
                                   position: toast.POSITION.TOP_CENTER,
                                   autoClose: 5000,
                                   hideProgressBar: true,
                                   closeOnClick: true,
                                   pauseOnHover: true,
                                   draggable: true,
                                   progress: undefined,
                              });
                         }
               }
                    setLoading(false);
               }).catch(e=>{
                    toast.error(e, {
                         position: toast.POSITION.TOP_CENTER,
                         autoClose: 5000,
                         hideProgressBar: true,
                         closeOnClick: true,
                         pauseOnHover: true,
                         draggable: true,
                         progress: undefined,
                    });
                    setLoading(false);
               });
               return true;
          }
          return false;
     }
     else{
          setLoading(false);
          return true;
     }
}
const RenderClusterLink = (props) =>{
     const [linkData,setLinkData] = useState([]);
     const [clusterConfigData ,setclusterConfigData] = useState(null);
     const [linkDataLoading,setlinkDataLoading] = useState(true);
  
     useEffect(async ()=>{
          const uid = await getUid();
          if(uid){
               if(backendHelper){
                    BackendHelper._getClusterConfigByUid(uid).then(async(res)=>{
                         if(res){
                              if(!res.errBool){
                                   console.log(res.responseData);
                                   setclusterConfigData(res.responseData)
                                   props.setclusterActive(res.responseData.active_bool)
                                   props.setlastUpdate(res.responseData.update_timestamp)
                              }
                              else{
                                   toast.error(res.errMess, {position: toast.POSITION.TOP_CENTER,autoClose: 5000,hideProgressBar: true,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,});
                              }
                         }
                    }).catch(e=>{
                         toast.error(e, {position: toast.POSITION.TOP_CENTER,autoClose: 5000,hideProgressBar: true,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,});
                    });
               }
          }
     },[]);
     let res = [];
     if(clusterConfigData ){
     if(clusterConfigData.link_ids.length> 0){
          clusterConfigData.link_ids.map((e,ind)=>{
               console.log(e);
               res.push(<LinkCard {...props} key={ind} ind={ind} id={e}/>)
          }) 
          return(res);
     }else{return(<span/>)}
     }else{return(<span/>)}
}

const cluster = (props)=>{
     const router = useRouter()
     const [linkData,setLinkData] = useState(null);
     const [loading,setLoading] = useState(true);
     const [overlayVisi,setoverlayVisi] = useState(false)
     const [selecInd,setselecInd] = useState(null);
     const [clusterActive,setclusterActive] = useState(false);
     const [lastUpdate,setlastUpdate] = useState(null);

     useEffect(async ()=>{
              await loadUserData(setLoading);
     },[]);

     if(!loading){
     return(
          <div className='app-main-cont-main-body land-body-cont'   id='lnk-lnk-main-cont-id'>
          <Head>
          <title>Sakura</title>
          <meta name="description" content="Cicada Login Activity" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico" />
          </Head>
          
                    <BurgerMenu router={router} />
                    <div className='app-head-main-cont link-head-body-cont'>
                              <div className='app-head-main-cont-logo link-head-logo'>
                                   <a href={_BASE_CLIENT_URL+'src/land'}>
                                        <svg className='app-head-main-cont-logo-ico' width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50" fill="url(#paint0_linear)"/>
                                        <defs>
                                        <linearGradient id="paint0_linear" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FEE27F"/>
                                        <stop offset="1" stop-color="#F6BC4F"/>
                                        </linearGradient>
                                        </defs>
                                        </svg>
                                   </a>
                              </div>
                              <div className='app-head-main-right-cont'>
                                   <button
                                   className='app-input-class-raised-pressable link-add-butt'
                                   onClick={()=>{
                                        //this.setcreateLinkModalVisi(true);
                                   }}
                                   >
                                        Create Link
                                   </button>
                                   {/* <ProfilePopover 
                                    //setlgoutShow={this.setlgoutConfirmVisi} 
                                    /> */}
                              </div>
                    </div>
                    <NavBarCont router={router}/>
                    <div className='app-clust-act-main-cont'>
                              <div className='app-clust-act-topper-main-cont'>
                              <div className='app-clust-tit-main-cont'>
                                   Cluster Links 
                                   {clusterActive?<div className='app-clust-indi-on'/>:<div className='app-clust-indi-off'/>}
                              </div>
                              <div className='app-clust-sub-tit-main-cont'>Reorder and arrange your links as you want, or create a new one.</div>
                              <div className='app-clust-time-tit-main-cont'>Last Updated: {lastUpdate?timeDifference(new Date().getTime(),lastUpdate):null}</div>
                              <div className='app-clust-act-lnk-head-main-cont'>
                              <button className='app-land-crt-lnk-butt'
                              
                              > 
                              <div  className='app-land-crt-lnk-butt-lab'>
                                   Create Link </div>
                              </button>
                              </div>
                            
                              </div>
                              <div className='app-clust-link-holder-main-cont'>
                                   {!loading?<RenderClusterLink
                                   setlastUpdate={setlastUpdate}
                                   setclusterActive={setclusterActive} 
                                   setoverlayVisi={setoverlayVisi}
                                   linksData={linkData}
                                   selecInd={selecInd}
                                   setselecInd={setselecInd} 
                                    />:<span/>}       
                              </div>
                              <div className='app-clust-link-overlay-main-cont'
                                   onClick={()=>{
                                        setoverlayVisi(false)
                                        setselecInd(null);
                                   }}
                                   style={{display:overlayVisi?'block':'none'}}
                              />
                    </div>
                    <BottomCont/>
                    <ToastContainer/>
          </div>
     )}
     else{
          return(<FullHeiLoading/>);
     }
}

export default cluster;