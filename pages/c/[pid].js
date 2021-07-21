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
               linkConfigData:null,
               linkData:[],
          }
          this.initLoadUserData = this.initLoadUserData.bind(this);
          this.setlinkConfigData = this.setlinkConfigData.bind(this);
          this.setlinkData = this.setlinkData.bind(this);
     }
     
     setlinkData(d){this.setState({linkData:d})}
     setlinkConfigData(d){this.setState({linkConfigData:d})}
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
                    this.initLoadLinkConfig();
               }
               else{throw new Error(res.errMess)}
          }).catch((e)=>{
               this.setLoading(false);
               this.seterrBool(true);
               this.seterrMess(e.message);
          })
     }
     
     async initLoadLinkConfig(){
          BackendHelper._getClusterConfigByUid(this.state.userData.uid).then(res=>{
               if(!res.errBool){
                    console.log(res.responseData);
                    this.setlinkConfigData(res.responseData);
                    this.getLinksData();
               }
               else{throw new Error(res.errMess)}
          }).catch((e)=>{
               this.seterrBool(true);
               this.seterrMess(e.message);
          })
     }
     
     async getLinksData(){
          if(this.state.linkConfigData){
               if(this.state.linkConfigData.active_bool){
                         let resarr = []
                         for(let l in this.state.linkConfigData.link_ids){
                              await BackendHelper._getLinkDatabyId(this.state.userData.uid,this.state.linkConfigData.link_ids[l]).then((res)=>{
                                   resarr.push(res.responseData.gotData)     
                                   console.log(res.responseData.gotData);
                              })
                              .catch((e)=>{
                                   this.seterrBool(true);
                                   this.seterrMess(e.message);
                              })
                         }
                         console.log(resarr);
                         this.setlinkData(resarr);
                    }
          }
     }

     componentDidMount(){
          console.log(this.props.router.query.pid);
          this.initLoadUserData();
     }
     


     render(){
         
          return(
               !this.state.loading?!this.state.errBool?
               this.state.linkConfigData?this.state.linkConfigData.active_bool?
               <div className='cluster-page-main-cont'>
                          <Head>
                         <title>Sakura</title>
                         <meta name="description" content="Cicada Login Activity" />
                         <meta name="viewport" content="width=device-width, initial-scale=1"/>
                         <link rel="icon" href="/favicon.ico" />
                         </Head>
                        {
                             this.state.linkConfigData?
                             this.state.linkConfigData.profile_card_bool?
                              <div className='cluster-profile-main-cont'>
                                   <div className='cluster-profile-pro-cont'>
                                   <div className='app-land-head-pro-pic-main-cont'>
                                                       <img src={this.state.userData.pro_photo_url?this.state.userData.pro_photo_url:'https://ik.imagekit.io/cyte/sakura/Men-Profile-Image_8c3Wj4y8S.png?updatedAt=1626883535964'} className='app-land-head-pro-pic-main-cont-pic' />
                                        </div>
                                   </div>
                                   <div className='cluster-profile-pro-name'>
                                   {this.state.userData?this.state.userData.dname:<span/>}          
                                   </div>
                                   <div className='cluster-profile-bio'>
                                   {this.state.userData?this.state.userData.bio:<span/>}          
                                   </div>
                              </div>:<span/>:<span/>

                        }     
                         
                         <div className='cluster-hr-cont' />
                         {this.state.linkData?this.state.linkData.map((e,ind)=>{
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
                           
                           <div className='cluster-hr-cont' />
                           
                           {
                             this.state.linkConfigData?
                             this.state.linkConfigData.footer_card_bool?
                             <div className='cluster-made-main-cont'>Sakura❤️</div>:
                             <span/>:
                             <span/>  
                         }
                         
               </div>:<span>Cluster link is disabled</span>:<span/>:
               <div>
               {errMess.toString()}
               </div>
               :
               <FullHeiLoading/>
          )
     }
}

export default ClusterCompWithRouter;
