import React,{useEffect, useRef, useState} from "react";
import Head from "next/head";
import { withRouter, NextRouter,useRouter } from 'next/router'
import user from "../../../comp/utils/user";
import { BurgerMenu,ProfilePopover,NavBarCont,BottomCont } from "../../../comp/elements";
import { _BASE_CLIENT_URL } from "../../../comp/helpers/api.routes";
import firebaseHelper,{getUid,checkToken} from "../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../comp/helpers/backendHelper";
import FullHeiLoading from '../fullHeightLoading';
import { ToastContainer,toast } from "react-toastify";
const User = new user();
const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();
async function processActiveLinkData(lData,bool){
     let updateDat ={
          "active_bool": bool,
     }
     let resp = await BackendHelper._updateLinkData(User.getUserUid(),lData._id,updateDat);
     return resp;
}
const LinkCard=(props)=>{
     const [active , setactive] = useState(props.d.active_bool);
     const [activeLoading,setactiveLoading] = useState(false);
     return(
          <div className='lnk-lnk-main-cont  clust-link-head-outer-cont'>
          <div className='lnk-lnk-reord-main-cont'>
               <svg className='lnk-lnk-reord-ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </div>
          <div className='lnk-lnk-head-main-cont clust-link-head-cont'>
                    <div className='lnk-lnk-head-main-cont-name-cont'>
                          <span style={{
                              textDecoration:active?'none':'line-through'
                          }}>
                          {props.d.name}
                         </span>  
                    </div>

                    <button
                    className='lnk-lnk-head-edit-butt'
                    >
                         <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M2.375 13.8225V16.2292C2.375 16.4508 2.54917 16.625 2.77083 16.625H5.1775C5.28042 16.625 5.38333 16.5854 5.45458 16.5062L14.0996 7.86916L11.1308 4.90041L2.49375 13.5375C2.41458 13.6167 2.375 13.7117 2.375 13.8225ZM16.3954 5.57333C16.7042 5.26458 16.7042 4.76583 16.3954 4.45708L14.5429 2.60458C14.2342 2.29583 13.7354 2.29583 13.4267 2.60458L11.9779 4.05333L14.9467 7.02208L16.3954 5.57333Z" fill="white"/>
                         </svg>
                    
                    </button>
                    <div  className='lnk-lnk-head-right-butt-cont'>
                    <label className="switch">
                         <input type="checkbox" 
                         disabled={activeLoading}
                         defaultChecked={active}
                         onClick={async ()=>{
                              await setactive(!active);
                              await setactiveLoading(true);
                              await processActiveLinkData(props.d,!active).then(async (res)=>{
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
                    </label>
                    </div>
          </div>
       
     </div>
     )
}


async function loadUserData(setLoading){
     if(!User.getUserData()){
          if(backendHelper){
               await BackendHelper._getUserInfo(await getUid()).then((res)=>{
                    if(res){
                         if(!res.errBool){
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

const RenderClusterLink = (props) =>{
     const [linkData,setLinkData] = useState();
     const [linkDataLoading,setlinkDataLoading] = useState(true);
     
     useEffect(async ()=>{
          const uid = await getUid();
          if(uid){
               if(backendHelper){
                    BackendHelper._getLinksData(uid).then((res)=>{
                         if(res){
                              if(!res.errBool){
                                    console.log(res.responseData);
                                    setLinkData(res.responseData);
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

     if(linkData ){
     if(linkData.length > 0){
          linkData.map((e,ind)=>{
                    res.push(<LinkCard key={ind}ind={ind} d={e} />)
          }) 
          return(res);
     }else{return(<span/>)}
     }else{return(<span/>)}
}

const cluster = (props)=>{
     const router = useRouter()
     const [linkData,setLinkData] = useState(null);
     const [loading,setLoading] = useState(true);

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
                                        Create Link
                                   </button>
                                   {/* <ProfilePopover 
                                    //setlgoutShow={this.setlgoutConfirmVisi} 
                                    /> */}
                              </div>
                    </div>
                    <NavBarCont router={router}/>
                    <div className='app-clust-act-main-cont'>
                              <div className='app-clust-act-topper-main-cont'>
                              <div className='app-clust-tit-main-cont'>Cluster Links</div>
                              <div className='app-clust-sub-tit-main-cont'>Reorder and arrange your links as you want, or create a new one.</div>
                              <div className='app-clust-act-lnk-head-main-cont'>
                              <button className='app-land-crt-lnk-butt'
                              
                              > 
                              <div  className='app-land-crt-lnk-butt-lab'>
                                   Create Link </div>
                              </button>
                              </div>
                              </div>
                              <div className='app-clust-link-holder-main-cont'>
                                   {!loading?<RenderClusterLink linksData={linkData}/>:<span/>}       
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