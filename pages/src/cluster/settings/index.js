import React,{useEffect, useRef, useState} from "react";
import Head from "next/head";
import { withRouter, NextRouter,useRouter } from 'next/router'
import user from "../../../../comp/utils/user";
import { BurgerMenu,ProfilePopover,NavBarCont,BottomCont,HeaderCont } from "../../../../comp/elements";
import { _BASE_CLIENT_URL } from "../../../../comp/helpers/api.routes";
import firebaseHelper,{getUid,checkToken} from "../../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../../comp/helpers/backendHelper";
import FullHeiLoading from '../../fullHeightLoading';
import { ToastContainer,toast } from "react-toastify";
import getAuth from '../../../../comp/utils/getAuth';
import GlobalStyles from "../../land/globalStyle";

const User = new user();
const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();


const Settings = (props)=>{
     const router = useRouter()
     const [loading,setLoading] = useState(true);
     const [overlayVisi,setoverlayVisi] = useState(false)
     const [clusterConfigData ,setclusterConfigData] = useState(null);
     const [clusterStatus,setClusterStatus] = useState(false);
     const [profileCardBool,setprofileCardBool] = useState(false);
     const [footerCardBool,setfooterCardBool] = useState(false);
     const [darkMode ,setdarkMode]=useState(true);


     
  const loadUserData = async()=>{
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
                               User.setUserData(res.responseData);
                               User.setUserUid(res.responseData.uid);
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
          getAuth().then(async(m)=>{
               await loadUserData(setLoading);
          
               }).catch((e)=>{
                    console.log("User auth failure"+e.message);
                    router.replace('/src/login');
          })
            
             
     },[]);
     useEffect(async ()=>{
          const uid = await getUid();    
          if(uid){
               if(backendHelper){
                    BackendHelper._getClusterConfigByUid(uid).then(async(res)=>{
                         if(res){
                              if(!res.errBool){
                                   console.log(res.responseData);
                                   setclusterConfigData(res.responseData)
                                   setClusterStatus(res.responseData.active_bool);
                                   setprofileCardBool(res.responseData.profile_card_bool);
                                   setfooterCardBool(res.responseData.footer_card_bool);
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

     if(!loading){
     return(
          <div className='app-main-cont-main-body land-body-cont'   id='lnk-lnk-main-cont-id'>
          <Head>
          <title>Sakura</title>
          <meta name="description" content="Cicada Login Activity" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico" />
          </Head>
          
                    <HeaderCont  setdarkMode={setdarkMode} darkMode={darkMode} />
                    {
                          // @ts-ignore: Unreachable code error
                          <GlobalStyles light={darkMode}/>
                    }
                    <NavBarCont router={router}/>
                    {/* <div className='app-nav-bar-main-cont'>
                              <div 
                              className={`app-nav-bar-main-link-cont `}>
                              <a 
                                   className='app-nav-lnk-lnk app-nav-bar-back-link'
                                   href={_BASE_CLIENT_URL+'src/cluster'}>
                                        <svg 
                                        className={`app-nav-bar-main-link-ico`}
                                        xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
                                        Back
                              </a>
                              </div>
                     </div> */}
                    <div className='app-clust-act-main-cont'>
                              <div className='app-clust-act-topper-main-cont'>
                              <div className='app-clust-tit-main-cont clust-set-tit-main-cont'>Cluster Settings</div>
                              <div className='app-clust-sub-tit-main-cont clust-set-sub-tit-main-cont'>Set your cluster prefrences as per your need.</div>
                              </div>
                              <div className='app-clust-link-overlay-main-cont'
                                   onClick={()=>{
                                        setoverlayVisi(false)
                                        setselecInd(null);
                                   }}
                                   style={{display:overlayVisi?'block':'none'}}
                              />
                              <div className='app-clust-set-holder-main-cont'>
                                        <div className='app-clust-set-card-main-cont'>
                                             <div className='app-clust-set-card-main-tit-cont'>Cluster Status</div>
                                             <div className='app-clust-set-card-main-sub-tit-cont'>Enable or disable the status of your cluster</div>
                                             <div className='app-clust-set-card-main-rigt-cont'>
                                                  <label className="switch">
                                                       <input type="checkbox"
                                                            onClick={()=>{
                                                                 BackendHelper._updateClusterConfigData(User.getUserUid(),clusterConfigData._id,{"active_bool":!clusterStatus}).then((r)=>{
                                                                      if(r.errBool){console.log(r.errMess);}
                                                                 }).catch(e=>{console.log(e)})
                                                            }} 
                                                            defaultChecked={clusterStatus}
                                                       />
                                                       <span className="slider round"></span>
                                                  </label>
                                             </div>
                                        </div>
                                        <div className='app-clust-set-card-main-cont'>
                                             <div className='app-clust-set-card-main-tit-cont'>Profile Card</div>
                                             <div className='app-clust-set-card-main-sub-tit-cont'>Enable or disable the profile card of your cluster</div>
                                             <div className='app-clust-set-card-main-rigt-cont'>
                                                  <label className="switch">
                                                       <input type="checkbox"
                                                        onClick={()=>{
                                                            BackendHelper._updateClusterConfigData(User.getUserUid(),clusterConfigData._id,{"profile_card_bool":!profileCardBool}).then((r)=>{
                                                                 if(r.errBool){console.log(r.errMess);}
                                                            }).catch(e=>{console.log(e)})
                                                       }}  
                                                            defaultChecked={profileCardBool}
                                                       />
                                                       <span className="slider round"></span>
                                                  </label>
                                             </div>
                                        </div>
                                        <div className='app-clust-set-card-main-cont'>
                                             <div className='app-clust-set-card-main-tit-cont'>Footer Card</div>
                                             <div className='app-clust-set-card-main-sub-tit-cont'>Enable or disable the Footer card of your cluster</div>
                                             <div className='app-clust-set-card-main-rigt-cont'>
                                                  <label className="switch">
                                                       <input type="checkbox" 
                                                          onClick={()=>{
                                                            BackendHelper._updateClusterConfigData(User.getUserUid(),clusterConfigData._id,{"footer_card_bool":!footerCardBool}).then((r)=>{
                                                                 if(r.errBool){console.log(r.errMess);}
                                                            }).catch(e=>{console.log(e)})
                                                       }} 
                                                            defaultChecked={footerCardBool}
                                                       />
                                                       <span className="slider round"></span>
                                                  </label>
                                             </div>
                                        </div>
                              </div>
                    </div>
                    <BottomCont/>
                    <ToastContainer/>
          </div>
     )}
     else{
          return(<FullHeiLoading/>);
     }
}

export default Settings;