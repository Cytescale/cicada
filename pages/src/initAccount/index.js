import React,{useEffect, useRef, useState} from "react";
import Head from "next/head";
import { withRouter, NextRouter,useRouter } from 'next/router'
import user from "../../../comp/utils/user";
import URLS,{_BASE_CLIENT_URL} from "../../../comp/helpers/api.routes";
import firebaseHelper,{getUid,checkToken} from "../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../comp/helpers/backendHelper";
import FullHeiLoading from '../fullHeightLoading';
import { ToastContainer,toast } from "react-toastify";
import { BottomCont} from "../../../comp/elements";
import getAuth from '../../../comp/utils/getAuth';



const User = new user();
const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();
var OldUserData = null;


async function loadUserData(setLoading){
     if(!User.getUserData()){
          if(backendHelper){
               await BackendHelper._getUserInfo(await getUid(),true).then((res)=>{
                    if(res){
                         if(!res.errBool){
                              OldUserData = res.responseData;
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



const cluster = (props)=>{
     const router = useRouter()
     const [loading,setLoading] = useState(true);
     const [proPic,setProPic] = useState({ preview: "", raw: "" });
     const [picChange,setpicChange] = useState(false);
     const [uname,setuname] = useState(null);
     const [dname,setdname] = useState(null);
     const [bio,setbio] = useState(null);
     const [gen_upt_loading,setgen_upt_loading] = useState(false);
     const [gen_upt_err_bool,setgen_upt_err_bool] = useState(false);
     const [gen_upt_err_str,setgen_upt_err_str] = useState(null);
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
          if(!User.getUserData().init_bool){
               prod_data['init_bool']=true;
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
                         router.replace('/src/land');
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
               try{
                    await loadUserData(setLoading);
                    if(User.getUserData()){
                         setuname(User.getUserData().uname);
                         setdname(User.getUserData().dname);
                         setbio(User.getUserData().bio);
                    }
               }
               catch(e){
                    console.log("Init account error"+e);
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
          <title>Sakura</title>
          <meta name="description" content="Cicada Login Activity" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico" />
          </Head>
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
                    </div>
                    <div className='app-clust-act-main-cont'>
                              <div className='app-init-acc-lab-main-cont'>
                                   Tell us <br/> About Yourself
                              </div>
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
                                                                                <img src={User.getUserData()?User.getUserData().pro_photo_url:'https://ik.imagekit.io/cyte/sakura/Men-Profile-Image_8c3Wj4y8S.png?updatedAt=1626883535964'} className='app-land-head-pro-pic-main-cont-pic' />
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
                                             >{gen_upt_loading?'Loading':'Get Started'}</button>
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

export default cluster;