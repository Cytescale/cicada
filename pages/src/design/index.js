import React,{useEffect, useRef, useState} from "react";
import Head from "next/head";
import { withRouter, NextRouter,useRouter } from 'next/router'
import user from "../../../comp/utils/user";
import { BurgerMenu,ProfilePopover,NavBarCont,BottomCont,LandNavBarCont,HeaderCont } from "../../../comp/elements";
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
                     <HeaderCont  setdarkMode={setdarkMode} darkMode={darkMode} />
                    {
                          // @ts-ignore: Unreachable code error
                          <GlobalStyles light={darkMode}/>
                    }
                    <NavBarCont router={router}/>
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
                                                       Modern
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