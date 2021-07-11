import React,{useEffect, useRef, useState} from "react";
import {useRouter } from 'next/router'
import backendHelper from "../../comp/helpers/backendHelper";
import FullHeiLoading from '../src/fullHeightLoading';
import Head from "next/head";
import URLS,{_BASE_CLIENT_URL} from "../../comp/helpers/api.routes";
import { withRouter, NextRouter } from 'next/router'


const BackendHelper = new backendHelper();

function openInNewTab(url){
     const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
     if (newWindow) newWindow.opener = null
}

const RenderLinks=(props)=>{
     const [loading,setloading] = useState(true);
     const [errBool,seterrBool] = useState(false);
     const [errMess,seterrMess] = useState('');
     const [linkData,setlinkData] = useState(null);
     useEffect(()=>{
          console.log(props.uid);
          BackendHelper._getLinksData(props.uid).then(res=>{
               console.log(res);
               setloading(false);
               if(!res.errBool){
                    seterrBool(false);
                    seterrMess('');
                    setlinkData(res.responseData)
               }
               else{throw new Error(res.errMess)}
               
          }).catch((e)=>{
               setloading(false);
               seterrBool(true);
               seterrMess(e.message);
          })
     },[props.uid])
     return(
          !loading?
          !errBool?
          <div >
               {linkData?linkData.map((e,ind)=>{
                    if(e.active_bool){
                         return (
                              <button
                              className='cluster-link-main-cont'
                              onClick={()=>{
                                   openInNewTab(`${URLS.visit}/${e.unique_identifier}`);
                              }}
                              >
                              {e.name}
                              </button>
                         )
                    }

               }):<span/>}
          </div>:
          <div>{errMess}</div>:
          <div>Loading</div>
     )
}

const Cluster=(props)=>{
     const [loading,setloading] = useState(true);
     const [userData,setuserData] = useState(null);
     const [linkData,setlinkData] = useState(null);
     const [errBool,seterrBool] = useState(false);
     const [errMess,seterrMess] = useState('');
     const router = useRouter()
     const { pid } = router.query
     useEffect(() => {
               BackendHelper._getUserDatabyUname(pid).then(res=>{
                    if(!res.errBool){
                         seterrBool(false);
                         seterrMess('');
                         setuserData(res.responseData);
                         console.log(res.responseData);
                    }
                    else{throw new Error(res.errMess)}
               }).catch((e)=>{
                    setloading(false);
                    seterrBool(true);
                    seterrMess(e.message);
               })
               
     },[pid]);

     return(
          !loading?!errBool?
          <div className='cluster-page-main-cont'>
                     <Head>
                    <title>Sakura</title>
                    <meta name="description" content="Cicada Login Activity" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <div className='cluster-profile-main-cont'>
                         <div className='cluster-profile-pro-cont'>
                              <div className='cluster-profile-pro'>

                              </div>
                         </div>
                         <div className='cluster-profile-pro-name'>
                         {userData?userData.dname:<span/>}          
                         </div>
                    </div>
                    <div className='cluster-hr-cont' />
                    {userData?<RenderLinks uid={userData.uid}/>:<span/>}
                    
                    <div className='cluster-made-main-cont'>Sakura❤️</div>
          </div>:
          <div>
          {errMess.toString()}
          </div>
          :
          <FullHeiLoading/>
     )
}

const ClusterCompWithRouter = (props) => {
     const router = useRouter();
     const { pid } = router.query;
     if(pid){
          return <ClusterComp {...props} router={router} />
     }
     else{
          return   <FullHeiLoading/>
     }
     
   }
   

class ClusterComp extends React.Component{
     constructor(props){
          super(props);
          this.state={
               loading:true,
               errBool:false,
               errMess:'null',
               userData:null,
          }
          this.initLoadUserData = this.initLoadUserData.bind(this);
     }
     
     setuserData(d){this.setState({userData:d})}
     setLoading(b){this.setState({loading:b})}
     seterrBool(b){this.setState({errBool:b})}
     seterrMess(s){this.setState({errMess:s})}

     async initLoadUserData(){
          BackendHelper._getUserDatabyUname(this.props.router.query.pid).then(res=>{
               if(!res.errBool){
                    this.seterrBool(false);
                    this.seterrMess('');
                    this.setuserData(res.responseData);
                    this.setLoading(false);
                    console.log(res.responseData);
               }
               else{throw new Error(res.errMess)}
          }).catch((e)=>{
               this.setLoading(false);
               this.seterrBool(true);
               this.seterrMess(e.message);
          })
     }
     
     async initLoadLinkConfig(){
          
     }

     componentDidMount(){
          console.log(this.props.router.query.pid);
          this.initLoadUserData();
     }
     


     render(){
         
          return(
               !this.state.loading?!this.state.errBool?
               <div className='cluster-page-main-cont'>
                          <Head>
                         <title>Sakura</title>
                         <meta name="description" content="Cicada Login Activity" />
                         <meta name="viewport" content="width=device-width, initial-scale=1"/>
                         <link rel="icon" href="/favicon.ico" />
                         </Head>
                         <div className='cluster-profile-main-cont'>
                              <div className='cluster-profile-pro-cont'>
                                   <div className='cluster-profile-pro'>
     
                                   </div>
                              </div>
                              <div className='cluster-profile-pro-name'>
                              {this.state.userData?this.state.userData.dname:<span/>}          
                              </div>
                         </div>
                         <div className='cluster-hr-cont' />
                         {/* {userData?<RenderLinks uid={userData.uid}/>:<span/>} */}
                         
                         <div className='cluster-made-main-cont'>Sakura❤️</div>
               </div>:
               <div>
               {errMess.toString()}
               </div>
               :
               <FullHeiLoading/>
          )
     }
}

export default ClusterCompWithRouter;
