import React,{useEffect, useRef, useState} from "react";
import Head from "next/head";
import { withRouter, NextRouter,useRouter } from 'next/router'
import user from "../../../comp/utils/user";
import { BurgerMenu,ProfilePopover,NavBarCont,BottomCont,LandNavBarCont } from "../../../comp/elements";
import URLS,{_BASE_CLIENT_URL} from "../../../comp/helpers/api.routes";
import firebaseHelper,{getUid,checkToken} from "../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../comp/helpers/backendHelper";
import FullHeiLoading from '../fullHeightLoading';
import { ToastContainer,toast } from "react-toastify";
import copy from 'copy-to-clipboard';
import getAuth from '../../../comp/utils/getAuth';

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
                                    if(!res.responseData.init_bool){
                                        console.log('User is not initiated');
                                        router.replace('/src/initAccount');
                                        return;
                                    }
                                   User.setUserUid(res.responseData.uid);
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
                                        Create
                                   </button>
                                   {/* <ProfilePopover 
                                    //setlgoutShow={this.setlgoutConfirmVisi} 
                                    /> */}
                              </div>
                    </div>
                    <LandNavBarCont router={router}/>
                    <div className='app-clust-act-main-cont'>
                              <div className='app-clust-act-topper-main-cont'>
                              <div className='app-clust-tit-main-cont'>
                                   Cluster Links 
                                   {clusterActive?<div className='app-clust-indi-on'/>:<div className='app-clust-indi-off'/>}
                              </div>
                              <div className='app-clust-sub-tit-main-cont'>Reorder and arrange your links as you want, or create a new one.</div>
                              {/* <div className='app-clust-time-tit-main-cont'>Last Updated: {lastUpdate?timeDifference(new Date().getTime(),lastUpdate):null}</div> */}
                              <div className='app-clust-act-lnk-head-main-cont'>
                                   <button className='app-clust-act-crt-lnk-butt'
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
                                         {_BASE_CLIENT_URL+'c/'+User?.getUserData()?.uname}
                                   </button>
                                   <a href='/src/cluster/settings'>
                                        <div className='app-clust-act-set-butt'>
                                             <svg className='app-clust-act-set-butt-ico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="L4rKfs~Qrm~k0Pk8MRsoza" x1="32.012" x2="15.881" y1="32.012" y2="15.881" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".242" stop-color="#f2f2f2"/><stop offset="1" stop-color="#ccc"/></linearGradient><circle cx="24" cy="24" r="11.5" fill="url(#L4rKfs~Qrm~k0Pk8MRsoza)"/><linearGradient id="L4rKfs~Qrm~k0Pk8MRsozb" x1="17.45" x2="28.94" y1="17.45" y2="28.94" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0d61a9"/><stop offset=".363" stop-color="#0e5fa4"/><stop offset=".78" stop-color="#135796"/><stop offset="1" stop-color="#16528c"/></linearGradient><circle cx="24" cy="24" r="7" fill="url(#L4rKfs~Qrm~k0Pk8MRsozb)"/><linearGradient id="L4rKfs~Qrm~k0Pk8MRsozc" x1="5.326" x2="38.082" y1="5.344" y2="38.099" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#889097"/><stop offset=".331" stop-color="#848c94"/><stop offset=".669" stop-color="#78828b"/><stop offset="1" stop-color="#64717c"/></linearGradient><path fill="url(#L4rKfs~Qrm~k0Pk8MRsozc)" d="M43.407,19.243c-2.389-0.029-4.702-1.274-5.983-3.493c-1.233-2.136-1.208-4.649-0.162-6.693 c-2.125-1.887-4.642-3.339-7.43-4.188C28.577,6.756,26.435,8,24,8s-4.577-1.244-5.831-3.131c-2.788,0.849-5.305,2.301-7.43,4.188 c1.046,2.044,1.071,4.557-0.162,6.693c-1.281,2.219-3.594,3.464-5.983,3.493C4.22,20.77,4,22.358,4,24 c0,1.284,0.133,2.535,0.364,3.752c2.469-0.051,4.891,1.208,6.213,3.498c1.368,2.37,1.187,5.204-0.22,7.345 c2.082,1.947,4.573,3.456,7.34,4.375C18.827,40.624,21.221,39,24,39s5.173,1.624,6.303,3.971c2.767-0.919,5.258-2.428,7.34-4.375 c-1.407-2.141-1.588-4.975-0.22-7.345c1.322-2.29,3.743-3.549,6.213-3.498C43.867,26.535,44,25.284,44,24 C44,22.358,43.78,20.77,43.407,19.243z M24,34.5c-5.799,0-10.5-4.701-10.5-10.5c0-5.799,4.701-10.5,10.5-10.5S34.5,18.201,34.5,24 C34.5,29.799,29.799,34.5,24,34.5z"/></svg>
                                        </div>
                                   </a>
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