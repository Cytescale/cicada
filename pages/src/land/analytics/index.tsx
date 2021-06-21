import React,{useState} from "react";

export default class Analytics extends React.Component {
     constructor(props:any){
          super(props);
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


     renderLinkSelection(){
          return(
               <button className='app-input-class-raised-pressable app-anal-lnk-selc-butt'>
                    Select link                    
                    <svg className='app-anal-lnk-selc-butt-ico' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.88 9.29L12 13.17L8.11998 9.29C7.72998 8.9 7.09998 8.9 6.70998 9.29C6.31998 9.68 6.31998 10.31 6.70998 10.7L11.3 15.29C11.69 15.68 12.32 15.68 12.71 15.29L17.3 10.7C17.69 10.31 17.69 9.68 17.3 9.29C16.91 8.91 16.27 8.9 15.88 9.29Z" fill="black"/>
                    </svg>
               </button>
               
          )
     }

     renderTimeSelection(){
          return(
               <button className='app-input-class-raised-pressable app-anal-time-selc-butt'>
                    Select Time                     
                    <svg className='app-anal-lnk-selc-butt-ico' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.88 9.29L12 13.17L8.11998 9.29C7.72998 8.9 7.09998 8.9 6.70998 9.29C6.31998 9.68 6.31998 10.31 6.70998 10.7L11.3 15.29C11.69 15.68 12.32 15.68 12.71 15.29L17.3 10.7C17.69 10.31 17.69 9.68 17.3 9.29C16.91 8.91 16.27 8.9 15.88 9.29Z" fill="currentColor"/>
                    </svg>
               </button>
               
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

     renderAnalHeaderData(title:string,count:number,ifIncr:boolean,incriCount:number){
          return(
               <div className='app-anal-header-data-main-cont'>
                         <div className='app-anal-header-data-body-cont'>
                                   <div className='app-anal-header-data-body-tit-cont'>
                                        All time
                                   </div>
                                   <div className='app-anal-header-data-body-data-tit-cont'>
                                        {title}{ifIncr?this.renderIncri(incriCount):this.renderDecri(incriCount)}
                                   </div>
                         </div>
                         <div className='app-anal-header-data-right-cont'>
                              {count}
                         </div>
               </div>
          )
     }


     renderAnalData(title:string,count:number,ifIncr:boolean,incriCount:number){
          return(
               <div className='app-input-class-raised app-anal-data-main-cont'>
                         <div className='app-anal-header-data-body-cont'>
                                   <div className='app-anal-header-data-body-tit-cont'>
                                        Today
                                   </div>
                                   <div className='app-anal-header-data-body-data-tit-cont'>
                                        {title}{ifIncr?this.renderIncri(incriCount):this.renderDecri(incriCount)}
                                   </div>
                         </div>
                         <div className='app-anal-data-right-cont'>
                              {count}
                         </div>
               </div>
          )
     }


     renderClickChart(){
          return(
               <div className='app-input-class-raised anal-click-chart-cont'>
                    <div className='anal-click-chart-head-cont'>                         
                         <svg width="20" height="19" viewBox="0 0 20 19" fill="none" className='anal-click-chart-head-cont-ico'>
                         <path d="M9.77033 14.2421C7.25283 14.1233 5.24992 12.0492 5.24992 9.5C5.24992 6.87958 7.3795 4.74999 9.99992 4.74999C12.5491 4.74999 14.6233 6.75291 14.742 9.27041L13.0795 8.77166C12.7549 7.37041 11.4962 6.33333 9.99992 6.33333C8.25033 6.33333 6.83325 7.75041 6.83325 9.5C6.83325 10.9962 7.87033 12.255 9.27158 12.5796L9.77033 14.2421ZM17.9166 9.5C17.9166 9.7375 17.9087 9.97499 17.8849 10.2125L16.3253 9.74541C16.3333 9.66625 16.3333 9.57916 16.3333 9.5C16.3333 6.00083 13.4991 3.16666 9.99992 3.16666C6.50075 3.16666 3.66659 6.00083 3.66659 9.5C3.66659 12.9992 6.50075 15.8333 9.99992 15.8333C10.0791 15.8333 10.1662 15.8333 10.2453 15.8254L10.7124 17.385C10.4749 17.4087 10.2374 17.4167 9.99992 17.4167C5.62992 17.4167 2.08325 13.87 2.08325 9.5C2.08325 5.13 5.62992 1.58333 9.99992 1.58333C14.3699 1.58333 17.9166 5.13 17.9166 9.5ZM14.932 12.8725L16.7291 12.2708C17.0933 12.1521 17.0853 11.6296 16.7212 11.5187L10.7045 9.71375C10.4037 9.62666 10.1187 9.90375 10.2137 10.2046L12.0187 16.2212C12.1295 16.5933 12.652 16.6012 12.7708 16.2292L13.3724 14.4321L16.4678 17.5275C16.6262 17.6858 16.8716 17.6858 17.0299 17.5275L18.0353 16.5221C18.1937 16.3637 18.1937 16.1183 18.0353 15.96L14.932 12.8725Z" fill="#B4C7D8"/>
                         </svg>
                         Clicks
                         <div className='anal-click-chart-head-right-cont'>
                              <button className='anal-click-chart-head-right-butt'>
                                   <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M9.5 1.5C5.36 1.5 2 4.86 2 9C2 13.14 5.36 16.5 9.5 16.5C13.64 16.5 17 13.14 17 9C17 4.86 13.64 1.5 9.5 1.5ZM9.5 12.75C9.0875 12.75 8.75 12.4125 8.75 12V9C8.75 8.5875 9.0875 8.25 9.5 8.25C9.9125 8.25 10.25 8.5875 10.25 9V12C10.25 12.4125 9.9125 12.75 9.5 12.75ZM10.25 6.75H8.75V5.25H10.25V6.75Z" fill="#717F8B"/>
                                   </svg>
                              </button>
                         </div>
                    </div>

               </div>
          )
     }

     renderVisitChart(){
          return(
               <div className='app-input-class-raised anal-click-chart-cont'>
               <div className='anal-click-chart-head-cont'>                         
                              <svg width="20" height="19" viewBox="0 0 20 19" fill="none"  className='anal-click-chart-head-cont-ico'>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6973 10.3946C14.7818 11.1308 15.5418 12.1283 15.5418 13.4583V15.8333H17.9168C18.3523 15.8333 18.7085 15.4771 18.7085 15.0417V13.4583C18.7085 11.7325 15.8823 10.7113 13.6973 10.3946Z" fill="#B4C7D8"/>
                              <path d="M7.62516 9.50002C9.37406 9.50002 10.7918 8.08226 10.7918 6.33335C10.7918 4.58445 9.37406 3.16669 7.62516 3.16669C5.87626 3.16669 4.4585 4.58445 4.4585 6.33335C4.4585 8.08226 5.87626 9.50002 7.62516 9.50002Z" fill="#B4C7D8"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3752 9.50002C14.1248 9.50002 15.5418 8.08294 15.5418 6.33335C15.5418 4.58377 14.1248 3.16669 12.3752 3.16669C12.0031 3.16669 11.6548 3.24585 11.3223 3.35669C11.9793 4.1721 12.3752 5.20919 12.3752 6.33335C12.3752 7.45752 11.9793 8.4946 11.3223 9.31002C11.6548 9.42085 12.0031 9.50002 12.3752 9.50002Z" fill="#B4C7D8"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.62508 10.2917C5.51133 10.2917 1.29175 11.3525 1.29175 13.4584V15.0417C1.29175 15.4771 1.648 15.8334 2.08341 15.8334H13.1667C13.6022 15.8334 13.9584 15.4771 13.9584 15.0417V13.4584C13.9584 11.3525 9.73883 10.2917 7.62508 10.2917Z" fill="#B4C7D8"/>
                              </svg>
                    New Visitors
                    <div className='anal-click-chart-head-right-cont'>
                         <button className='anal-click-chart-head-right-butt'>
                              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.5 1.5C5.36 1.5 2 4.86 2 9C2 13.14 5.36 16.5 9.5 16.5C13.64 16.5 17 13.14 17 9C17 4.86 13.64 1.5 9.5 1.5ZM9.5 12.75C9.0875 12.75 8.75 12.4125 8.75 12V9C8.75 8.5875 9.0875 8.25 9.5 8.25C9.9125 8.25 10.25 8.5875 10.25 9V12C10.25 12.4125 9.9125 12.75 9.5 12.75ZM10.25 6.75H8.75V5.25H10.25V6.75Z" fill="#717F8B"/>
                              </svg>
                         </button>
                    </div>
               </div>

          </div>
          )
     }

     renderOperaChart(){
          return(
               <div className='app-input-class-raised anal-click-chart-cont'>
                    <div className='anal-click-chart-head-cont'>                         
                              <svg width="20" height="19" viewBox="0 0 20 19" fill="none"   className='anal-click-chart-head-cont-ico'>
                              <path d="M15.5417 2.375H4.45833C3.57958 2.375 2.875 3.0875 2.875 3.95833V15.0417C2.875 15.9125 3.57958 16.625 4.45833 16.625H15.5417C16.4125 16.625 17.125 15.9125 17.125 15.0417V3.95833C17.125 3.0875 16.4204 2.375 15.5417 2.375ZM15.5417 15.0417H4.45833V5.54167H15.5417V15.0417ZM13.1667 9.5H6.83333C6.39792 9.5 6.04167 9.14375 6.04167 8.70833C6.04167 8.27292 6.39792 7.91667 6.83333 7.91667H13.1667C13.6021 7.91667 13.9583 8.27292 13.9583 8.70833C13.9583 9.14375 13.6021 9.5 13.1667 9.5ZM10 12.6667H6.83333C6.39792 12.6667 6.04167 12.3104 6.04167 11.875C6.04167 11.4396 6.39792 11.0833 6.83333 11.0833H10C10.4354 11.0833 10.7917 11.4396 10.7917 11.875C10.7917 12.3104 10.4354 12.6667 10 12.6667Z" fill="#B4C7D8"/>
                              </svg>

                        Operating System
                         <div className='anal-click-chart-head-right-cont'>
                              <button className='anal-click-chart-head-right-butt'>
                                   <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M9.5 1.5C5.36 1.5 2 4.86 2 9C2 13.14 5.36 16.5 9.5 16.5C13.64 16.5 17 13.14 17 9C17 4.86 13.64 1.5 9.5 1.5ZM9.5 12.75C9.0875 12.75 8.75 12.4125 8.75 12V9C8.75 8.5875 9.0875 8.25 9.5 8.25C9.9125 8.25 10.25 8.5875 10.25 9V12C10.25 12.4125 9.9125 12.75 9.5 12.75ZM10.25 6.75H8.75V5.25H10.25V6.75Z" fill="#717F8B"/>
                                   </svg>
                              </button>
                         </div>
                    </div>
               </div>
          )
     }
     renderCountryChart(){
          return(
               <div className='app-input-class-raised anal-click-chart-cont'>
                    <div className='anal-click-chart-head-cont'>                         
                              <svg width="20" height="19" viewBox="0 0 20 19" fill="none"   className='anal-click-chart-head-cont-ico'>
                              <path d="M9.90875 2C5.53875 2 2 5.54667 2 9.91667C2 14.2867 5.53875 17.8333 9.90875 17.8333C14.2867 17.8333 17.8333 14.2867 17.8333 9.91667C17.8333 5.54667 14.2867 2 9.90875 2ZM15.395 6.75H13.0596C12.8063 5.76042 12.4421 4.81042 11.9671 3.93167C13.4238 4.43042 14.635 5.44375 15.395 6.75ZM9.91667 3.615C10.5738 4.565 11.0883 5.61792 11.4288 6.75H8.40458C8.745 5.61792 9.25958 4.565 9.91667 3.615ZM3.78917 11.5C3.6625 10.9933 3.58333 10.4629 3.58333 9.91667C3.58333 9.37042 3.6625 8.84 3.78917 8.33333H6.465C6.40167 8.85583 6.35417 9.37833 6.35417 9.91667C6.35417 10.455 6.40167 10.9775 6.465 11.5H3.78917ZM4.43833 13.0833H6.77375C7.02708 14.0729 7.39125 15.0229 7.86625 15.9017C6.40958 15.4029 5.19833 14.3975 4.43833 13.0833ZM6.77375 6.75H4.43833C5.19833 5.43583 6.40958 4.43042 7.86625 3.93167C7.39125 4.81042 7.02708 5.76042 6.77375 6.75ZM9.91667 16.2183C9.25958 15.2683 8.745 14.2154 8.40458 13.0833H11.4288C11.0883 14.2154 10.5738 15.2683 9.91667 16.2183ZM11.7692 11.5H8.06417C7.99292 10.9775 7.9375 10.455 7.9375 9.91667C7.9375 9.37833 7.99292 8.84792 8.06417 8.33333H11.7692C11.8404 8.84792 11.8958 9.37833 11.8958 9.91667C11.8958 10.455 11.8404 10.9775 11.7692 11.5ZM11.9671 15.9017C12.4421 15.0229 12.8063 14.0729 13.0596 13.0833H15.395C14.635 14.3896 13.4238 15.4029 11.9671 15.9017ZM13.3683 11.5C13.4317 10.9775 13.4792 10.455 13.4792 9.91667C13.4792 9.37833 13.4317 8.85583 13.3683 8.33333H16.0442C16.1708 8.84 16.25 9.37042 16.25 9.91667C16.25 10.4629 16.1708 10.9933 16.0442 11.5H13.3683Z" fill="#B4C7D8"/>
                              </svg>

                        Country
                         <div className='anal-click-chart-head-right-cont'>
                              <button className='anal-click-chart-head-right-butt'>
                                   <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M9.5 1.5C5.36 1.5 2 4.86 2 9C2 13.14 5.36 16.5 9.5 16.5C13.64 16.5 17 13.14 17 9C17 4.86 13.64 1.5 9.5 1.5ZM9.5 12.75C9.0875 12.75 8.75 12.4125 8.75 12V9C8.75 8.5875 9.0875 8.25 9.5 8.25C9.9125 8.25 10.25 8.5875 10.25 9V12C10.25 12.4125 9.9125 12.75 9.5 12.75ZM10.25 6.75H8.75V5.25H10.25V6.75Z" fill="#717F8B"/>
                                   </svg>
                              </button>
                         </div>
                    </div>
                    <div className='anal-click-chart-tab-head-cont'>
                         <div className='anal-click-chart-tab-head-tab'>
                              Country
                         </div>
                         <div className='anal-click-chart-tab-head-tab'>
                              Click
                         </div>
                    </div>
                    <div className='anal-click-chart-tab-data-cont'>
                         <div className='anal-click-chart-tab-data-tab'>
                         El Salvador
                         </div>
                         <div className='anal-click-chart-tab-data-tab-sec'>
                              69696
                         </div>
                    </div>
                    <div className='anal-click-chart-tab-data-cont'>
                         <div className='anal-click-chart-tab-data-tab'>
                         Uganda
                         </div>
                         <div className='anal-click-chart-tab-data-tab-sec'>
                              35
                         </div>
                    </div>
               </div>
          )
     }


     



     render(){
          return(
               <div className='app-content-main-cont'>
                     <div className='app-head-main-cont'>
                              <div className='app-head-main-cont-logo'>
                              Cicada
                              </div>
                              <div className='app-head-main-right-cont'>
                                   <button
                                   className='app-anal-head-more-butt'
                                   >                                        
                                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="white"/>
                                   </svg>
                                   </button>
                              </div>
                         </div>
                         <div className='app-body-main-cont'>
                              <div className='app-body-main-cont-lab'>Analytics</div>                              
                            
                         </div>
                       

                         {this.renderAnalHeaderData('Total Clicks',100,false,13)}
                         {this.renderAnalHeaderData('Total Visitors',100,true,25)}
                         {this.renderAnalData('Click',100,true,25)}
                         {this.renderAnalData('Visitors',100,false,21)}

                         <div className='app-anal-hr-cont'/>

                         {this.renderLinkSelection()}
                         {this.renderTimeSelection()}
                         
                        
                         {this.renderClickChart()}
                         {this.renderVisitChart()}

                         {this.renderOperaChart()}
                         
                         {this.renderCountryChart()}

                         {this.renderBottomFader()}
                         
               </div>
          )
     }

}