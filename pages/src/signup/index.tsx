import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import firebaseHelper from "../../../comp/helpers/firebaseHelper";
import { withRouter, NextRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import nexusResponse from "../../../comp/helpers/nexusResponse";
import backendHelper from "../../../comp/helpers/backendHelper";

import { BottomCont} from "../../../comp/elements";




const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();


interface WithRouterProps {
     router: NextRouter

   }
   
interface SignUpProps extends WithRouterProps {
     
}


class SignUpAct extends React.Component<SignUpProps,any>{
     constructor(props:any){
          super(props);
          this.state ={
               loading:false,
               emlFldData:'',
               pssFldData:'',
               displFldData:'',
               unameFldData:'',
               errBool:false,
               errMess:'null',
               succBool:false,
               succMess:'null',
          }
          this.setLoading = this.setLoading.bind(this);
          this.setEmlFldData = this.setEmlFldData.bind(this);
          this.setPssFldData = this.setPssFldData.bind(this);
          this.handleLoginSub = this.handleLoginSub.bind(this);
          this.seterrToast  =this.seterrToast.bind(this);
          this.setsuccToast = this.setsuccToast.bind(this);
          this.setunameFldData = this.setunameFldData.bind(this);
          this.setdisplFldData = this.setdisplFldData.bind(this);
     }

     seterrToast(b:boolean,s:string){this.setState({errBool:b,errMess:s})}
     setsuccToast(b:boolean,s:string){this.setState({errBool:b,errMess:s})}
     setunameFldData(s:string){this.setState({unameFldData:s})}
     setdisplFldData(s:string){this.setState({displFldData:s})}
     setEmlFldData(s:string){this.setState({emlFldData:s})}
     setPssFldData(s:string){this.setState({pssFldData:s})}
     setLoading(b:boolean){this.setState({loading:b})}

     componentDidMount(){
          
     }
     
     async handleLoginSub(){
          
          if(this.state.emlFldData.length && this.state.pssFldData.length){
               await this.setLoading(true);
               await FirebaseHelper.createEmailAuth(this.state.emlFldData,this.state.pssFldData).then((res:nexusResponse|null)=>{
                    if(!res?.errBool){
                         let got_data = res?.responseData;
                         console.log(res);
                         BackendHelper._makeUserData(got_data.uid,got_data.email,got_data.userToken,0).then((r:nexusResponse)=>{
                              console.log(r);
                              if(!r.errBool){
                                   console.log('signupact: Account created successfully');
                                   toast.success('Account created successfully', {
                                        position: toast.POSITION.TOP_CENTER,
                                        autoClose: 5000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                   });
                                   this.props.router.replace('src/login?accnt_redirect=true&&accnt_crt_succ=true');  
                              }else{
                                   throw new Error(r.errMess);
                              }
                         }).catch((e)=>{
                              console.log('signupact: signup error '+e);
                              toast.error(e, {
                                   position: toast.POSITION.TOP_CENTER,
                                   autoClose: 5000,
                                   hideProgressBar: true,
                                   closeOnClick: true,
                                   pauseOnHover: true,
                                   draggable: true,
                                   progress: undefined,
                              });
                         })
                         
                    }
                    else{
                         console.log('signupact: signup error '+res.errMess);
                         switch(res.errMess){
                              case "auth/email-already-in-use":{
                                   toast.error("The email already exist", {position: toast.POSITION.TOP_CENTER,autoClose: 5000,hideProgressBar: true,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,});
                                   break;
                              }
                              case "auth/invalid-credential":{
                                   toast.error("Invalid creadential", {position: toast.POSITION.TOP_CENTER,autoClose: 5000,hideProgressBar: true,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,});
                                   break;
                              }
                              case "auth/invalid-email":{
                                   toast.error("Invalid email", {position: toast.POSITION.TOP_CENTER,autoClose: 5000,hideProgressBar: true,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,});
                                   break;
                              }
                              case "auth/invalid-email":{
                                   toast.error("Invalid email", {position: toast.POSITION.TOP_CENTER,autoClose: 5000,hideProgressBar: true,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,});
                                   break;
                              }
                              default:{
                                   toast.error("Error occured", {position: toast.POSITION.TOP_CENTER,autoClose: 5000,hideProgressBar: true,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,});
                                   break;
                              }
                         }
                    }
                    
               }).catch((e:any)=>{
                    console.log('signupact: signupact error '+e);
                    toast.error(e, {
                         position: toast.POSITION.TOP_CENTER,
                         autoClose: 5000,
                         hideProgressBar: true,
                         closeOnClick: true,
                         pauseOnHover: true,
                         draggable: true,
                         progress: undefined,
                    });
                    
               });
          }
          else{
               toast.error("Enter login details please", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
               });
          }
          await this.setLoading(false);
     }

     render(){
          return(
               <>
                    <div className='app-main-cont-main-body login-body-cont'>
                    <Head>
                    <title>Create account</title>
                    <meta name="description" content="Cicada Login Activity" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico" />
                    </Head>
                         <div className='app-head-cont-main-body login-head-body-cont'>
                                   <a href='/' className='app-head-outer-link-main-cont'>
                                   Sakura
                                   </a>
                         </div>
                         {/* <form> */}
                         <div className='app-moto-cont-main-body'>
                                   <div className='app-moto-cont-main-sub-body'>
                                        <div className='app-moto-cont-tit-1'>
                                             Create Account
                                        </div>
                                        <div className='app-moto-cont-tit-2'>
                                             Sign Up now.
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
                              placeholder='Enter password'/>
                            
                              </div>
                              <div className='app-login-sub-main-cont'>
                                        <button className='app-login-sub-butt' 
                                             disabled={this.state.loading}
                                             onClick={()=>{
                                             this.handleLoginSub();
                                                  //this.props.router.push('/src/land');
                                        }}>
                                             {!this.state.loading?'Create Account':'Just a sec'}
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
                              <a href='/src/login'>
                              <div className='app-login-sub-act-cont'>
                                   Sign In
                              </div>
                              </a>
                         </div>
                         {/* </form> */}
               </div>
               <ToastContainer />
               <BottomCont/>
     </>
          )
     }
}

export default withRouter(SignUpAct)
