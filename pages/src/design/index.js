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


const User = new user();
const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();

async function loadUserData(setLoading){
     if(!User.getUserData()){
          if(backendHelper){
               await BackendHelper._getUserInfo(await getUid(),true).then((res)=>{
                    if(res){
                         if(!res.errBool){
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


const design = (props)=>{
     const router = useRouter()
     const [loading,setLoading] = useState(true);
     const [overlayVisi,setoverlayVisi] = useState(false)


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
                                             <div className='app-design-temp-item'>
                                                       <div className='app-design-card-main-cont'>
                                                                 <div className='app-design-card-tab-outer-main-cont'>
                                                                 <div className='app-design-card-tab-main-cont'/>
                                                                 <div className='app-design-card-tab-main-cont'/>
                                                                 <div className='app-design-card-tab-main-cont'/>
                                                                 </div>
                                                       </div>
                                                       <div className='app-design-card-main-cont-tab'>
                                                            Default
                                                       </div>
                                             </div>
                                             <div className='app-design-temp-item'>
                                                       <div className='app-design-card-main-cont degi-neu'>
                                                                 <div className='app-design-card-tab-outer-main-cont'>
                                                                 <div className='app-design-card-tab-main-cont degi-neu-tab'/>
                                                                 <div className='app-design-card-tab-main-cont degi-neu-tab'/>
                                                                 <div className='app-design-card-tab-main-cont degi-neu-tab'/>
                                                                 </div>
                                                       </div>
                                                       <div className='app-design-card-main-cont-tab'>
                                                            Neumorphism
                                                       </div>

                                             </div>     
                                        </div>
                                        <div className='app-design-temp-grid-row'>
                                             <div className='app-design-temp-item'>
                                                            <div className='app-design-card-main-cont degi-rose'>
                                                                 <div className='app-design-card-tab-outer-main-cont'>
                                                                 <div className='app-design-card-tab-main-cont degi-rose-tab'/>
                                                                 <div className='app-design-card-tab-main-cont degi-rose-tab'/>
                                                                 <div className='app-design-card-tab-main-cont degi-rose-tab'/>
                                                                 </div>
                                                       </div>
                                                       <div className='app-design-card-main-cont-tab'>
                                                            Rose
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