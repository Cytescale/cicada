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
import { BurgerMenu,ProfilePopover,LandNavBarCont,BottomCont,FeedbackCont,HeaderCont } from "../../../comp/elements";
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

const RenderPlatformLogo:React.FC<any>=(props:any)=>{
     switch(props.id){
          case 1:{
               return(
                    <div className='app-plat-logo-main-cont'>
                         <svg className='app-plat-logo-ico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="PgB_UHa29h0TpFV_moJI9a" x1="9.816" x2="41.246" y1="9.871" y2="41.301" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"/><stop offset=".443" stop-color="#ee3d4a"/><stop offset="1" stop-color="#e52030"/></linearGradient><path fill="url(#PgB_UHa29h0TpFV_moJI9a)" d="M45.012,34.56c-0.439,2.24-2.304,3.947-4.608,4.267C36.783,39.36,30.748,40,23.945,40	c-6.693,0-12.728-0.64-16.459-1.173c-2.304-0.32-4.17-2.027-4.608-4.267C2.439,32.107,2,28.48,2,24s0.439-8.107,0.878-10.56	c0.439-2.24,2.304-3.947,4.608-4.267C11.107,8.64,17.142,8,23.945,8s12.728,0.64,16.459,1.173c2.304,0.32,4.17,2.027,4.608,4.267	C45.451,15.893,46,19.52,46,24C45.89,28.48,45.451,32.107,45.012,34.56z"/><path d="M32.352,22.44l-11.436-7.624c-0.577-0.385-1.314-0.421-1.925-0.093C18.38,15.05,18,15.683,18,16.376	v15.248c0,0.693,0.38,1.327,0.991,1.654c0.278,0.149,0.581,0.222,0.884,0.222c0.364,0,0.726-0.106,1.04-0.315l11.436-7.624	c0.523-0.349,0.835-0.932,0.835-1.56C33.187,23.372,32.874,22.789,32.352,22.44z" opacity=".05"/><path d="M20.681,15.237l10.79,7.194c0.689,0.495,1.153,0.938,1.153,1.513c0,0.575-0.224,0.976-0.715,1.334	c-0.371,0.27-11.045,7.364-11.045,7.364c-0.901,0.604-2.364,0.476-2.364-1.499V16.744C18.5,14.739,20.084,14.839,20.681,15.237z" opacity=".07"/><path fill="#fff" d="M19,31.568V16.433c0-0.743,0.828-1.187,1.447-0.774l11.352,7.568c0.553,0.368,0.553,1.18,0,1.549	l-11.352,7.568C19.828,32.755,19,32.312,19,31.568z"/></svg>
                    </div>
               )
               break;
          }
          case 2:{
               return(
                    <div className='app-plat-logo-main-cont'>
                    <svg className='app-plat-logo-ico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><radialGradient id="yOrnnhliCrdS2gy~4tD8ma" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"/><stop offset=".328" stop-color="#ff543f"/><stop offset=".348" stop-color="#fc5245"/><stop offset=".504" stop-color="#e64771"/><stop offset=".643" stop-color="#d53e91"/><stop offset=".761" stop-color="#cc39a4"/><stop offset=".841" stop-color="#c837ab"/></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"/><radialGradient id="yOrnnhliCrdS2gy~4tD8mb" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"/><stop offset=".999" stop-color="#4168c9" stop-opacity="0"/></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"/><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"/><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"/><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"/></svg>
                    </div>  
               )
               break;
          }
          case 3:{
               return(
                    <div className='app-plat-logo-main-cont'>
                         <svg className='app-plat-logo-ico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="_osn9zIN2f6RhTsY8WhY4a" x1="10.341" x2="40.798" y1="8.312" y2="38.769" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"/><stop offset="1" stop-color="#007ad9"/></linearGradient><path fill="url(#_osn9zIN2f6RhTsY8WhY4a)" d="M46.105,11.02c-1.551,0.687-3.219,1.145-4.979,1.362c1.789-1.062,3.166-2.756,3.812-4.758	c-1.674,0.981-3.529,1.702-5.502,2.082C37.86,8.036,35.612,7,33.122,7c-4.783,0-8.661,3.843-8.661,8.582	c0,0.671,0.079,1.324,0.226,1.958c-7.196-0.361-13.579-3.782-17.849-8.974c-0.75,1.269-1.172,2.754-1.172,4.322	c0,2.979,1.525,5.602,3.851,7.147c-1.42-0.043-2.756-0.438-3.926-1.072c0,0.026,0,0.064,0,0.101c0,4.163,2.986,7.63,6.944,8.419	c-0.723,0.198-1.488,0.308-2.276,0.308c-0.559,0-1.104-0.063-1.632-0.158c1.102,3.402,4.299,5.889,8.087,5.963	c-2.964,2.298-6.697,3.674-10.756,3.674c-0.701,0-1.387-0.04-2.065-0.122C7.73,39.577,12.283,41,17.171,41	c15.927,0,24.641-13.079,24.641-24.426c0-0.372-0.012-0.742-0.029-1.108C43.483,14.265,44.948,12.751,46.105,11.02"/></svg>
                    </div>  
               )
               break;
          }
          case 4:{
               return(
                    <div className='app-plat-logo-main-cont'>
                        <svg  className='app-plat-logo-ico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="IfhrvZkWi8LOXjspG~Pupa" x1="14.899" x2="33.481" y1="43.815" y2="7.661" gradientTransform="matrix(1 0 0 -1 .108 50.317)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f22543"/><stop offset=".422" stop-color="#eb2239"/><stop offset="1" stop-color="#e52030"/></linearGradient><path fill="url(#IfhrvZkWi8LOXjspG~Pupa)" d="M44,23.9810009C44.0110016,35.026001,35.0639992,43.9889984,24.0189991,44	S4.0110002,35.0639992,4,24.0189991C3.9890001,12.974,12.9359999,4.0110002,23.9810009,4	C35.026001,3.9890001,43.9889984,12.9359999,44,23.9810009z"/><path d="M37.7729988,22.9680004c0-7.1560001-5.7299995-12.552-13.3299999-12.552	c-9.7670002,0-14.2150002,6.7919998-14.2150002,13.1040001c0,3.1480007,1.625,7.2519989,4.6370001,8.6549988	c0.4860001,0.2270012,0.9300003,0.2439995,1.3210001,0.0550003c0.2609997-0.1259995,0.6030006-0.4029999,0.7420006-0.9950008	l0.5559998-2.2689991c0.1259995-0.5289993,0.0130005-1.0139999-0.3390007-1.4419994	c-0.6259995-0.7600002-1.2609997-2.3540001-1.2609997-3.9300003c0-3.7229996,2.8139992-7.6800003,8.0299988-7.6800003	c4.3299999,0,7.3540001,2.9349995,7.3540001,7.1369991c0,4.7270012-2.223999,8.1580009-5.2870007,8.1580009	c-0.6819992,0-1.289999-0.2740002-1.6679993-0.7520008c-0.3509998-0.4440002-0.4640007-1.0230007-0.3209991-1.6310005	c0.1959991-0.8260002,0.4650002-1.6940002,0.7240009-2.5340004c0.4939995-1.5979996,0.9599991-3.1070004,0.9599991-4.3549995	c0-2.282999-1.4190006-3.816-3.5300007-3.816c-2.5900002,0-4.618,2.5720005-4.618,5.855999	c0,1.4130001,0.3430004,2.5170002,0.5499992,3.0559998c-0.3649998,1.5440006-1.9489994,8.2490005-2.2700005,9.6269989	c-0.3839998,1.6399994-0.3070002,3.8040009-0.1479998,5.5009995c1.0940008,0.5029984,2.2400007,0.9059982,3.4299994,1.2070007	c0.7719994-1.2789993,1.9710007-3.4389992,2.4419994-5.2490005c0.132-0.5079994,0.4880009-1.8660011,0.7859993-3.0009995	c1.0979996,0.7939987,2.585001,1.2910004,4.0760002,1.2910004C32.882,36.4080009,37.7729988,30.6299992,37.7729988,22.9680004z" opacity=".05"/><path d="M37.2729988,22.9680004c0-6.8710003-5.5159988-12.052-12.8299999-12.052	c-9.4230003,0-13.7150002,6.5330009-13.7150002,12.6040001c0,3.0359993,1.6260004,6.934,4.349,8.2019997	c0.1269999,0.0599995,0.5159998,0.2409992,0.8920002,0.059c0.2379999-0.1159992,0.3979998-0.3390007,0.474-0.6620007	l0.5550003-2.2679996c0.0890007-0.3740005,0.0119991-0.7040005-0.2390003-1.0079994	c-0.809-0.9820004-1.375-2.7290001-1.375-4.2479992c0-3.9650002,2.9899998-8.1800003,8.5299988-8.1800003	c4.6240005,0,7.8540001,3.1399994,7.8540001,7.637001c0,5.0170002-2.434,8.6580009-5.7870007,8.6580009	c-0.8349991,0-1.5860004-0.3430004-2.0599995-0.9419994c-0.448-0.566-0.5949993-1.2970009-0.4150009-2.0569992	c0.2000008-0.842001,0.4710007-1.7180004,0.7329998-2.566c0.4820004-1.5610008,0.9379997-3.0349998,0.9379997-4.2080002	c0-1.9839993-1.2180004-3.316-3.0300007-3.316c-2.309,0-4.118,2.3530006-4.118,5.3560009	c0,1.493,0.3990002,2.6049995,0.573,3.0179996c-0.2789993,1.1800003-1.9729996,8.3479977-2.3059998,9.7790012	c-0.3909998,1.6749992-0.2819996,3.9440002-0.1070004,5.6409988c0.7730007,0.3279991,1.5769997,0.5940018,2.3959999,0.8240013	c0.7520008-1.2330017,1.993-3.4350014,2.4640007-5.2449989c0.1639996-0.6300011,0.6709995-2.5629997,0.9860001-3.762001	c1.0139999,1.0089989,2.6809998,1.6780014,4.3600006,1.6780014C32.5970001,35.9080009,37.2729988,30.3449993,37.2729988,22.9680004z" opacity=".07"/><path fill="#FFF" d="M24.4430008,11.4169998c-8.632,0-13.2150002,5.7950001-13.2150002,12.1030006	c0,2.9330006,1.5620003,6.5849991,4.0599995,7.7480011c0.3780003,0.177,0.5819998,0.1000004,0.6680002-0.2670002	c0.0670004-0.2779999,0.4030008-1.6369991,0.5549994-2.2679996c0.0480003-0.2019997,0.0249996-0.375-0.1380005-0.573	c-0.8269997-1.0030003-1.4879999-2.8470001-1.4879999-4.5650005c0-4.4120007,3.3399992-8.6800003,9.0299997-8.6800003	c4.9130001,0,8.3529987,3.3479996,8.3529987,8.137001c0,5.4099998-2.7320004,9.1580009-6.2870007,9.1580009	c-1.9629993,0-3.4330006-1.6229992-2.9619999-3.6149998c0.5650005-2.3770008,1.6569996-4.9419994,1.6569996-6.657999	c0-1.5349998-0.823-2.8169994-2.5300007-2.8169994c-2.007,0-3.618,2.0750008-3.618,4.8570004	c0,1.7700005,0.5979996,2.9680004,0.5979996,2.9680004s-1.9820004,8.3819981-2.3449993,9.9419994	c-0.4020004,1.7220001-0.2460003,4.1409988-0.0709991,5.7229996c0.4510002,0.1769981,0.9020004,0.3540001,1.3689995,0.4990005	c0.8169994-1.3279991,2.0340004-3.5060005,2.4860001-5.2420006c0.243-0.9370003,1.2469997-4.7550011,1.2469997-4.7550011	c0.6520004,1.243,2.5569992,2.2970009,4.5830002,2.2970009c6.0320015,0,10.3779984-5.5470009,10.3779984-12.4399986	C36.7729988,16.3600006,31.382,11.4169998,24.4430008,11.4169998z"/></svg>
                    </div>  
               )
               break;
          }
          case 5:{
               return(
                    <div className='app-plat-logo-main-cont'>
                        <svg    className='app-plat-logo-ico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="tS~Tu1dsT5kMXF2Lct~HUa" x1="24.001" x2="24.001" y1="-4.765" y2="56.31" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4caf50"/><stop offset=".489" stop-color="#4aaf50"/><stop offset=".665" stop-color="#43ad50"/><stop offset=".79" stop-color="#38aa50"/><stop offset=".892" stop-color="#27a550"/><stop offset=".978" stop-color="#11a050"/><stop offset="1" stop-color="#0a9e50"/></linearGradient><path fill="url(#tS~Tu1dsT5kMXF2Lct~HUa)" d="M24.001,4c-11.077,0-20,8.923-20,20s8.923,20,20,20c11.076,0,20-8.923,20-20	S35.077,4,24.001,4z"/><path d="M21.224,15.938c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 c-0.145,1.023-0.877,1.755-1.899,1.755c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217 c-2.631,0-5.262,0.293-7.6,0.877c-0.293,0-0.585,0.146-1.023,0.146c-0.075,0.011-0.149,0.016-0.221,0.016 c-0.905,0-1.533-0.821-1.533-1.77c0-1.023,0.585-1.607,1.315-1.754C14.939,16.231,17.862,15.938,21.224,15.938 M20.785,22.369 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461c0,0.878-0.585,1.608-1.462,1.608 c-0.438,0-0.73-0.144-1.023-0.291c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733 c-0.439,0.144-0.585,0.144-0.877,0.144c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607 C15.523,22.808,17.716,22.369,20.785,22.369 M21.223,28.654c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314c-0.146,0.586-0.731,1.023-1.315,1.023c-0.292,0-0.585-0.145-0.877-0.292 c-2.777-1.607-6.139-2.484-9.792-2.484c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146 c-0.731,0-1.169-0.586-1.169-1.17c0-0.73,0.438-1.17,1.023-1.314C16.4,28.945,18.739,28.654,21.223,28.654 M21.224,14.938 c-3.789,0-6.666,0.371-9.317,1.202c-1.254,0.279-2.06,1.341-2.06,2.722c0,1.553,1.112,2.77,2.533,2.77 c0.095,0,0.192-0.005,0.291-0.017c0.319-0.007,0.574-0.065,0.764-0.107c0.068-0.015,0.13-0.035,0.193-0.038h0.123l0.116-0.03 c2.219-0.554,4.763-0.847,7.358-0.847c5.073,0,10.075,1.152,13.381,3.081l0.09,0.053l0.099,0.033 c0.109,0.036,0.195,0.073,0.273,0.105c0.251,0.105,0.563,0.236,1.065,0.236c1.483,0,2.671-1.075,2.889-2.615l0.01-0.07v-0.071 c0-1.171-0.564-2.13-1.549-2.635C33.238,16.313,27.314,14.938,21.224,14.938L21.224,14.938z M20.785,21.369 c-3.291,0-5.651,0.508-7.711,1.057l-0.058,0.015l-0.055,0.022c-1.194,0.476-1.799,1.329-1.799,2.536 c0,1.357,1.104,2.461,2.462,2.461c0.371,0,0.626-0.009,1.189-0.194c1.572-0.429,3.714-0.683,5.827-0.683 c4.441,0,8.562,1.037,11.603,2.921l0.038,0.024l0.04,0.02c0.334,0.168,0.792,0.397,1.471,0.397c1.404,0,2.462-1.121,2.462-2.608 c0-0.996-0.53-1.886-1.387-2.334C31.04,22.659,26.04,21.369,20.785,21.369L20.785,21.369z M21.223,27.654 c-2.547,0-4.969,0.297-7.404,0.907c-1.096,0.27-1.78,1.145-1.78,2.284c0,1.217,0.953,2.17,2.169,2.17 c0.172,0,0.334-0.037,0.522-0.079c0.101-0.023,0.288-0.065,0.357-0.067l0.101-0.003l0.122-0.023 c2.023-0.467,3.963-0.704,5.768-0.704c3.422,0,6.635,0.812,9.291,2.35l0.025,0.015l0.026,0.013 c0.334,0.168,0.792,0.399,1.327,0.399c1.05,0,2.032-0.766,2.285-1.781l0.03-0.119v-0.123c0-1.202-0.595-1.76-1.178-2.147 l-0.022-0.014l-0.022-0.013C29.455,28.713,25.437,27.654,21.223,27.654L21.223,27.654z" opacity=".05"/><path d="M21.224,15.938c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 c-0.145,1.023-0.877,1.755-1.899,1.755c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217 c-2.631,0-5.262,0.293-7.6,0.877c-0.293,0-0.585,0.146-1.023,0.146c-0.075,0.011-0.149,0.016-0.221,0.016 c-0.905,0-1.533-0.821-1.533-1.77c0-1.023,0.585-1.607,1.315-1.754C14.939,16.231,17.862,15.938,21.224,15.938 M20.785,22.369 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461c0,0.878-0.585,1.608-1.462,1.608 c-0.438,0-0.73-0.144-1.023-0.291c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733 c-0.439,0.144-0.585,0.144-0.877,0.144c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607 C15.523,22.808,17.716,22.369,20.785,22.369 M21.223,28.654c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314c-0.146,0.586-0.731,1.023-1.315,1.023c-0.292,0-0.585-0.145-0.877-0.292 c-2.777-1.607-6.139-2.484-9.792-2.484c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146 c-0.731,0-1.169-0.586-1.169-1.17c0-0.73,0.438-1.17,1.023-1.314C16.4,28.945,18.739,28.654,21.223,28.654 M21.224,15.438 c-3.747,0-6.582,0.366-9.188,1.186c-1.042,0.222-1.689,1.078-1.689,2.238c0,1.273,0.893,2.27,2.033,2.27 c0.084,0,0.169-0.005,0.257-0.016c0.28-0.004,0.506-0.055,0.689-0.096c0.119-0.027,0.222-0.05,0.299-0.05h0.061l0.06-0.015 c2.258-0.564,4.844-0.862,7.479-0.862c5.158,0,10.254,1.177,13.633,3.149l0.045,0.026l0.05,0.016 c0.123,0.041,0.221,0.082,0.309,0.119c0.231,0.097,0.47,0.197,0.871,0.197c1.247,0,2.209-0.878,2.394-2.185l0.005-0.035v-0.035 c0-0.985-0.473-1.787-1.298-2.201C33.083,16.794,27.24,15.438,21.224,15.438L21.224,15.438z M20.785,21.869 c-3.054,0-5.24,0.416-7.583,1.04l-0.029,0.008l-0.028,0.011c-0.637,0.254-1.484,0.745-1.484,2.071c0,0.943,0.75,1.961,1.962,1.961 c0.34,0,0.541-0.008,1.033-0.169c1.637-0.447,3.827-0.708,5.983-0.708c4.533,0,8.747,1.064,11.867,2.996 c0.345,0.175,0.725,0.366,1.286,0.366c1.119,0,1.962-0.906,1.962-2.108c0-0.823-0.442-1.554-1.154-1.909 C30.885,23.141,25.965,21.869,20.785,21.869L20.785,21.869z M21.223,28.154c-2.506,0-4.888,0.292-7.283,0.892 c-0.864,0.213-1.401,0.902-1.401,1.799c0,0.821,0.624,1.67,1.669,1.67c0.116,0,0.246-0.029,0.411-0.067 c0.148-0.033,0.351-0.079,0.466-0.079h0.057l0.056-0.013c2.06-0.476,4.038-0.717,5.88-0.717c3.51,0,6.809,0.836,9.542,2.417 c0.331,0.168,0.712,0.359,1.127,0.359c0.827,0,1.601-0.603,1.8-1.402l0.015-0.06v-0.061c0-1.012-0.493-1.424-0.954-1.73 C29.277,29.189,25.348,28.154,21.223,28.154L21.223,28.154z" opacity=".07"/><path fill="#fff" d="M31.747,33.915c-0.292,0-0.585-0.145-0.877-0.292c-2.777-1.607-6.139-2.484-9.792-2.484 c-2.047,0-4.093,0.291-5.993,0.73c-0.292,0-0.731,0.146-0.877,0.146c-0.731,0-1.169-0.586-1.169-1.17 c0-0.73,0.438-1.17,1.023-1.314c2.338-0.586,4.677-0.877,7.161-0.877c4.093,0,7.893,1.021,11.108,2.924 c0.438,0.291,0.731,0.584,0.731,1.314C32.916,33.478,32.331,33.915,31.747,33.915z M33.793,28.945c-0.438,0-0.73-0.144-1.023-0.291 c-3.068-1.9-7.308-3.071-12.13-3.071c-2.339,0-4.531,0.293-6.139,0.733c-0.439,0.144-0.585,0.144-0.877,0.144 c-0.877,0-1.462-0.73-1.462-1.461c0-0.877,0.439-1.316,1.169-1.607c2.192-0.584,4.385-1.023,7.454-1.023 c4.97,0,9.793,1.17,13.593,3.507c0.584,0.291,0.877,0.877,0.877,1.461C35.255,28.215,34.67,28.945,33.793,28.945z M36.132,23.101 c-0.438,0-0.585-0.146-1.023-0.291c-3.508-2.047-8.769-3.217-13.885-3.217c-2.631,0-5.262,0.293-7.6,0.877 c-0.293,0-0.585,0.146-1.023,0.146c-1.023,0.146-1.754-0.73-1.754-1.754c0-1.023,0.585-1.607,1.315-1.754 c2.777-0.877,5.7-1.17,9.062-1.17c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754 C37.886,22.369,37.154,23.101,36.132,23.101z"/></svg>
                    </div>  
               )
               break;
          }
          default:{
               return(
                    <div className='app-plat-logo-main-cont'>
                         <svg className='app-plat-logo-ico' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M17,7h-3c-0.55,0-1,0.45-1,1s0.45,1,1,1h3c1.65,0,3,1.35,3,3s-1.35,3-3,3h-3c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h3 c2.76,0,5-2.24,5-5S19.76,7,17,7z M8,12c0,0.55,0.45,1,1,1h6c0.55,0,1-0.45,1-1s-0.45-1-1-1H9C8.45,11,8,11.45,8,12z M10,15H7 c-1.65,0-3-1.35-3-3s1.35-3,3-3h3c0.55,0,1-0.45,1-1s-0.45-1-1-1H7c-2.76,0-5,2.24-5,5s2.24,5,5,5h3c0.55,0,1-0.45,1-1 C11,15.45,10.55,15,10,15z"/></g></g></svg>
                    </div>  
               )
               break;
          }
     }
     return(
          <div>null</div>
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

     

     }
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
                                    if(!res.responseData.init_bool){
                                        console.log('User is not initiated');
                                        this.props.router.replace('/src/initAccount');
                                        return;
                                    }
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
     
     componentDidMount(){
          console.log('component mount');
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
               <div className='app-main-cont-main-body land-body-cont'   id='lnk-lnk-main-cont-id'>
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
                         <HeaderCont setdarkMode={this.setdarkMode} darkMode={this.state.darkMode} />
                         <LandNavBarCont router={this.props.router}/>
                         <div id='app-main-cont-body-id'>
                              <div className='app-body-main-cont'>
                                   <div className='app-land-link-cont-holder top-holder-cont'>
                                             <div className='app-land-link-intro-pro-main-cont'> 
                                                                 <div className='app-land-head-pro-pic-main-cont'>
                                                                      <img src={User!.getUserData()?User!.getUserData()!.pro_photo_url:'https://ik.imagekit.io/cyte/sakura/Men-Profile-Image_8c3Wj4y8S.png?updatedAt=1626883535964'} className='app-land-head-pro-pic-main-cont-pic' />
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
                                                                      </div>:
                                                                 <span/>
                                                            }
                                                            <div className='app-land-pro-edit-main-cont'>
                                                                      <a href="/src/setting">
                                                                      <button className='app-land-pro-edit-butt ' disabled>
                                                                      <svg className='app-land-pro-edit-butt-ico'  width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                           <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                                                           <path d="M10 23.4625V26.5025C10 26.7825 10.22 27.0025 10.5 27.0025H13.54C13.67 27.0025 13.8 26.9525 13.89 26.8525L24.81 15.9425L21.06 12.1925L10.15 23.1025C10.05 23.2025 10 23.3225 10 23.4625ZM27.71 13.0425C28.1 12.6525 28.1 12.0225 27.71 11.6325L25.37 9.2925C24.98 8.9025 24.35 8.9025 23.96 9.2925L22.13 11.1225L25.88 14.8725L27.71 13.0425V13.0425Z" fill="currentColor"/>
                                                                           </svg>
                                                                      </button>
                                                                      </a>
                                                            </div>
                                             </div>
                                                  <WelcomeHead/>
                                             
                                        </div>
                                   
                                        <div className='app-land-link-cont-holder cluster-holder-cont' style={{display:'none'}}> 
                                        <div className='app-land-lab-main-cont'>
                                             <svg 
                                             className='app-land-lab-main-cont-ico'
                                             width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <rect x="1.5" y="1.5" width="34" height="34" rx="11.5" stroke="currentColor" stroke-width="3"/>
                                             <path d="M7.53693 27.6692C7.35423 28.4772 7.86117 29.2804 8.6692 29.4631C9.47723 29.6458 10.2804 29.1388 10.4631 28.3308L7.53693 27.6692ZM17.8372 20.2856L18.4988 18.9394L17.8372 20.2856ZM24.3488 16.1714L25.7594 16.6816L24.3488 16.1714ZM29.8013 11.2681C30.5016 10.8255 30.7106 9.89908 30.2681 9.19875C29.8255 8.49841 28.8991 8.28941 28.1987 8.73193L29.8013 11.2681ZM10.4631 28.3308C10.8785 26.4934 11.9312 24.3034 13.2911 22.8554C14.6505 21.4079 15.9389 21.024 17.1756 21.6318L18.4988 18.9394C15.5495 17.49 12.8844 18.9063 11.1043 20.8017C9.32461 22.6966 8.05173 25.3923 7.53693 27.6692L10.4631 28.3308ZM17.1756 21.6318C18.7042 22.383 20.045 22.7619 21.2289 22.6833C22.5121 22.5981 23.4451 21.9875 24.0794 21.1478C24.657 20.3833 24.9674 19.4554 25.1824 18.7077C25.4305 17.8452 25.5468 17.2694 25.7594 16.6816L22.9383 15.6611C22.6858 16.3591 22.4684 17.2906 22.2993 17.8785C22.0972 18.5812 21.907 19.0465 21.6857 19.3394C21.5213 19.5571 21.3571 19.6681 21.0301 19.6899C20.6039 19.7182 19.8214 19.5894 18.4988 18.9394L17.1756 21.6318ZM25.7594 16.6816C26.2459 15.3368 26.534 14.5035 27.0524 13.7219C27.5422 12.9834 28.2943 12.2203 29.8013 11.2681L28.1987 8.73193C26.4499 9.83698 25.3415 10.8738 24.5523 12.0637C23.7916 13.2106 23.382 14.4344 22.9383 15.6611L25.7594 16.6816Z" 
                                             fill="currentColor"/>
                                             </svg>
                                        Link Activity (Comming Soon)</div>
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
                                                  <LandFullVisitChart/>
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
                                                  <svg  className='lnk-lnk-gen-right-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 18H6c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h1v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V4h1c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1z"/></svg>
                                             </button>
                                             </div>
                                        </div>
                                        <div className='clust-visit-main-cont'>
                                                       <a className='clust-visit-main-cont-lnk' href={_BASE_CLIENT_URL+'src/cluster'}>
                                                       Go to cluster settings
                                                       {/* <svg className='clust-visit-main-cont-ico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="UoM~0_1BpfEneny~ePS0ba" x1="8.469" x2="42.33" y1="8.469" y2="42.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"/><stop offset="1" stop-color="#007ad9"/></linearGradient><path fill="url(#UoM~0_1BpfEneny~ePS0ba)" d="M39,41H9c-1.1,0-2-0.9-2-2V9c0-1.1,0.9-2,2-2h30c1.1,0,2,0.9,2,2v30C41,40.1,40.1,41,39,41z"/><path d="M41,7h-5.528L20.695,21.777c-0.746,0.746-0.746,1.954,0,2.7l2.828,2.828 c0.746,0.746,1.954,0.746,2.7,0L41,12.528V7z" opacity=".018"/><path d="M41,7h-5.4L20.759,21.841c-0.71,0.71-0.71,1.861,0,2.571l2.828,2.828 c0.71,0.71,1.861,0.71,2.571,0L41,12.4V7z" opacity=".036"/><path d="M41,7h-5.271L20.823,21.906c-0.675,0.675-0.675,1.768,0,2.443l2.828,2.828 c0.675,0.675,1.768,0.675,2.443,0L41,12.271V7z" opacity=".054"/><path d="M41,7h-5.143l-14.97,14.97c-0.639,0.639-0.639,1.675,0,2.314l2.828,2.828 c0.639,0.639,1.675,0.639,2.314,0L41,12.143V7z" opacity=".073"/><path d="M41,7h-5.014L20.952,22.034c-0.604,0.604-0.604,1.582,0,2.186l2.828,2.828 c0.604,0.604,1.582,0.604,2.186,0L41,12.014V7z" opacity=".091"/><path d="M41,7h-4.885L21.016,22.098c-0.568,0.568-0.568,1.489,0,2.057l2.828,2.828 c0.568,0.568,1.489,0.568,2.057,0L41,11.885V7z" opacity=".109"/><path d="M41,7h-4.757L21.081,22.163c-0.533,0.533-0.533,1.396,0,1.928l2.828,2.828 c0.533,0.533,1.396,0.533,1.928,0L41,11.757V7z" opacity=".127"/><path d="M41,7h-4.628L21.145,22.227c-0.497,0.497-0.497,1.303,0,1.8l2.828,2.828 c0.497,0.497,1.303,0.497,1.8,0L41,11.628V7z" opacity=".145"/><path d="M41,7h-4.5L21.209,22.291c-0.462,0.462-0.462,1.21,0,1.671l2.828,2.828 c0.462,0.462,1.21,0.462,1.671,0L41,11.5V7z" opacity=".164"/><path d="M41,7h-4.371L21.273,22.355c-0.426,0.426-0.426,1.117,0,1.543l2.828,2.828 c0.426,0.426,1.117,0.426,1.543,0L41,11.371V7z" opacity=".182"/><path d="M41,7h-4.243l-15.42,15.42c-0.391,0.391-0.391,1.024,0,1.414l2.828,2.828 c0.391,0.391,1.024,0.391,1.414,0L41,11.243V7z" opacity=".2"/><path fill="#50e6ff" d="M36.452,1.379l2.963,2.963L21.338,22.42c-0.391,0.391-0.391,1.024,0,1.414l2.828,2.828	c0.391,0.391,1.024,0.391,1.414,0L43.658,8.585l2.963,2.963C47.13,12.057,48,11.697,48,10.977l0-9.361C48,0.723,47.277,0,46.384,0	l-9.361,0C36.303,0,35.943,0.87,36.452,1.379z"/></svg> */}
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
                                   <Spinner
                                   as="span"
                                   animation="border"
                                   size="sm"
                                   role="status"
                                   aria-hidden="true"
                                   />
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