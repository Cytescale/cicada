import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import { withRouter, NextRouter } from 'next/router'
import FullHeiLoading from '../fullHeightLoading';

interface WithRouterProps {
     router: NextRouter
   }
   
interface LoginProps extends WithRouterProps {
     isAuth:boolean
     setAuth:any
     loading:boolean
     setLoading:any
}


class LoginAct extends React.Component<LoginProps,any>{
     constructor(props:any){
          super(props);
          this.state ={
               loading:false
          }
          this.setLoading = this.setLoading.bind(this);
     }

     setLoading(b:boolean){this.setState({loading:b})}

     componentDidMount(){
          console.log(this.state.loading);
     }

     render(){
          return(
               <>
                    <div className='app-main-cont-main-body login-body-cont'>
                    <Head>
                    <title>Login</title>
                    <meta name="description" content="Cicada Login Activity" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico" />
                    </Head>
                         <div className='app-head-cont-main-body login-head-body-cont'>
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
                              disabled={this.state.loading}
                              type='email'
                              className='app-input-class login-form-fld'  
                              placeholder='Enter email address'/>
                              </div>
                              <div className='app-login-inpt-main-cont'>
                                   <div className='app-login-inpt-main-cont-lab'>
                                        Password
                                   </div>
                              <input 
                              disabled={this.state.loading}
                              type='password'
                              className='app-input-class login-form-fld'  
                              placeholder='********'/>
                              </div>
                              <div className='app-login-sub-main-cont'>
                                        <button className='app-login-sub-butt' 
                                             disabled={this.state.loading}
                                             onClick={()=>{
                                             this.props.router.push('/src/land');
                                        }}>
                                             {!this.state.loading?'Login':'Just a sec'}
                                        </button>
                              </div>
                              <div className='app-or-cont'>or</div>
                              <div  className='app-login-cont-googl-butt-cont'>
                                        <button  
                                        disabled={this.state.loading}
                                        className='app-input-class-raised-pressable app-login-cont-googl-butt'
                                        >
                                        <span
                                        className='app-login-cont-googl-butt-ico-cont'
                                        >
                                        <Image src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
                                        className='app-login-cont-googl-butt-ico'
                                        width={22}
                                        objectFit='fill'
                                        height={22}/>
                                        </span>
                                        Continue with Google
                                        </button>
                              </div>
                              <div className='app-login-sub-act-cont'>
                                   Create an account
                              </div>
                         </div>
               </div>
     </>
          )
     }
}

export default withRouter(LoginAct)
