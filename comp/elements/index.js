import React,{useEffect, useRef, useState} from "react";
import {Accordion, Button, Card, Dropdown, Modal, Overlay, Popover, Spinner}  from "react-bootstrap";
import { slide as Menu } from 'react-burger-menu'
import URLS,{_BASE_CLIENT_URL} from "../helpers/api.routes";
import backendHelper from "../helpers/backendHelper";

import user from "../utils/user";

const BackendHelper =  new backendHelper();
const User = new user();

const FeedbackCont = (props)=>{
     const [visi,setvisi] = useState(props.visi);
     const handleClose = () => setvisi(false);
     return(
          <Modal 
          show={visi} 
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          >
           <div className='app-land-act-delete-bdy-cont'>
                         <div className='app-land-act-delete-tab'>Feedback</div>
                         <div className='app-land-act-delete-sub-tab'>Tell us what you feel about us :)</div>
                         <textarea
                         className='app-feedback-text-area'
                         placeholder='Tell us'
                         />
                         <div className='app-land-act-delete-opt-cont'>
                              <button className='app-land-act-delete-opt-cal'
                                   onClick={()=>{
                                        setvisi(false);         
                                   }}
                              >
                                   Cancel
                              </button>
                              <button className='app-land-act-set-opt-del'>
                                   Send
                              </button>
                         </div>
               </div>
        </Modal>
     )
}

const BottomCont =(prop)=>{
     return(
          <span/>
          // <div className='app-bottom-cont-main-cont'>
          //      <div className='app-bottom-cont-lnk-cont'>Home</div>
          //      <div className='app-bottom-cont-lnk-cont'>About Us</div>
          //      <div className='app-bottom-cont-lnk-cont'>Terms of conditions</div>
          //      <div className='app-bottom-cont-lnk-cont'>Privacy Policy</div>
          //      <div className='app-bottom-cont-lnk-cont'>DMCA Policy</div>
          //      <div className='app-bottom-cont-main-logo'>Cytelink</div>
          //      <div className='app-bottom-cont-main-sys-stat'>
          //           Status:
          //           <div className='app-bottom-cont-main-sys-stat-lab'>
          //                <div className='app-bottom-cont-main-sys-stat-lab-cir'/>
          //                All systems normal</div>
          //      </div>
          //      <div className='app-bottom-cont-main-copy-cont'>
          //           Copyright &#xA9; 2021 Cytelink, All rights reserved.
          //      </div>
          // </div>
     )
}

const ProfilePopover = (props)=>{
     const [show, setShow] = useState(false);
     const [target, setTarget] = useState(null);
     const ref = useRef(null);
     const handleClick = (event) => {
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
                    {User?.getUserData()?.email?User.getUserData().email.slice(0,20) + (User.getUserData().email.length >20 ? "..." : ""):null}
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
                    //   setShow(!show);
                    //     props.setlgoutShow(true)
               }
               }
                 >
                         Logout
            </Button>
           </Popover>
         </Overlay>
       </div>
     );
}
const BurgerMenu = (props)=>{
     return(
          <Menu pageWrapId={"app-main-cont-body-id"} outerContainerId={'lnk-lnk-main-cont-id'}>
          <a className={`menu-item ${props.router.pathname=='/src/land'?'menu-item-selec':null}`} href="/">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className='menu-item-ico'>
                    <path d="M17 7H14C13.45 7 13 7.45 13 8C13 8.55 13.45 9 14 9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H14C13.45 15 13 15.45 13 16C13 16.55 13.45 17 14 17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM8 12C8 12.55 8.45 13 9 13H15C15.55 13 16 12.55 16 12C16 11.45 15.55 11 15 11H9C8.45 11 8 11.45 8 12ZM10 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H10C10.55 9 11 8.55 11 8C11 7.45 10.55 7 10 7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H10C10.55 17 11 16.55 11 16C11 15.45 10.55 15 10 15Z" fill="currentColor"/>
                    </svg>
               Links</a>
          <a  className={`menu-item ${props.router.pathname=='/src/cluster'?'menu-item-selec':null}`} href="/src/cluster">
                   <svg className='menu-item-ico' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><path d="M4,14h2c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v2C3,13.55,3.45,14,4,14z M4,19h2c0.55,0,1-0.45,1-1 v-2c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v2C3,18.55,3.45,19,4,19z M4,9h2c0.55,0,1-0.45,1-1V6c0-0.55-0.45-1-1-1H4 C3.45,5,3,5.45,3,6v2C3,8.55,3.45,9,4,9z M9,14h11c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v2 C8,13.55,8.45,14,9,14z M9,19h11c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v2C8,18.55,8.45,19,9,19z M8,6v2 c0,0.55,0.45,1,1,1h11c0.55,0,1-0.45,1-1V6c0-0.55-0.45-1-1-1H9C8.45,5,8,5.45,8,6z"/></svg>
               Clutser</a>
          <a  className={`menu-item ${props.router.pathname=='/src/setting'?'menu-item-selec':null}`} href="/src/setting">
          <svg width="24" height="24" viewBox="0 0 24 23" fill="none" className='menu-item-ico'>
                    <path d="M3.08928 21.9859C1.76509 21.1674 -0.287408 18.9164 2.09614 16.4608C5.07557 13.3913 12.0276 13.3913 12.5241 13.3913C13.0207 13.3913 21.1781 14.4426 22.4556 17.0747C23.9453 20.1442 21.959 22.1906 21.4624 21.9859" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 5.73913C17 8.31505 14.8038 10.4783 12 10.4783C9.19622 10.4783 7 8.31505 7 5.73913C7 3.16321 9.19622 1 12 1C14.8038 1 17 3.16321 17 5.73913Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
               Profile</a>
               <a className={`menu-item ${props.router.pathname=='/src/help'?'menu-item-selec':null}`} href="/src/cluster">
                    <svg className='menu-item-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
                    Help</a>

               <div className="menu-item-bottom-menu">
               <div className="menu-item-bottom-v">v 0.1.0</div>
               </div>
        </Menu>
     )

}


