import React,{useEffect, useRef, useState} from "react";
import {useRouter } from 'next/router'
import backendHelper from "../../comp/helpers/backendHelper";
import URLS,{_BASE_CLIENT_URL} from "../../comp/helpers/api.routes";
import { withRouter, NextRouter } from 'next/router'



const ClusterLinkRedirect=(props)=>{
     const router = useRouter()
     const {uid} = router.query;

     useEffect(()=>{
          if (typeof window !== 'undefined') {
               window.location.href = `${URLS.visit}/${uid}`;
          }
     },[])
     return(
          <div>Loading</div>
     )
}

export default withRouter(ClusterLinkRedirect);


