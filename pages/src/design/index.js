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
import GlobalStyles from "../land/globalStyle";


const User = new user();
const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();


function useForceUpdate(){
     const [value, setValue] = useState(0); // integer state
     return () => setValue(value => value + 1); // update the state to force render
 }



const design = (props)=>{
     const router = useRouter()
     const [loading,setLoading] = useState(true);
     const [overlayVisi,setoverlayVisi] = useState(false)
     const [clusterConfigData ,setclusterConfigData] = useState(null);
     const [selecDeginTmpId,setselecDeginTmpId] = useState(0);
     const forceUpdate = useForceUpdate();
     const [darkMode ,setdarkMode]=useState(true);

     const loadUserData =async ()=>{
          if(!User.getUserData()){
               if(backendHelper){
                    await BackendHelper._getUserInfo(await getUid(),true).then((res)=>{
                         if(res){
                              if(!res.errBool){
                                   if(res.responseData.deleted_bool){
                                        console.log('User is deleted');
                                        this.props.router.replace('/src/login');
                                        return;
                                    }
                                    if(!res.responseData.init_bool){
                                        console.log('User is not initiated');
                                        this.props.router.replace('/src/initAccount');
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
     const setTempplateId =  async (int)=>{
          BackendHelper._updateClusterConfigData(User.getUserUid(),clusterConfigData._id,{"design_temp_id":int}).then((r)=>{
               if(!r.errBool){
                    console.log(r.responseData);
                    if(r.responseData.editSuccessBool){
                         setselecDeginTmpId(int);
                         toast.success('Link design changed', {
                              position: toast.POSITION.TOP_CENTER,
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                         });
                    }
                    else{
                         throw new Error('Error Occured')     
                    }
               }
               else{
                    throw new Error(r.errMess)
               }
          }).catch(e=>{
               console.log(e)
               toast.error(e.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
               });
          })
     }
     useEffect(async ()=>{
          setLoading(true);
          getAuth().then(async(m)=>{
               console.log("User auth success"+m);
               await loadUserData(setLoading);
               const uid = await getUid();
                if(uid){
                     if(backendHelper){
                          BackendHelper._getClusterConfigByUid(uid).then(async(res)=>{
                               if(res){
                                    if(!res.errBool){
                                         console.log(res.responseData);
                                         setclusterConfigData(res.responseData)
                                         setselecDeginTmpId(res.responseData.design_temp_id)
                                    
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
          }).catch((e)=>{
               console.log("User auth failure"+e.message);
               router.replace('/src/login');
          })     

        
     },[]);

     if(!loading){
     return(
          <div className='app-main-cont-main-body land-body-cont'   id='lnk-lnk-main-cont-id'>
          <Head>
          <title>Cytelink</title>
          <meta name="description" content="Cicada Login Activity" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico" />
          </Head> 
                    <div className='app-head-main-cont link-head-body-cont'>
                    {
                          // @ts-ignore: Unreachable code error
                          <GlobalStyles light={darkMode}/>
                    }
                              <div className='app-head-main-cont-logo link-head-logo'>
                                   <a href={_BASE_CLIENT_URL+'src/land'}>
                                        Cytelink
                                   </a>
                              </div>
                              <div className='app-head-main-right-cont'>
                                        <button 
                                             className='app-dark-mode-butt'
                                             onClick={()=>{setdarkMode(!darkMode)}} >
                                                  {
                                                       darkMode?
                                                       <svg className='app-dark-mode-butt-ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M11.1,12.08c-2-3.88-0.92-7.36,0.07-9.27c0.19-0.36-0.12-0.77-0.53-0.72C5.62,2.77,1.78,7.16,1.99,12.41 c0.01,0,0.01,0,0.01,0.01C2.62,12.15,3.29,12,4,12c1.66,0,3.18,0.83,4.1,2.15C9.77,14.63,11,16.17,11,18 c0,1.52-0.87,2.83-2.12,3.51c0.98,0.32,2.03,0.5,3.11,0.5c3.13,0,5.92-1.44,7.76-3.69c0.26-0.32,0.04-0.79-0.37-0.82 C16.89,17.37,13.1,15.97,11.1,12.08z"/></g><path d="M7,16l-0.18,0C6.4,14.84,5.3,14,4,14c-1.66,0-3,1.34-3,3s1.34,3,3,3c0.62,0,2.49,0,3,0c1.1,0,2-0.9,2-2 C9,16.9,8.1,16,7,16z"/></g></g></svg>:
                                                       <svg className='app-dark-mode-butt-ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>
                                                  }
                                             </button>
                                   <button
                                   className='app-input-class-raised-pressable link-feed-butt'
                                   onClick={()=>{
                                        //this.setcreateLinkModalVisi(true);
                                   }}
                                   >Feedback
                                   </button>
                              </div>
                    </div>
                    <LandNavBarCont router={router}/>
                    <div className='app-clust-act-main-cont'>
                              <div className='app-clust-act-topper-main-cont'>
                              <div className='app-clust-tit-main-cont'>
                                   Cluster Design 
                              </div>
                              <div className='app-clust-sub-tit-main-cont'>
                                   Change the design and apperance of cluster.
                              </div>
                            
                              </div>
                              <div className='app-clust-link-holder-main-cont'>
                                   <div className='app-clust-time-tit-main-cont'>THEMES</div> 
                              </div>     
                              <div className='app-design-temp-grid'>
                                        <div className='app-design-temp-grid-row'>
                                             <div className='app-design-temp-item'
                                                  onClick={()=>{
                                                       setTempplateId(0);
                                                  }}
                                             
                                             >
                                                       <div className='app-design-card-main-cont'>
                                                                 <div className='app-design-card-dp-main-cont'>
                                                                                <div className='app-design-card-dp'/>
                                                                           </div>
                                                                 <div className='app-design-card-tab-outer-main-cont'>
                                                                 <div className='app-design-card-tab-main-cont'/>
                                                                 <div className='app-design-card-tab-main-cont'/>
                                                                 <div className='app-design-card-tab-main-cont'/>
                                                                 </div>
                                                       </div>
                                                       <div className={`app-design-card-main-cont-tab ${selecDeginTmpId=='0'?'app-design-card-main-cont-selectab':null}`}>
                                                            Default
                                                       
                                                            {
                                                            selecDeginTmpId=='0'?
                                                            <svg 
                                                            className='app-design-card-main-selec-ico'
                                                            xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="I9GV0SozQFknxHSR6DCx5a" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"/><stop offset="1" stop-color="#088242"/></linearGradient><path fill="url(#I9GV0SozQFknxHSR6DCx5a)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"/><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"/><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"/></svg>
                                                            :null
                                                            }
                                                       </div>
                                             </div>
                                             <div className='app-design-temp-item'
                                             onClick={()=>{
                                                  setTempplateId(1);
                                             }}
                                             >
                                                       <div className='app-design-card-main-cont degi-neu'>
                                                                 <div className='app-design-card-dp-main-cont'>
                                                                      <div className='app-design-card-dp degi-dp'/>
                                                                 </div>
                                                                 <div className='app-design-card-tab-outer-main-cont'>
                                                                 <div className='app-design-card-tab-main-cont degi-neu-tab'/>
                                                                 <div className='app-design-card-tab-main-cont degi-neu-tab'/>
                                                                 <div className='app-design-card-tab-main-cont degi-neu-tab'/>
                                                                 </div>
                                                                 
                                                       </div>
                                                       <div className={`app-design-card-main-cont-tab ${selecDeginTmpId=='1'?'app-design-card-main-cont-selectab':null}`}>
                                                       Neumorphism
                                                            {
                                                            selecDeginTmpId=='1'?
                                                            <svg 
                                                            className='app-design-card-main-selec-ico'
                                                            xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="I9GV0SozQFknxHSR6DCx5a" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"/><stop offset="1" stop-color="#088242"/></linearGradient><path fill="url(#I9GV0SozQFknxHSR6DCx5a)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"/><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"/><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"/></svg>
                                                            :null
                                                            }
                                                            
                                                       </div>

                                             </div>     
                                        </div>
                                        <div className='app-design-temp-grid-row'>
                                             <div className='app-design-temp-item'
                                             onClick={()=>{
                                                  setTempplateId(2);
                                             }}
                                             >
                                                            <div className='app-design-card-main-cont degi-rose'>
                                                            <div className='app-design-card-dp-main-cont'>
                                                                      <div className='app-design-card-dp degi-rose-dp'/>
                                                                 </div>
                                                                 <div className='app-design-card-tab-outer-main-cont'>
                                                                 <div className='app-design-card-tab-main-cont degi-rose-tab'/>
                                                                 <div className='app-design-card-tab-main-cont degi-rose-tab'/>
                                                                 <div className='app-design-card-tab-main-cont degi-rose-tab'/>
                                                                 </div>
                                                                 
                                                       </div>
                                                       <div className={`app-design-card-main-cont-tab ${selecDeginTmpId=='2'?'app-design-card-main-cont-selectab':null}`}>
                                                       Rose
                                                       {
                                                            selecDeginTmpId=='2'?
                                                            <svg 
                                                            className='app-design-card-main-selec-ico'
                                                            xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="I9GV0SozQFknxHSR6DCx5a" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"/><stop offset="1" stop-color="#088242"/></linearGradient><path fill="url(#I9GV0SozQFknxHSR6DCx5a)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"/><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"/><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"/></svg>
                                                            :null
                                                            }
                                                            
                                                       </div>
                                             </div>
                                             <div className='app-design-temp-item'>
                                                  
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

export default design;