
import { useRouter } from 'next/router'
import { useState,useEffect  } from 'react'
import FullHeiLoading from './src/fullHeightLoading';
import firebaseHelper from '../comp/helpers/firebaseHelper';
import LoginAct from './src/login'
import LandAct from './src/land';

const Firebasehelper = new firebaseHelper();

Firebasehelper.initFirebaseApp();


const DeciderComp:React.FC<any> = (props:any)=>{
  if(props.isAuth){
    return <LandAct {...props}/>
  }else{
    return <LoginAct {...props}/> 
  }
}

export default function Home() {
  let [isAuth , setAuth ] = useState<boolean>(false);
  let [loading , setLoading] = useState<boolean>(false);
  useEffect(() => { 
    Firebasehelper.checkInitUser().then(res=>{
      if(res){
        setAuth(true);
      }
    })
  });
  return (
      !loading?
      <DeciderComp
      isAuth={isAuth} 
      setAuth={setAuth} 
      loading={loading}
      setLoading = {setLoading}
      />:
      <FullHeiLoading/>    
    )
}
