import React,{useEffect, useRef, useState} from "react";
import Head from "next/head";
import { withRouter, NextRouter,useRouter } from 'next/router'
import user from "../../../comp/utils/user";
import { BurgerMenu,ProfilePopover,LandNavBarCont,BottomCont } from "../../../comp/elements";
import { _BASE_CLIENT_URL } from "../../../comp/helpers/api.routes";
import firebaseHelper,{getUid,checkToken} from "../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../comp/helpers/backendHelper";
import FullHeiLoading from '../fullHeightLoading';
import { ToastContainer,toast } from "react-toastify";


const User = new user();
const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();


async function loadUserData(setLoading){
     if(!User.getUserData()){
          if(backendHelper){
               await BackendHelper._getUserInfo(await getUid(),true).then((res)=>{
                    if(res){
                         if(!res.errBool){
                               User.setUserData(res.responseData);
                               User.setUserUid(res.responseData.uid);
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


const Profile = (props)=>{
     const router = useRouter()
     const [loading,setLoading] = useState(true);
     const [overlayVisi,setoverlayVisi] = useState(false)
     const [clusterConfigData ,setclusterConfigData] = useState(null);
     const [clusterStatus,setClusterStatus] = useState(false);
     const [profileCardBool,setprofileCardBool] = useState(false);
     const [footerCardBool,setfooterCardBool] = useState(false);

     useEffect(async ()=>{
               
               await loadUserData(setLoading);
             
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
                    <LandNavBarCont router={router}/>
                    <div className='app-clust-act-main-cont'>
                              <div className='app-clust-act-topper-main-cont'>
                              <div className='app-clust-tit-main-cont clust-set-tit-main-cont'>Profile <br/> Settings</div>
                              <div className='app-clust-sub-tit-main-cont clust-set-sub-tit-main-cont'>Change your profile details.</div>
                              </div>
                              <div className='app-clust-link-overlay-main-cont'
                                   onClick={()=>{
                                        setoverlayVisi(false)
                                        setselecInd(null);
                                   }}
                                   style=
                                   {{display:overlayVisi?'block':'none'}}
                              />
                              <div className='app-prof-main-lab-cont'>General Details</div>
                              <div className='app-prof-set-holder-main-cont'>
                                   <div className='app-prof-sec-main-cont'>
                                        <div className='app-prof-sec-pro-pic-main-cont'>
                                                  <div className='app-land-head-pro-pic-main-cont'></div>
                                                  <button className='app-land-head-pro-upd-butt'>Upload Image</button>
                                        </div>
                                        
                                   </div>

                                   <div className='app-prof-sec-main-cont'>
                                         <div className='app-prof-fld-lab-cont'>Username</div>    
                                         <input className='app-prof-fld-cont' placeholder='Username is this'></input>
                                   </div>
                                   <div className='app-prof-sec-main-cont'>
                                         <div className='app-prof-fld-lab-cont'>Display Name</div>    
                                         <input className='app-prof-fld-cont' placeholder='Name is this'></input>
                                   </div>
                                   <div className='app-prof-sec-main-cont'>
                                         <div className='app-prof-fld-lab-cont'>Bio</div>    
                                         <textarea className='app-prof-fld-textarea-cont' placeholder='Name is this'></textarea>
                                   </div>
                                   <div className='app-prof-sec-main-cont'>
                                         <div className='app-prof-fld-lab-cont'>Email Address</div>    
                                         <input className='app-prof-fld-cont' placeholder='Name is this'></input>
                                   </div>
                                   <button className='app-prof-upt-butt'>Update Profile</button>
                              </div>
                              <div className='app-prof-main-lab-cont'>Security Details</div>
                              <div className='app-prof-set-holder-main-cont'>
                                   <button className='app-prof-chng-pass-butt'>Change Password</button>
                                   <button className='app-prof-chng-pass-butt'>Logout</button>
                              </div>
                              <div className='app-prof-main-lab-cont'>Security Details</div>
                              <div className='app-prof-set-holder-main-cont'>
                              <button className='app-prof-chng-pass-butt'>Delete Account Permanently</button>
                              </div>
                              <div className='app-prof-main-lab-cont'>keys Details</div>
                              <div className='app-prof-set-holder-main-cont'>
                                        <div className='app-prof-sec-main-cont'>
                                             <div className='app-prof-fld-lab-cont'>API Key</div>    
                                             <div className='app-prof-fld-sub-lab-cont'>aschSjhksndadJKh</div>    
                                        </div>
                                        <div className='app-prof-sec-main-cont'>
                                             <div className='app-prof-fld-lab-cont'>Profile Id</div>    
                                             <div className='app-prof-fld-sub-lab-cont'>aschSjhksndadJKh</div>    
                                        </div>
                                        <div className='app-prof-sec-main-cont'>
                                             <div className='app-prof-fld-lab-cont'>Profile UID</div>    
                                             <div className='app-prof-fld-sub-lab-cont'>aschSjhksndadJKh</div>    
                                        </div>
                              </div>
                              {/* <div className='app-clust-set-holder-main-cont'>
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
                                      
                              </div> */}
                    </div>
                    <BottomCont/>
                    <ToastContainer/>
          </div>
     )}
     else{
          return(<FullHeiLoading/>);
     }
}

export default Profile;