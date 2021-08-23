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


class ForgotPassAct extends React.Component{
     constructor(props){
          super(props);
          this.state ={
               loading:false,
               errBool:false,
               errMess:'null',
               succBool:false,
               succMess:'null',
          }
          this.setLoading = this.setLoading.bind(this);
          this.seterrToast  =this.seterrToast.bind(this);
          this.setsuccToast = this.setsuccToast.bind(this);
     }

     seterrToast(b,s){this.setState({errBool:b,errMess:s})}
     setsuccToast(b,s){this.setState({errBool:b,errMess:s})}
     setLoading(b){this.setState({loading:b})}

     componentDidMount(){
          
     }
     render(){
          return(
               <>
                    <div className='app-main-cont-main-body login-body-cont'>
                    <Head>
                    <title>Cytelink</title>
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
                                        <div className='app-moto-cont-tit-2 unveri-tit-2'>
                                             Welcome🎉
                                        </div>
                                        <div className='app-moto-cont-tit-3'>
                                        Glad to see you here! We have added you to the waitlist. 
                                        <br/>
                                        As we are currently working on furnishing your experience with the product, we are slowly letting people in to make sure everything is working sound.
                                        <br/><br/>
                                        We are so grateful to have you and can't wait to let you join the ride!
                                        <br/>
                                        We will get back to you :)
                                        <br/><br/>
                                        Watch out for our mail. See you soon 😉
                                        <br/><br/>
                                        - With ❤️ 
                                        <br/>Team Cytelink
                                        </div>
                                   </div>
                         </div>
               </div>
               <ToastContainer />
               <BottomCont/>
     </>
          )
     }
}

export default withRouter(ForgotPassAct)
