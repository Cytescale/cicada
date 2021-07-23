import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import cookie from 'react-cookies'

import axios from 'axios';
import FIREBASE_CONFIG_VAR from "../certs/firebase.config";
import URLS from './api.routes'; 
import User from "../utils/user";
import nexusResponse from "./nexusResponse";


//cookie.load('userId')
//cookie.save('userId', userId, { path: '/' })
//  cookie.remove('userId', { path: '/' })



declare type errResponse = {
     errCode:number
     errMess:string
     errBool:boolean
     fatal?:boolean
}

declare type serverReponse ={
     error?:errResponse|null
     resCode?:number
     resMess?:any
}


declare  interface  firebaseHelperInter{
     initFirebaseApp(callback?:(val:boolean)=>void):boolean|null
     initFirebaseBackend(callback?:(val:boolean)=>void):any
     initFirebaseAuthStateChange():boolean|null
     checkInitUser():Promise<boolean|null>
     getFirebase():(firebase.app.App)|null
     userCheck():boolean
     getCurrentUser():firebase.User|null
     initEmailAuth(eml:string,pass:string):Promise<nexusResponse|null>
     intiGoogleAuth():serverReponse|null
     getConnected():boolean|null
     getSpaceDetails():void
}

export type {serverReponse,firebaseHelperInter,errResponse};

var cookie_exp_date = new Date();
cookie_exp_date.setDate(cookie_exp_date.getDate() + 7);

const checkToken = async () => {
     const  value  = await cookie.load('userToken');
     return value;
}
const setToken = async (token:string) => {
     await cookie.save('userToken', token, { path: '/',
     expires:cookie_exp_date,
     secure: true,
      })
};

const setUid = async (uid:string) => {
     await cookie.save('uid', uid, { 
     path: '/',
     expires:cookie_exp_date,
     secure: true,
     })
};
const getUid = async () => {
     const  value  = cookie.load('uid');
     return value;
};

const unseUserToken = async ()=>{
     console.log('init unset');
     await cookie.remove('userToken', { path: '/' });
}

const unsetUid = async ()=>{
     await cookie.remove('uid', { path: '/' });
}


export {checkToken,setToken,getUid,setUid,unseUserToken,unsetUid}

const  user = new User();

export default class firebaseHelper implements firebaseHelperInter{
     static _FIREBASE_APP:firebase.app.App|null = null;
     static _FIREBASE_PROVIDE:firebase.auth.GoogleAuthProvider|null = null;
     static _CONNTECD:boolean = false;
  
     constructor(){
          this.initFirebaseApp();
     }
     

  

     initFirebaseApp(callback?:any): boolean | null {
          try{
               if(firebase.apps.length<1){
                    firebaseHelper._FIREBASE_APP = firebase.initializeApp(FIREBASE_CONFIG_VAR);
                    firebaseHelper._FIREBASE_PROVIDE = new firebase.auth.GoogleAuthProvider(); 
                    console.log('firebasehelper | new app initialised');
                    
                  }else{
                    console.log('firebasehelper | app already initialised'); 
                  }
                  
                  if(callback)callback(true);
                  return true;
          }
          catch(e){
               if(callback)callback(false);
               console.log(e);
               return false;
          }
     }

     async getSpaceDetails(){
          console.log("firebasehelper: space details init");
          if(this.getFirebase()){
               var database = this.getFirebase()!.database();
               var spaceRef = database.ref('user_space_det');
               return spaceRef;
               // let resdata  = null;
               // spaceRef.on('value', (snapshot) => {
               // const data = snapshot.val();
               // console.log("ASDSAD");
               // });
          }
          else{
               return null;
          }
         
     }


     async checkInitUser(){
          let res = await checkToken();
          if( res &&  res!=='null'){
               let uid  = await getUid();
               user.setUserUid(uid);
               user.setUserToken(res);
               return true;
          }
          else{
               console.log("NO USER");
               return false;
          }
          return null;
     }

     async initFirebaseBackend(callback?:any) {
          throw new Error("Method not implemented.");
     }
     getConnected():(typeof firebaseHelper._CONNTECD){
          return firebaseHelper._CONNTECD;
     }
     initFirebaseAuthStateChange(): boolean | null {
          throw new Error("Method not implemented.");
     }
     getFirebase(): firebase.app.App | null {
          return (firebaseHelper._FIREBASE_APP);
     }
     userCheck(): boolean {
          throw new Error("Method not implemented.");
     }
     getCurrentUser(): firebase.User|null {
          if(this.getFirebase()&&this.getFirebase()!.auth()){ 
               return (this.getFirebase()!.auth().currentUser);
          }
          return null;
     }


     async initEmailAuth(eml: string, pass: string):Promise<nexusResponse|null>{
          let ress:nexusResponse|null = null;
          await this.getFirebase()!.auth().signInWithEmailAndPassword(eml,pass).then(async (result)=>{
                    await result.user?.getIdToken(true).then(async res=>{
                         user.setUserToken(res);
                         user.setUserUid(result.user?.uid!);
                         await setUid(result.user?.uid!)
                         await setToken(res);
                    })
                    ress = {
                         errMess:'null',
                         errBool:false,
                         responseData:{uid:result.user?.uid}
                    }
               })
               .catch((error) => {
                    console.log(error.code); 
                    ress= {
                         errBool:true,
                         errCode:1,
                         errMess:error.code,
                         responseData:null,
                    }
               
          });
          //callback(res);
          return ress;
        
     }

     async createEmailAuth(eml: string, pass: string):Promise<nexusResponse|null>{
          let ress:nexusResponse|null = null;
          await this.getFirebase()!.auth().createUserWithEmailAndPassword(eml,pass).then(async (result)=>{
                         var user = result.user;
                         var res = await result.user?.getIdToken(true);
                         ress= {
                              errBool:false,
                              errCode:0,
                              errMess:'null',
                              responseData:{
                                   uid:user?.uid,
                                   email:user?.email,
                                   userToken:res
                              },
                         }

               })
               .catch((error) => {
                    console.log(error.code); 
                    ress= {
                         errBool:true,
                         errCode:1,
                         errMess:error.code,
                         responseData:null,
                    }
               
          });
          return ress;
     }


     
     async sendPassResetEmail(eml:string):Promise<nexusResponse|null>{
          let ress:nexusResponse|null = null;
          await this.getFirebase()!.auth().sendPasswordResetEmail(eml).then(()=>{
               ress = {
                    errBool:false,
                    errMess:'null',
                    responseData:{
                         linkSent:true
                    }
               }
          }).catch(e=>[
               ress = {
                    errBool:true,
                    errMess:e.code,
                    responseData:null
               }
          ])
          return ress;
     }


     intiGoogleAuth(): serverReponse | null {
          throw new Error("Method not implemented.");
     }

}