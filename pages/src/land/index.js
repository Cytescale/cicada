import React,{useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Links from "./links";
import Analytics from "./analytics";
import Profile from "./profile";
import Dash from "./dash";

export default class Land extends React.Component {
     constructor(props){
          super(props);
     }
     render(){
          return(
               <Tabs>
               <TabList className='ecsp-tab-main-cont'>
                 <Tab className='app-bottom-tab-cont'>
                      <div className='app-bottom-butt-main-outer-cont'>
                         <button className='app-bottom-butt-main-cont'>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
                         <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor"/>
                         </svg></button>
                         </div>
                         </Tab>
                         <Tab className='app-bottom-tab-cont'>   
                         <div className='app-bottom-butt-main-outer-cont'>
                              <button className='app-bottom-butt-main-cont'>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
                              <path d="M17 7H14C13.45 7 13 7.45 13 8C13 8.55 13.45 9 14 9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H14C13.45 15 13 15.45 13 16C13 16.55 13.45 17 14 17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM8 12C8 12.55 8.45 13 9 13H15C15.55 13 16 12.55 16 12C16 11.45 15.55 11 15 11H9C8.45 11 8 11.45 8 12ZM10 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H10C10.55 9 11 8.55 11 8C11 7.45 10.55 7 10 7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H10C10.55 17 11 16.55 11 16C11 15.45 10.55 15 10 15Z" fill="currentColor"/>
                              </svg>
                              </button>
                              </div>
                         </Tab>
                         <Tab className='app-bottom-tab-cont'> 
                              <div className='app-bottom-butt-main-outer-cont'>
                              <button className='app-bottom-butt-main-cont'>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
                              <path d="M21 8C19.55 8 18.74 9.44 19.07 10.51L15.52 14.07C15.22 13.98 14.78 13.98 14.48 14.07L11.93 11.52C12.27 10.45 11.46 9 10 9C8.55 9 7.73 10.44 8.07 11.52L3.51 16.07C2.44 15.74 1 16.55 1 18C1 19.1 1.9 20 3 20C4.45 20 5.26 18.56 4.93 17.49L9.48 12.93C9.78 13.02 10.22 13.02 10.52 12.93L13.07 15.48C12.73 16.55 13.54 18 15 18C16.45 18 17.27 16.56 16.93 15.48L20.49 11.93C21.56 12.26 23 11.45 23 10C23 8.9 22.1 8 21 8Z" fill="currentColor"/>
                              <path d="M15 9L15.94 6.93L18 6L15.94 5.07L15 3L14.08 5.07L12 6L14.08 6.93L15 9Z" fill="currentColor"/>
                              <path d="M3.5 11L4 9L6 8.5L4 8L3.5 6L3 8L1 8.5L3 9L3.5 11Z" fill="currentColor"/>
                              </svg>
                              </button>
                              </div>
                         </Tab>
                       
                         <Tab className='app-bottom-tab-cont'> 
                              <div className='app-bottom-butt-main-outer-cont'>
                              <button className='app-bottom-butt-main-cont'>
                              <svg width="24" height="24" viewBox="0 0 24 23" fill="none" className='app-bottom-butt-main-cont-ico'>
                              <path d="M3.08928 21.9859C1.76509 21.1674 -0.287408 18.9164 2.09614 16.4608C5.07557 13.3913 12.0276 13.3913 12.5241 13.3913C13.0207 13.3913 21.1781 14.4426 22.4556 17.0747C23.9453 20.1442 21.959 22.1906 21.4624 21.9859" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M17 5.73913C17 8.31505 14.8038 10.4783 12 10.4783C9.19622 10.4783 7 8.31505 7 5.73913C7 3.16321 9.19622 1 12 1C14.8038 1 17 3.16321 17 5.73913Z" stroke="currentColor" stroke-width="2"/>
                              </svg>
                              </button>
                              </div>
                         </Tab>
               </TabList>
           
               <TabPanel>
                 <Dash/>
               </TabPanel>
               <TabPanel>
                 <Links/>
               </TabPanel>
               <TabPanel>
                 <Analytics/>
               </TabPanel>
               <TabPanel>
                 <Profile/>
               </TabPanel>
             </Tabs>
          )
     }
}