const HeaderCont = (props)=>{  
     
     const [bgEnal,setbgEnal]=useState(false);
     const [strtBgAnim,setstrtBgAnim]=useState(false);
     const [endBgAnim,setendBgAnim] = useState(false);

     useEffect(()=>{
          if(props.transiBool  && props.scrollY){
               if(props.scrollY>92){
                    setstrtBgAnim(true);
                    setendBgAnim(false);
               }
               else{
                    setstrtBgAnim(false);
                    setendBgAnim(true);
               }
          }
     },[props.scrollY,props.transiBool]);

     return(
          <div className={
               `app-head-main-cont link-head-body-cont 
               ${props.transiBool?bgEnal?'app-head-main-cont-filled':null:'app-head-main-cont-filled'} 
               ${strtBgAnim?'app-head-main-cont-transi':null}
               ${endBgAnim?'app-head-main-cont-anit-transi':null}
               `}
               
               onAnimationEnd={()=>{
                    if(strtBgAnim){
                         setbgEnal(true);
                         setstrtBgAnim(false);
                    }
                    if(endBgAnim){
                         setendBgAnim(false);
                         setbgEnal(false);
                    }
               }}
               
               >
          <div className='app-head-main-cont-logo link-head-logo'>
               <a href={_BASE_CLIENT_URL+'src/land'}>
                    Cytelink
                    </a>
          </div>
          <div className='app-head-main-right-cont'>
               <button 
               className='app-dark-mode-butt'
               onClick={()=>{
                         props.setdarkMode(!props.darkMode);
                         console.log(User.getUserUid());
                         BackendHelper._updateUserData(User.getUserUid(),{"theme_mode":props.darkMode?"DARK":"LIGHT"});
                         }
                    } >
                    {
                         props.darkMode?
                         <svg  className='app-dark-mode-butt-ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><path d="M11.01,3.05C6.51,3.54,3,7.36,3,12c0,4.97,4.03,9,9,9c4.63,0,8.45-3.5,8.95-8c0.09-0.79-0.78-1.42-1.54-0.95 c-0.84,0.54-1.84,0.85-2.91,0.85c-2.98,0-5.4-2.42-5.4-5.4c0-1.06,0.31-2.06,0.84-2.89C12.39,3.94,11.9,2.98,11.01,3.05z"/></svg>
                         :
                         <svg className='app-dark-mode-butt-ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>
                    }
               </button>
               <a
               className='app-input-class-raised-pressable link-feed-butt'
               href={`https://5b1ul2sttk6.typeform.com/to/Q6MQfXBZ`}
               >Feedback
               </a>
          </div>
     </div>
      )
 }

