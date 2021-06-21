import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import firebaseHelper from "../../../comp/helpers/firebaseHelper";
import { withRouter, NextRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';



const FirebaseHelper = new firebaseHelper();

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
               loading:false,
               emlFldData:'nikhilwilayate1998@gmail.com',
               pssFldData:'password',
               errBool:false,
               errMess:'null',
               succBool:false,
               succMess:'null',
          }
          this.setLoading = this.setLoading.bind(this);
          this.setEmlFldData = this.setEmlFldData.bind(this);
          this.setPssFldData = this.setPssFldData.bind(this);
          this.handleLoginSub = this.handleLoginSub.bind(this);
     }

     seterrToast(b:boolean,s:string){this.setState({errBool:b,errMess:s})}
     setsuccToast(b:boolean,s:string){this.setState({errBool:b,errMess:s})}
     setEmlFldData(s:string){this.setState({emlFldData:s})}
     setPssFldData(s:string){this.setState({pssFldData:s})}
     setLoading(b:boolean){this.setState({loading:b})}

     componentDidMount(){
          
     }
     
     async handleLoginSub(){
          console.log('hit');
          toast.error("Login Init", {
               position: toast.POSITION.TOP_CENTER,
               autoClose: 5000,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
          });
          if(this.state.setEmlFldData && this.state.setPssFldData){
            
          }
          else{
              
          }
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
                              value={this.state.emlFldData}
                              onChange={(e)=>{this.setEmlFldData(e.target.value)}}
                              className='app-input-class login-form-fld'  
                              placeholder='Enter email address'/>
                              </div>
                              <div className='app-login-inpt-main-cont'>
                                   <div className='app-login-inpt-main-cont-lab'>
                                        Password
                                   </div>
                              <input 
                              disabled={this.state.loading}
                              value={this.state.pssFldData}
                              onChange={(e)=>{this.setPssFldData(e.target.value)}}
                              type='password'
                              className='app-input-class login-form-fld'  
                              placeholder='********'/>
                              </div>
                              <div className='app-login-sub-main-cont'>
                                        <button className='app-login-sub-butt' 
                                             disabled={this.state.loading}
                                             onClick={()=>{
                                             this.handleLoginSub();
                                                  //this.props.router.push('/src/land');
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
               <ToastContainer />
     </>
          )
     }
}

export default withRouter(LoginAct)
