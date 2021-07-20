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
                              <div className='app-clust-tit-main-cont clust-set-tit-main-cont'>
                                   Settings</div>
                              <div className='app-clust-sub-tit-main-cont clust-set-sub-tit-main-cont'>Change your profile details and prefrences.</div>
                              </div>
                              <div className='app-clust-link-overlay-main-cont'
                                   onClick={()=>{
                                        setoverlayVisi(false)
                                        setselecInd(null);
                                   }}
                                   style=
                                   {{display:overlayVisi?'block':'none'}}
                              />
                                             <Accordion className='app-sett-acrd-main-cont'>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                  <svg 
                                                  className='app-land-visit-card-acrd-togg-butt-ico'
                                                  width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                                  <rect x="15" y="9" width="7" height="7" rx="3" stroke="currentColor" stroke-width="2"/>
                                                  <path d="M25.2101 22.6842C20.0452 18.2619 15.3626 19.9856 12.1589 22.9709C10.4787 24.5365 11.8424 27 14.139 27H23.25C25.6748 27 27.052 24.2612 25.2101 22.6842Z" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                                  </svg>
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
                                             <Accordion className='app-sett-acrd-main-cont'>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                 
                                             <svg 
                                          className='app-land-visit-card-acrd-togg-butt-ico'   
                                             width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                             <rect x="9.5" y="14.5" width="19" height="12" rx="1.5" stroke="currentColor" stroke-width="3"/>
                                             <path d="M14 11V15.5M24 11V16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                             </svg>

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
                                             <Accordion className='app-sett-acrd-main-cont'>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                 
                                                  <svg 
                                                  className='app-land-visit-card-acrd-togg-butt-ico'   
                                                  width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                                  <path d="M19 21V23" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                                  <path d="M12 16.5H26C26.8284 16.5 27.5 17.1716 27.5 18V27C27.5 27.8284 26.8284 28.5 26 28.5H12C11.1716 28.5 10.5 27.8284 10.5 27V18C10.5 17.1716 11.1716 16.5 12 16.5Z" stroke="currentColor" stroke-width="3"/>
                                                  <path d="M13.5 16C13.8333 13.6667 13.5 7.5 19 7.5C23.5 7.5 24 13.5 24.5 15.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                                  </svg>

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
                                             
                              
                              
                                             <Accordion className='app-sett-acrd-main-cont'>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                  <svg 
                                                  className='app-land-visit-card-acrd-togg-butt-ico'   
                                                  width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                                  <path d="M9 14.0895L9.29734 12.6193C8.83012 12.5248 8.34579 12.658 7.99261 12.9781C7.63942 13.2983 7.45943 13.7672 7.50772 14.2415L9 14.0895ZM19.395 10.5513C19.6995 9.78086 19.3217 8.90946 18.5513 8.60499C17.7809 8.30051 16.9095 8.67825 16.605 9.4487L19.395 10.5513ZM29.3975 14.6345C29.6985 13.8627 29.3168 12.993 28.545 12.692C27.7732 12.391 26.9035 12.7727 26.6025 13.5445L29.3975 14.6345ZM8.70266 15.5598C10.6463 15.9528 12.7722 16.1141 14.7186 15.4261C16.7525 14.7073 18.371 13.1424 19.395 10.5513L16.605 9.4487C15.8512 11.3561 14.817 12.2095 13.7189 12.5976C12.5334 13.0166 11.0481 12.9734 9.29734 12.6193L8.70266 15.5598ZM7.50772 14.2415C7.78963 17.0101 9.46166 21.1583 11.4894 24.413C12.5113 26.0533 13.6926 27.5809 14.9383 28.6302C16.1223 29.6277 17.7554 30.5065 19.4821 29.9204L18.5179 27.0796C18.3446 27.1384 17.8402 27.1522 16.8711 26.3358C15.9636 25.5714 14.9762 24.3364 14.0356 22.8267C12.1383 19.7813 10.7104 16.0794 10.4923 13.9376L7.50772 14.2415ZM19.4821 29.9204C21.9644 29.0779 23.8244 26.605 25.2996 23.9419C26.8194 21.1984 28.1544 17.8219 29.3975 14.6345L26.6025 13.5445C25.3456 16.7676 24.0806 19.9514 22.6754 22.4882C21.2256 25.1052 19.8356 26.6323 18.5179 27.0796L19.4821 29.9204Z" fill="currentColor"/>
                                                  <path d="M28 13.6484C25.6471 14.5605 19.5851 13.8175 18 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                                  </svg>
                                                 Danger Zone
                                                  <svg className='app-land-visit-card-acrd-togg-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                             </Accordion.Toggle>
                                             <Accordion.Collapse eventKey="0">
                                                  <div className='app-prof-set-holder-main-cont'>
                                                  
                                                  </div>
                                             </Accordion.Collapse>
                                             </Accordion>
                                             

                                             <Accordion className='app-sett-acrd-main-cont'>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                  <svg 
                                                  className='app-land-visit-card-acrd-togg-butt-ico'   
                                                  width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                                  <path d="M19.65 16C18.7 13.31 15.9 11.5 12.77 12.12C10.48 12.58 8.62 14.41 8.14 16.7C7.32 20.57 10.26 24 14 24C16.61 24 18.83 22.33 19.65 20H24V22C24 23.1 24.9 24 26 24C27.1 24 28 23.1 28 22V20C29.1 20 30 19.1 30 18C30 16.9 29.1 16 28 16H19.65ZM14 20C12.9 20 12 19.1 12 18C12 16.9 12.9 16 14 16C15.1 16 16 16.9 16 18C16 19.1 15.1 20 14 20Z" fill="currentColor"/>
                                                  </svg>
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