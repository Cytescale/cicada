import React,{useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Links from "./links";
import Analytics from "./analytics";
import Profile from "./profile";
import Dash from "./dash";
import user from "../../../comp/utils/user";
import firebaseHelper,{getUid,checkToken} from "../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../comp/helpers/backendHelper";
import { withRouter, NextRouter } from 'next/router'
import FullHeiLoading from '../fullHeightLoading';
import Head from "next/head";
import  {Accordion, Card, Dropdown, Modal, Spinner}  from "react-bootstrap";
import { ToastContainer,toast } from "react-toastify";
import nexusResponse from "../../../comp/helpers/nexusResponse";
import { linkDataType } from "../../../comp/utils/link";
import Link from 'next/link'
import URLS from "../../../comp/helpers/api.routes";
import copy from 'copy-to-clipboard';
import { push as Menu } from 'react-burger-menu'
import LandVisitChart,{landFullVisitChart as FullVisitChart} from './landChart';

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
          </div>:
          <span/>
     )
}
const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();
const User = new user();

const data = (canvas:any) => {
     const ctx = canvas.getContext('2d'); 
     return {
         datasets: [{
             backgroundColor: '#f5f5f5',
             // ...the rest
         }],
     };
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
     }
     setfeedbackModalVisi(b:boolean){this.setState({feedbackModalVisi:b})}
     seteditLinkModalVisi(b:boolean){this.setState({editLinkModalVisi:b})}
     setvalidated(b:boolean){this.setState({validated:b})}
     setvalidityLoading(b:boolean){this.setState({validityLoading:b})}
     setLinksData(v:Array<linkDataType>){this.setState({linksData:v})}
     setlinkDataLoading(b:boolean){this.setState({linkDataLoading:b})}
     setLinkName(s:string){this.setState({linkName:s});}
     setLinkDest(s:string){
     this.setvalidated(false);    
     this.setState({linkDest:s})
     this.validateOnChange(s)}
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
                         BackendHelper._getUserInfo(User.getUserUid()).then((res:nexusResponse)=>{
                              if(res){
                                   if(!res.errBool){
                                         User.setUserData(res.responseData);
                                         console.log(res.responseData);
                                        //  toast.dark('User data loaded', {
                                        //      position: toast.POSITION.TOP_CENTER,
                                        //      autoClose: 5000,
                                        //      hideProgressBar: true,
                                        //      closeOnClick: true,
                                        //      pauseOnHover: true,
                                        //      draggable: true,
                                        //      progress: undefined,
                                        // });
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
                                    User.setUserData(res.responseData);
                                    console.log(res.responseData);
                                    this.setLinksData(res.responseData);
                                   //  toast.dark('Link data loaded', {
                                   //      position: toast.POSITION.TOP_CENTER,
                                   //      autoClose: 5000,
                                   //      hideProgressBar: true,
                                   //      closeOnClick: true,
                                   //      pauseOnHover: true,
                                   //      draggable: true,
                                   //      progress: undefined,
                                   // });
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
     
     renderBurgerMenu(){
          return(
               <Menu pageWrapId={"app-main-cont-body-id"} outerContainerId={'lnk-lnk-main-cont-id'}>
               <a id="home" className="menu-item" href="/">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className='menu-item-ico'>
                         <path d="M17 7H14C13.45 7 13 7.45 13 8C13 8.55 13.45 9 14 9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H14C13.45 15 13 15.45 13 16C13 16.55 13.45 17 14 17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM8 12C8 12.55 8.45 13 9 13H15C15.55 13 16 12.55 16 12C16 11.45 15.55 11 15 11H9C8.45 11 8 11.45 8 12ZM10 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H10C10.55 9 11 8.55 11 8C11 7.45 10.55 7 10 7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H10C10.55 17 11 16.55 11 16C11 15.45 10.55 15 10 15Z" fill="currentColor"/>
                         </svg>
                    Links</a>
               <a id="about" className="menu-item" href="/about">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='menu-item-ico'>
                         <path d="M21 8C19.55 8 18.74 9.44 19.07 10.51L15.52 14.07C15.22 13.98 14.78 13.98 14.48 14.07L11.93 11.52C12.27 10.45 11.46 9 10 9C8.55 9 7.73 10.44 8.07 11.52L3.51 16.07C2.44 15.74 1 16.55 1 18C1 19.1 1.9 20 3 20C4.45 20 5.26 18.56 4.93 17.49L9.48 12.93C9.78 13.02 10.22 13.02 10.52 12.93L13.07 15.48C12.73 16.55 13.54 18 15 18C16.45 18 17.27 16.56 16.93 15.48L20.49 11.93C21.56 12.26 23 11.45 23 10C23 8.9 22.1 8 21 8Z" fill="currentColor"/>
                         <path d="M15 9L15.94 6.93L18 6L15.94 5.07L15 3L14.08 5.07L12 6L14.08 6.93L15 9Z" fill="currentColor"/>
                         <path d="M3.5 11L4 9L6 8.5L4 8L3.5 6L3 8L1 8.5L3 9L3.5 11Z" fill="currentColor"/>
                         </svg>
                    Analytics</a>
               <a id="contact" className="menu-item" href="/contact">
               <svg width="24" height="24" viewBox="0 0 24 23" fill="none" className='menu-item-ico'>
                         <path d="M3.08928 21.9859C1.76509 21.1674 -0.287408 18.9164 2.09614 16.4608C5.07557 13.3913 12.0276 13.3913 12.5241 13.3913C13.0207 13.3913 21.1781 14.4426 22.4556 17.0747C23.9453 20.1442 21.959 22.1906 21.4624 21.9859" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                         <path d="M17 5.73913C17 8.31505 14.8038 10.4783 12 10.4783C9.19622 10.4783 7 8.31505 7 5.73913C7 3.16321 9.19622 1 12 1C14.8038 1 17 3.16321 17 5.73913Z" stroke="currentColor" stroke-width="2"/>
                         </svg>
                    Profile</a>
                    <a id="contact" className="menu-item" href="/contact">
                         <svg className='menu-item-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
                         Help</a>

                    <div className="menu-item-bottom-menu">
                    <button className="menu-item-lgout">
                         Logout
                    </button>
                    <div className="menu-item-bottom-v">v 0.0.1 </div>
                    </div>
             </Menu>
             )
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
                              <span>Edit Link</span>
                         }     
                         </button>
                    </div>
               </div>
               </Modal>
          )
     }
     renderLinkCreateModal(){
          return(
               <Modal
               show={this.state.createLinkModalVisi}
               onHide={()=>{this.setcreateLinkModalVisi(false)}}
               size="lg"
               centered
               animated
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
                              type='text' 
                              disabled={this.state.makeLinkLoading}
                              placeholder='eg: www.link.com'
                              className='app-create-link-modal-main-cont-fld'
                              value={this.state.linkDest}
                              onChange={(e)=>{
                                   this.setvalidityLoading(true); 
                                   this.setvalidated(false);
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
                    {
                    this.state.validityLoading==true?
                         <div className='app-land-url-valid-indi-load-cont'>
                              <Spinner
                                   as="span"
                                   animation="border"
                                   size="sm"
                                   role="status"
                                   aria-hidden="true"/>
                         </div>:
                    this.renderValidityIndi()
                    }
                    </div>

                    <div className='app-create-link-modal-main-cont-fld-cont'>
                    {
                         this.state.validated?
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
               </Modal>
          )
     }
     renderLinkEditModal(){
          return(
               <Modal
               show={this.state.editLinkModalVisi}
               onHide={()=>{this.seteditLinkModalVisi(false)}}
               size="lg"
               centered
               animated
               >
               <div className='app-create-link-modal-main-cont'>
                    <div className='app-create-link-modal-main-cont-tit'>
                    Edit Link
                    </div>
                    <div className='app-create-link-modal-main-cont-des'>
                    Edit the generated link by changing display name , custom url etc.
                    </div>
                    <div className='app-create-link-modal-hr'/>
                    {
                         this.state.platform_id>0?
                         <div className='app-land-plat-indi-cont'>
                         {this.renderPlatformDrop()}
                         </div>:
                         <span/>
                    }

                    <div className='app-create-link-modal-main-cont-fld-cont'>
                              <div className='app-create-link-modal-main-cont-fld-tit'>Link Display Name</div>
                              <input 
                              type='text' 
                              disabled={this.state.makeLinkLoading}
                              placeholder='eg: YoutubeLink'
                              className='app-create-link-modal-main-cont-fld'
                              value={this.state.linkName}
                              onChange={(e)=>{this.setLinkName(e.target.value)}}
                              />
                    </div>
                    <div className='app-create-link-modal-main-cont-fld-cont'>
                              <div className='app-create-link-modal-main-cont-fld-tit'>Link Destination Url</div>
                              <input 
                              type='text' 
                              disabled={true}
                              placeholder='eg: www.link.com'
                              className='app-create-link-modal-main-cont-fld'
                              value={this.state.linkDest}
                              onChange={(e)=>{
                                   this.setvalidityLoading(true); 
                                   this.setvalidated(false);
                                   this.setLinkDest(e.target.value)}
                              }
                              />
                    </div>
                    <div className='app-create-link-modal-main-cont-fld-cont'>
                              <div className='app-create-link-modal-main-cont-fld-tit'>Link Url</div>
                              <input 
                              type='text' 
                              disabled={this.state.makeLinkLoading}
                              placeholder='eg: www.link.com'
                              className='app-create-link-modal-main-cont-fld'
                              value={this.state.linkDest}
                              onChange={(e)=>{
                                   this.setvalidityLoading(true); 
                                   this.setvalidated(false);
                                   this.setLinkDest(e.target.value)}
                              }
                              />
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
                              <span>Edit Link</span>
                         }     
                         </button>
                    </div>
                    <div className='app-create-link-modal-hr'/>
                    <button className='app-create-link-edt-del-butt'>
                           <svg className='app-create-link-edt-del-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
                            Delete
                    </button>

               </div>
               </Modal>
          )
     }

     renderLink(ind:number,d:linkDataType){
          return(
               <div className='lnk-lnk-main-cont'>
                    <div className='lnk-lnk-head-main-cont'>
                              <div className='lnk-lnk-head-main-cont-name-cont'>
                                    {this.renderLinkLogo(Number.parseInt(d.platform_id))}
                                    {d.name}
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
                                   <input type="checkbox" />
                                   <span className="slider round"></span>
                              </label>
                              </div>
                    </div>
                    <div className='lnk-lnk-gen-cont'>
                         <div className='lnk-lnk-gen-link' onClick={()=>{
                              this.openInNewTab(`${URLS.visit}/${d.unique_identifier}`);
                         }}>
                              {`https://.../visit/${d.unique_identifier}`}
                              <svg className='lnk-lnk-gen-link-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"/></svg>
                         </div>
                         <div className='lnk-lnk-gen-right-cont'>      
                                   <div className='lnk-lnk-gen-right-butt'  onClick={()=>{
                                   copy(`${URLS.visit}/${d.unique_identifier}`);
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
                                   <path d="M15.1975 5L15.217 4.0625C15.2154 3.48285 14.9844 2.9274 14.5745 2.51753C14.1646 2.10765 13.6092 1.87665 13.0295 1.875H4.59204C3.9296 1.87696 3.29485 2.14098 2.82644 2.6094C2.35802 3.07781 2.094 3.71256 2.09204 4.375V12.8125C2.09369 13.3922 2.32469 13.9476 2.73457 14.3575C3.14445 14.7674 3.69989 14.9984 4.27954 15H5.21704" stroke="#0070F3" stroke-linecap="round" stroke-linejoin="round"/>
                                   </svg>
                                   </div>
                                   <div className='lnk-lnk-gen-right-butt' onClick={()=>{
                                        this.seteditLinkModalVisi(true);
                                   }}>
                                        <svg className='lnk-lnk-gen-right-butt-ico' enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M3,17.46l0,3.04C3,20.78,3.22,21,3.5,21h3.04c0.13,0,0.26-0.05,0.35-0.15L17.81,9.94l-3.75-3.75L3.15,17.1 C3.05,17.2,3,17.32,3,17.46z"/></g><g><path d="M20.71,5.63l-2.34-2.34c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83C21.1,6.65,21.1,6.02,20.71,5.63z"/></g></g></g></svg>
                              {/* <svg className='lnk-lnk-gen-right-butt-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#0070F3"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg> */}
                              </div>
                         </div>          
                    </div>
               </div>
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
          if(this.state.validated){
          if(this.state.linkName && this.state.linkDest){
               if(this.state.platform_id!==0){
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
                                  "ban_bool":false
                              }
                          }
                         BackendHelper._createLink(link_data).then((res:nexusResponse)=>{
                              if(res){
                                   if(!res.errBool){
                                         User.setUserData(res.responseData);
                                         console.log(res.responseData);
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
               this.state.linksData.map((e:linkDataType,ind:number)=>{
                    res.push(this.renderLink(ind,e));
               })
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
               <div className='app-main-cont-main-body land-body-cont'   id='lnk-lnk-main-cont-id'>
                    <Head>
                    <title>Sakura</title>
                    <meta name="description" content="Cicada Login Activity" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico" />
                    </Head>
                              {this.renderBurgerMenu()}
                              <div className='app-head-main-cont link-head-body-cont'>
                              <div className='app-head-main-cont-logo link-head-logo'>
                              Sakura
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
                              </div>
                         </div>
                         <div id='app-main-cont-body-id'>
                         <div className='app-body-main-cont'>
                              <div className='app-body-topper-main-cont'>
                                   <WelcomeHead/>
                                   {/* <div className='app-create-link-modal-hr'/> */}
                                   <div className='app-land-visit-card-main-outer-cont'>
                                   <div className='app-land-visit-card-main-cont'>
                                        <div className='app-land-visit-card-left-cont'>
                                             <div className='app-land-visit-card-left-lab'>Visitors {this.renderIncri(45)}</div>
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
                                   <div className='app-create-link-modal-hr'/>
                              </div>
                            
                              
                              <div className='app-land-lab-main-cont'>Links {this.state.linksData.length}</div>
                              <button className='app-land-crt-lnk-butt'
                              onClick={()=>{this.setcreateLinkModalVisi(true)}}
                              > Create Link </button>
                              {
                              this.state.linkDataLoading?
                              <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              />:
                              <span>
                              {this.renderLinkTable()}
                              </span>
                              }
                              <div className='app-create-link-modal-hr'/>
                         </div>
                         <div className='app-land-mto-main-cont'>Made with Love ❤️</div>
                         </div>
                         <button className='app-land-feed-butt-main-cont' onClick={()=>{this.setfeedbackModalVisi(true)}}>
                              <svg  className='app-land-feed-butt-main-ico'xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4.01c-1.1 0-2 .9-2 2v18L6 18h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-5c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1s1 .45 1 1v2z"/></svg>
                         </button>
                        {this.renderLinkEditModal()}
                        {this.renderLinkCreateModal()}
                        {this.renderFeedbackModal()}
                              <ToastContainer />
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


