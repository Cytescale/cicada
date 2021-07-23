import React,{useEffect, useRef, useState} from "react";
import user from "../../../comp/utils/user";
import { withRouter, NextRouter,useRouter } from 'next/router'
import firebaseHelper,{getUid,checkToken} from "../../../comp/helpers/firebaseHelper";
import backendHelper from "../../../comp/helpers/backendHelper";
import FullHeiLoading from '../fullHeightLoading';


const User = new user();
const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();


const AuthView =(props)=>{
     console.log('Init authentication');
     const router = useRouter();
     const [auth,setAuth] = useState(false);
     const [errStr,seterrStr] = useState('');
     useEffect(async ()=>{
          try{
               const GOT_UID = await getUid();
               const GOT_TOKEN =  await checkToken();
               if(GOT_TOKEN&&GOT_UID){
                    props.succ_callback('null message');
                         if(backendHelper){
                              BackendHelper._getUserInfo(GOT_UID,true).then((res)=>{
                                   if(res){
                                        if(!res.errBool){
                                              console.log(res.responseData);
                                              if(res.responseData.deleted_bool){
                                                  console.log('User is deleted');
                                                  router.replace('/src/login');
                                                  return;
                                              }
                                              if(!res.responseData.init_bool){
                                                  console.log('User is not initiated');
                                                  router.replace('/src/initAccount');
                                                  return;
                                              }
                                              setAuth(true);     
                                        }else{throw new Error('User data extraction failure '+e.errMess);      }
                                   }
                              }).catch(e=>{
                                   if(props.fail_callback){props.fail_callback('User data extraction failure '+e.message);}
                                   throw new Error('User data extraction failure '+e.message);
                              });
                         }
                         else{throw new Error('No backend object detected');}
               }
               else{
                    console.log('User not authenticated');
                    router.replace('/src/login');
                    throw new Error('User authentication failed');
               }
          }catch(e){
               console.log('Authentication error: '+e.message);
               if(props.fail_callback){props.fail_callback('Authentication error: '+e.message);}
               seterrStr(e.message);
          }
     },[])
     if(auth){return(props.children)}
     else{return(<div className='app-not-auth-body'>{errStr}</div>)}
     
}



export default withRouter(AuthView);