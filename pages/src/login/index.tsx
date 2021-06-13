import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import { withRouter, NextRouter } from 'next/router'


interface WithRouterProps {
     router: NextRouter
   }
   
interface LoginProps extends WithRouterProps {}



class LoginAct extends React.Component<LoginProps>{
     constructor(props:any){
          super(props);

     }
     render(){
          return(
               <>
     <div className='app-main-cont-main-body'>
      <Head>
        <title>Login</title>
        <meta name="description" content="Cicada Login Activity" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <div className='app-head-cont-main-body'>
                    Sakura
          </div>
          <div className='app-moto-cont-main-body'>
                    <div className='app-moto-cont-main-sub-body'>
                         <div className='app-moto-cont-tit-1'>
                              Welcome
                         </div>
                         <div className='app-moto-cont-tit-2'>
                              Sign In now.
                         </div>
                    </div>
          </div>
          <div className='app-login-main-cont-body'>
                  <div className='app-login-inpt-main-cont'>
                    <div className='app-login-inpt-main-cont-lab'>
                         Email Address
                    </div>
                  <input 
                  type='email'
                  className='app-input-class login-form-fld'  
                  placeholder='Enter email address'/>
                  </div>
                  <div className='app-login-inpt-main-cont'>
                    <div className='app-login-inpt-main-cont-lab'>
                         Password
                    </div>
                  <input 
                  type='password'
                  className='app-input-class login-form-fld'  
                  placeholder='********'/>
                  </div>
                  <div className='app-login-sub-main-cont'>
                         <button className='app-login-sub-butt' onClick={()=>{
                              this.props.router.push('/src/land');
                         }}>
                              Login
                         </button>
                  </div>
                  <div className='app-login-sub-act-cont'>
                       Create an account
                  </div>
                  {/* <div className='app-or-cont'>or</div>
                  <div  className='app-login-cont-googl-butt-cont'>
                         <button  className='app-login-cont-googl-butt'>
                         <Image src="/gog.png"
                         className='app-login-cont-googl-butt-ico'
                         width={42}
                         objectFit='fill'
                         height={42}/>
                         Continue with Google
                         </button>
                  </div> */}
          </div>
    </div>
     </>
          )
     }
}

export default withRouter(LoginAct)
