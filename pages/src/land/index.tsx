import React,{useEffect, useRef, useState} from "react";
import user from "../../../comp/utils/user";
import firebaseHelper,{getUid,checkToken} from "../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../comp/helpers/backendHelper";
import { withRouter, NextRouter } from 'next/router'
import FullHeiLoading from '../fullHeightLoading';
import Head from "next/head";
import  {Accordion, Button, Card, Dropdown, Modal, Overlay, Popover, Spinner}  from "react-bootstrap";
import { ToastContainer,toast } from "react-toastify";
import nexusResponse from "../../../comp/helpers/nexusResponse";
import { linkDataType } from "../../../comp/utils/link";
import Link from 'next/link'
import URLS,{_BASE_CLIENT_URL} from "../../../comp/helpers/api.routes";
import copy from 'copy-to-clipboard';
import { slide as Menu } from 'react-burger-menu'
import LandVisitChart,{landFullVisitChart as FullVisitChart} from './landChart';
import {ThemeProvider} from "styled-components";
import { BurgerMenu,LandNavBarCont } from "../../../comp/elements";
// import GlobalStyles from './globalStyle';
import { BottomSheet } from 'react-spring-bottom-sheet'



export const lightTheme = {
     backColor: '#FFF',
     borColor:'#e0e0e0',
     boxShad:'0 3px 10px 0px rgba(0,0,0,0.1)',

     buttonBackColor:'#fff',
     
     linkHolderColor:'#f8f8f8',
     headerPriColor:'#000',
     headerSecColor:'#000',

     headColor:'#fff',
     headBugerColor:'#000',
     
     cardColor:'#fff',
     smallCardColor:'#f5f5f5',


}
 export const darkTheme = {
     backColor: '#000',
     borColor:'#555555',
     boxShad:'0 3px 10px 0px rgba(0,0,0,0.1)',
     buttonBackColor:'#000',
     
     linkHolderColor:'252525',
     headerPriColor:'#fff',
     headerSecColor:'#ff',

     headColor:'#000',
     headBugerColor:'#fff',
     
     cardColor:'#000',
     smallCardColor:'#656565',
     
}

const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();
const User = new user();
function timeDifference(current:any, previous:any) {

     var msPerMinute = 60 * 1000;
     var msPerHour = msPerMinute * 60;
     var msPerDay = msPerHour * 24;
     var msPerMonth = msPerDay * 30;
     var msPerYear = msPerDay * 365;
 
     var elapsed = current - previous;
 
     if (elapsed < msPerMinute) {
          return Math.round(elapsed/1000) + ' seconds ago';   
     }
 
     else if (elapsed < msPerHour) {
          return Math.round(elapsed/msPerMinute) + ' minutes ago';   
     }
 
     else if (elapsed < msPerDay ) {
          return Math.round(elapsed/msPerHour ) + ' hours ago';   
     }
 
     else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' days ago';   
     }
 
     else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' months ago';   
     }
 
     else {
         return Math.round(elapsed/msPerYear ) + ' years ago';   
     }
 }

 const ProfileLogoutModal:React.FC<any> = (props:any)=>{  
     return(
               <Modal
               show={props.show}
               onHide={()=>{props.setShow(false)}}
               size="lg"
               centered
               animated
               >
               <div className='app-create-link-modal-main-cont'>
                    <div className='app-create-link-modal-main-cont-tit'>
                    Logout from Sakura
                    </div>
                    <div className='lgout-conf-main-cont'>
                         <button className='lgout-conf-main-cont-no-butt'
                              onClick={()=>{props.setShow(false)}}
                         >
                              Not yet
                         </button>
                         <button className='lgout-conf-main-cont-yes-butt' onClick={()=>{
                              BackendHelper.initUserLogout().then((res:boolean)=>{
                                   if(res){
                                        props.router.replace('/src/login');
                                   }
                                   else{
                                        toast.error("Logout Error", {
                                             position: toast.POSITION.TOP_CENTER,
                                             autoClose: 5000,
                                             hideProgressBar: true,
                                             closeOnClick: true,
                                             pauseOnHover: true,
                                             draggable: true,
                                             progress: undefined,
                                        });
                                   }
                              });
                         }}>
                              Gotta Go!
                         </button>
                    </div>
               </div>
               </Modal>
      )
 }