const NavBarCont = (props)=>{  
     return(
          <div className='app-nav-bar-main-cont cluster-nav-bar-cont'>
                       {/* <div 
                              className={`app-nav-bar-main-link-cont `}>
                              <a 
                                   className='app-nav-lnk-lnk app-nav-bar-back-link'
                                   href='/src/land'>
                                        <svg 
                                        className={`app-nav-bar-main-link-ico`}
                                        xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>
                              </a>
                              </div> */}

                    <div className='cluster-nav-bar-inner-cont'>
                    <div 
                    className={`app-nav-bar-main-link-cont ${props.router.pathname=='/src/cluster'?'app-nav-bar-main-link-cont-selec':null}`}>
                       <a 
                       className='app-nav-lnk-lnk'
                       href={_BASE_CLIENT_URL+'src/cluster'}>
                         <svg
                         className={`app-nav-bar-main-link-ico ${props.router.pathname=='/src/land'?'app-nav-bar-main-link-ico-selec':null}`}
                         xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><path d="M4,14h2c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v2C3,13.55,3.45,14,4,14z M4,19h2c0.55,0,1-0.45,1-1 v-2c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v2C3,18.55,3.45,19,4,19z M4,9h2c0.55,0,1-0.45,1-1V6c0-0.55-0.45-1-1-1H4 C3.45,5,3,5.45,3,6v2C3,8.55,3.45,9,4,9z M9,14h11c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v2 C8,13.55,8.45,14,9,14z M9,19h11c0.55,0,1-0.45,1-1v-2c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v2C8,18.55,8.45,19,9,19z M8,6v2 c0,0.55,0.45,1,1,1h11c0.55,0,1-0.45,1-1V6c0-0.55-0.45-1-1-1H9C8.45,5,8,5.45,8,6z"/></svg>
                         Links
                       </a>
                    </div>
                    <div className={`app-nav-bar-main-link-cont ${props.router.pathname=='/src/design'?'app-nav-bar-main-link-cont-selec':null}`}>
                         <a 
                         className='app-nav-lnk-lnk'
                         href={_BASE_CLIENT_URL+'src/design'}>     
                         <svg 
                         className={`app-nav-bar-main-link-ico ${props.router.pathname=='/src/design'?'app-nav-bar-main-link-ico-selec':null}`}
                         width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M7 27H5V31H7V27ZM27 31C28.1046 31 29 30.1046 29 29C29 27.8954 28.1046 27 27 27V31ZM7 31H27V27H7V31Z" fill="currentColor"/>
                         <path d="M6 24V20.5714L16.973 9.5062C17.7833 8.68907 19.1144 8.72265 19.8825 9.57961L21.1806 11.0279C21.9118 11.8437 21.8506 13.0959 21.0434 13.8365L9.96667 24H6Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                         <path d="M24.8182 10L21 6.18182L21.2727 5.90909C22.3271 4.85473 24.0365 4.85473 25.0909 5.90909C26.1453 6.96345 26.1453 8.67291 25.0909 9.72727L24.8182 10Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                         </svg>
                         Design
                         </a>
                    </div>
                    <div className={`app-nav-bar-main-link-cont ${props.router.pathname=='/src/cluster/settings'?'app-nav-bar-main-link-cont-selec':null}`}>
                         <a
                         className='app-nav-lnk-lnk'
                         href={_BASE_CLIENT_URL+'src/cluster/settings'}>
                          <svg 
                         className={`app-nav-bar-main-link-ico ${props.router.pathname=='/src/land'?'app-nav-bar-main-link-ico-selec':null}`}
                         xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18c0 .55.45 1 1 1h5v-2H4c-.55 0-1 .45-1 1zM3 6c0 .55.45 1 1 1h9V5H4c-.55 0-1 .45-1 1zm10 14v-1h7c.55 0 1-.45 1-1s-.45-1-1-1h-7v-1c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1zM7 10v1H4c-.55 0-1 .45-1 1s.45 1 1 1h3v1c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1zm14 2c0-.55-.45-1-1-1h-9v2h9c.55 0 1-.45 1-1zm-5-3c.55 0 1-.45 1-1V7h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1z"/></svg>
                         Settings
                         </a>
                    </div>
                    </div>
          </div>
      )
 }
 const LandNavBarCont = (props)=>{  
     return(
          <div className='app-nav-bar-main-cont land-nav-bar-cont'>
                    <div 
                    className={`app-nav-bar-main-link-cont ${props.router.pathname=='/src/land'?'app-nav-bar-main-link-cont-selec link-cont-selec-home':null}`}>
                       <a 
                       className='app-nav-lnk-lnk'
                       href={_BASE_CLIENT_URL+'src/land'}>                         
                         <svg 
                         className={`app-nav-bar-main-link-ico ${props.router.pathname=='/src/land'?'app-nav-bar-main-link-ico-selec':null}`}
                         width="37" height="37" viewBox="0 0 37 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                         <path d="M7.5 16.2426V28.5C7.5 30.1569 8.84315 31.5 10.5 31.5H11.5C13.1569 31.5 14.5 30.1569 14.5 28.5V25C14.5 23.3431 15.8431 22 17.5 22H19.5C21.1569 22 22.5 23.3431 22.5 25V28.5C22.5 30.1569 23.8431 31.5 25.5 31.5H26.5C28.1569 31.5 29.5 30.1569 29.5 28.5V16.7038C29.5 15.9312 29.2019 15.1884 28.6679 14.6301L20.6203 6.21664C19.457 5.00047 17.521 4.97896 16.331 6.16899L8.37868 14.1213C7.81607 14.6839 7.5 15.447 7.5 16.2426Z" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                         </svg>
                         Home
                       </a>
                    </div>
                         
                    <div className={`app-nav-bar-main-link-cont ${props.router.pathname=='/src/design' || props.router.pathname=='/src/cluster/settings' || props.router.pathname=='/src/cluster' ?'app-nav-bar-main-link-cont-selec link-cont-selec-cluster ':null}`}>
                         <a 
                         className='app-nav-lnk-lnk'
                         href={_BASE_CLIENT_URL+'src/cluster'}>                           
                              <svg 
                              className={`app-nav-bar-main-link-ico ${props.router.pathname=='/src/cluster'?'app-nav-bar-main-link-ico-selec':null}`}
                              width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 8H30C31.1046 8 32 8.89543 32 10C32 11.1046 31.1046 12 30 12H7C5.89543 12 5 11.1046 5 10C5 8.89543 5.89543 8 7 8Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                              <rect x="5" y="16" width="27" height="4" rx="2" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                              <rect x="5" y="24" width="27" height="4" rx="2" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                         </svg>

                         Cluster
                         </a>
                    </div>
                    <div className={`app-nav-bar-main-link-cont ${props.router.pathname=='/src/setting'?'app-nav-bar-main-link-cont-selec link-cont-selec-profile ':null}`}>
                         <a 
                         className='app-nav-lnk-lnk'
                         href={_BASE_CLIENT_URL+'src/setting'}>     
                         <svg 
                         className={`app-nav-bar-main-link-ico ${props.router.pathname=='/src/land'?'app-nav-bar-main-link-ico-selec':null}`}
                         width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <rect x="13" y="5" width="10" height="10" rx="5" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                         <path d="M28.4294 25.3066C23.496 16.8047 12.552 17.1082 8.27514 25.4564C7.39548 27.1734 8.84189 28.9996 10.7711 28.9996L25.9821 28.9998C27.9875 28.9998 29.4358 27.0411 28.4294 25.3066Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                         </svg>

                         Profile
                         </a>
                    </div>
          </div>
      )
 }

 const RenderPlatformLogo =(props)=>{
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
          case 6:{
               return(
                    <div className='app-plat-logo-main-cont'>
                        <svg className='app-plat-logo-ico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"/><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05"/><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07"/><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"/></svg>
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

const RenderAccordion = (props)=>{

     const [expanded,setexpanded] = useState(props.default?props.default:false);


     return(
          <div className={`app-accord-main-outer-body ${props.prefiix?props.prefiix:null}`}>
                <div className={`app-accord-main-title-outer-body`} 
                         onClick={()=>{
                              setexpanded(!expanded);
                         }
                    }
                >
                    {props.titleBar(expanded)}
                </div>
                <div className={
                     `
                     app-accord-main-expand-body                     
                     `}
                    onAnimationEnd={()=>{
                    // if(expandanimStart){
                    //      setexpandanimStart(false);
                    //      setexpanded(true)
                    // }
                    // if(expandanimExit){
                    //      setexpandanimExit(false);
                    //      setexpanded(false)
                    // }
               }}
                style={{display:`${expanded?'block':'none'}`}}
                >
                {props.children}
                </div>
                
          </div>
     )
}


export {
     BurgerMenu,
     ProfilePopover,
     NavBarCont,
     BottomCont,
     LandNavBarCont,
     FeedbackCont,
     HeaderCont,
     RenderPlatformLogo,
     RenderAccordion}