import React,{useState} from "react";

export default class Profile extends React.Component {
     constructor(props:any){
          super(props);
     }

     
     renderLinkEnal(bool:boolean){
          return(
               <div className='app-input-class-raised-pressable dash-enal-cont'>
                         All Link {bool===true?<span className='dash-enal-on'>Enabled</span>:<span className='dash-enal-off'>Disabled</span>}
                         <div className='app-input-class dash-enal-butt-cont'>
                         {bool===true?<div className='dash-enal-indi-on'/>:<div className='dash-enal-indi-off'/>}
                         </div>
               </div>
          )
     }
     renderBottomFader(){return(<div className='app-bottom-fader-main-cont'/>)}
     renderBottomNav(){
          return(
               <div className='app-bottom-main-cont'>
                         <div className='app-bottom-butt-main-outer-cont'>
                         <button className='app-bottom-butt-main-cont'>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
                         <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="white"/>
                         </svg></button>
                         </div>

                         <div className='app-bottom-butt-main-outer-cont'>
                         <button className='app-bottom-butt-main-cont'>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
                         <path d="M17 7H14C13.45 7 13 7.45 13 8C13 8.55 13.45 9 14 9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H14C13.45 15 13 15.45 13 16C13 16.55 13.45 17 14 17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM8 12C8 12.55 8.45 13 9 13H15C15.55 13 16 12.55 16 12C16 11.45 15.55 11 15 11H9C8.45 11 8 11.45 8 12ZM10 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H10C10.55 9 11 8.55 11 8C11 7.45 10.55 7 10 7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H10C10.55 17 11 16.55 11 16C11 15.45 10.55 15 10 15Z" fill="white"/>
                         </svg>
                         </button>
                         </div>

                         <div className='app-bottom-butt-main-outer-cont'>
                         <button className='app-bottom-butt-main-cont'>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
                         <path d="M21 8C19.55 8 18.74 9.44 19.07 10.51L15.52 14.07C15.22 13.98 14.78 13.98 14.48 14.07L11.93 11.52C12.27 10.45 11.46 9 10 9C8.55 9 7.73 10.44 8.07 11.52L3.51 16.07C2.44 15.74 1 16.55 1 18C1 19.1 1.9 20 3 20C4.45 20 5.26 18.56 4.93 17.49L9.48 12.93C9.78 13.02 10.22 13.02 10.52 12.93L13.07 15.48C12.73 16.55 13.54 18 15 18C16.45 18 17.27 16.56 16.93 15.48L20.49 11.93C21.56 12.26 23 11.45 23 10C23 8.9 22.1 8 21 8Z" fill="white"/>
                         <path d="M15 9L15.94 6.93L18 6L15.94 5.07L15 3L14.08 5.07L12 6L14.08 6.93L15 9Z" fill="white"/>
                         <path d="M3.5 11L4 9L6 8.5L4 8L3.5 6L3 8L1 8.5L3 9L3.5 11Z" fill="white"/>
                         </svg>
                         </button>
                         </div>

                         <div className='app-bottom-butt-main-outer-cont'>
                         <button className='app-bottom-butt-main-cont'>
                         <svg width="24" height="24" viewBox="0 0 24 23" fill="none" className='app-bottom-butt-main-cont-ico'>
                         <path d="M3.08928 21.9859C1.76509 21.1674 -0.287408 18.9164 2.09614 16.4608C5.07557 13.3913 12.0276 13.3913 12.5241 13.3913C13.0207 13.3913 21.1781 14.4426 22.4556 17.0747C23.9453 20.1442 21.959 22.1906 21.4624 21.9859" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                         <path d="M17 5.73913C17 8.31505 14.8038 10.4783 12 10.4783C9.19622 10.4783 7 8.31505 7 5.73913C7 3.16321 9.19622 1 12 1C14.8038 1 17 3.16321 17 5.73913Z" stroke="white" stroke-width="2"/>
                         </svg>
                         </button>
                         </div>


               </div>
          )
     }


     renderProfileData(){
          return(
               <div className='profile-data-main-cont'>
                         <div>
                              <div className='profile-data-main-pic-cont'>
                                   <div className='profile-data-main-pic-ico'>

                                   </div>
                              </div>    
                              <div className='profile-data-main-name-cont'>
                                   Placeholder name
                              </div>
                              <div className='profile-data-main-email-cont'>
                              
                              <svg width="20" height="19" viewBox="0 0 20 19" fill="none" className='profile-data-main-email'>
                              <path d="M16.3335 3.16666H3.66683C2.796 3.16666 2.0835 3.87916 2.0835 4.75V14.25C2.0835 15.1208 2.796 15.8333 3.66683 15.8333H16.3335C17.2043 15.8333 17.9168 15.1208 17.9168 14.25V4.75C17.9168 3.87916 17.2043 3.16666 16.3335 3.16666ZM16.0168 6.53125L10.8393 9.76916C10.3247 10.0937 9.67558 10.0937 9.161 9.76916L3.9835 6.53125C3.78558 6.40458 3.66683 6.19083 3.66683 5.96125C3.66683 5.43083 4.24475 5.11416 4.696 5.39125L10.0002 8.70833L15.3043 5.39125C15.7556 5.11416 16.3335 5.43083 16.3335 5.96125C16.3335 6.19083 16.2147 6.40458 16.0168 6.53125Z" fill="#738192"/>
                              </svg>
                              placeholder@gmail.com
                              </div>
                         </div>     
               </div>    
          )
     }

     render(){
          return(
               <div className='app-content-main-cont'>
                     <div className='app-head-main-cont profile-head-cont'>
                              <div className='app-head-main-cont-logo'>
                              Cicada
                              </div>
                              <div className='app-head-main-right-cont'>
          
                              </div>
                         </div>
                              {/* <div className='profile-head-vect-main-cont'>
                                   <svg className='profile-head-vect-main-ico' width="386" height="261" viewBox="0 0 386 261" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M84.5 244.181C52.1 253.791 16.1667 237.217 6 224.333L0 221.983V0H386V234.257C381.833 236.868 361.423 251.01 350 254.888C330 261.678 322.5 260.895 289 250.971C255.5 241.047 256.5 242.194 229.5 254.888C207.319 265.317 185.5 261.454 163.5 250.428C145.191 241.251 125 232.168 84.5 244.181Z" fill="#384048"/>
                                   </svg>
                              </div> */}
                              <div className='app-body-main-cont profile-head-lab-cont'>
                                   <div className='app-body-main-cont-lab profile-head-lab'>Profile</div>                              
                              </div>
                         {this.renderProfileData()}
                         {this.renderLinkEnal(true)}
                         {this.renderBottomFader()}
                         
               </div>
          )
     }


}