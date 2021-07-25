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
   
interface ForgotPassActProps extends WithRouterProps {
     
}


class ForgotPassAct extends React.Component<ForgotPassActProps,any>{
     constructor(props:any){
          super(props);
          this.state ={
               loading:false,
               emlFldData:'',
               errBool:false,
               errMess:'null',
               succBool:false,
               succMess:'null',
          }
          this.setLoading = this.setLoading.bind(this);
          this.setEmlFldData = this.setEmlFldData.bind(this);
          this.handleLoginSub = this.handleLoginSub.bind(this);
          this.seterrToast  =this.seterrToast.bind(this);
          this.setsuccToast = this.setsuccToast.bind(this);
     }

     seterrToast(b:boolean,s:string){this.setState({errBool:b,errMess:s})}
     setsuccToast(b:boolean,s:string){this.setState({errBool:b,errMess:s})}
     setEmlFldData(s:string){this.setState({emlFldData:s})}
     setLoading(b:boolean){this.setState({loading:b})}

     componentDidMount(){
          
     }
     
     async handleLoginSub(){
          
          if(this.state.emlFldData.length){
               await this.setLoading(true);
               FirebaseHelper.sendPassResetEmail(this.state.emlFldData).then((r)=>{
                    console.log(r);
                    if(!r?.errBool){
                         if(r?.responseData.linkSent){
                              toast.success('Password reset link sent', {
                                   position: toast.POSITION.TOP_CENTER,
                                   autoClose: 5000,
                                   hideProgressBar: true,
                                   closeOnClick: true,
                                   pauseOnHover: true,
                                   draggable: true,
                                   progress: undefined,
                              });
                         }
                    }else{
                         throw new Error(r.errMess);
                    }                
               })
               .catch((e)=>{
                    console.log('Forgot password sending link failure '+e.message);
                    toast.error(e.message, {
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
               toast.error("Enter enter email address", {
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
                    <title>Forgot Password</title>
                    <meta name="description" content="Cicada Login Activity" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico" />
                    </Head>
                         <div className='app-head-cont-main-body login-head-body-cont'>
                                   <a href='/' className='app-head-outer-link-main-cont'>
                                   Cytelink
                                   </a>
                         </div>
                         <div className='app-moto-cont-main-body'>
                                   <div className='app-moto-cont-main-sub-body'>
                              
                                        <div className='app-moto-cont-tit-2'>
                                             Can't remember password?
                                        </div>
                                   </div>
                         </div>
                         <div className='app-login-main-cont-body'>
                                             <div className='app-login-inpt-main-cont'>
                                                  <div className='app-login-inpt-main-cont-lab forgot-pass-lab'>
                                                       Email Address
                                                       <div className='forgot-pass-sub-lab'>
                                                            Password reset link will be sent to this email address.
                                                       </div>
                                                  </div>
                                                       <input 
                                                       disabled={this.state.loading}
                                                       type='email'
                                                       value={this.state.emlFldData}
                                                       onChange={(e)=>{this.setEmlFldData(e.target.value)}}
                                                       className='app-input-class forgot-pass-fld'  
                                                       placeholder='Enter email address'/>
                                                       </div>
                                                       <button className='forgot-sub-butt'
                                                            onClick={()=>{
                                                                 this.handleLoginSub();
                                                            }}
                                                       >
                                                            Send Link
                                                       </button> 
                         </div>
               </div>
               <ToastContainer />
               <BottomCont/>
     </>
          )
     }
}

export default withRouter(ForgotPassAct)
