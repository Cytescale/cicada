import React,{useEffect, useRef, useState} from "react";
import user from "../../../comp/utils/user";
import firebaseHelper,{getUid,checkToken,setWelToken,getWel} from "../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../comp/helpers/backendHelper";
import { withRouter, NextRouter } from 'next/router'
import FullHeiLoading from '../fullHeightLoading';
import Head from "next/head";
import  {Modal, Spinner,Accordion,Card}  from "react-bootstrap";
import { ToastContainer,toast } from "react-toastify";
import nexusResponse from "../../../comp/helpers/nexusResponse";
import { linkDataType } from "../../../comp/utils/link";
import URLS,{_BASE_CLIENT_URL} from "../../../comp/helpers/api.routes";
import copy from 'copy-to-clipboard';
import { BottomSheet } from 'react-spring-bottom-sheet'
import getAuth from '../../../comp/utils/getAuth';
import { timeDifference,smalltimeDifference } from "../../../comp/utils/utils";
import { BurgerMenu,ProfilePopover,LandNavBarCont,BottomCont,FeedbackCont,HeaderCont,RenderPlatformLogo,RenderAccordion} from "../../../comp/elements";
import LandVisitChart from './landChart';
import {landFullVisitChart as LandFullVisitChart} from './landChart';
import styled ,{ThemeProvider} from "styled-components";
import GlobalStyles from "./globalStyle";
var QRCode = require('qrcode.react');


const BackendHelper = new backendHelper();
const User = new user();


