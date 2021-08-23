import React,{useEffect, useRef, useState} from "react";
import Head from "next/head";
import { withRouter, NextRouter,useRouter } from 'next/router'
import user from "../../../comp/utils/user";
import { BurgerMenu,ProfilePopover,NavBarCont,BottomCont,LandNavBarCont,HeaderCont,RenderPlatformLogo } from "../../../comp/elements";
import URLS,{_BASE_CLIENT_URL} from "../../../comp/helpers/api.routes";
import firebaseHelper,{getUid,checkToken} from "../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../comp/helpers/backendHelper";
import FullHeiLoading from '../fullHeightLoading';
import { ToastContainer,toast } from "react-toastify";
import copy from 'copy-to-clipboard';
import getAuth from '../../../comp/utils/getAuth';
import GlobalStyles from "../land/globalStyle";

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
     const [d,setD] = useState(null);     useEffect(async()=>{
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
               props.setselecInd(props.id)
          }}
               style={{
                    zIndex:props.selecInd==props.id?'900':'20'
               }}
          
          >
          <div className='lnk-lnk-head-main-cont clust-link-head-cont'>
                         {
                              d.deeplink_bool !== 'undefined' && d.deeplink_bool !== false?
                              <RenderPlatformLogo id={d.platform_id}/>:<span/>
                         }
                    <div className='lnk-lnk-head-main-cont-name-cont'>
                          <span style={{
                              textDecoration:active?'none':'line-through'
                          }}>
                          {d.name}
                         </span>  
                    </div>
                    <div  className='lnk-lnk-head-right-butt-cont'>
                    {/* <label className="switch">
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
                    </label> */}
                    </div>
          </div>
          {
               props.selecInd==props.id?
               <div className='app-clust-link-more-menu'>
                    <button className='app-clust-link-more-menu-butt'onClick={props.moveLinkUp}>
                    Move Up
                    <svg className='app-clust-link-more-menu-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z"/></svg>
                    </button>
                    <button className='app-clust-link-more-menu-butt' onClick={props.moveLinkDown}>
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



function useForceUpdate(){
     const [value, setValue] = useState(0); // integer state
     return () => setValue(value => value + 1); // update the state to force render
 }

const RenderClusterLink = (props) =>{
     const [linkData,setLinkData] = useState([]);
     const [clusterConfigData ,setclusterConfigData] = useState(null);
     const [linkDataLoading,setlinkDataLoading] = useState(true);
     const forceUpdate = useForceUpdate();
    
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
               res.push(<LinkCard 
                    {...props} 
                    key={ind} 
                    ind={ind}
                    id={e}
                    moveLinkUp={()=>{
                         if(ind>0){
                              let tmpData = clusterConfigData.link_ids[ind-1];
                              clusterConfigData.link_ids[ind-1] = clusterConfigData.link_ids[ind];
                              clusterConfigData.link_ids[ind] = tmpData; 
                              BackendHelper._updateClusterConfigData(User.getUserUid(),clusterConfigData._id,{"link_ids":clusterConfigData.link_ids}).then((r)=>{
                                   if(r.errBool){console.log(r.errMess);}
                              }).catch(e=>{console.log(e)})
                              forceUpdate();
                         }
                    }}
                    moveLinkDown={()=>{
                         if(ind<clusterConfigData.link_ids.length-1){
                              let tmpData = clusterConfigData.link_ids[ind+1];
                              clusterConfigData.link_ids[ind+1] = clusterConfigData.link_ids[ind];
                              clusterConfigData.link_ids[ind] = tmpData;
                              BackendHelper._updateClusterConfigData(User.getUserUid(),clusterConfigData._id,{"link_ids":clusterConfigData.link_ids}).then((r)=>{
                                   if(r.errBool){console.log(r.errMess);}
                              }).catch(e=>{console.log(e)}) 
                              forceUpdate();
                         }
                    }}
               />)
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
     const [darkMode ,setdarkMode]=useState(true);

     const openInNewTab = (url)=>{
          const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
          if (newWindow) newWindow.opener = null
     }
     const loadUserData = async ()=> {
          if(!User.getUserData()){
               if(backendHelper){
                    await BackendHelper._getUserInfo(await getUid(),true).then((res)=>{
                         if(res){
                              if(!res.errBool){
                                   if(res.responseData.deleted_bool){
                                        console.log('User is deleted');
                                        router.replace('/src/login');
                                        return;
                                    }
                                    if(!res.responseData.acc_verified){
                                        console.log('User is not verified');
                                        router.replace('/src/unverified');
                                        BackendHelper._initLogout();
                                        return;
                                    }
                                    if(!res.responseData.init_bool){
                                        console.log('User is not initiated');
                                        router.replace('/src/initAccount');
                                        return;
                                    }
                                   User.setUserUid(res.responseData.uid);
                                   User.setUserData(res.responseData);
                                   if(res.responseData.theme_mode){if(res.responseData.theme_mode=="DARK"){setdarkMode(false)}}
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
     useEffect(async ()=>{
              setLoading(true);
              getAuth().then(async(m)=>{
                   console.log("User auth success"+m);
                   await loadUserData(setLoading);
              }).catch((e)=>{
                   console.log("User auth failure"+e.message);
                   router.replace('/src/login');
              })
     },[]);

     if(!loading){
     return(
          <div className='app-main-cont-main-body land-body-cont cluster-land-body-cont'   id='lnk-lnk-main-cont-id'>
          <Head>
          <title>Cytelink</title>
          <meta name="description" content="Cicada Login Activity" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico" />
          </Head>
                    <HeaderCont  setdarkMode={setdarkMode} darkMode={darkMode} />
                    {
                          // @ts-ignore: Unreachable code error
                          <GlobalStyles light={darkMode}/>
                    }
                    <LandNavBarCont router={router}/>
                    <NavBarCont router={router}/>
                    <div className='app-clust-act-main-cont'>
                              <div className='app-clust-act-topper-main-cont'>
                              <div className='app-clust-tit-main-cont'>
                                   Cluster Links 
                                   {clusterActive?<div className='app-clust-indi-on'/>:<div className='app-clust-indi-off'/>}
                              </div>
                              <div className='app-clust-sub-tit-main-cont'>Reorder and arrange your links as you want.</div>
                              <div className='app-clust-act-lnk-head-main-cont'>
                                   <button className='app-clust-act-crt-lnk-butt'
                                     onClick={()=>{
                                        openInNewTab(_BASE_CLIENT_URL+'c/'+User?.getUserData()?.uname);
                                     }} 
                                   > 
                                         {_BASE_CLIENT_URL+'c/'+User?.getUserData()?.uname}
                                   </button>
                                        <div className='app-clust-act-set-butt'
                                          onClick={()=>{
                                             copy(_BASE_CLIENT_URL+'c/'+User?.getUserData()?.uname);
                                             toast.dark('Link Copied', {
                                                       position: toast.POSITION.TOP_CENTER,
                                                       autoClose: 2500,
                                                       hideProgressBar: true,
                                                       closeOnClick: true,
                                                       pauseOnHover: true,
                                                       draggable: true,
                                                       progress: undefined,
                                             });

                                        }} 
                                        >                                             
                                             <svg className='app-clust-act-set-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>
                                        </div>
                              </div>
                            
                              </div>
                              <div className='app-clust-link-holder-main-cont'>
                                   <div className='app-clust-time-tit-main-cont'>Last Updated: {lastUpdate?timeDifference(new Date().getTime(),lastUpdate):null}</div> 
                              </div>
                              <div className='app-clust-link-holder-main-cont'>
                                   <div className='app-clust-link-holder-main-cont-lab'>
                                   <div className='app-land-lab-main-cont'>
                                        <svg 
                                        className='app-land-lab-main-cont-ico'
                                        width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                        <path d="M20.5 16.5C19.3 15.3 16 15.0001 15 16.0001L10 21.5C8.5 24 10.4665 27.1611 12.5 27.5C15.5 28 15.5 27 17.5 25.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                        <path d="M16.5 20C17.8057 21.2753 20 22.4999 22 20.9999L24.7049 18.4999L27.4252 15.5149C29.0573 12.8579 26.9176 9.49832 24.7049 9.13815C21.4406 8.60679 21.4406 9.66954 19.2643 11.2637" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                        </svg>
                                        Links</div>
                                   </div>
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