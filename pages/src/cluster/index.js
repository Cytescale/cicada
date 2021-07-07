import React,{useEffect, useRef, useState} from "react";
import Head from "next/head";
import { withRouter, NextRouter,useRouter } from 'next/router'

import { BurgerMenu,ProfilePopover,NavBarCont } from "../../../comp/elements";

const cluster = (props)=>{
     const router = useRouter()
     return(
          <div className='app-main-cont-main-body land-body-cont'   id='lnk-lnk-main-cont-id'>
          <Head>
          <title>Sakura</title>
          <meta name="description" content="Cicada Login Activity" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico" />
          </Head>
          
                    <BurgerMenu router={router} />
                    <div className='app-head-main-cont link-head-body-cont'>
                              <div className='app-head-main-cont-logo link-head-logo'>
                                   <svg className='app-head-main-cont-logo-ico' width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <circle cx="50" cy="50" r="50" fill="url(#paint0_linear)"/>
                                   <defs>
                                   <linearGradient id="paint0_linear" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                                   <stop stop-color="#FEE27F"/>
                                   <stop offset="1" stop-color="#F6BC4F"/>
                                   </linearGradient>
                                   </defs>
                                   </svg>

                              </div>
                              <div className='app-head-main-right-cont'>
                                   <button
                                   className='app-input-class-raised-pressable link-add-butt'
                                   onClick={()=>{
                                        //this.setcreateLinkModalVisi(true);
                                   }}
                                   >
                                        Create Link
                                   </button>
                                   <ProfilePopover 
                                    //setlgoutShow={this.setlgoutConfirmVisi} 
                                    />
                              </div>
                    </div>
                    <NavBarCont router={router}/>
          </div>
     )
}

export default cluster;