const ProfilePopover:React.FC<any> = (props:any)=>{
     const [show, setShow] = useState(false);
     const [target, setTarget] = useState(null);
     const ref = useRef(null);
     const handleClick = (event:any) => {
       setShow(!show);
       setTarget(event.target);
     };
     return (
       <div ref={ref}>
         <button onClick={handleClick}
         className='app-land-prof-pic-butt'
         >
         <svg className='app-land-prof-pic-butt-ico' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M10.25,13c0,0.69-0.56,1.25-1.25,1.25S7.75,13.69,7.75,13S8.31,11.75,9,11.75S10.25,12.31,10.25,13z M15,11.75 c-0.69,0-1.25,0.56-1.25,1.25s0.56,1.25,1.25,1.25s1.25-0.56,1.25-1.25S15.69,11.75,15,11.75z M22,12c0,5.52-4.48,10-10,10 S2,17.52,2,12S6.48,2,12,2S22,6.48,22,12z M20,12c0-0.78-0.12-1.53-0.33-2.24C18.97,9.91,18.25,10,17.5,10 c-3.13,0-5.92-1.44-7.76-3.69C8.69,8.87,6.6,10.88,4,11.86C4.01,11.9,4,11.95,4,12c0,4.41,3.59,8,8,8S20,16.41,20,12z"/></g></svg>
          </button>   
         <Overlay
           placement={'bottom'}
           show={show}
           target={target}
           rootClose={true}
           container={ref.current}
           containerPadding={20}
         >
           <Popover id="popover-contained" className='app-land-prof-pop-main-cont'>
             <div className='app-land-prof-pop-data-main-cont pop-name-cont'>
                    {/* <div className='pop-name-cont-pro'>
                    <svg className='app-land-prof-pic-butt-ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M10.25,13c0,0.69-0.56,1.25-1.25,1.25S7.75,13.69,7.75,13S8.31,11.75,9,11.75S10.25,12.31,10.25,13z M15,11.75 c-0.69,0-1.25,0.56-1.25,1.25s0.56,1.25,1.25,1.25s1.25-0.56,1.25-1.25S15.69,11.75,15,11.75z M22,12c0,5.52-4.48,10-10,10 S2,17.52,2,12S6.48,2,12,2S22,6.48,22,12z M20,12c0-0.78-0.12-1.53-0.33-2.24C18.97,9.91,18.25,10,17.5,10 c-3.13,0-5.92-1.44-7.76-3.69C8.69,8.87,6.6,10.88,4,11.86C4.01,11.9,4,11.95,4,12c0,4.41,3.59,8,8,8S20,16.41,20,12z"/></g></svg>
                    </div> */}
                    Profile
            </div>
            <div className='app-land-prof-pop-data-main-cont pop-eml-cont'>
                    {User?.getUserData()?.email?User?.getUserData()?.email!.slice(0,20) + (User?.getUserData()!.email!.length >20 ? "..." : ""):null}
            </div>
            <div className='app-land-prof-pop-hr'/>
            <div className='app-land-prof-pop-data-main-cont pop-link-cont'>
            Terms of Use   
                    <div className='app-land-prof-pop-rgt-main-cont'><svg className='app-land-prof-pop-rgt-main-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"/></svg></div>
            </div>
            <div className='app-land-prof-pop-data-main-cont pop-link-cont'>
            Privacy Policy
            <div className='app-land-prof-pop-rgt-main-cont'><svg className='app-land-prof-pop-rgt-main-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"/></svg></div>
            </div>
            <div className='app-land-prof-pop-hr'/>
            <div className='app-land-prof-pop-data-main-cont pop-acc-sett-cont'>
            Account Settings
            <div className='app-land-prof-pop-rgt-main-cont'><svg className='app-land-prof-pop-rgt-main-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"/></svg></div>
            </div>
            <div className='app-land-prof-pop-hr'/>
            <Button variant="light" className="menu-item-lgout" onClick={()=>{
                    setShow(!show);
                 props.setlgoutShow(true)}
               }
                 >
                         Logout
            </Button>
           </Popover>
         </Overlay>
       </div>
     );
}

