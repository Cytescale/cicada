
import { useRouter } from 'next/router'
import { useState } from 'react'

import LoginAct from './src/login'

export default function Home() {
  let [isAuth , setAuth ] = useState<boolean>(false);
  let [loading , setLoading] = useState<boolean>(false);

  return (
    <LoginAct 
      isAuth={isAuth} 
      setAuth={setAuth} 
      loading={loading}
      setLoading = {setLoading}
    />
  )
}
