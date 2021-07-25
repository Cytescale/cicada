import React,{useEffect, useRef, useState} from "react";
import {Accordion, Button, Card, Dropdown, Modal, Overlay, Popover, Spinner}  from "react-bootstrap";
import { slide as Menu } from 'react-burger-menu'
import URLS,{_BASE_CLIENT_URL} from "../helpers/api.routes";

import user from "../utils/user";
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
          <div className='app-bottom-cont-main-cont'>
               <div className='app-bottom-cont-lnk-cont'>Home</div>
               <div className='app-bottom-cont-lnk-cont'>About Us</div>
               <div className='app-bottom-cont-lnk-cont'>Terms of conditions</div>
               <div className='app-bottom-cont-lnk-cont'>Privacy Policy</div>
               <div className='app-bottom-cont-lnk-cont'>DMCA Policy</div>
               <div className='app-bottom-cont-main-logo'>Cytelink</div>
               <div className='app-bottom-cont-main-sys-stat'>
                    Status:
                    <div className='app-bottom-cont-main-sys-stat-lab'>
                         <div className='app-bottom-cont-main-sys-stat-lab-cir'/>
                         All systems normal</div>
               </div>
               <div className='app-bottom-cont-main-copy-cont'>
                    Copyright &#xA9; 2021 Cytelink, All rights reserved.
               </div>
          </div>
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
const NavBarCont = (props)=>{  
     return(
          <div className='app-nav-bar-main-cont'>
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
      )
 }
 const LandNavBarCont = (props)=>{  
     return(
          <div className='app-nav-bar-main-cont land-nav-bar-cont'>
                    <div 
                    className={`app-nav-bar-main-link-cont ${props.router.pathname=='/src/land'?'app-nav-bar-main-link-cont-selec':null}`}>
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
                    <div className={`app-nav-bar-main-link-cont ${props.router.pathname=='/src/cluster'?'app-nav-bar-main-link-cont-selec':null}`}>
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
                    <div className={`app-nav-bar-main-link-cont ${props.router.pathname=='/src/setting'?'app-nav-bar-main-link-cont-selec':null}`}>
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


export {BurgerMenu,ProfilePopover,NavBarCont,BottomCont,LandNavBarCont,FeedbackCont}