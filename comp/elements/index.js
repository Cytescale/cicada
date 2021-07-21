import React,{useEffect, useRef, useState} from "react";
import {Accordion, Button, Card, Dropdown, Modal, Overlay, Popover, Spinner}  from "react-bootstrap";
import { slide as Menu } from 'react-burger-menu'
import URLS,{_BASE_CLIENT_URL} from "../helpers/api.routes";

import user from "../utils/user";
const User = new user();


const BottomCont =(prop)=>{
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
          <a className="menu-item" href="/about">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='menu-item-ico'>
                    <path d="M21 8C19.55 8 18.74 9.44 19.07 10.51L15.52 14.07C15.22 13.98 14.78 13.98 14.48 14.07L11.93 11.52C12.27 10.45 11.46 9 10 9C8.55 9 7.73 10.44 8.07 11.52L3.51 16.07C2.44 15.74 1 16.55 1 18C1 19.1 1.9 20 3 20C4.45 20 5.26 18.56 4.93 17.49L9.48 12.93C9.78 13.02 10.22 13.02 10.52 12.93L13.07 15.48C12.73 16.55 13.54 18 15 18C16.45 18 17.27 16.56 16.93 15.48L20.49 11.93C21.56 12.26 23 11.45 23 10C23 8.9 22.1 8 21 8Z" fill="currentColor"/>
                    <path d="M15 9L15.94 6.93L18 6L15.94 5.07L15 3L14.08 5.07L12 6L14.08 6.93L15 9Z" fill="currentColor"/>
                    <path d="M3.5 11L4 9L6 8.5L4 8L3.5 6L3 8L1 8.5L3 9L3.5 11Z" fill="currentColor"/>
                    </svg>
               Analytics</a>
          <a  className="menu-item" href="/contact">
          <svg width="24" height="24" viewBox="0 0 24 23" fill="none" className='menu-item-ico'>
                    <path d="M3.08928 21.9859C1.76509 21.1674 -0.287408 18.9164 2.09614 16.4608C5.07557 13.3913 12.0276 13.3913 12.5241 13.3913C13.0207 13.3913 21.1781 14.4426 22.4556 17.0747C23.9453 20.1442 21.959 22.1906 21.4624 21.9859" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 5.73913C17 8.31505 14.8038 10.4783 12 10.4783C9.19622 10.4783 7 8.31505 7 5.73913C7 3.16321 9.19622 1 12 1C14.8038 1 17 3.16321 17 5.73913Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
               Profile</a>
               <a className="menu-item" href="/contact">
                    <svg className='menu-item-ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
                    Help</a>

               <div className="menu-item-bottom-menu">
               <div className="menu-item-bottom-v">v 0.0.9</div>
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
                         <svg className={`app-nav-bar-main-link-ico ${props.router.pathname=='/src/land'?'app-nav-bar-main-link-ico-selec':null}`}
                         xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="jv689zNUBazMNK6AOyXtga" x1="6" x2="42" y1="41" y2="41" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c8d3de"/><stop offset="1" stop-color="#c8d3de"/></linearGradient><path fill="url(#jv689zNUBazMNK6AOyXtga)" d="M42,39H6v2c0,1.105,0.895,2,2,2h32c1.105,0,2-0.895,2-2V39z"/><linearGradient id="jv689zNUBazMNK6AOyXtgb" x1="14.095" x2="31.385" y1="10.338" y2="43.787" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fcfcfc"/><stop offset=".495" stop-color="#f4f4f4"/><stop offset=".946" stop-color="#e8e8e8"/><stop offset="1" stop-color="#e8e8e8"/></linearGradient><path fill="url(#jv689zNUBazMNK6AOyXtgb)" d="M42,39H6V20L24,3l18,17V39z"/><path fill="#de490d" d="M13,25h10c0.552,0,1,0.448,1,1v17H12V26C12,25.448,12.448,25,13,25z"/><path d="M24,4c-0.474,0-0.948,0.168-1.326,0.503l-5.359,4.811L6,20v5.39L24,9.428L42,25.39V20L30.685,9.314	l-5.359-4.811C24.948,4.168,24.474,4,24,4z" opacity=".05"/><path d="M24,3c-0.474,0-0.948,0.167-1.326,0.5l-5.359,4.784L6,18.909v5.359L24,8.397l18,15.871v-5.359	L30.685,8.284L25.326,3.5C24.948,3.167,24.474,3,24,3z" opacity=".07"/><linearGradient id="jv689zNUBazMNK6AOyXtgc" x1="24" x2="24" y1="1.684" y2="23.696" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d43a02"/><stop offset="1" stop-color="#b9360c"/></linearGradient><path fill="url(#jv689zNUBazMNK6AOyXtgc)" d="M44.495,19.507L25.326,2.503C24.948,2.168,24.474,2,24,2s-0.948,0.168-1.326,0.503	L3.505,19.507c-0.42,0.374-0.449,1.02-0.064,1.43l1.636,1.745c0.369,0.394,0.984,0.424,1.39,0.067L24,7.428L41.533,22.75	c0.405,0.356,1.021,0.327,1.39-0.067l1.636-1.745C44.944,20.527,44.915,19.881,44.495,19.507z"/><linearGradient id="jv689zNUBazMNK6AOyXtgd" x1="28.05" x2="35.614" y1="25.05" y2="32.614" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33bef0"/><stop offset="1" stop-color="#0a85d9"/></linearGradient><path fill="url(#jv689zNUBazMNK6AOyXtgd)" d="M29,25h6c0.552,0,1,0.448,1,1v6c0,0.552-0.448,1-1,1h-6c-0.552,0-1-0.448-1-1v-6	C28,25.448,28.448,25,29,25z"/></svg>
                         {/* <svg 
                         className={`app-nav-bar-main-link-ico ${props.router.pathname=='/src/land'?'app-nav-bar-main-link-ico-selec':null}`}
                         xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><path d="M9,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v14C11,20.1,10.1,21,9,21z M15,21h4c1.1,0,2-0.9,2-2v-5 c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v5C13,20.1,13.9,21,15,21z M21,8V5c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v3c0,1.1,0.9,2,2,2h4 C20.1,10,21,9.1,21,8z"/></svg> */}
                         Home
                       </a>
                    </div>
                    <div className={`app-nav-bar-main-link-cont ${props.router.pathname=='/src/setting'?'app-nav-bar-main-link-cont-selec':null}`}>
                         <a 
                         className='app-nav-lnk-lnk'
                         href={_BASE_CLIENT_URL+'src/setting'}>
                         <svg 
                         className={`app-nav-bar-main-link-ico ${props.router.pathname=='/src/land'?'app-nav-bar-main-link-ico-selec':null}`}
                         xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><radialGradient id="3ZiVhXF2zC5Hwg7NbMctDa" cx="30.146" cy="17.914" r="17.08" gradientUnits="userSpaceOnUse"><stop offset=".771" stop-color="#787f85"/><stop offset=".819" stop-color="#838a91"/><stop offset=".931" stop-color="#99a1aa"/><stop offset="1" stop-color="#a1aab3"/></radialGradient><path fill="url(#3ZiVhXF2zC5Hwg7NbMctDa)" d="M17.464,21.808l8.728,8.728L14.536,42.192c-2.41,2.41-6.318,2.41-8.728,0l0,0	c-2.41-2.41-2.41-6.318,0-8.728L17.464,21.808z"/><linearGradient id="3ZiVhXF2zC5Hwg7NbMctDb" x1="19.314" x2="38.806" y1="8.669" y2="28.161" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#a1aab3"/><stop offset="1" stop-color="#8f979e"/></linearGradient><path fill="url(#3ZiVhXF2zC5Hwg7NbMctDb)" d="M36.883,19.304c-2.261,2.261-5.927,2.261-8.188,0c-2.261-2.261-2.261-5.927,0-8.188	c0.552-0.552,2.775-2.775,5.04-5.04c0.543-0.543,0.302-1.492-0.444-1.675c-1.836-0.452-3.811-0.546-5.866-0.159	c-6.026,1.136-10.725,6.178-11.35,12.279c-0.912,8.895,6.511,16.317,15.406,15.403c6.1-0.627,11.141-5.326,12.276-11.352	c0.387-2.054,0.292-4.028-0.159-5.864c-0.184-0.746-1.132-0.987-1.675-0.444C39.658,16.529,37.435,18.753,36.883,19.304z"/><linearGradient id="3ZiVhXF2zC5Hwg7NbMctDc" x1="12.789" x2="7.182" y1="40.789" y2="35.182" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".242" stop-color="#f2f2f2"/><stop offset="1" stop-color="#ccc"/></linearGradient><circle cx="10" cy="38" r="4" fill="url(#3ZiVhXF2zC5Hwg7NbMctDc)"/><linearGradient id="3ZiVhXF2zC5Hwg7NbMctDd" x1="8.129" x2="11.411" y1="36.129" y2="39.411" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0d61a9"/><stop offset=".363" stop-color="#0e5fa4"/><stop offset=".78" stop-color="#135796"/><stop offset="1" stop-color="#16528c"/></linearGradient><circle cx="10" cy="38" r="2" fill="url(#3ZiVhXF2zC5Hwg7NbMctDd)"/></svg>
                         {/* <svg 
                         className={`app-nav-bar-main-link-ico ${props.router.pathname=='/src/land'?'app-nav-bar-main-link-ico-selec':null}`}
                         xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18c0 .55.45 1 1 1h5v-2H4c-.55 0-1 .45-1 1zM3 6c0 .55.45 1 1 1h9V5H4c-.55 0-1 .45-1 1zm10 14v-1h7c.55 0 1-.45 1-1s-.45-1-1-1h-7v-1c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1zM7 10v1H4c-.55 0-1 .45-1 1s.45 1 1 1h3v1c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1zm14 2c0-.55-.45-1-1-1h-9v2h9c.55 0 1-.45 1-1zm-5-3c.55 0 1-.45 1-1V7h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1z"/></svg> */}
                         Settings
                         </a>
                    </div>
          </div>
      )
 }


export {BurgerMenu,ProfilePopover,NavBarCont,BottomCont,LandNavBarCont}