const WelcomeHead:React.FC<any> = ()=>{
     const [show,setShow] = useState<boolean|null>(null);
     const [exitAnim,setexitAnim] = useState<boolean>(false);
     useEffect(()=>{
           getWel().then((r)=>{
               if(r=='true'){
                    setShow(true);
                    console.log('in');
               } 
               else{
                    console.log('out');
                    setShow(false);
               }
               
          });
     },[])
     return(
          show?
          <div className={`dash-wel-main-cont ${exitAnim?'dash-wel-main-cont-start-exit-anim':null}`}
          onAnimationStart={()=>{
          }}
          onAnimationEnd={()=>{
               if(exitAnim){
                    setShow(false)
                    setWelToken('false')
               }
          }}
          >
                    Welcome to<br/>Cytelink
                    <svg width="31" height="27" viewBox="0 0 31 27" fill="none" className='dash-wel-main-cont-ico' onClick={()=>{
                         setexitAnim(true);
                    }}>
                    <path d="M15.8815 4.80617C10.3925 4.80617 5.95557 9.06947 5.95557 14.3437C5.95557 19.618 10.3925 23.8813 15.8815 23.8813C21.3706 23.8813 25.8075 19.618 25.8075 14.3437C25.8075 9.06947 21.3706 4.80617 15.8815 4.80617ZM20.1497 18.4449C19.7626 18.8169 19.1373 18.8169 18.7501 18.4449L15.8815 15.6885L13.0129 18.4449C12.6258 18.8169 12.0005 18.8169 11.6134 18.4449C11.2263 18.0729 11.2263 17.4721 11.6134 17.1001L14.482 14.3437L11.6134 11.5874C11.2263 11.2154 11.2263 10.6146 11.6134 10.2426C12.0005 9.87062 12.6258 9.87062 13.0129 10.2426L15.8815 12.9989L18.7501 10.2426C19.1373 9.87062 19.7626 9.87062 20.1497 10.2426C20.5368 10.6146 20.5368 11.2154 20.1497 11.5874L17.2811 14.3437L20.1497 17.1001C20.5269 17.4625 20.5269 18.0729 20.1497 18.4449Z" fill="#F7F7FC"/>
                    </svg>
                    {/* <div className='dash-wel-main-decor-cont'/> */}
          </div>:
          <span/>
     )
}
async function processEditLinkData(lData:linkDataType,dname:string,unnid:string){
     let updateDat:any ={
          "name": dname,
     }
     if(lData.unique_identifier != unnid ){
          updateDat['unique_identifier'] = unnid
     }
     let resp = await BackendHelper._updateLinkData(User?.getUserUid()!,lData._id,updateDat);
     return resp;
}
async function processDeleteLinkData(lData:linkDataType){
     let updateDat:any ={
          "deleted_bool": true,
     }
     let resp = await BackendHelper._updateLinkData(User?.getUserUid()!,lData._id,updateDat);
     return resp;
}
async function processDeleteLinkDataById(id:string){
     let updateDat:any ={
          "deleted_bool": true,
     }
     let resp = await BackendHelper._updateLinkData(User?.getUserUid()!,id,updateDat);
     return resp;
}
async function processActiveLinkData(lData:linkDataType,bool:boolean){
     let updateDat:any ={
          "active_bool": bool,
     }
     let resp = await BackendHelper._updateLinkData(User?.getUserUid()!,lData._id,updateDat);
     return resp;
}
async function processBookmarkLinkData(id:string,bool:boolean){
     let updateDat:any ={
          "bookmark_bool": bool,
     }
     let resp = await BackendHelper._updateLinkData(User?.getUserUid()!,id,updateDat);
     return resp;
}
const EditLinkModal:React.FC<any>=(props:any)=>{
     const [loading,setLoading] = useState<boolean>();
     const [dataLoading,setdataLoading] = useState<boolean>();
     const [lData,setLdata] = useState<linkDataType|null>(null);
     const [dname,setdname] = useState<string>();
     const [uniid,setuniid] = useState<string>();
     const [errBool,seterrBool] = useState<boolean>(false);
     const [errMess,seterrMess] = useState<string>('');

     useEffect(() => {
          setdataLoading(true);
          setLdata(null);
          seterrBool(false);
          BackendHelper?._getLinksDatabyUniId(User?.getUserUid()!,props.uniId).then((res:nexusResponse)=>{
               if(!res.errBool){
                    setLdata(res.responseData.gotData);
                    setdname(res.responseData.gotData.name)
                    setuniid(res.responseData.gotData.unique_identifier)
                    setdataLoading(false);
               }
          else{
               toast.error(!res.errMess, {
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
          toast.error(!e, {
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
}, [User.getUserUid(),props.uniId])

     return(
                    <BottomSheet 
                    open={props.show}
                    snapPoints={({ minHeight, maxHeight }) => [minHeight,500]}
                    onDismiss={()=>{props.setShow(false)}}
                    expandOnContentDrag={true}
                    footer={
                         <button onClick={()=>{props.setShow(false)}}
                          className="app-bottom-sheet-footer-butt">
                           Cancel
                         </button>
                         
                    }
               >
               <div className='app-create-link-modal-main-cont'>
                    <div className='app-create-link-modal-main-cont-tit'>
                    Edit Link
                    </div>
                    <div className='app-create-link-modal-main-cont-des'>
                    Edit the generated link by changing display name , custom url etc.
                    </div>
                    {
                    !dataLoading?
                    <div>
                         <div className='app-create-link-modal-main-cont-fld-cont'>
                                   <div className='app-create-link-modal-main-cont-fld-tit'>Is Deeplinked?</div>
                                   <div  className='lnk-lnk-head-right-butt-cont'>
                                        <label className="switch">
                                             <input type="checkbox" 
                                             disabled={true}
                                             defaultChecked={lData?.deeplink_bool!=false? true:false}
                                             />
                                             <span className="slider round"></span>
                                        </label>
                                   </div>
                         </div>
                    <div className='app-create-link-modal-hr'/>
                         <div className='app-create-link-modal-main-cont-fld-cont'>
                              <div className='app-create-link-modal-main-cont-fld-tit'>Link Display Name</div>
                              <input 
                              type='text' 
                              disabled={loading}
                              placeholder=''
                              className='app-create-link-modal-main-cont-fld'
                              value={dname}
                               onChange={(e)=>{setdname(e.target.value)}}
                              />
                    </div>
                    <div className='app-create-link-modal-main-cont-fld-cont'>
                              <div className='app-create-link-modal-main-cont-fld-tit'>Link Destination Url</div>
                              <input 
                              type='text' 
                              disabled={true}
                              placeholder=''
                              className='app-create-link-modal-main-cont-fld'
                              value={lData?.link_dest}
                              onChange={(e)=>{}}
                              />
                    </div>
                    <div className='app-create-link-modal-main-cont-fld-cont'>
                              <div className='app-create-link-modal-main-cont-fld-tit'>Link Url</div>
                              <div className='app-create-link-modal-edt-uniid-link'>
                              {`${_BASE_CLIENT_URL}v/${uniid}`}
                              </div>

                              <input 
                              type='text' 
                              disabled={loading}
                              placeholder=''
                              className='app-create-link-modal-main-cont-fld'
                              value={uniid}
                              onChange={(e)=>{
                                   setuniid(e.target.value);                                   
                              }}
                              />
                    </div>
                  
                                   {    
                                        errBool?
                                        <div className='app-land-edt-modl-cont'>
                                        <div className='app-land-url-valid-init-cont-err'>{errMess}</div>
                                        </div>
                                        :
                                        <span/>
                                   }
                              <div className='app-create-link-modal-main-cont-fld-cont'>
                              <button className='app-create-link-modal-edt-lnk-butt'
                               disabled={loading}
                              onClick={async ()=>{
                                             if(!uniid){setuniid(lData?.unique_identifier);}
                                             if(dname!.length>25){seterrBool(true);seterrMess('Link name too long');return; }
                                             if(dname!.length==0){seterrBool(true);seterrMess('Enter some name');return; }
                                             if(uniid!.length>25){seterrBool(true);seterrMess('Unique Identifier too long');return; }
                                             if(uniid!.length==0){seterrBool(true);seterrMess('Enter a unique identifier');return; }
                                             await setLoading(true);
                                             await processEditLinkData(lData!,dname!,uniid!).then(async (res:nexusResponse)=>{
                                                  if(!res.errBool){
                                                       toast.success("Link updated successfully", {
                                                            position: toast.POSITION.TOP_CENTER,
                                                            autoClose: 2500,
                                                            hideProgressBar: true,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                       });  
                                                       props.setShow(false);
                                                       props.reloadData();
                                                  }
                                             else{
                                                  seterrBool(true);
                                                  seterrMess(res.errMess);
                                                  console.log(res.errMess);
                                             }
                                             
                                   }).catch(e=>{
                                             seterrBool(true);
                                             seterrMess(e);
                                             console.log(e);
                                   });
                                   setLoading(false);
                               }
                              }
                                   >
                              {
                              loading?
                              <Spinner
                                   as="span"
                                   animation="border"
                                   size="sm"
                                   role="status"
                                   aria-hidden="true"
                              />:
                              <span>Edit Link</span>
                         }     
                         </button>
                    </div>

                    </div>
                    : <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
               />
               }
               </div>
               </BottomSheet>
          )
}

const LinkCard:React.FC<any>=(props:any)=>{
     const [active , setactive] = useState<boolean>(props.d.active_bool);
     const [bookmark_exit,setbookmark_exit] = useState<boolean>(false);
     const [bookmark,setbookmark] = useState<boolean>(props.d.bookmark_bool?true:false);
     const [activeLoading,setactiveLoading] = useState<boolean>(false);

     const [clicks,setClicks] = useState(0);

     useEffect(()=>{
          BackendHelper._getLinkCountbyId(User?.getUserUid()!,props.d._id).then((r)=>{
               if(!r.errBool){
                    setClicks(r.responseData.count)
               }
          })
     },[props.d._id])

     return(
          <div className={`lnk-lnk-main-cont ${!active?'lnk-lnk-main-inactive':null}`}>
          <div className='lnk-lnk-head-main-cont'>
                         {
                              props.d.deeplink_bool !== 'undefined' && props.d.deeplink_bool !== false?
                              <RenderPlatformLogo id={props.d.platform_id} />:<span/>
                         }
                    {bookmark?<div className='lnk-lnk-book-main-cont'>
                    <svg 
                    className={`lnk-lnk-book-main-cont-ico ${bookmark_exit?'lnk-lnk-bott-tab-qr-cod-ico-exit':null}`}
                    onAnimationEnd={()=>{
                         if(bookmark_exit){
                              setbookmark_exit(false);
                              setbookmark(false);
                         }
                    }}
                    xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#4189F7"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                    </div>:null
                    }
                    
                    <div className='lnk-lnk-head-main-cont-name-cont'>
                          <span style={{
                              textDecoration:active?'none':'line-through'
                          }}>
                          {props.d.name}
                         </span>
                          
                          {
                               props.isDetailed?
                               <div className='lnk-lnk-head-main-cont-crt-cont'>
                            Last edited:
                            {timeDifference(new Date().getTime(),props.d.update_timestamp)}
                              </div>:
                              <span/>
                          }
                          
                    </div>
                    <div  className='lnk-lnk-head-right-butt-cont'>
                    <label className="switch">
                         <input type="checkbox" 
                         disabled={activeLoading}
                         defaultChecked={active}
                         onClick={async ()=>{
                              await setactive(!active);
                              await setactiveLoading(true);
                              await processActiveLinkData(props.d!,!active).then(async (res:nexusResponse)=>{
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
          {
                               props.isDetailed?
                <div className='lnk-lnk-mid-body-cont'>
                    <div className='lnk-lnk-mid-body-cont-lab'>
                         Destinaion Url
                    </div>
                    <div className='lnk-lnk-mid-body-cont-cont'>
                         {props.d.link_dest.slice(0,30) + (props.d.link_dest.length >30 ? "..." : "")}
                    </div>
                    <div className='lnk-lnk-mid-body-right-cont'>
                              <div className={`lnk-lnk-gen-right-butt`} onClick={()=>{
                                        props.seteditLinkModalVisi(true);
                                        props.seteditLinkUniId(props.d.unique_identifier);
                                   }}>
                                   <svg className='lnk-lnk-mid-body-right-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"/></svg>
                              </div>
                    </div>
                    
               </div>:<span/>}
               {
               props.isDetailed?
               <div className='lnk-lnk-mid-body-cont'>
                    <div className='lnk-lnk-mid-body-cont-lab'>
                         Unique Idenfier
                    </div>
                    <div className='lnk-lnk-mid-body-cont-cont'>
                         {props.d.unique_identifier}
                    </div>
                    <div className='lnk-lnk-mid-body-right-cont'>

                    </div>
               </div>:
               <span/>}
          <div className='lnk-lnk-gen-cont'>
               <div className={`lnk-lnk-gen-link ${!active?'lnk-lnk-gen-link-inactive':null}`} onClick={()=>{
                    props.openInNewTab(`${URLS.visit}/${props.d.unique_identifier}`);
               }}>
                    {`${_BASE_CLIENT_URL}v/${props.d.unique_identifier}`}
                    <svg className='lnk-lnk-gen-link-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"/></svg>
               </div>
               <div className='lnk-lnk-gen-right-cont'>      
                    <div className='lnk-lnk-gen-right-butt' onClick={()=>{
                              props.setlinkMoreModalVisi(true);
                              props.setselectLinkMoreUniId(props.d.unique_identifier);
                              console.log(props.d._id);
                              props.setseleteLinkMoreId(props.d._id);
                         }}>
                              <svg  className='lnk-lnk-gen-right-butt-ico' width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                              <rect x="8" y="16" width="5" height="5" rx="2.5" fill="currentColor"/>
                              <rect x="16" y="16" width="5" height="5" rx="2.5" fill="currentColor"/>
                              <rect x="24" y="16" width="5" height="5" rx="2.5" fill="currentColor"/>
                              </svg>
                    
                    </div>
               </div>          
          </div>
          <div className='lnk-lnk-bott-main-cont'>
                         <div className='lnk-lnk-bott-tab'>
                                   <svg className='lnk-lnk-bott-tab-ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><path d="M11.71,17.99C8.53,17.84,6,15.22,6,12c0-3.31,2.69-6,6-6c3.22,0,5.84,2.53,5.99,5.71l-2.1-0.63C15.48,9.31,13.89,8,12,8 c-2.21,0-4,1.79-4,4c0,1.89,1.31,3.48,3.08,3.89L11.71,17.99z M22,12c0,0.3-0.01,0.6-0.04,0.9l-1.97-0.59C20,12.21,20,12.1,20,12 c0-4.42-3.58-8-8-8s-8,3.58-8,8s3.58,8,8,8c0.1,0,0.21,0,0.31-0.01l0.59,1.97C12.6,21.99,12.3,22,12,22C6.48,22,2,17.52,2,12 C2,6.48,6.48,2,12,2S22,6.48,22,12z M18.23,16.26l2.27-0.76c0.46-0.15,0.45-0.81-0.01-0.95l-7.6-2.28 c-0.38-0.11-0.74,0.24-0.62,0.62l2.28,7.6c0.14,0.47,0.8,0.48,0.95,0.01l0.76-2.27l3.91,3.91c0.2,0.2,0.51,0.2,0.71,0l1.27-1.27 c0.2-0.2,0.2-0.51,0-0.71L18.23,16.26z"/></svg>
                                   {clicks}
                         </div>
                         <div className='lnk-lnk-bott-tab'>
                                   <svg className='lnk-lnk-bott-tab-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H7V2c0-.55-.45-1-1-1s-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 18H5c-.55 0-1-.45-1-1V8h16v12c0 .55-.45 1-1 1z"/></svg>
                                   {smalltimeDifference(new Date().getTime(),props.d.creation_timestamp)}
                         </div>
                         <div className='lnk-lnk-bott-tab'
                              onClick={()=>{
                                   props.setlinkQrCodeModalVisi(true);
                                   props.setselectLinkDest(props.d.link_dest)
                              }}
                         >
                                   <svg className='lnk-lnk-bott-tab-qr-cod-ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M3,11h8V3H3V11z M5,5h4v4H5V5z"/><path d="M3,21h8v-8H3V21z M5,15h4v4H5V15z"/><path d="M13,3v8h8V3H13z M19,9h-4V5h4V9z"/><rect height="2" width="2" x="19" y="19"/><rect height="2" width="2" x="13" y="13"/><rect height="2" width="2" x="15" y="15"/><rect height="2" width="2" x="13" y="17"/><rect height="2" width="2" x="15" y="19"/><rect height="2" width="2" x="17" y="17"/><rect height="2" width="2" x="17" y="13"/><rect height="2" width="2" x="19" y="15"/></g></g></svg>
                         </div>
                         <div className='lnk-lnk-bott-tab'
                              onClick={()=>{
                                   processBookmarkLinkData(props.d._id,!bookmark);
                                   if(!bookmark){
                                        setbookmark(true);
                                        
                                   }else{
                                        setbookmark_exit(true);
                                   }
                              }}
                         >
                              {!bookmark?
                              <svg className={`lnk-lnk-bott-tab-qr-cod-ico`}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V6c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v12z"/></svg>
                              :
                              <svg className={`lnk-lnk-bott-tab-qr-cod-ico`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                              }                              
                         </div>
          </div>
     </div>
     )
}


interface WithRouterProps {
     router: NextRouter
   }
 


interface LandProps extends WithRouterProps {
     
}


class Land extends React.Component<LandProps,any>{
          constructor(props:LandProps){
          super(props);
          this.state = {
               feedbackModalVisi:false,
               editLinkModalVisi:false,
               linkMoreModalVisi:false,
               deleteConfirmLoading:false,
               linkQrCodeModalVisi:false,

               linkAdderVisi:false,
               linkAdderAnimStart:false,
               linkAdderAnimExist:false,
               linkAdderLinkName:'Sample Name',
               linkAdderDest:null,
               linkAdderPlatId:0,

               deleteConfirmModalVisi:false,
               seleteLinkMoreId:null,
               selectLinkMoreUniId:null,
               selectLinkDest:null,
               editLinkUniId:null,
               createLinkModalVisi:false,
               isLoading:false,
               isAuth:false,
               linkName:null,
               linkDest:null,
               platform_id:0,
               makeLinkLoading:false,
               linksData:[],
               linkDataLoading:false,
               validityLoading:false,
               validated:false,
               isdeeplink:true,
               detailed:false,
               searchQuery:null,
               showAllLinks:false,               
               darkMode:true,
               windowScrollY:0,
          }

          this.initDataLoad = this.initDataLoad.bind(this);
          this.setAuth = this.setAuth.bind(this);
          this.setLoading = this.setLoading.bind(this);
          this.setcreateLinkModalVisi = this.setcreateLinkModalVisi.bind(this);
          this.setLinkName = this.setLinkName.bind(this);
          this.setLinkDest = this.setLinkDest.bind(this);
          this.setPlatformId = this.setPlatformId.bind(this);
          this.renderPlatformDrop = this.renderPlatformDrop.bind(this);
          this.submitMakeLink = this.submitMakeLink.bind(this);
          this.setmakeLinkLoading  =this.setmakeLinkLoading.bind(this);
          this.setlinkDataLoading = this.setlinkDataLoading.bind(this);
          this.setLinksData = this.setLinksData.bind(this);
          this.initLinksDataLoad = this.initLinksDataLoad.bind(this);
          this.renderLinkTable = this.renderLinkTable.bind(this);
          this.setvalidityLoading = this.setvalidityLoading.bind(this);
          this.setvalidated = this.setvalidated.bind(this);
          this.renderValidityIndi = this.renderValidityIndi.bind(this);
          this.validateOnChange = this.validateOnChange.bind(this);
          this.openInNewTab = this.openInNewTab.bind(this);
          this.seteditLinkModalVisi =this.seteditLinkModalVisi.bind(this);
          this.setfeedbackModalVisi = this.setfeedbackModalVisi.bind(this);
          this.seteditLinkUniId = this.seteditLinkUniId.bind(this);
          this.setdetailed = this.setdetailed.bind(this);
          this.setisdeeplink = this.setisdeeplink.bind(this);
          this.setsearchQuery = this.setsearchQuery.bind(this);
          this.setshowAllLinks = this.setshowAllLinks.bind(this);
          this.setlinkMoreModalVisi  = this.setlinkMoreModalVisi.bind(this);
          this.setselectLinkMoreUniId = this.setselectLinkMoreUniId.bind(this);
          this.setdeleteConfirmModalVisi= this.setdeleteConfirmModalVisi.bind(this);
          this.setseleteLinkMoreId  =this.setseleteLinkMoreId.bind(this);
          this.setdeleteConfirmLoading = this.setdeleteConfirmLoading.bind(this);
          this.setlinkAdderVisi = this.setlinkAdderVisi.bind(this);
          this.setlinkAdderLinkName = this.setlinkAdderLinkName.bind(this);
          this.setlinkAdderDest = this.setlinkAdderDest.bind(this);
          this.setlinkAdderPlatId =this.setlinkAdderPlatId.bind(this);
          this.submitMakeLinkSecond = this.submitMakeLinkSecond.bind(this);
          this.setdarkMode = this.setdarkMode.bind(this);
          this.setlinkQrCodeModalVisi = this.setlinkQrCodeModalVisi.bind(this);
          this.setselectLinkDest = this.setselectLinkDest.bind(this);
          this.setwindowScrollY  = this.setwindowScrollY.bind(this);
          
     }
     setwindowScrollY(n:number){this.setState({windowScrollY:n})}
     setselectLinkDest(s:string){this.setState({selectLinkDest:s})}
     setlinkQrCodeModalVisi(b:boolean){this.setState({linkQrCodeModalVisi:b})}
     setdarkMode(b:boolean){this.setState({darkMode:b})}
     setlinkAdderPlatId(n:number){this.setState({linkAdderPlatId:n})}
     setlinkAdderDest(s:string){this.setState({linkAdderDest:s})}
     setlinkAdderLinkName(s:string){this.setState({linkAdderLinkName:s})}
     setlinkAdderVisi(b:boolean){this.setState({linkAdderVisi:b})}
     setlinkAdderAnimStart(b:boolean){this.setState({linkAdderAnimStart:b})}
     setlinkAdderAnimExist(b:boolean){this.setState({linkAdderAnimExist:b})}
     setdeleteConfirmLoading(b:boolean){this.setState({deleteConfirmLoading:b})}
     setseleteLinkMoreId(s:string|null){this.setState({seleteLinkMoreId:s})}
     setdeleteConfirmModalVisi(b:boolean){this.setState({deleteConfirmModalVisi:b})}
     setselectLinkMoreUniId(s:string){this.setState({selectLinkMoreUniId:s})}
     setlinkMoreModalVisi(b:boolean){this.setState({linkMoreModalVisi:b})}
     setshowAllLinks(b:boolean){this.setState({showAllLinks:b})}
     setsearchQuery(s:string){this.setState({searchQuery:s})}
     setisdeeplink(b:boolean){this.setState({isdeeplink:b})}
     setdetailed(b:boolean){this.setState({detailed:b})}
     seteditLinkUniId(s:string){this.setState({editLinkUniId:s})}
     setfeedbackModalVisi(b:boolean){this.setState({feedbackModalVisi:b})}
     seteditLinkModalVisi(b:boolean){this.setState({editLinkModalVisi:b})}
     setvalidated(b:boolean){this.setState({validated:b})}
     setvalidityLoading(b:boolean){this.setState({validityLoading:b})}
     setLinksData(v:Array<linkDataType>){this.setState({linksData:v})}
     setlinkDataLoading(b:boolean){this.setState({linkDataLoading:b})}
     setLinkName(s:string){this.setState({linkName:s});}
     setLinkDest(s:string){
     this.setState({linkDest:s})
     if(this.state.isdeeplink){this.validateOnChange(s)}
     }
     setPlatformId(n:number){this.setState({platform_id:n});}
     setcreateLinkModalVisi(b:boolean){this.setState({createLinkModalVisi:b})}
     setLoading(b:boolean){this.setState({isLoading:b})}
     async setmakeLinkLoading(b:boolean){this.setState({makeLinkLoading:b})}
     setAuth(b:boolean){this.setState({isAuth:b});}

     async initDataLoad(){
               console.log('init data load');          
                 this.setLoading(true);
                    User.setUserUid(await getUid());
                     this.initLinksDataLoad();
                    this.setAuth(true);
                    if(backendHelper){
                         BackendHelper._getUserInfo(User.getUserUid(),true).then((res:nexusResponse)=>{
                              if(res){
                                   if(res.responseData.deleted_bool){
                                        console.log('User is deleted');
                                        this.props.router.replace('/src/login');
                                        return;
                                    }
                                    if(!res.responseData.acc_verified){
                                        console.log('User is not initiated');
                                        this.props.router.replace('/src/unverified');
                                        BackendHelper._initLogout();
                                        return;
                                    }
                                    if(!res.responseData.init_bool){
                                        console.log('User is not initiated');
                                        this.props.router.replace('/src/initAccount');
                                        return;
                                    }
                                   if(!res.errBool){
                                         User.setUserData(res.responseData);
                                         if(res.responseData.theme_mode){if(res.responseData.theme_mode=="DARK"){this.setdarkMode(false)}}
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
                         this.setLoading(false);
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
                              this.setLoading(false);
                         });
                    }else{
                         this.setAuth(true);
                         this.setLoading(false);
                    }
     }
     async initLinksDataLoad(){
          if(User.getUserUid()){
               this.setlinkDataLoading(true);
               if(backendHelper){
                    BackendHelper._getLinksData(User.getUserUid()!).then((res:nexusResponse)=>{
                         if(res){
                              if(!res.errBool){
                                    console.log(res.responseData);
                                    this.setLinksData(res.responseData);
                              }
                              else{
                                   // toast.error(res.errMess, {
                                   //      position: toast.POSITION.TOP_CENTER,
                                   //      autoClose: 5000,
                                   //      hideProgressBar: true,
                                   //      closeOnClick: true,
                                   //      pauseOnHover: true,
                                   //      draggable: true,
                                   //      progress: undefined,
                                   // });
                              }
                    }
                    this.setlinkDataLoading(false);
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
                         this.setlinkDataLoading(false);
                    });
               }
          }
     }
     openInNewTab(url:string){
               const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
               if (newWindow) newWindow.opener = null
     }
     renderLinkLogo(platform_id:number){
          switch(platform_id)
          {
               case 1:{
                    return(<div className='app-link-logo-cont'>
                         <svg  className='app-link-logo-cont-ico' xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5_logos</title><path d="M508.64,148.79c0-45-33.1-81.2-74-81.2C379.24,65,322.74,64,265,64H247c-57.6,0-114.2,1-169.6,3.6-40.8,0-73.9,36.4-73.9,81.4C1,184.59-.06,220.19,0,255.79q-.15,53.4,3.4,106.9c0,45,33.1,81.5,73.9,81.5,58.2,2.7,117.9,3.9,178.6,3.8q91.2.3,178.6-3.8c40.9,0,74-36.5,74-81.5,2.4-35.7,3.5-71.3,3.4-107Q512.24,202.29,508.64,148.79ZM207,353.89V157.39l145,98.2Z"/>
                         </svg></div>)
                    break;    
               }
               default:{
                    break;
               }
          }

     }

     renderLinkQRModal(){
          let qr_code_ref = React.createRef();
          return(
               <Modal 
               size="lg"
               className='app-land-act-delete-cnfm-main-cont'
               aria-labelledby="contained-modal-title-vcenter"
               centered         
               show={this.state.linkQrCodeModalVisi} 
               onHide={()=>{this.setlinkQrCodeModalVisi(false)}}>
               <div className='app-land-act-delete-bdy-cont'>
                         <div className='app-land-qr-code-main-lab'
                         >Link QR Code</div>
                         <div className='app-land-qr-code-main-cont'>
                         {this.state.selectLinkDest?
                         <QRCode
                         ref={qr_code_ref}
                         fgColor='#4189F7'
                         value={this.state.selectLinkDest}/>:<span>No Destination Link</span>}
                         
                         </div>
                         <div className='app-land-qr-code-main-lab'>
                         {/* <button className='app-land-qr-code-down-butt'
                         onClick={()=>{
                              let nd = qr_code_ref.current;
                              console.log(nd);    
                         }}
                         >
                              Download
                         </button> */}
                         </div>
                         
               </div>
             </Modal>
          )
     }

     renderLinkAdder(){
          if(this.state.linkAdderVisi){
               return(
                    <div className={`
                    lnk-lnk-main-cont lnk-crt-main-cont
                    ${this.state.linkAdderAnimExist?'lnk-crt-main-cont-start-exit-anim':null}
                    `}
                    onAnimationEnd={()=>{
                         if(this.state.linkAdderAnimExist){
                              this.setlinkAdderVisi(false);
                              this.setlinkAdderAnimExist(false)
                         }
                    }}
                    >
                              <div className='lnk-lnk-head-main-cont'>
                                   <RenderPlatformLogo id={this.state.linkAdderPlatId}/>
                                   <div className='lnk-lnk-head-main-cont-name-cont'>
                                        <span>
                                        <input 
                                        type='text'
                                        disabled={this.state.makeLinkLoading}
                                        value={this.state.linkAdderLinkName}
                                        className='lnk-lnk-crt-lnk-crt-name-fld'
                                        placeholder='Enter link name'
                                        onChange={(e)=>{this.setlinkAdderLinkName(e.target.value)}}
                                        />
                                        </span>
                                   </div>
                                   <div  className='lnk-lnk-head-right-butt-cont'>
                                   <label className="switch lnk-lnk-crt-lnk-crt-lab">
                                        <input type="checkbox" 
                                        disabled={true}
                                        defaultChecked={true}
                                        />
                                        <span className="slider round"></span>
                                   </label>
                                   </div>
                    </div>
          <div className='lnk-lnk-gen-cont lnk-lnk-crt-lnk-crt-cont'>
               <input 
               type='text'
               className='lnk-lnk-crt-lnk-crt-fld'
               disabled={this.state.makeLinkLoading}
               value={this.state.linkAdderDest}
               onChange={(e)=>{
                    this.setlinkAdderDest(e.target.value)
                    this.validateOnChange(e.target.value);
               }}
               placeholder='Enter destination url'
               />

               <button
               className='lnk-lnk-crt-lnk-crt-butt'
               disabled={this.state.makeLinkLoading}
               onClick={()=>{
                    this.setmakeLinkLoading(true).then(()=>{
                         this.forceUpdate();
                         this.submitMakeLinkSecond().then(()=>{
                              // this.setmakeLinkLoading(false).then(()=>{
                              //      this.forceUpdate();
                              // })
                         
                         });
                    });

               }}
               >
                    {this.state.makeLinkLoading?
                    <Spinner
                    className='lnk-lnk-crt-lnk-crt-butt-ico'
                    animation="border" role="status" variant="light"/>:
                    <svg 
                    className='lnk-lnk-crt-lnk-crt-butt-ico'
                    xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    }
               </button>

          </div>
     </div>    
               )
          }
     }

     renderLinkCreateModal(){
          return(
               <BottomSheet 
                    open={this.state.createLinkModalVisi}
                    snapPoints={({ minHeight, maxHeight }) => [minHeight,700]}
                    onDismiss={()=>{
                         this.setcreateLinkModalVisi(false);
                    }}
                    expandOnContentDrag={true}
                    footer={
                         <button onClick={()=>{
                              this.setcreateLinkModalVisi(false);
                         }} className="app-bottom-sheet-footer-butt">
                           Cancel
                         </button>
                         
                    }
               >
                <div className='app-create-link-modal-main-cont'>
                     <div className='app-create-link-modal-main-cont-tit'>
                     Create Link
                     </div>
                     <div className='app-create-link-modal-main-cont-des'>
                     Create a link by entering a name and it's address.
                     Select from given Platforms
                     </div>
                    
                     {
                         this.state.validated && this.state.platform_id>0?
                         <div className='app-land-plat-indi-cont'>
                         {this.renderPlatformDrop()}
                         </div>:
                         <span/>
                    }

                    <div className='app-create-link-modal-main-cont-fld-cont'>
                              <div className='app-create-link-modal-main-cont-fld-tit'>Link Name</div>
                              <input 
                              type='text' 
                              autoFocus={false}
                              disabled={this.state.makeLinkLoading}
                              placeholder='eg: YoutubeLink'
                              className='app-create-link-modal-main-cont-fld'
                              value={this.state.linkName}
                              onChange={(e)=>{this.setLinkName(e.target.value)}}
                              />
                    </div>
                    <div className='app-create-link-modal-main-cont-fld-cont'>
                              <div className='app-create-link-modal-main-cont-fld-tit'>Link Address</div>
                              <input 
                              type='url' 
                              autoFocus={false}
                              disabled={this.state.makeLinkLoading}
                              placeholder='eg: www.link.com'
                              className='app-create-link-modal-main-cont-fld'
                              value={this.state.linkDest}
                              onChange={(e)=>{
                                   if(this.state.isdeeplink){
                                        this.setvalidityLoading(true); 
                                        this.setvalidated(false);
                                   }
                                   this.setLinkDest(e.target.value)}
                              }
                              />
                    </div>

                    <div className='app-create-link-modal-main-cont-fld-cont'>
                              <button
                              className='app-create-link-modal-main-paste-butt'
                              onClick={()=>{
                                   navigator.clipboard.readText().then((t)=>{
                                        if(typeof t == 'string'){
                                             this.setLinkDest(t)
                                        }
                                   });
                              }}
                              >
                              <svg className='app-create-link-modal-main-paste-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 18H6c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h1v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V4h1c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1z"/></svg>
                              Paste from Clipboard
                              </button>
                    </div>

                    <div className='app-create-link-modal-main-cont-fld-cont'>
                              <div className='app-create-link-modal-main-cont-fld-tit'>is Deeplinked?</div>
                              <div className='app-create-link-modal-main-cont-fld-data-lab'>Do you want to create a deeplink?</div>
                              <div  className='lnk-lnk-head-right-butt-cont'>
                                   <label className="switch">
                                        <input type="checkbox" 
                                        disabled={this.state.makeLinkLoading}
                                        defaultChecked={this.state.isdeeplink}
                                        onChange={()=>{this.setisdeeplink(!this.state.isdeeplink)}}
                                        />
                                        <span className="slider round"></span>
                                   </label>
                    </div>
                    </div>

                    <div className='app-create-link-modal-main-cont-fld-cont'>
                    {
                    this.state.validityLoading==true && this.state.isdeeplink?
                         <div className='app-land-url-valid-indi-load-cont'>
                              <Spinner
                                   as="span"
                                   animation="border"
                                   size="sm"
                                   role="status"
                                   aria-hidden="true"/>
                         </div>:
                    this.state.isdeeplink?
                    this.renderValidityIndi():null
                    }
                    </div>

                    <div className='app-create-link-modal-main-cont-fld-cont'>
                    {
                         this.state.validated || !this.state.isdeeplink?
                              <button className='app-create-link-modal-crt-lnk-butt'
                              onClick={()=>{
                                   this.submitMakeLink();
                              }}
                                   >{
                              this.state.makeLinkLoading?
                              <Spinner
                                   as="span"
                                   animation="border"
                                   size="sm"
                                   role="status"
                                   aria-hidden="true"
                              />:
                              <span>Create Link</span>
                         }     
                         </button>:
                    <span/>
                    }
                    </div>
                    
               </div>
               </BottomSheet>
          )
     }     
     renderValidityIndi(){
          if(this.state.linkDest && !this.state.validityLoading){
               if(this.state.validated){return(<></>);}
               else{return( <div className='app-land-url-valid-init-cont-err'>Invalid Url 🥲 </div>)}
          }
          //<div className='app-land-url-valid-init-cont-succ'>Valid Url 😄 </div>
     }
     renderPlatformDrop(){
          switch(this.state.platform_id){
               case 1:{
                    return (
                         <div className='app-land-indi'>
                              <svg className='app-land-indi-ico' xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill='currentColor'><title>ionicons-v5_logos</title><path d="M508.64,148.79c0-45-33.1-81.2-74-81.2C379.24,65,322.74,64,265,64H247c-57.6,0-114.2,1-169.6,3.6-40.8,0-73.9,36.4-73.9,81.4C1,184.59-.06,220.19,0,255.79q-.15,53.4,3.4,106.9c0,45,33.1,81.5,73.9,81.5,58.2,2.7,117.9,3.9,178.6,3.8q91.2.3,178.6-3.8c40.9,0,74-36.5,74-81.5,2.4-35.7,3.5-71.3,3.4-107Q512.24,202.29,508.64,148.79ZM207,353.89V157.39l145,98.2Z"/></svg>
                              Youtube
                         </div>
                    );
                    break;
               }
               default:{
                    return 'Select Platform';
               }
          }
     }
     renderDeteleConfirmModal(){
          return(
               <Modal 
               size="lg"
               className='app-land-act-delete-cnfm-main-cont'
               aria-labelledby="contained-modal-title-vcenter"
               centered
               show={this.state.deleteConfirmModalVisi} 
               onHide={()=>{this.setdeleteConfirmModalVisi(false)}}>
               <div className='app-land-act-delete-bdy-cont'>
                         <div className='app-land-act-delete-tab'> Delete Link</div>
                         <div className='app-land-act-delete-sub-tab'>Are you sure want to delete the link?</div>
                         <div className='app-land-act-delete-opt-cont'>
                              <button className='app-land-act-delete-opt-cal'
                                   onClick={()=>{
                                        this.setdeleteConfirmModalVisi(false)
                                        this.setseleteLinkMoreId(null);
                                   }}
                              >
                                   Cancel
                              </button>
                              <button className='app-land-act-delete-opt-del'
                              onClick={async ()=>{
                                   await this.setdeleteConfirmLoading(true);               
                                   await processDeleteLinkDataById(this.state.seleteLinkMoreId).then(async (res:nexusResponse)=>{
                                                       if(!res.errBool){
                                                            toast.success("Link Deleted", {
                                                                 position: toast.POSITION.TOP_CENTER,
                                                                 autoClose: 2500,
                                                                 hideProgressBar: true,
                                                                 closeOnClick: true,
                                                                 pauseOnHover: true,
                                                                 draggable: true,
                                                                 progress: undefined,
                                                            });  
                                                       }
                                                  else{
                                                       console.log(res.errMess);
                                                       throw new Error(res.errMess);
                                                  }
                                                  this.initLinksDataLoad();
                                                  this.setdeleteConfirmModalVisi(false);

                                        }).catch(e=>{
                                                  console.log(e);
                                                  toast.error(e.message, {
                                                       position: toast.POSITION.TOP_CENTER,
                                                       autoClose: 2500,
                                                       hideProgressBar: true,
                                                       closeOnClick: true,
                                                       pauseOnHover: true,
                                                       draggable: true,
                                                       progress: undefined,
                                                  });  
                                        });
                                   await this.setdeleteConfirmLoading(false);               
                              }}
                              >
                                   {this.state.deleteConfirmLoading?'Loading':'Delete'}
                              </button>
                         </div>
               </div>
             </Modal>
          )
     }
     renderLinkMoreModal(){
          return(
               <BottomSheet 
                    open={this.state.linkMoreModalVisi}
                    snapPoints={({ minHeight, maxHeight }) => [minHeight,700]}
                    onDismiss={()=>{
                         this.setlinkMoreModalVisi(false);
                    }}
                    expandOnContentDrag={true}
                    footer={
                         <button onClick={()=>{
                              this.setlinkMoreModalVisi(false);
                         }} className="app-bottom-sheet-footer-butt">
                           Cancel
                         </button>
                         
                    }
               >
                <div className='app-create-link-modal-main-cont'>
                     
                     <div className='app-link-more-butt-more-cont'>
                              <button className='app-link-more-butt'
                              onClick={()=>{
                                   copy(`${_BASE_CLIENT_URL}v/${this.state.selectLinkMoreUniId}`);
                                   toast.dark('Link Copied', {
                                             position: toast.POSITION.TOP_CENTER,
                                             autoClose: 2500,
                                             hideProgressBar: true,
                                             closeOnClick: true,
                                             pauseOnHover: true,
                                             draggable: true,
                                             progress: undefined,
                                   });
          
                              }} 
                              >                                   
                                   <svg className='app-link-more-butt-ico'  width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                   <rect x="15" y="13" width="14" height="16" rx="3" fill="currentColor"/>
                                   <rect x="15" y="13" width="14" height="16" rx="3" fill="currentColor"/>
                                   <rect x="10" y="9" width="12" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                                   </svg>
                                   Copy link
                              </button>
                     </div>
                     <div className='app-link-more-butt-more-cont'>
                              <button className='app-link-more-butt'
                               onClick={()=>{
                                   this.setlinkMoreModalVisi(false);
                                   this.seteditLinkModalVisi(true);
                                   this.seteditLinkUniId(this.state.selectLinkMoreUniId);
                              }}
                              >                                                                    
                                   <svg  className='app-link-more-butt-ico'  width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                   <path d="M10 23.4625V26.5025C10 26.7825 10.22 27.0025 10.5 27.0025H13.54C13.67 27.0025 13.8 26.9525 13.89 26.8525L24.81 15.9425L21.06 12.1925L10.15 23.1025C10.05 23.2025 10 23.3225 10 23.4625ZM27.71 13.0425C28.1 12.6525 28.1 12.0225 27.71 11.6325L25.37 9.2925C24.98 8.9025 24.35 8.9025 23.96 9.2925L22.13 11.1225L25.88 14.8725L27.71 13.0425V13.0425Z" fill="currentColor"/>
                                   </svg>
                                   Edit link
                              </button>
                     </div>
                     <div className='app-link-more-butt-more-cont'>
                              <button className='app-link-more-butt app-link-more-del-butt'
                               onClick={()=>{
                                   this.setlinkMoreModalVisi(false);   
                                   this.setdeleteConfirmModalVisi(true);   
                              }}
                              >                          
                                   <svg className='app-link-more-butt-ico' width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                   <path d="M23.5714 15V26.6667H14.4286V15H23.5714ZM21.8571 8H16.1429L15 9.16667H11V11.5H27V9.16667H23L21.8571 8ZM25.8571 12.6667H12.1429V26.6667C12.1429 27.95 13.1714 29 14.4286 29H23.5714C24.8286 29 25.8571 27.95 25.8571 26.6667V12.6667Z" fill="currentColor"/>
                                   </svg>
                                   Delete
                              </button>
                     </div>

               </div>
               </BottomSheet>
          )
     }
     async validateOnChange(s:string){
          if(s){
               this.setvalidityLoading(true);         
               if(backendHelper){
                    BackendHelper._checkURLValid({"uid":User.getUserUid(),"link_url":s}).then((res:nexusResponse)=>{
                         if(res){
                              if(!res.errBool){
                                   this.setvalidityLoading(false);
                                   if(res.responseData.valid_url && res.responseData.parse_validity && res.responseData.identified_platform_id){
                                        this.setvalidated(true);
                                        this.setPlatformId(res.responseData.identified_platform_id);
                                        this.setlinkAdderPlatId(res.responseData.identified_platform_id);
                                   }else{
                                        this.setlinkAdderPlatId(0);
                                   }
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
                                   this.setvalidityLoading(false);
                                   this.setvalidated(false);
                              }
                    }
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
                    this.setvalidityLoading(false);
                    this.setvalidated(false);
                    });
               }
     }
     }

     async submitMakeLinkSecond(){
          if(this.state.linkAdderLinkName && this.state.linkAdderDest){
                    if(backendHelper){
                         const link_data={
                              "uid":User.getUserUid(),
                              "link_data":{
                                  "name":this.state.linkAdderLinkName,
                                  "link_dest":this.state.linkAdderDest,
                                  "creator_id":User.getUserUid(),
                                  "platform_id":this.state.linkAdderPlatId,
                                  "active_bool":true,
                                  "deleted_bool":false,
                                  "ban_bool":false,
                                  "deeplink_bool":this.state.linkAdderPlatId==0?false:true
                              }
                          }
                         BackendHelper._createLink(link_data).then((res:nexusResponse)=>{
                              if(res){
                                   if(!res.errBool){
                                         this.initLinksDataLoad();
                                         if(res.responseData.linkCreated){
                                             toast.success('Link Created', {
                                                  position: toast.POSITION.TOP_CENTER,
                                                  autoClose: 5000,
                                                  hideProgressBar: true,
                                                  closeOnClick: true,
                                                  pauseOnHover: true,
                                                  draggable: true,
                                                  progress: undefined,
                                             });
                                             this.setlinkAdderVisi(false);
                                             this.setlinkAdderLinkName('Sample Name');
                                             this.setlinkAdderDest('');
                                             this.setlinkAdderPlatId(0);
                                             this.setmakeLinkLoading(false);
                                        }
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
                                        this.setmakeLinkLoading(false);
                                   }
                         }
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
                              this.setmakeLinkLoading(false);
                         });
                    }
          }else{
               toast.error("Fill all details please", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
               });
               this.setmakeLinkLoading(false);
          }
     }

     async submitMakeLink(){
          this.setmakeLinkLoading(true);
          if(this.state.validated || !this.state.isdeeplink){
          if(this.state.linkName && this.state.linkDest){
               if(this.state.platform_id!==0 || !this.state.isdeeplink){
                    if(backendHelper){
                         const link_data={
                              "uid":User.getUserUid(),
                              "link_data":{
                                  "name":this.state.linkName,
                                  "link_dest":this.state.linkDest,
                                  "creator_id":User.getUserUid(),
                                  "platform_id":this.state.platform_id,
                                  "active_bool":true,
                                  "deleted_bool":false,
                                  "ban_bool":false,
                                  "deeplink_bool":this.state.isdeeplink
                              }
                          }
                         BackendHelper._createLink(link_data).then((res:nexusResponse)=>{
                              if(res){
                                   if(!res.errBool){
                                         this.initLinksDataLoad();
                                         if(res.responseData.linkCreated){
                                             toast.success('Link Created', {
                                                  position: toast.POSITION.TOP_CENTER,
                                                  autoClose: 5000,
                                                  hideProgressBar: true,
                                                  closeOnClick: true,
                                                  pauseOnHover: true,
                                                  draggable: true,
                                                  progress: undefined,
                                             });
                                             this.setcreateLinkModalVisi(false);
                                             this.setLinkName('');
                                             this.setLinkDest('');
                                             this.setPlatformId(0);
                                        }
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
                         this.setmakeLinkLoading(false);
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
                              this.setmakeLinkLoading(false);
                         });
                    }
               }else{
                    toast.error("Select a platform", {
                         position: toast.POSITION.TOP_CENTER,
                         autoClose: 7000,
                         hideProgressBar: true,
                         closeOnClick: true,
                         pauseOnHover: true,
                         draggable: true,
                         progress: undefined,
                    });
                    this.setmakeLinkLoading(false);
               }
          }else{
               toast.error("Fill all details please", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
               });
               this.setmakeLinkLoading(false);
          }
          }else{
               toast.error("Link not validated", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
               });
               this.setmakeLinkLoading(false);     
          }    

     }
     renderLinkTable(){       
          let res:any = [];
          if(this.state.linksData.length > 0){
               let sortedLinkData = this.state.linksData.sort((x:any, y:any)=>{
                    return y.creation_timestamp - x.creation_timestamp;
                });
               for(let l in sortedLinkData){
                    if(parseInt(l) > 2 && !this.state.showAllLinks){continue;}
                    let d = sortedLinkData[l];
                    res.push(
                         <LinkCard 
                         key={parseInt(l)}
                         ind={parseInt(l)} 
                         isDetailed={this.state.detailed}
                         d={d} 
                         openInNewTab={this.openInNewTab} 
                         seteditLinkModalVisi={this.seteditLinkModalVisi} 
                         setselectLinkMoreUniId={this.setselectLinkMoreUniId}
                         setlinkMoreModalVisi={this.setlinkMoreModalVisi}
                         seteditLinkUniId={this.seteditLinkUniId}
                         setseleteLinkMoreId={this.setseleteLinkMoreId}
                         setlinkQrCodeModalVisi={this.setlinkQrCodeModalVisi}
                         setselectLinkDest={this.setselectLinkDest}
                         />
                         
                         )
               }
          }
          return res;
     }
     handleScroll(){
          
     }

     componentWillUnmount(){
          window.removeEventListener('scroll', event => {this.setwindowScrollY(window.scrollY)})  
     }
     
     componentDidMount(){
          console.log('component mount');
          window.addEventListener('scroll', event => {this.setwindowScrollY(window.scrollY)})
          this.setLoading(true);
          getAuth().then((m)=>{
               console.log("User auth success"+m);
               this.initDataLoad();
          }).catch((e)=>{
               console.log("User auth failure"+e.message);
               this.props.router.replace('/src/login');
          })
          
     }

     render(){
          if(!this.state.isLoading){
          return(
               <div 
               className='app-main-cont-main-body land-body-cont' 
               id='lnk-lnk-main-cont-id'
               >
                    {
                         
                          // @ts-ignore: Unreachable code error
                          <GlobalStyles light={this.state.darkMode}/>
                    }
                    <Head>
                    <title>Cytelink</title>
                    <meta name="description" content="Cicada Login Activity" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico" />
                    </Head>
                         <HeaderCont setdarkMode={this.setdarkMode} darkMode={this.state.darkMode} transiBool={true} scrollY={this.state.windowScrollY} />
                         <LandNavBarCont router={this.props.router}/>
                         <div id='app-main-cont-body-id'>
                              <div className='app-body-main-cont'>
                                   <div className='app-land-link-cont-holder top-holder-cont'>
                                             <div className='app-land-link-intro-pro-main-cont'> 
                                                                 <div className='app-land-head-pro-pic-main-outer-cont'>
                                                                 <div className='app-land-head-pro-pic-main-cont'>
                                                                      <img src={User!.getUserData()?User!.getUserData()!.pro_photo_url:'https://ik.imagekit.io/cyte/sakura/Men-Profile-Image_8c3Wj4y8S.png?updatedAt=1626883535964'} className='app-land-head-pro-pic-main-cont-pic' />
                                                                      <div className='app-body-topper-hey-cont-hand' onClick={()=>{
                                                                           toast.dark('Hi-Fi ✋', {
                                                                                position: toast.POSITION.TOP_CENTER,
                                                                                autoClose: 5000,
                                                                                hideProgressBar: true,
                                                                                closeOnClick: true,
                                                                                pauseOnHover: true,
                                                                                draggable: true,
                                                                                progress: undefined,
                                                                           });
                                                                      }}>👋</div>
                                                                 </div>
                                                                 </div>
                                                            {
                                                                 User.getUserData()?
                                                                      
                                                                      <div className='app-body-topper-hey-cont' >                                                               
                                                                      <div className='app-body-topper-hey-inner-cont' >
                                                                           <div className='app-body-topper-hey-inner-cont-name' >
                                                                           {User.getUserData()?.dname}</div>  
                                                                      <div className='app-body-topper-bio-cont'>{User.getUserData()?.bio}</div>
                                                                      </div>
                                                                      </div>:
                                                                 <span/>
                                                            }
                                                            {/* <div className='app-land-pro-edit-main-cont'>
                                                                      <a href="/src/setting">
                                                                      <button className='app-land-pro-edit-butt ' disabled>
                                                                      <svg className='app-land-pro-edit-butt-ico'  width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                                                           <path d="M10 23.4625V26.5025C10 26.7825 10.22 27.0025 10.5 27.0025H13.54C13.67 27.0025 13.8 26.9525 13.89 26.8525L24.81 15.9425L21.06 12.1925L10.15 23.1025C10.05 23.2025 10 23.3225 10 23.4625ZM27.71 13.0425C28.1 12.6525 28.1 12.0225 27.71 11.6325L25.37 9.2925C24.98 8.9025 24.35 8.9025 23.96 9.2925L22.13 11.1225L25.88 14.8725L27.71 13.0425V13.0425Z" fill="currentColor"/>
                                                                           </svg>
                                                                      </button>
                                                                      </a>
                                                            </div> */}
                                             </div>
                                                  <WelcomeHead/>
                                             
                                        </div>
                                   
                                        {/* <div className='app-land-link-cont-holder cluster-holder-cont'> 
                                        <RenderAccordion
                                        default={false} 
                                        titleBar={(expanded:any)=>{
                                             return(
                                                  <div className={`app-land-lab-main-cont ${expanded?'app-land-lab-expnded':null}`}>
                                                  <svg 
                                                  className='app-land-lab-main-cont-ico'
                                                  width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                                  <path d="M7.53693 27.6692C7.35423 28.4772 7.86117 29.2804 8.6692 29.4631C9.47723 29.6458 10.2804 29.1388 10.4631 28.3308L7.53693 27.6692ZM17.8372 20.2856L18.4988 18.9394L17.8372 20.2856ZM24.3488 16.1714L25.7594 16.6816L24.3488 16.1714ZM29.8013 11.2681C30.5016 10.8255 30.7106 9.89908 30.2681 9.19875C29.8255 8.49841 28.8991 8.28941 28.1987 8.73193L29.8013 11.2681ZM10.4631 28.3308C10.8785 26.4934 11.9312 24.3034 13.2911 22.8554C14.6505 21.4079 15.9389 21.024 17.1756 21.6318L18.4988 18.9394C15.5495 17.49 12.8844 18.9063 11.1043 20.8017C9.32461 22.6966 8.05173 25.3923 7.53693 27.6692L10.4631 28.3308ZM17.1756 21.6318C18.7042 22.383 20.045 22.7619 21.2289 22.6833C22.5121 22.5981 23.4451 21.9875 24.0794 21.1478C24.657 20.3833 24.9674 19.4554 25.1824 18.7077C25.4305 17.8452 25.5468 17.2694 25.7594 16.6816L22.9383 15.6611C22.6858 16.3591 22.4684 17.2906 22.2993 17.8785C22.0972 18.5812 21.907 19.0465 21.6857 19.3394C21.5213 19.5571 21.3571 19.6681 21.0301 19.6899C20.6039 19.7182 19.8214 19.5894 18.4988 18.9394L17.1756 21.6318ZM25.7594 16.6816C26.2459 15.3368 26.534 14.5035 27.0524 13.7219C27.5422 12.9834 28.2943 12.2203 29.8013 11.2681L28.1987 8.73193C26.4499 9.83698 25.3415 10.8738 24.5523 12.0637C23.7916 13.2106 23.382 14.4344 22.9383 15.6611L25.7594 16.6816Z" 
                                                  fill="currentColor"/>
                                                  </svg>
                                                   Activity
                                                   <div className='app-accord-drop-ico-main-cont'>
                                                        {
                                                             expanded?
                                                             <svg className='app-accord-drop-ico-main-ico'height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z"/></svg>:
                                                             <svg  className='app-accord-drop-ico-main-ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                                        }
                                                   </div>
                                                   </div>
                                                  
                                             )
                                        }}
                                        >
                                      
                                        </RenderAccordion>
                                        </div>  */}
                                   <div className='app-land-link-cont-holder cluster-holder-cont'>
                                   <RenderAccordion
                                        default={false} 
                                        titleBar={(expanded:any)=>{
                                             return(
                                                  <div className={`app-land-lab-main-cont ${expanded?'app-land-lab-expnded':null}`}>
                                                   <svg 
                                                       className='app-land-lab-main-cont-ico'
                                                       width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                                       <rect x="8" y="10" width="21" height="3" rx="1.5" fill="currentColor"/>
                                                       <rect x="8" y="16" width="21" height="5" rx="2" fill="currentColor"/>
                                                       <rect x="8" y="24" width="21" height="3" rx="1.5" fill="currentColor"/>
                                                       </svg>

                                                       Cluster
                                                   <div className='app-accord-drop-ico-main-cont'>
                                                        {
                                                             expanded?
                                                             <svg className='app-accord-drop-ico-main-ico'height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z"/></svg>:
                                                             <svg  className='app-accord-drop-ico-main-ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                                        }
                                                   </div>
                                                   </div>
                                                  
                                             )
                                        }}
                                        >
                                           <div className='app-land-visit-card-main-outer-cont'>
                                             <div className='app-land-visit-card-main-cont'>
                                                  <div className='app-land-visit-card-left-cont'>
                                                       <div className='app-land-visit-card-left-lab'>Clustor Visitors </div>
                                                       <div className='app-land-visit-card-left-time'>Last 15 days</div>
                                                  </div>
                                                  <LandVisitChart darkMode={this.state.darkMode} uid={User?.getUserUid()!} toast={toast}/>
                                             </div>
                                             </div>
                                         <div className='clust-link-main-cont'>                                          
                                        <div className='clust-link-main-inner-cont'>
                                        <div className='clust-link-main-lock-cont'>
                                             <svg className='clust-link-main-lock-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/></svg>
                                        </div>
                                        <div className='clust-link-main-link' 
                                             onClick={
                                                  ()=>{
                                                       this.openInNewTab(_BASE_CLIENT_URL!+'c/'+User?.getUserData()?.uname);
                                                  }
                                             }
                                        >
                                        {_BASE_CLIENT_URL!+'c/'+User?.getUserData()?.uname}
                                        </div>
                                        <div className='clust-link-main-right-cont'>
                                             <button className='clust-link-main-link-copy-butt'
                                                  onClick={()=>{
                                                       copy(_BASE_CLIENT_URL!+'c/'+User?.getUserData()?.uname);
                                                       toast.dark('Link copied', {
                                                            position: toast.POSITION.TOP_CENTER,
                                                            autoClose: 5000,
                                                            hideProgressBar: true,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                       });
                                                  }}
                                             >
                                                  <svg  className='lnk-lnk-gen-right-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 18H6c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h1v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V4h1c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1z"/></svg>
                                             </button>
                                             </div>
                                        </div>
                                        <div className='clust-visit-main-cont'>
                                                       <a className='clust-visit-main-cont-lnk' href={_BASE_CLIENT_URL+'src/cluster'}>
                                                       Go to cluster settings
                                                       </a>
                                        </div>
                                   </div>
                                        </RenderAccordion>
                                
                                        

                                   </div>
                                   <div className='app-land-link-cont-holder lnk-holder-cust'>
                                   <RenderAccordion
                                        default={true} 
                                        titleBar={(expanded:any)=>{
                                             return(
                                                  <div className={`app-land-lab-main-cont ${expanded?'app-land-lab-expnded':null}`}>
                                                  <svg 
                                                       className='app-land-lab-main-cont-ico'
                                                       width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                                       <path d="M20.5 16.5C19.3 15.3 16 15.0001 15 16.0001L10 21.5C8.5 24 10.4665 27.1611 12.5 27.5C15.5 28 15.5 27 17.5 25.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                                       <path d="M16.5 20C17.8057 21.2753 20 22.4999 22 20.9999L24.7049 18.4999L27.4252 15.5149C29.0573 12.8579 26.9176 9.49832 24.7049 9.13815C21.4406 8.60679 21.4406 9.66954 19.2643 11.2637" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                                       </svg>
                                                       Links {this.state.linksData.length}
                                                   <div className='app-accord-drop-ico-main-cont'>
                                                        {
                                                             expanded?
                                                             <svg className='app-accord-drop-ico-main-ico'height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z"/></svg>:
                                                             <svg  className='app-accord-drop-ico-main-ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                                        }
                                                   </div>
                                                   </div>
                                                  
                                             )
                                        }}
                                        >
                                      
                                   <div className='app-land-serch-main-cont'>
                                             <div className='app-land-top-butt-group-cont'>
                                             <button className='app-land-crt-lnk-butt'
                                                  onClick={()=>{
                                                       if(this.state.linkAdderVisi){
                                                            this.setlinkAdderAnimExist(true);
                                                       }
                                                       else{this.setlinkAdderAnimStart(true)}
                                                  }}
                                                  > 
                                                  <div  className='app-land-crt-lnk-butt-lab'>
                                                       <svg className='app-land-crt-lnk-butt-lab-ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><path d="M9,11h6c0.55,0,1,0.45,1,1v0c0,0.55-0.45,1-1,1H9c-0.55,0-1-0.45-1-1v0C8,11.45,8.45,11,9,11z M20.93,12L20.93,12 c0.62,0,1.07-0.59,0.93-1.19C21.32,8.62,19.35,7,17,7h-3.05C13.43,7,13,7.43,13,7.95v0c0,0.52,0.43,0.95,0.95,0.95H17 c1.45,0,2.67,1,3.01,2.34C20.12,11.68,20.48,12,20.93,12z M3.96,11.38C4.24,9.91,5.62,8.9,7.12,8.9l2.93,0 C10.57,8.9,11,8.47,11,7.95v0C11,7.43,10.57,7,10.05,7L7.22,7c-2.61,0-4.94,1.91-5.19,4.51C1.74,14.49,4.08,17,7,17h3.05 c0.52,0,0.95-0.43,0.95-0.95v0c0-0.52-0.43-0.95-0.95-0.95H7C5.09,15.1,3.58,13.36,3.96,11.38z M18,12L18,12c-0.55,0-1,0.45-1,1v2 h-2c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h2v2c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-2h2c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1h-2v-2C19,12.45,18.55,12,18,12z"/></g></svg>
                                                       Create Link </div>
                                                  </button>
                                             
                                                       <button className='app-land-det-butt'
                                                            onClick={()=>{this.setdetailed(!this.state.detailed)}}
                                                            >
                                                            {
                                                            this.state.detailed?
                                                            <svg className='app-land-det-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 0v24H0V0h24z" fill="none" opacity=".87"/><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"/></svg>
                                                            :
                                                            <svg className='app-land-det-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/></svg>
                                                            }
                                                            
                                                            
                                                            </button>
                                                            <button className='app-land-det-butt'
                                                            onClick={()=>{this.initLinksDataLoad()}}
                                                            >
                                                            <svg className='app-land-det-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor" strokeWidth="4"><path d="M0 0h24v24H0V0z" fill="none"/><path  d="M18.65 8.35l-2.79 2.79c-.32.32-.1.86.35.86H18c0 3.31-2.69 6-6 6-.79 0-1.56-.15-2.25-.44-.36-.15-.77-.04-1.04.23-.51.51-.33 1.37.34 1.64.91.37 1.91.57 2.95.57 4.42 0 8-3.58 8-8h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01zM6 12c0-3.31 2.69-6 6-6 .79 0 1.56.15 2.25.44.36.15.77.04 1.04-.23.51-.51.33-1.37-.34-1.64C14.04 4.2 13.04 4 12 4c-4.42 0-8 3.58-8 8H2.21c-.45 0-.67.54-.35.85l2.79 2.79c.2.2.51.2.71 0l2.79-2.79c.31-.31.09-.85-.36-.85H6z"/></svg>
                                                            </button>
                                             </div>
                                   </div>
                                   {
                                   this.state.linkDataLoading?
                                   <div className='app-land-rel-main-cont'>
                                   <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                   </div>:
                                   <div 
                                   className={
                                        `app-land-lnk-holder-main-outer-cont 
                                        ${this.state.linkAdderAnimStart?' app-land-lnk-holder-main-outer-cont-start-anim ':null}
                                        ${this.state.setlinkAdderAnimExist?'app-land-lnk-holder-main-outer-cont-exit-anim ':null}
                                        `}
                                        onAnimationEnd={()=>{
                                             if(this.state.linkAdderAnimStart){
                                                  this.setlinkAdderVisi(true);
                                                  this.setlinkAdderAnimStart(false)
                                             }
                                             if(this.state.linkAdderAnimExist){
                                                  this.setlinkAdderAnimExist(false)
                                             }
                                        }}
                                   
                                   >
                                        {this.renderLinkAdder()}
                                        {this.renderLinkTable()}
                                        </div>
                                        }
                                        
                                        <div className='app-land-lnks-holder-shw-mr-main-cont'>
                                             <button className='app-land-lnks-holder-shw-mr-butt'
                                             onClick={()=>{ this.setshowAllLinks(!this.state.showAllLinks)}}
                                             >{
                                             this.state.showAllLinks?'Show less':'Show more'
                                             }</button>
                                        </div>
                                        </RenderAccordion>
                               
                                   </div>
                                   
                              </div>
                              <BottomCont />
                         </div>
                        <EditLinkModal show={this.state.editLinkModalVisi} setShow={this.seteditLinkModalVisi} uniId={this.state.editLinkUniId} setUniId={this.seteditLinkUniId} reloadData={this.initLinksDataLoad}/>
                        {this.renderLinkMoreModal()}
                        {this.renderLinkCreateModal()}
                        {this.renderDeteleConfirmModal()}
                        {this.renderLinkQRModal()}
                         <ToastContainer />
                         <FeedbackCont visi={this.state.feedbackModalVisi}/>
            </div>
          )}
          else{
               return (
                    <FullHeiLoading/>
               )
          }
     }
}





export default withRouter(Land)


                         {/* 
                              <div className='app-bottom-se-main-cont'>
                              <div className={`app-bottom-se-butt-main-cont ${this.props.router.pathname=='/src/land'?'app-bottom-se-butt-main-selec':null}`}>
                              <svg viewBox="0 0 24 24" className='app-bottom-se-main-ico' fill="currentColor" >
                              <path d="M17 7H14C13.45 7 13 7.45 13 8C13 8.55 13.45 9 14 9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H14C13.45 15 13 15.45 13 16C13 16.55 13.45 17 14 17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM8 12C8 12.55 8.45 13 9 13H15C15.55 13 16 12.55 16 12C16 11.45 15.55 11 15 11H9C8.45 11 8 11.45 8 12ZM10 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H10C10.55 9 11 8.55 11 8C11 7.45 10.55 7 10 7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H10C10.55 17 11 16.55 11 16C11 15.45 10.55 15 10 15Z" fill="currentColor"/>
                              </svg>
                              </div>
                              <div className={`app-bottom-se-butt-main-cont  ${this.props.router.pathname=='/src/cluster'?'app-bottom-se-butt-main-selec':null}`}>
                              <svg className='app-bottom-se-main-ico' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><path d="M4,14h2c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v2C3,13.55,3.45,14,4,14z M4,19h2c0.55,0,1-0.45,1-1 v-2c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v2C3,18.55,3.45,19,4,19z M4,9h2c0.55,0,1-0.45,1-1V6c0-0.55-0.45-1-1-1H4 C3.45,5,3,5.45,3,6v2C3,8.55,3.45,9,4,9z M9,14h11c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v2 C8,13.55,8.45,14,9,14z M9,19h11c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v2C8,18.55,8.45,19,9,19z M8,6v2 c0,0.55,0.45,1,1,1h11c0.55,0,1-0.45,1-1V6c0-0.55-0.45-1-1-1H9C8.45,5,8,5.45,8,6z"/></svg>
                              </div>
                              <div className='app-bottom-se-butt-main-cont'>
                                   <ProfilePopover  setlgoutShow={this.setlgoutConfirmVisi} />
                              </div>
                              
                         </div>

                         <div className='app-land-visit-card-main-outer-cont'>
                                             <div className='app-land-visit-card-main-cont'>
                                                  <div className='app-land-visit-card-left-cont'>
                                                       <div className='app-land-visit-card-left-lab'>Visitors Activity </div>
                                                       <div className='app-land-visit-card-left-time'>Today</div>
                                                       <div className='app-land-visit-card-left-Counter'>8000</div>
                                                  </div>
                                                  <LandVisitChart/>
                                             </div>
                                        
                                             <Accordion>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont'>
                                                  Show more
                                                  <svg className='app-land-visit-card-acrd-togg-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                             </Accordion.Toggle>
                                             <Accordion.Collapse eventKey="0">
                                                  <FullVisitChart/>
                                             </Accordion.Collapse>
                                             </Accordion>
                                             </div>
                                             <div className='app-land-link-cont-holder cluster-holder-cont'>
                                   <div className='app-land-lab-main-cont'>
                                             <svg 
                                             className='app-land-lab-main-cont-ico'
                                             width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                             <path d="M7.53693 27.6692C7.35423 28.4772 7.86117 29.2804 8.6692 29.4631C9.47723 29.6458 10.2804 29.1388 10.4631 28.3308L7.53693 27.6692ZM17.8372 20.2856L18.4988 18.9394L17.8372 20.2856ZM24.3488 16.1714L25.7594 16.6816L24.3488 16.1714ZM29.8013 11.2681C30.5016 10.8255 30.7106 9.89908 30.2681 9.19875C29.8255 8.49841 28.8991 8.28941 28.1987 8.73193L29.8013 11.2681ZM10.4631 28.3308C10.8785 26.4934 11.9312 24.3034 13.2911 22.8554C14.6505 21.4079 15.9389 21.024 17.1756 21.6318L18.4988 18.9394C15.5495 17.49 12.8844 18.9063 11.1043 20.8017C9.32461 22.6966 8.05173 25.3923 7.53693 27.6692L10.4631 28.3308ZM17.1756 21.6318C18.7042 22.383 20.045 22.7619 21.2289 22.6833C22.5121 22.5981 23.4451 21.9875 24.0794 21.1478C24.657 20.3833 24.9674 19.4554 25.1824 18.7077C25.4305 17.8452 25.5468 17.2694 25.7594 16.6816L22.9383 15.6611C22.6858 16.3591 22.4684 17.2906 22.2993 17.8785C22.0972 18.5812 21.907 19.0465 21.6857 19.3394C21.5213 19.5571 21.3571 19.6681 21.0301 19.6899C20.6039 19.7182 19.8214 19.5894 18.4988 18.9394L17.1756 21.6318ZM25.7594 16.6816C26.2459 15.3368 26.534 14.5035 27.0524 13.7219C27.5422 12.9834 28.2943 12.2203 29.8013 11.2681L28.1987 8.73193C26.4499 9.83698 25.3415 10.8738 24.5523 12.0637C23.7916 13.2106 23.382 14.4344 22.9383 15.6611L25.7594 16.6816Z" 
                                             fill="currentColor"/>
                                             </svg>
                                        Link Activity</div>
                                   <div className='app-land-visit-card-main-outer-cont'>
                                             <div className='app-land-visit-card-main-cont'>
                                                  <div className='app-land-visit-card-left-cont'>
                                                       <div className='app-land-visit-card-left-lab'>Visitors <br/> Activity </div>
                                                  </div>
                                                  <LandVisitChart/>
                                             </div>
                                        
                                             <Accordion>
                                             <Accordion.Toggle as={Card.Header} eventKey="0" className='app-land-visit-card-acrd-togg-cont land-card-acrd-togg-cont'>
                                                  Show more
                                                  <svg className='app-land-visit-card-acrd-togg-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"/></svg>
                                             </Accordion.Toggle>
                                             <Accordion.Collapse eventKey="0">
                                                  <FullVisitChart/>
                                             </Accordion.Collapse>
                                             </Accordion>
                                   </div>
                               </div> 

                     */}