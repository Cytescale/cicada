
import { useRouter } from 'next/router'
import { useState } from 'react'
import FullHeiLoading from './src/fullHeightLoading';

import LoginAct from './src/login'
import LandAct from './src/land';

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
