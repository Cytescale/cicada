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
import  {Accordion, Button, Card, Dropdown, Modal, Overlay, Popover, Spinner}  from "react-bootstrap";


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
     const [overlayVisi,setoverlayVisi] =  useState(false);
     useEffect(async ()=>{
               await loadUserData(setLoading);
     },[]);
     if(!loading && User.getUserData()){
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
                              <div className='app-clust-tit-main-cont clust-set-tit-main-cont'>Profile Settings</div>
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
                                             <Accordion>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                 General Details
                                                  <svg className='app-land-visit-card-acrd-togg-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                             </Accordion.Toggle>
                                             <Accordion.Collapse eventKey="0">
                                             <div className='app-prof-set-holder-main-cont'>
                                             <div className='app-prof-sec-main-cont'>
                                                  <div className='app-prof-sec-pro-pic-main-cont'>
                                                            <div className='app-land-head-pro-pic-main-cont'></div>
                                                            <button className='app-land-head-pro-upd-butt'>Upload Image</button>
                                                  </div>
                                                  
                                             </div>

                                             <div className='app-prof-sec-main-cont'>
                                                  <div className='app-prof-fld-lab-cont'>Username</div>    
                                                  <input className='app-prof-fld-cont' value={User.getUserData().uname}></input>
                                             </div>
                                             <div className='app-prof-sec-main-cont'>
                                                  <div className='app-prof-fld-lab-cont'>Display Name</div>    
                                                  <input className='app-prof-fld-cont' value={User.getUserData().dname}></input>
                                             </div>
                                             <div className='app-prof-sec-main-cont'>
                                                  <div className='app-prof-fld-lab-cont'>Bio</div>    
                                                  <textarea className='app-prof-fld-textarea-cont' value={User.getUserData().bio}></textarea>
                                             </div>

                                             <button className='app-prof-upt-butt'>Update Profile</button>
                                        </div>
                                             </Accordion.Collapse>
                                             </Accordion>
                                             
                                             
                                             <Accordion>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                 Work Details
                                                  <svg className='app-land-visit-card-acrd-togg-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                             </Accordion.Toggle>
                                             <Accordion.Collapse eventKey="0">
                                             <div className='app-prof-set-holder-main-cont'>
                                                       <div className='app-prof-sec-main-cont'>
                                                            <div className='app-prof-fld-lab-cont'>Email Address</div>    
                                                            <input className='app-prof-fld-cont' value={User.getUserData().email}></input>
                                                       </div>
                                                       <div className='app-prof-sec-main-cont'>
                                                            <div className='app-prof-fld-lab-cont'>Company Name</div>    
                                                            <input className='app-prof-fld-cont' value={User.getUserData().cname}></input>
                                                       </div>
                                                       <button className='app-prof-upt-butt'>Save</button>
                                                  </div>
                                             </Accordion.Collapse>
                                             </Accordion>
                                             
                              
                                             <Accordion>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                 Security
                                                  <svg className='app-land-visit-card-acrd-togg-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                             </Accordion.Toggle>
                                             <Accordion.Collapse eventKey="0">
                                             <div className='app-prof-set-holder-main-cont'>
                                                       <button className='app-prof-chng-pass-butt'>Change Password</button>
                                                       <button className='app-prof-chng-pass-butt'>Logout</button>
                                                  </div>
                                             </Accordion.Collapse>
                                             </Accordion>
                                             
                              
                              
                                             <Accordion>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                 Danger Zone
                                                  <svg className='app-land-visit-card-acrd-togg-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                             </Accordion.Toggle>
                                             <Accordion.Collapse eventKey="0">
                                                  <div className='app-prof-set-holder-main-cont'>
                                                  
                                                  </div>
                                             </Accordion.Collapse>
                                             </Accordion>
                                             

                                             <Accordion>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                 Account Keys
                                                  <svg className='app-land-visit-card-acrd-togg-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                             </Accordion.Toggle>
                                             <Accordion.Collapse eventKey="0">
                                                  <div className='app-prof-set-holder-main-cont'>
                                                            <div className='app-prof-sec-main-cont'>
                                                                 <div className='app-prof-fld-lab-cont'>API Key</div>    
                                                                 <div className='app-prof-fld-sub-lab-cont'>{User.getUserData().api_key}</div>    
                                                            </div>
                                                            <div className='app-prof-sec-main-cont'>
                                                                 <div className='app-prof-fld-lab-cont'>Profile Id</div>    
                                                                 <div className='app-prof-fld-sub-lab-cont'>{User.getUserData()._id}</div>    
                                                            </div>
                                                            <div className='app-prof-sec-main-cont'>
                                                                 <div className='app-prof-fld-lab-cont'>Profile UID</div>    
                                                                 <div className='app-prof-fld-sub-lab-cont'>{User.getUserData().uid}</div>    
                                                            </div>
                                                  </div>
                                                  </Accordion.Collapse>
                                             </Accordion>
                                             

                              
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