const WelcomeHead:React.FC<any> = ()=>{
     const [show,setShow] = useState<boolean>(true);
     return(
          show?
          <div className='dash-wel-main-cont'>
                    Welcome to<br/>Sakura
                    
                    <svg width="31" height="27" viewBox="0 0 31 27" fill="none" className='dash-wel-main-cont-ico' onClick={()=>{
                         setShow(false);
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
async function processActiveLinkData(lData:linkDataType,bool:boolean){
     let updateDat:any ={
          "active_bool": bool,
     }
     let resp = await BackendHelper._updateLinkData(User?.getUserUid()!,lData._id,updateDat);
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
                              {`${URLS.visit}/${uniid}`}
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
                                             if(dname!.length>10){seterrBool(true);seterrMess('Link name too long');return; }
                                             if(dname!.length==0){seterrBool(true);seterrMess('Enter some name');return; }
                                             if(uniid!.length>10){seterrBool(true);seterrMess('Unique Identifier too long');return; }
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
                    
                    <button className='app-create-link-edt-del-butt'
                    disabled={loading}
                    onClick={async ()=>{
                                             await setLoading(true);
                                             await processDeleteLinkData(lData!).then(async (res:nexusResponse)=>{
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
                    }}
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
                              <span>Delete</span>
                         } 
                    </button>
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
     const [activeLoading,setactiveLoading] = useState<boolean>(false);
     
     return(
          <div className={`lnk-lnk-main-cont ${props.d.deeplink_bool !== 'undefined' && props.d.deeplink_bool !== false?'':''}`}>
          <div className='lnk-lnk-head-main-cont'>
                         {
                              props.d.deeplink_bool !== 'undefined' && props.d.deeplink_bool !== false?
                              <div className='lnk-lnk-head-link-ico-cont'>
                               <svg className='lnk-lnk-head-link-ico' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M17,7h-3c-0.55,0-1,0.45-1,1s0.45,1,1,1h3c1.65,0,3,1.35,3,3s-1.35,3-3,3h-3c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h3 c2.76,0,5-2.24,5-5S19.76,7,17,7z M8,12c0,0.55,0.45,1,1,1h6c0.55,0,1-0.45,1-1s-0.45-1-1-1H9C8.45,11,8,11.45,8,12z M10,15H7 c-1.65,0-3-1.35-3-3s1.35-3,3-3h3c0.55,0,1-0.45,1-1s-0.45-1-1-1H7c-2.76,0-5,2.24-5,5s2.24,5,5,5h3c0.55,0,1-0.45,1-1 C11,15.45,10.55,15,10,15z"/></g></g></svg>
                              </div>:<span/>
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
                              <div className='lnk-lnk-gen-right-butt' onClick={()=>{
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
               <div className='lnk-lnk-gen-link' onClick={()=>{
                    props.openInNewTab(`${URLS.visit}/${props.d.unique_identifier}`);
               }}>
                    {`https://.../visit/${props.d.unique_identifier}`}
                    <svg className='lnk-lnk-gen-link-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"/></svg>
               </div>
               <div className='lnk-lnk-gen-right-cont'>      
                         <div className='lnk-lnk-gen-right-butt'  onClick={()=>{
                         copy(`${URLS.visit}/${props.d.unique_identifier}`);
                         toast.dark('Link Copied', {
                                   position: toast.POSITION.TOP_CENTER,
                                   autoClose: 2500,
                                   hideProgressBar: true,
                                   closeOnClick: true,
                                   pauseOnHover: true,
                                   draggable: true,
                                   progress: undefined,
                         });

                    }} >
                         <svg width="21" height="20"  className='lnk-lnk-gen-right-butt-ico' viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M16.1155 5H7.4436C6.21391 5 5.21704 5.99687 5.21704 7.22656V15.8984C5.21704 17.1281 6.21391 18.125 7.4436 18.125H16.1155C17.3452 18.125 18.342 17.1281 18.342 15.8984V7.22656C18.342 5.99687 17.3452 5 16.1155 5Z" stroke="currentColor" stroke-linejoin="round"/>
                         <path d="M15.1975 5L15.217 4.0625C15.2154 3.48285 14.9844 2.9274 14.5745 2.51753C14.1646 2.10765 13.6092 1.87665 13.0295 1.875H4.59204C3.9296 1.87696 3.29485 2.14098 2.82644 2.6094C2.35802 3.07781 2.094 3.71256 2.09204 4.375V12.8125C2.09369 13.3922 2.32469 13.9476 2.73457 14.3575C3.14445 14.7674 3.69989 14.9984 4.27954 15H5.21704" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                         </svg>
                         </div>
                         <div className='lnk-lnk-gen-right-butt' onClick={()=>{
                              props.seteditLinkModalVisi(true);
                              props.seteditLinkUniId(props.d.unique_identifier);
                         }}>
                              <svg className='lnk-lnk-gen-right-butt-ico' enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M3,17.46l0,3.04C3,20.78,3.22,21,3.5,21h3.04c0.13,0,0.26-0.05,0.35-0.15L17.81,9.94l-3.75-3.75L3.15,17.1 C3.05,17.2,3,17.32,3,17.46z"/></g><g><path d="M20.71,5.63l-2.34-2.34c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83C21.1,6.65,21.1,6.02,20.71,5.63z"/></g></g></g></svg>
                    {/* <svg className='lnk-lnk-gen-right-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#0070F3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg> */}
                    </div>
               </div>          
          </div>
     </div>
     )
}

const BottomCont:React.FC<any> =(prop:any)=>{
     return(
          <div className='app-bottom-cont-main-cont'>
               <div className='app-bottom-cont-lnk-cont'>Home</div>
               <div className='app-bottom-cont-lnk-cont'>About Us</div>
               <div className='app-bottom-cont-lnk-cont'>Terms of conditions</div>
               <div className='app-bottom-cont-lnk-cont'>Privacy Policy</div>
               <div className='app-bottom-cont-lnk-cont'>DMCA Policy</div>
               <div className='app-bottom-cont-main-logo'>Sakura</div>
               <div className='app-bottom-cont-main-sys-stat'>
                    Status:
                    <div className='app-bottom-cont-main-sys-stat-lab'>
                         <div className='app-bottom-cont-main-sys-stat-lab-cir'/>
                         All systems normal</div>
               </div>
               <div className='app-bottom-cont-main-copy-cont'>
                    Copyright &#xA9; 2021 Sakura , All rights reserved.
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
               lgoutConfirmVisi:false,
               feedbackModalVisi:false,
               editLinkModalVisi:false,
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
          this.setlgoutConfirmVisi = this.setlgoutConfirmVisi.bind(this);
          this.setisdeeplink = this.setisdeeplink.bind(this);
          this.setsearchQuery = this.setsearchQuery.bind(this);
          this.setshowAllLinks = this.setshowAllLinks.bind(this);
     }

     setshowAllLinks(b:boolean){this.setState({showAllLinks:b})}
     setsearchQuery(s:string){this.setState({searchQuery:s})}
     setisdeeplink(b:boolean){this.setState({isdeeplink:b})}
     setlgoutConfirmVisi(b:boolean){this.setState({lgoutConfirmVisi:b})}
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
     setmakeLinkLoading(b:boolean){this.setState({makeLinkLoading:b})}
     setAuth(b:boolean){this.setState({isAuth:b});}

     async initDataLoad(){
               this.setLoading(true);
               if(await getUid()){
                    User.setUserUid(await getUid());
                    this.initLinksDataLoad();
                    this.setAuth(true);
                    if(backendHelper){
                         BackendHelper._getUserInfo(User.getUserUid(),true).then((res:nexusResponse)=>{
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
                    }

               }else{
                    this.props.router.replace('/src/login');
                    this.setAuth(false);
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
                    return(<div className='app-link-logo-cont'><svg  className='app-link-logo-cont-ico' xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5_logos</title><path d="M508.64,148.79c0-45-33.1-81.2-74-81.2C379.24,65,322.74,64,265,64H247c-57.6,0-114.2,1-169.6,3.6-40.8,0-73.9,36.4-73.9,81.4C1,184.59-.06,220.19,0,255.79q-.15,53.4,3.4,106.9c0,45,33.1,81.5,73.9,81.5,58.2,2.7,117.9,3.9,178.6,3.8q91.2.3,178.6-3.8c40.9,0,74-36.5,74-81.5,2.4-35.7,3.5-71.3,3.4-107Q512.24,202.29,508.64,148.79ZM207,353.89V157.39l145,98.2Z"/></svg></div>)
                    break;    
               }
               default:{
                    break;
               }
          }

     }
     renderDecri(count:number){
          return(
               <div className='app-decri-main-cont'>                                                                
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className='app-incri-main-ico'>
                    <path d="M8.38303 6.55417C8.20428 6.37542 7.91553 6.37542 7.73678 6.55417L5.95844 8.32792L5.95844 1.375C5.95844 1.12292 5.75219 0.91667 5.50011 0.91667C5.24803 0.91667 5.04178 1.12292 5.04178 1.375L5.04178 8.32792L3.26344 6.54959C3.08469 6.37084 2.79594 6.37084 2.61719 6.54959C2.43844 6.72834 2.43844 7.01709 2.61719 7.19584L5.17928 9.7625C5.35803 9.94125 5.64678 9.94125 5.82553 9.7625L8.38303 7.20042C8.56178 7.02167 8.56178 6.72834 8.38303 6.55417Z" fill="#EB445A"/>
                    </svg>
                    {count}
               </div>
          )
     }
     renderIncri(count:number){
               return(
                    <div className='app-incri-main-cont'>                         
                              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" className='app-incri-main-ico'>
                              <path d="M3.08071 5.54711C3.26559 5.71951 3.55416 5.70943 3.72656 5.52455L5.44191 3.68982L5.68456 10.6385C5.69336 10.8904 5.90668 11.0894 6.15861 11.0806C6.41054 11.0718 6.60947 10.8584 6.60067 10.6065L6.35802 3.65783L8.19733 5.37302C8.38221 5.54542 8.67078 5.53534 8.84319 5.35046C9.01559 5.16558 9.00551 4.87701 8.82063 4.70461L6.17054 2.22892C5.98566 2.05652 5.69708 2.06659 5.52468 2.25147L3.05815 4.90125C2.88575 5.08613 2.89599 5.37928 3.08071 5.54711Z" fill="#3E9D64"/>
                              </svg>
                         {count}
                    </div>
               )
     }
     renderFeedbackModal(){
          return(
               <Modal
               show={this.state.feedbackModalVisi}
               onHide={()=>{this.setfeedbackModalVisi(false)}}
               size="lg"
               centered
               animated
               >
               <div className='app-create-link-modal-main-cont'>
                    <div className='app-create-link-modal-main-cont-tit'>
                    Feedback
                    </div>
                    <div className='app-create-link-modal-main-cont-des'>
                    Please share with us what you think about Sakura. We are open for suggestions 😄
                    </div>
                    <div className='app-create-link-modal-hr'/>
                    <div className='app-create-link-modal-main-cont-fld-cont'>
                    <textarea className='app-feed-main-txtar-fld' placeholder='Tell us what you feel.'></textarea>
                    </div>
                    <div className='app-create-link-modal-main-cont-fld-cont'>
                              <button className='app-create-link-modal-edt-lnk-butt'
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
                              <span>Send</span>
                         }     
                         </button>
                    </div>
               </div>
               </Modal>
          )
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
                              <svg className='app-land-indi-ico' xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5_logos</title><path d="M508.64,148.79c0-45-33.1-81.2-74-81.2C379.24,65,322.74,64,265,64H247c-57.6,0-114.2,1-169.6,3.6-40.8,0-73.9,36.4-73.9,81.4C1,184.59-.06,220.19,0,255.79q-.15,53.4,3.4,106.9c0,45,33.1,81.5,73.9,81.5,58.2,2.7,117.9,3.9,178.6,3.8q91.2.3,178.6-3.8c40.9,0,74-36.5,74-81.5,2.4-35.7,3.5-71.3,3.4-107Q512.24,202.29,508.64,148.79ZM207,353.89V157.39l145,98.2Z"/></svg>
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
     async validateOnChange(s:string){
          if(s){
               this.setvalidityLoading(true);         
               if(backendHelper){
                    BackendHelper._checkURLValid({"uid":User.getUserUid(),"link_url":s}).then((res:nexusResponse)=>{
                         if(res){
                              if(!res.errBool){
                                   //{valid_url: false, identified_platform_id: 0, parse_validity: false}
                                   this.setvalidityLoading(false);
                                   if(res.responseData.valid_url && res.responseData.parse_validity && res.responseData.identified_platform_id){
                                        this.setvalidated(true);
                                        this.setPlatformId(res.responseData.identified_platform_id);
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
               for(let l in this.state.linksData){
                    if(parseInt(l) > 2 && !this.state.showAllLinks){continue;}
                    let d = this.state.linksData[l];
                    res.push(
                         <LinkCard 
                         key={parseInt(l)}
                         ind={parseInt(l)} 
                         isDetailed={this.state.detailed}
                         d={d} 
                         openInNewTab={this.openInNewTab} 
                         seteditLinkModalVisi={this.seteditLinkModalVisi} 
                         seteditLinkUniId={this.seteditLinkUniId}/>)
               }
          }
          return res;
     }
     
     componentDidMount(){
          console.log('component mount');
          this.initDataLoad();
     }

     render(){
          if(!this.state.isLoading && this.state.isAuth){
          return(
               <ThemeProvider theme={darkTheme}>
               <div className='app-main-cont-main-body land-body-cont'   id='lnk-lnk-main-cont-id'>
                    <Head>
                    <title>Sakura</title>
                    <meta name="description" content="Cicada Login Activity" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico" />
                    </Head>
                    
                              <BurgerMenu router={this.props.router}/>
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
                                                  this.setcreateLinkModalVisi(true);
                                             }}
                                             >
                                                  Create Link
                                             </button>
                                             {/* <button className='app-land-feed-butt-main-cont' onClick={()=>{this.setfeedbackModalVisi(true)}}>
                                                  <svg  className='app-land-feed-butt-main-ico'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4.01c-1.1 0-2 .9-2 2v18L6 18h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-5c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1s1 .45 1 1v2z"/></svg>
                                             </button> */}
                                             {/* <ProfilePopover  setlgoutShow={this.setlgoutConfirmVisi} /> */}
                                        </div>
                              </div>
                         <LandNavBarCont router={this.props.router}/>
                         <div id='app-main-cont-body-id'>
                         <div className='app-body-main-cont'>
                              
                              <div className='app-land-link-cont-holder top-holder-cont'>
                                         <div className='app-land-link-intro-pro-main-cont'>
                                                       <div className='app-land-head-pro-pic-main-cont'>
                                                       <svg  className='app-land-head-pro-pic-main-cont-pic' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><radialGradient id="S2w73RYcJka7XmMmG50Ola" cx="23.801" cy="27.168" r="23.295" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffcf54"/><stop offset=".261" stop-color="#fdcb4d"/><stop offset=".639" stop-color="#f7c13a"/><stop offset="1" stop-color="#f0b421"/></radialGradient><path fill="url(#S2w73RYcJka7XmMmG50Ola)" d="M44,23c0,2,0,7-3,7c-1.5,0-2.5-0.5-3-1v15H10V29c-0.5,0.5-1.5,1-3,1c-2.956,0-3-5-3-7	c0-8,7-18,20-18S44,15,44,23z"/><linearGradient id="S2w73RYcJka7XmMmG50Olb" x1="39.5" x2="39.5" y1="28.635" y2="44.054" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c48f0c"/><stop offset="1" stop-color="#cd9713"/></linearGradient><path fill="url(#S2w73RYcJka7XmMmG50Olb)" d="M41,30v12c0,1.105-0.895,2-2,2h-1V29C38.5,29.5,39.5,30,41,30z"/><linearGradient id="S2w73RYcJka7XmMmG50Olc" x1="8.5" x2="8.5" y1="29.166" y2="44.279" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c48f0c"/><stop offset="1" stop-color="#cd9713"/></linearGradient><path fill="url(#S2w73RYcJka7XmMmG50Olc)" d="M10,29v15H9c-1.105,0-2-0.895-2-2V30C8.5,30,9.5,29.5,10,29z"/><linearGradient id="S2w73RYcJka7XmMmG50Old" x1="23.08" x2="37.248" y1="7.513" y2="22.582" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6d7479"/><stop offset="1" stop-color="#323538"/></linearGradient><circle cx="32" cy="17" r="5" fill="url(#S2w73RYcJka7XmMmG50Old)"/><linearGradient id="S2w73RYcJka7XmMmG50Ole" x1="32.072" x2="35.941" y1="11.611" y2="20.794" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fcfcfc"/><stop offset="1" stop-color="#c3c9cd"/></linearGradient><path fill="url(#S2w73RYcJka7XmMmG50Ole)" d="M32,12c-0.688,0-1.342,0.14-1.939,0.391C30.037,12.593,30,12.791,30,13c0,2.761,2.239,5,5,5	c0.688,0,1.342-0.14,1.939-0.391C36.963,17.407,37,17.209,37,17C37,14.239,34.761,12,32,12z"/><linearGradient id="S2w73RYcJka7XmMmG50Olf" x1="7.08" x2="21.248" y1="7.513" y2="22.582" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6d7479"/><stop offset="1" stop-color="#323538"/></linearGradient><circle cx="16" cy="17" r="5" fill="url(#S2w73RYcJka7XmMmG50Olf)"/><linearGradient id="S2w73RYcJka7XmMmG50Olg" x1="16.072" x2="19.941" y1="11.611" y2="20.794" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fcfcfc"/><stop offset="1" stop-color="#c3c9cd"/></linearGradient><path fill="url(#S2w73RYcJka7XmMmG50Olg)" d="M16,12c-0.688,0-1.342,0.14-1.939,0.391C14.037,12.593,14,12.791,14,13c0,2.761,2.239,5,5,5	c0.688,0,1.342-0.14,1.939-0.391C20.963,17.407,21,17.209,21,17C21,14.239,18.761,12,16,12z"/><path fill="#881421" d="M30,24c0,0-0.72,5.06-4.01,6.57c-0.02,0.01-0.04,0.02-0.06,0.03c-0.03,0.01-0.06,0.03-0.09,0.04	C25.94,30.44,26,30.22,26,30c0-1.1-1.34-2-3-2c-1.24,0-2.3,0.5-2.75,1.21c-0.11-0.11-0.2-0.22-0.29-0.34C18.41,26.81,18,24,18,24	s2.69,2,6,2S30,24,30,24z"/><path fill="#c94f60" d="M26,30c0,0.22-0.06,0.44-0.16,0.64C25.29,30.86,24.68,31,24,31c-1.55,0-2.72-0.67-3.59-1.6	c-0.06-0.06-0.11-0.12-0.16-0.19C20.7,28.5,21.76,28,23,28C24.66,28,26,28.9,26,30z"/><linearGradient id="S2w73RYcJka7XmMmG50Olh" x1="24" x2="24" y1="15.659" y2="33.13" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f19a00"/><stop offset="1" stop-color="#eb8100"/></linearGradient><path fill="url(#S2w73RYcJka7XmMmG50Olh)" d="M24,16.005c-11.46,0.28-10.447,10.07-9.402,12.99c0.637,1.77,1.964,3,3.134,3	c3.134,0,3.677-5.08,4.179-8c0.198-1.23,1.16-1.72,2.089-1.84c0.93,0.12,1.891,0.61,2.089,1.84c0.501,2.92,1.045,8,4.179,8	c1.17,0,2.497-1.23,3.134-3C34.447,26.075,35.46,16.285,24,16.005z"/><linearGradient id="S2w73RYcJka7XmMmG50Oli" x1="24" x2="24" y1="19.783" y2="24.1" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#505559"/><stop offset="1" stop-color="#323538"/></linearGradient><ellipse cx="24" cy="22" fill="url(#S2w73RYcJka7XmMmG50Oli)" rx="4" ry="2"/></svg>
                                                       </div>
                                                       {
                                                            User.getUserData()?
                                                                 
                                                                 <div className='app-body-topper-hey-cont' >                                                               
                                                                      {User.getUserData()?.dname} <span className='app-body-topper-hey-cont-hand' onClick={()=>{
                                                                      toast.dark('Hi-Fi ✋', {
                                                                           position: toast.POSITION.TOP_CENTER,
                                                                           autoClose: 5000,
                                                                           hideProgressBar: true,
                                                                           closeOnClick: true,
                                                                           pauseOnHover: true,
                                                                           draggable: true,
                                                                           progress: undefined,
                                                                      });
                                                                 }}>👋</span> 
                                                                 <div className='app-body-topper-bio-cont'>{User.getUserData()?.bio}</div>
                                                                 {/* <div className='app-body-topper-hey-butt-cont' >
                                                                      <button className='app-body-topper-hey-butt'>Edit Profile</button>
                                                            
                                                                      </div> */}
                                                                 </div>:
                                                            <span/>
                                                       }
                                                       <div className='app-land-pro-edit-main-cont'>
                                                                 <button className='app-land-pro-edit-butt'>
                                                                 <svg   className='app-land-pro-edit-butt-ico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#c94f60" d="M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718	C43.139,10.526,43.139,9.625,42.583,9.067"/><path fill="#f0f0f0" d="M6.905,35.43L5,43l7.571-1.906l0.794-6.567L6.905,35.43z"/><path fill="#edbe00" d="M36.032,17.632l-23.46,23.461l-5.665-5.665l23.46-23.461L36.032,17.632z"/><linearGradient id="YoPixpDbHWOyk~b005eF1a" x1="35.612" x2="35.612" y1="7.494" y2="17.921" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#dedede"/><stop offset="1" stop-color="#d6d6d6"/></linearGradient><path fill="url(#YoPixpDbHWOyk~b005eF1a)" d="M30.363,11.968l4.832-4.834l5.668,5.664l-4.832,4.834L30.363,11.968z"/><path fill="#787878" d="M5.965,39.172L5,43l3.827-0.965L5.965,39.172z"/></svg>
                                                                 </button>
                                                       </div>
                                        </div>
                                             <WelcomeHead/>
                                           
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
                                                       {/* <div className='app-land-visit-card-left-time'>Today</div> */}
                                                       {/* <div className='app-land-visit-card-left-Counter'>8000</div> */}
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
                              </div>

                              <div className='app-land-link-cont-holder cluster-holder-cont'>
                              <div className='app-land-lab-main-cont'>                              
                                   <svg 
                                   className='app-land-lab-main-cont-ico'
                                   width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                   <rect x="8" y="10" width="21" height="3" rx="1.5" fill="currentColor"/>
                                   <rect x="8" y="16" width="21" height="5" rx="2" fill="currentColor"/>
                                   <rect x="8" y="24" width="21" height="3" rx="1.5" fill="currentColor"/>
                                   </svg>

                                   Cluster Link</div>
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
                                              <svg width="21" height="20"  className='lnk-lnk-gen-right-butt-ico' viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M16.1155 5H7.4436C6.21391 5 5.21704 5.99687 5.21704 7.22656V15.8984C5.21704 17.1281 6.21391 18.125 7.4436 18.125H16.1155C17.3452 18.125 18.342 17.1281 18.342 15.8984V7.22656C18.342 5.99687 17.3452 5 16.1155 5Z" stroke="currentColor" stroke-linejoin="round"/>
                                             <path d="M15.1975 5L15.217 4.0625C15.2154 3.48285 14.9844 2.9274 14.5745 2.51753C14.1646 2.10765 13.6092 1.87665 13.0295 1.875H4.59204C3.9296 1.87696 3.29485 2.14098 2.82644 2.6094C2.35802 3.07781 2.094 3.71256 2.09204 4.375V12.8125C2.09369 13.3922 2.32469 13.9476 2.73457 14.3575C3.14445 14.7674 3.69989 14.9984 4.27954 15H5.21704" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                             </svg>
                                        </button>
                                        </div>
                                   </div>
                                   <div className='clust-visit-main-cont'>
                                                  <a className='clust-visit-main-cont-lnk' href={_BASE_CLIENT_URL+'src/cluster'}>
                                                  Go to cluster settings
                                                  {/* <svg className='clust-visit-main-cont-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"/></svg> */}
                                                  <svg className='clust-visit-main-cont-ico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="UoM~0_1BpfEneny~ePS0ba" x1="8.469" x2="42.33" y1="8.469" y2="42.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"/><stop offset="1" stop-color="#007ad9"/></linearGradient><path fill="url(#UoM~0_1BpfEneny~ePS0ba)" d="M39,41H9c-1.1,0-2-0.9-2-2V9c0-1.1,0.9-2,2-2h30c1.1,0,2,0.9,2,2v30C41,40.1,40.1,41,39,41z"/><path d="M41,7h-5.528L20.695,21.777c-0.746,0.746-0.746,1.954,0,2.7l2.828,2.828 c0.746,0.746,1.954,0.746,2.7,0L41,12.528V7z" opacity=".018"/><path d="M41,7h-5.4L20.759,21.841c-0.71,0.71-0.71,1.861,0,2.571l2.828,2.828 c0.71,0.71,1.861,0.71,2.571,0L41,12.4V7z" opacity=".036"/><path d="M41,7h-5.271L20.823,21.906c-0.675,0.675-0.675,1.768,0,2.443l2.828,2.828 c0.675,0.675,1.768,0.675,2.443,0L41,12.271V7z" opacity=".054"/><path d="M41,7h-5.143l-14.97,14.97c-0.639,0.639-0.639,1.675,0,2.314l2.828,2.828 c0.639,0.639,1.675,0.639,2.314,0L41,12.143V7z" opacity=".073"/><path d="M41,7h-5.014L20.952,22.034c-0.604,0.604-0.604,1.582,0,2.186l2.828,2.828 c0.604,0.604,1.582,0.604,2.186,0L41,12.014V7z" opacity=".091"/><path d="M41,7h-4.885L21.016,22.098c-0.568,0.568-0.568,1.489,0,2.057l2.828,2.828 c0.568,0.568,1.489,0.568,2.057,0L41,11.885V7z" opacity=".109"/><path d="M41,7h-4.757L21.081,22.163c-0.533,0.533-0.533,1.396,0,1.928l2.828,2.828 c0.533,0.533,1.396,0.533,1.928,0L41,11.757V7z" opacity=".127"/><path d="M41,7h-4.628L21.145,22.227c-0.497,0.497-0.497,1.303,0,1.8l2.828,2.828 c0.497,0.497,1.303,0.497,1.8,0L41,11.628V7z" opacity=".145"/><path d="M41,7h-4.5L21.209,22.291c-0.462,0.462-0.462,1.21,0,1.671l2.828,2.828 c0.462,0.462,1.21,0.462,1.671,0L41,11.5V7z" opacity=".164"/><path d="M41,7h-4.371L21.273,22.355c-0.426,0.426-0.426,1.117,0,1.543l2.828,2.828 c0.426,0.426,1.117,0.426,1.543,0L41,11.371V7z" opacity=".182"/><path d="M41,7h-4.243l-15.42,15.42c-0.391,0.391-0.391,1.024,0,1.414l2.828,2.828 c0.391,0.391,1.024,0.391,1.414,0L41,11.243V7z" opacity=".2"/><path fill="#50e6ff" d="M36.452,1.379l2.963,2.963L21.338,22.42c-0.391,0.391-0.391,1.024,0,1.414l2.828,2.828	c0.391,0.391,1.024,0.391,1.414,0L43.658,8.585l2.963,2.963C47.13,12.057,48,11.697,48,10.977l0-9.361C48,0.723,47.277,0,46.384,0	l-9.361,0C36.303,0,35.943,0.87,36.452,1.379z"/></svg>
                                                  </a>
                                   </div>
                              </div>
                                    

                              </div>
                              <div className='app-land-link-cont-holder lnk-holder-cust'>
                              
                              
                              <div className='app-land-lab-main-cont'>
                                   <svg 
                                   className='app-land-lab-main-cont-ico'
                                   width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                   <path d="M20.5 16.5C19.3 15.3 16 15.0001 15 16.0001L10 21.5C8.5 24 10.4665 27.1611 12.5 27.5C15.5 28 15.5 27 17.5 25.5" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                   <path d="M16.5 20C17.8057 21.2753 20 22.4999 22 20.9999L24.7049 18.4999L27.4252 15.5149C29.0573 12.8579 26.9176 9.49832 24.7049 9.13815C21.4406 8.60679 21.4406 9.66954 19.2643 11.2637" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                                   </svg>
                                   Links {this.state.linksData.length}</div>
                              
                              <div className='app-land-serch-main-cont'>
                                        <div className='app-land-top-butt-group-cont'>
                                             <div className='app-land-serch-cont'>
                                                  <div className='app-land-serch-ico-cont'>
                                                       <svg className='app-land-serch-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                                                  </div>
                                                  <input
                                                  type='text'
                                                  className='app-land-serch-bar'
                                                  placeholder='Search for link'
                                                  value={this.state.searchQuery}
                                                  onChange={(e)=>{this.setsearchQuery(e.target.value)}}
                                                  />
                                             </div>
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
                              <div className='app-land-serch-main-cont'>
                              <button className='app-land-crt-lnk-butt'
                              onClick={()=>{this.setcreateLinkModalVisi(true)}}
                              > 
                              {/* <div className='app-land-crt-lnk-butt-decor'/> */}
                              <div  className='app-land-crt-lnk-butt-lab'>
                                   <svg className='app-land-crt-lnk-butt-lab-ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><path d="M9,11h6c0.55,0,1,0.45,1,1v0c0,0.55-0.45,1-1,1H9c-0.55,0-1-0.45-1-1v0C8,11.45,8.45,11,9,11z M20.93,12L20.93,12 c0.62,0,1.07-0.59,0.93-1.19C21.32,8.62,19.35,7,17,7h-3.05C13.43,7,13,7.43,13,7.95v0c0,0.52,0.43,0.95,0.95,0.95H17 c1.45,0,2.67,1,3.01,2.34C20.12,11.68,20.48,12,20.93,12z M3.96,11.38C4.24,9.91,5.62,8.9,7.12,8.9l2.93,0 C10.57,8.9,11,8.47,11,7.95v0C11,7.43,10.57,7,10.05,7L7.22,7c-2.61,0-4.94,1.91-5.19,4.51C1.74,14.49,4.08,17,7,17h3.05 c0.52,0,0.95-0.43,0.95-0.95v0c0-0.52-0.43-0.95-0.95-0.95H7C5.09,15.1,3.58,13.36,3.96,11.38z M18,12L18,12c-0.55,0-1,0.45-1,1v2 h-2c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h2v2c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-2h2c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1h-2v-2C19,12.45,18.55,12,18,12z"/></g></svg>
                                   Create Link </div>
                              </button>
                           
                              </div>
                              {
                              this.state.linkDataLoading?
                              <div className='app-land-rel-main-cont'>
                              <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              />
                              </div>:
                              <span>
                              {this.renderLinkTable()}
                              </span>
                              }
                              
                              <div className='app-land-lnks-holder-shw-mr-main-cont'>
                                   <button className='app-land-lnks-holder-shw-mr-butt'
                                   onClick={()=>{ this.setshowAllLinks(!this.state.showAllLinks)}}
                                   >{
                                   this.state.showAllLinks?'Show less':'Show more'
                                   }</button>
                              </div>
                              
                              </div>
                              
                         </div>
                         <BottomCont />
                         </div>
                        <ProfileLogoutModal setShow={this.setlgoutConfirmVisi} show={this.state.lgoutConfirmVisi} router={this.props.router}/>
                        <EditLinkModal show={this.state.editLinkModalVisi} setShow={this.seteditLinkModalVisi} uniId={this.state.editLinkUniId} setUniId={this.seteditLinkUniId} reloadData={this.initLinksDataLoad}/>
                        {this.renderLinkCreateModal()}
                        {this.renderFeedbackModal()}
                         <ToastContainer />
            </div>
            </ThemeProvider>
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

                     */}