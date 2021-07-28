import React,{useEffect, useRef, useState} from "react";
import {useRouter } from 'next/router'
import backendHelper from "../../comp/helpers/backendHelper";
import URLS,{_BASE_CLIENT_URL} from "../../comp/helpers/api.routes";
import { withRouter, NextRouter } from 'next/router'



const ClusterLinkRedirect=(props)=>{
     const router = useRouter()
     let {uid} = router.query;
     if(uid){
          if (typeof window !== 'undefined') {    
               console.log(router.query);
               window.location.href = `${URLS.visit}/${uid}`;
               console.log('redirect '+uid);
          }  
     }
     return(
          <div>Loading</div>
     )
}

export default withRouter(ClusterLinkRedirect);


