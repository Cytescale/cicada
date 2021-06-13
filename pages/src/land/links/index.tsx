import React,{useState} from "react";

export default class Links extends React.Component {
     constructor(props:any){
          super(props);
     }




     renderSearchBar(){
          return(
               <div className='app-link-search-bar-main-cont'> 
                         <input
                         className='app-input-class link-search-bar-inp'
                         placeholder='Search'
                         />
                         <button
                         className='app-input-class-raised-pressable land-flt-butt'
                         >                        
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4.24993 5.61C6.56993 8.59 9.99993 13 9.99993 13V18C9.99993 19.1 10.8999 20 11.9999 20C13.0999 20 13.9999 19.1 13.9999 18V13C13.9999 13 17.4299 8.59 19.7499 5.61C20.2599 4.95 19.7899 4 18.9499 4H5.03993C4.20993 4 3.73993 4.95 4.24993 5.61Z" fill="white"/>
                              </svg>
                         </button>
                         
               </div>
          )
     }
     renderBottomFader(){return(<div className='app-bottom-fader-main-cont'/>)}


     renderLink(ind:number,name:string,gen_link:string,dest_link:string){
          return(
               <div className='app-input-class-raised lnk-lnk-main-cont'>
                    <div className='lnk-lnk-head-main-cont'>
                              <div className='lnk-lnk-head-main-cont-name-cont'>
                                   {ind}.  {name}
                              </div>
                              <button
                              className='lnk-lnk-head-edit-butt'
                              >
                                   <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M2.375 13.8225V16.2292C2.375 16.4508 2.54917 16.625 2.77083 16.625H5.1775C5.28042 16.625 5.38333 16.5854 5.45458 16.5062L14.0996 7.86916L11.1308 4.90041L2.49375 13.5375C2.41458 13.6167 2.375 13.7117 2.375 13.8225ZM16.3954 5.57333C16.7042 5.26458 16.7042 4.76583 16.3954 4.45708L14.5429 2.60458C14.2342 2.29583 13.7354 2.29583 13.4267 2.60458L11.9779 4.05333L14.9467 7.02208L16.3954 5.57333Z" fill="white"/>
                                   </svg>
                              </button>
                              <div  className='lnk-lnk-head-right-butt-cont'>
                              <button className='dash-links-cont-link-right-copy-butt'>
                                 <svg className='dash-links-cont-link-right-enal-butt-ico turned-on' viewBox='0 0 512 512'><title>Power</title><path d='M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                              </button>
                              </div>
                    </div>
                    <div className='lnk-lnk-body-cont'>
                         <div className='lnk-lnk-body-tit-cont'>
                              Destination url
                         </div>
                         <div className='lnk-lnk-body-link-cont'>
                              {dest_link}
                         </div>
                    </div>
                    <div className='lnk-lnk-gen-cont'>
                         <div className='lnk-lnk-gen-link'>
                              {gen_link}
                         </div>
                         <div className='lnk-lnk-gen-right-cont'>
                              <button className='lnk-lnk-gen-right-butt'>                             
                                   <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M0.375 11.8225V14.2292C0.375 14.4508 0.549167 14.625 0.770833 14.625H3.1775C3.28042 14.625 3.38333 14.5854 3.45458 14.5062L12.0996 5.86916L9.13083 2.90041L0.49375 11.5375C0.414583 11.6167 0.375 11.7117 0.375 11.8225ZM14.3954 3.57333C14.7042 3.26458 14.7042 2.76583 14.3954 2.45708L12.5429 0.604579C12.2342 0.295829 11.7354 0.295829 11.4267 0.604579L9.97792 2.05333L12.9467 5.02208L14.3954 3.57333Z" fill="#D6EDFF"/>
                                   </svg>
                              </button>
                              <button className='lnk-lnk-gen-right-butt'>                             
                                   <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M16.1155 5H7.4436C6.21391 5 5.21704 5.99687 5.21704 7.22656V15.8984C5.21704 17.1281 6.21391 18.125 7.4436 18.125H16.1155C17.3452 18.125 18.342 17.1281 18.342 15.8984V7.22656C18.342 5.99687 17.3452 5 16.1155 5Z" stroke="#B9CAD8" stroke-linejoin="round"/>
                                   <path d="M15.1975 5L15.217 4.0625C15.2154 3.48285 14.9844 2.9274 14.5745 2.51753C14.1646 2.10765 13.6092 1.87665 13.0295 1.875H4.59204C3.9296 1.87696 3.29485 2.14098 2.82644 2.6094C2.35802 3.07781 2.094 3.71256 2.09204 4.375V12.8125C2.09369 13.3922 2.32469 13.9476 2.73457 14.3575C3.14445 14.7674 3.69989 14.9984 4.27954 15H5.21704" stroke="#B9CAD8" stroke-linecap="round" stroke-linejoin="round"/>
                                   </svg>
                              </button>

                         </div>
                    </div>
                    <div className='lnk-lnk-bottom-cont'>
                         <button className='app-input-class-raised-pressable lnk-lnk-bottom-show-butt'>
                              Show analytics
                         </button>
                         <button className='lnk-lnk-bottom-del-butt'>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V6.75C13.5 5.925 12.825 5.25 12 5.25H6C5.175 5.25 4.5 5.925 4.5 6.75V14.25ZM13.5 3H11.625L11.0925 2.4675C10.9575 2.3325 10.7625 2.25 10.5675 2.25H7.4325C7.2375 2.25 7.0425 2.3325 6.9075 2.4675L6.375 3H4.5C4.0875 3 3.75 3.3375 3.75 3.75C3.75 4.1625 4.0875 4.5 4.5 4.5H13.5C13.9125 4.5 14.25 4.1625 14.25 3.75C14.25 3.3375 13.9125 3 13.5 3Z" fill="white"/>
                              </svg>
                         </button>
                    </div>

               </div>
          )
     }

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

     render(){
          return(
               <div className='app-content-main-cont'>
                     <div className='app-head-main-cont'>
                              <div className='app-head-main-cont-logo'>
                              Cicada
                              </div>
                              <div className='app-head-main-right-cont'>
                                   <button
                                   className='app-input-class-raised-pressable link-add-butt'
                                   >
                                        Create Link
                                   </button>
                              </div>
                         </div>
                         <div className='app-body-main-cont'>
                              <div className='app-body-main-cont-lab'>0 Links</div>                              
                            
                         </div>
                         {this.renderSearchBar()}
                         {this.renderLink(
                              1,
                              'YoutubeLink ',
                              'cyte.com/fsavb',
                              'https://www.figma.com/file/fasf/...'
                         )}
                         {this.renderLink(
                              1,
                              'YoutubeLink ',
                              'cyte.com/fsavb',
                              'https://www.figma.com/file/fasf/...'
                         )}
                         {this.renderLink(
                              1,
                              'YoutubeLink ',
                              'cyte.com/fsavb',
                              'https://www.figma.com/file/fasf/...'
                         )}
                         {this.renderBottomFader()}
                         
               </div>
          )
     }



}