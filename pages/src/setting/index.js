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
import ImageUploading from 'react-images-uploading';
import AuthView from '../auth';
import getAuth from '../../../comp/utils/getAuth';
import { timeDifference } from "../../../comp/utils/utils";
import GlobalStyles from "../land/globalStyle";

const User = new user();

var OldUserData = null;

const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();



const Profile = (props)=>{
     const router = useRouter()
     const [loading,setLoading] = useState(true);
     const [overlayVisi,setoverlayVisi] =  useState(false);
     const [darkMode ,setdarkMode]=useState(true);
     const [proPic,setProPic] = useState({ preview: "", raw: "" });
     const [picChange,setpicChange] = useState(false);
     const [uname,setuname] = useState(null);
     const [dname,setdname] = useState(null);
     const [bio,setbio] = useState(null);
     
     const [cname,setcname] = useState(null);

     const [gen_upt_loading,setgen_upt_loading] = useState(false);

     const [gen_upt_err_bool,setgen_upt_err_bool] = useState(false);
     const [gen_upt_err_str,setgen_upt_err_str] = useState(null);

     const [wor_upt_err_bool,setwor_upt_err_bool] = useState(false);
     const [wor_upt_err_str,setwor_upt_err_str] = useState(null);
     
     const loadUserData =async ()=>{
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
                          OldUserData = res.responseData;
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

     const sendResetLink = ()=>{
          FirebaseHelper.sendPassResetEmail(User.getUserData().email).then((r)=>{
               if(!r.errBool){
                    toast.success('Password reset link is sent to email', {
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
                    throw new Error(r.errMess);
               }
          }).
          catch(e=>{
               toast.error(e, {
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
     const initLgout=()=>{
          BackendHelper._initLogout().then(r=>{
               console.log(r);
               if(r){
                    console.log('Logout successfully');
                    User.purgeData();
                    router.replace('/');
               }
               
          }).catch(e=>{
               console.log(e);
               toast.error("Logout failed", {
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
     const update_general_det  = async ()=>{
          console.log('general_update_init');
          
          let pic_res = null;
          
          if(picChange && proPic.raw){
               pic_res = await  BackendHelper._image_upload(proPic.raw).catch((e)=>{
                    console.log(e);
               })}
          console.log(pic_res); 
          if(!dname || !uname || !OldUserData){return;}
          let prod_data ={};
          dname != OldUserData.dname && dname ?prod_data['dname']=dname:null;
          uname != OldUserData.uname && uname ?prod_data['uname']=uname:null;
          bio!=OldUserData.bio? prod_data['bio']=bio:null;
          if(pic_res){
               prod_data['pro_photo_url']=pic_res.url;
               prod_data['pro_photo_thumb_url']=pic_res.thumbnailUrl;
               prod_data['pro_photo_file_id']=pic_res.fileId;
          }

          await BackendHelper._updateUserData(User.getUserUid(),prod_data).then(async (r)=>{
               if(!r.errBool){
                    console.log(r.responseData);
                    if(r.responseData.editSuccessBool){
                         toast.success('Profile Updated Successfully', {
                              position: toast.POSITION.TOP_CENTER,
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                         });
                    }else{
                         throw new Error('Updation failed :(')
                    }
                    await loadUserData(setLoading);
                    console.log(OldUserData);
                    setgen_upt_err_bool(false);
               }
               else{
                    setgen_upt_err_bool(true);
                    setgen_upt_err_str(r.errMess);     
               }
          }).catch(async (e)=>{
               await loadUserData(setLoading);
               console.log(OldUserData);
               setgen_upt_err_bool(true);
               setgen_upt_err_str(e.message);
          })

     }
     const update_work_det  = async ()=>{
          console.log('work_update_init');
          if(!OldUserData){return;}
          let prod_data ={};
          cname != OldUserData.cname ?prod_data['cname']=cname:null;
          BackendHelper._updateUserData(User.getUserUid(),prod_data).then(async (r)=>{
               if(!r.errBool){
                    console.log(r.responseData);
                    if(r.responseData.editSuccessBool){
                         toast.success('Profile Updated Successfully', {
                              position: toast.POSITION.TOP_CENTER,
                              autoClose: 5000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                         });
                    }else{
                         throw new Error('Updation failed :(')
                    }
                    await loadUserData(setLoading);
                    console.log(OldUserData);
                    setwor_upt_err_bool(false);
               }
               else{
                    setwor_upt_err_bool(true);
                    setwor_upt_err_str(r.errMess);     
               }
               

          }).catch(async (e)=>{
               await loadUserData(setLoading);
               console.log(OldUserData);
               setgen_upt_err_bool(true);
               setgen_upt_err_str(e.message);
          })

          console.log(prod_data);
     }
     const handlePhtChange = e => {
          if (e.target.files.length) {
               setpicChange(true);
               setProPic({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0]
            });
          }
        };
      
     useEffect(async ()=>{
          setLoading(true);
          getAuth().then(async(m)=>{
               console.log("User auth success"+m);
               await loadUserData(setLoading);
               if(User.getUserData()){
                    setuname(User.getUserData().uname);
                    setdname(User.getUserData().dname);
                    setbio(User.getUserData().bio);
                    setcname(User.getUserData().cname);
               }
               
          }).catch((e)=>{
               console.log("User auth failure"+e.message);
               router.replace('/src/login');
          })     
          
     },[]);



     if(!loading && User.getUserData()){
     return(
          <div className='app-main-cont-main-body land-body-cont'   id='lnk-lnk-main-cont-id'>
          <Head>
          <title>Cytelink</title>
          <meta name="description" content="Cicada Login Activity" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico" />
          </Head>
          
                    {/* <BurgerMenu router={router} /> */}
                    <div className='app-head-main-cont link-head-body-cont'>
                    {
                          // @ts-ignore: Unreachable code error
                          <GlobalStyles light={darkMode}/>
                    }
                              <div className='app-head-main-cont-logo link-head-logo'>
                                   Cytelink
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
                                        
                                   }}
                                   >
                                        Feedback
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
                                   Profile Settings</div>
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
                                             <Accordion className='app-sett-acrd-main-cont' defaultActiveKey="0">
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
                                                            <label htmlFor="upload-button">
                                                            {proPic.preview ? (
                                                                      <div className='app-land-head-pro-pic-main-cont app-prof-prof-pic'>
                                                                      <img src={proPic.preview} alt="dummy" className='app-land-head-pro-pic-main-cont-pic' />
                                                                      <div className='app-prof-prof-pic-edit-cont'>
                                                                                     <svg className='app-prof-prof-pic-edit-cont-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                                                      </div>
                                                                      </div>
                                                                 ) : (
                                                                      <>
                                                                       <div className='app-land-head-pro-pic-main-cont app-prof-prof-pic'>
                                                                                <img src={User.getUserData().pro_photo_url?User.getUserData().pro_photo_url:'https://ik.imagekit.io/cyte/sakura/Men-Profile-Image_8c3Wj4y8S.png?updatedAt=1626883535964'} className='app-land-head-pro-pic-main-cont-pic' />
                                                                                <div className='app-prof-prof-pic-edit-cont'>
                                                                                               <svg className='app-prof-prof-pic-edit-cont-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                                                                </div>
                                                                                </div>
                                                                      </>
                                                                 )}
                                                            </label>
                                                            <input type='file' id="upload-button" style={{ display: "none" }} onChange={handlePhtChange} className='app-land-head-pro-upd-butt'/>
                                                  </div>
                                                  
                                             </div>

                                             <div className='app-prof-sec-main-cont'>
                                                  <div className='app-prof-fld-lab-cont'>Username</div>    
                                                  <input className='app-prof-fld-cont' value={uname} onChange={(event)=>{setuname(event.target.value)}} ></input>
                                             </div>
                                             <div className='app-prof-sec-main-cont'>
                                                  <div className='app-prof-fld-lab-cont'>Display Name</div>    
                                                  <input className='app-prof-fld-cont' value={dname} onChange={(event)=>{setdname(event.target.value);}}></input>
                                             </div>
                                             <div className='app-prof-sec-main-cont'>
                                                  <div className='app-prof-fld-lab-cont'>Bio</div>    
                                                  <textarea className='app-prof-fld-textarea-cont' value={bio} onChange={(event)=>{setbio(event.target.value);}}></textarea>
                                             </div>

                                             {gen_upt_err_bool?<div className='app-set-err-main-cont'>{gen_upt_err_str}</div>:null}

                                             <button 
                                             className='app-prof-upt-butt'
                                             disabled={gen_upt_loading}     
                                             onClick={()=>{
                                                       setgen_upt_loading(true);
                                                       update_general_det().then(()=>{
                                                            setgen_upt_loading(false);
                                                       });
                                                  }    
                                             }
                                             >{gen_upt_loading?'Loading':'Update Profile'}</button>
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
                                                            <input className='app-prof-fld-cont' disabled  value={User.getUserData().email}></input>
                                                       </div>
                                                       <div className='app-prof-sec-main-cont'>
                                                            <div className='app-prof-fld-lab-cont'>Company Name</div>    
                                                            <input className='app-prof-fld-cont' onChange={(event)=>{setcname(event.target.value);}} value={cname}></input>
                                                       </div>
                                                       {wor_upt_err_bool?<div className='app-set-err-main-cont'>{wor_upt_err_str}</div>:null}
                                                       <button onClick={update_work_det} className='app-prof-upt-butt'>Save</button>
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
                                                       <button className='app-prof-chng-pass-butt' onClick={sendResetLink}>Change Password</button>
                                                       <button className='app-prof-chng-pass-butt' onClick={initLgout} >Logout</button>
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