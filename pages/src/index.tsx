

import { useState,useEffect  } from 'react'
import FullHeiLoading from './fullHeightLoading';
import firebaseHelper from '../../comp/helpers/firebaseHelper';
import { useRouter, NextRouter } from 'next/router'
import React from 'react';

const Firebasehelper = new firebaseHelper();

Firebasehelper.initFirebaseApp();


export default function Base() {
const router = useRouter();
  let [isAuth , setAuth ] = useState<boolean>(false);
  let [loading , setLoading] = useState<boolean>(false);
  useEffect(() => { 
    Firebasehelper.checkInitUser().then(res=>{
      if(res){
        setAuth(true);
        router!.replace('/src/land');
      }
      else{
          router!.replace('/src/login');
      }
    })
  });
  return (
      <FullHeiLoading/>    
    )
}
