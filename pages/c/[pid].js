import React,{useEffect, useRef, useState} from "react";
import {useRouter } from 'next/router'
import backendHelper from "../../comp/helpers/backendHelper";
import FullHeiLoading from '../src/fullHeightLoading';
import Head from "next/head";
import URLS,{_BASE_CLIENT_URL} from "../../comp/helpers/api.routes";
import { withRouter, NextRouter } from 'next/router'
import styled ,{ThemeProvider} from "styled-components";
 import GlobalStyles from './clusterGlobalStyle.js';

 const StyledClusterMainCont = styled.div.attrs(props => ({
     textColor:'#000',
     subTextColor:'#bdbdbd',
     backColor:'#fff',
     profileCardColor:'#f6f6f6',
     bioCardColor:'#f0f0f0',
     bioCardShad:'none',
     cardColor:'#fff',
     cardColorpress:'#e0e0e0',
     cardTitleColor:'#000',
     cardShadow:'0px 4px 8px rgba(0, 0, 0, 0.10)',
     borderColor:'#e0e0e0',
     ButtonBorderRadius:'3px',
     Buttonborder:'1px solid #f1f1f1',
   }))`         
          .cluster-page-main-cont{
               height: 100%;
               min-height: 100vh;
               width: 100vw;
               background-color: ${props => props.backColor};
               position: relative;
          }         
          .cluster-profile-pro-cont{
               width: 100%;
               display: flex;
               align-content: center;
               justify-content: center;
          }
          .cluster-profile-pro-pic-main-cont{
               width: 90px;
               height: 90px;
               border-radius: 100px;

          }
          .cluster-profile-main-cont{
               width: 100%;
               padding-top: 42px;
               padding-bottom: 22px;
               background-color:  ${props => props.profileCardColor};;
               border-bottom:  ${props => props.border};;
          }

          .cluster-profile-pro{
               width: 100px;
               height: 100px;
               background: linear-gradient(180deg, #FEE27F 0%, #F6BC4F 100%);
               border-radius: 100px;
          }
          .cluster-profile-pro-name{
               width: 100%;
               display: flex;
               font-family: inter;
               align-items: center;
               justify-content: center;
               margin-top: 12px;
               font-size: 22px;
               color: ${props => props.textColor};
               
               font-weight: 700;
          }

          .cluster-profile-bio{
               width: 92%;
               margin-left:4%;
               margin-right:4%;
               display: flex;
               font-family: inter;
               align-items: center;
               padding: 12px;
               padding-top:22px;
               padding-bottom:22px;
               border-radius: 8px;
               justify-content: center;
               margin-top: 12px;
               font-size: 15px;
               background: ${props => props.bioCardColor};
               color: ${props => props.textColor};
               box-shadow:${props => props.bioCardShad};
          }

          .cluster-hr-cont{
               width: 100%;
               border-bottom:  ${props => props.border};;
               margin-top: 22px;
               margin-bottom: 22px;

          }


          .cluster-link-main-cont:active{
               background-color: #e0e0e0;
          }



          .cluster-made-main-cont{
               position: absolute;
               bottom: 0;
               width: 100%;
               display: flex;
               justify-content: center;
               align-items: center;
               font-size: 14px;
               font-family: inter;
               color:  ${props => props.textColor};;
               margin-top:22px;
               padding-bottom: var(--margin);
          }
          .cluster-link-outer-cont{
               padding: 22px;
               padding-bottom:82px;
               
          }

          .cluster-link-outer-cont-tab{
               width: 100%;
               height: 32px;
               display: flex;
               align-items: center;
               justify-content: center;
               font-size: 17px;
               font-family: inter;
               font-weight: 700;
               
               color:  ${props => props.subTextColor};;
          }

          .cluster-link-main-cont{
               width: 100%;
               height: 52px;
               background-color:  ${props => props.cardColor};;
               box-shadow:  ${props => props.cardShadow};;
               border:  ${props => props.Buttonborder};;
               border-radius: ${props => props.ButtonBorderRadius};
               margin-top: 22px;
               display: flex;
               justify-content: center;
               align-items: center;
               color:  ${props => props.cardTitleColor};;
               outline: none;
               z-index: 100;
          }

          .cluster-link-main-cont:active{
               background-color:  ${props => props.cardColorpress};;
               box-shadow:none;
               
          }

`


/*
     --textColor
     --subTextColor
     --backColor
     --profileCardColor
     --cardColor
     --cardShadow
     --borderColor
     --border
*/


let StyledOuterCont = styled(StyledClusterMainCont).attrs({
     
})`

`;

const BackendHelper = new backendHelper();

function openInNewTab(url){
     const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
     if (newWindow) newWindow.opener = null
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
          this.setStyledComponent  = this.setStyledComponent.bind(this);
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
          await BackendHelper._getClusterConfigByUid(this.state.userData.uid).then(res=>{
               if(!res.errBool){
                    console.log(res.responseData);
                    this.setlinkConfigData(res.responseData);
                    this.setStyledComponent(res.responseData.design_temp_id);
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

     async setStyledComponent(int){
          if(int){
               switch(int){
                    
               // textColor:'#000',
               // subTextColor:'#bdbdbd',
               // backColor:'#fff',
               // profileCardColor:'#f6f6f6',
               // cardColor:'#fff',
               // cardTitleColor:'#000',
               // cardShadow:'0px 4px 8px rgba(0, 0, 0, 0.10)',
               // borderColor:'#e0e0e0',
               // border:'1px solid #e0e0e0',
             
                    case 0:{
                         StyledOuterCont = styled(StyledClusterMainCont).attrs({
                              
                         })``;
                         break;
                    }
                    case 1:{
                         StyledOuterCont = styled(StyledClusterMainCont).attrs({
                              backColor:'#2A3239',
                              textColor:'#fff',
                              subTextColor:'#bdbdbd',
                              profileCardColor:'#2A3239',
                              cardColor:'#2A3239',
                              cardColorpress:'#2E3942',
                              cardShadow:'-3px -3px 10px #384148, 3px 3px 10px #1E242B',
                              borderColor:'#757575',
                              Buttonborder:'none',
                              bioCardColor:'#2A3239',
                              bioCardShad:'inset -3px -3px 10px #384148, inset 3px 3px 10px #1E242B',
                              cardTitleColor:'#fff',
                         })``;
                         break;
                    }
                    case 2:{
                         StyledOuterCont = styled(StyledClusterMainCont).attrs({
                              backColor:'#FFE1E1',
                              textColor:'#000',
                              subTextColor:'#222222',
                              profileCardColor:'#FFE1E1',
                              cardColor:'#fff',
                              cardColorpress:'#f1f1f1',
                              cardShadow:'none',
                              borderColor:'#F9CBCB',
                              Buttonborder:'none',
                              bioCardColor:'#FFD4D4',
                              bioCardShad:'none',
                              cardTitleColor:'#000',
                         })``;
                         break;
                    }
                    default:{
                         
                         break;
                    }
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
               <StyledOuterCont>
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
                                   <div className='cluster-profile-pro-pic-main-cont'>
                                                       <img src={this.state.userData.pro_photo_url?this.state.userData.pro_photo_url:'https://ik.imagekit.io/cyte/sakura/Men-Profile-Image_8c3Wj4y8S.png?updatedAt=1626883535964'} className='app-land-head-pro-pic-main-cont-pic' />
                                        </div>
                                   </div>
                                   <div className='cluster-profile-pro-name'>
                                   {this.state.userData?this.state.userData.dname:<span/>}          
                                   </div>
                                   {
                                   this.state.userData?this.state.userData.bio?
                                   <div className='cluster-profile-bio'>
                                   {this.state.userData?this.state.userData.bio:<span/>}          
                                   </div>:null:null
                                   }
                                   
                              </div>:<span/>:<span/>

                        }     
                        <div className='cluster-link-outer-cont'>
                         {/* <div className='cluster-link-outer-cont-tab'>My links</div> */}
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
                         </div>
                           
                           {
                             this.state.linkConfigData?
                             this.state.linkConfigData.footer_card_bool?
                             <a href={_BASE_CLIENT_URL}><div className='cluster-made-main-cont'>Made with Cytelink ❤️</div></a>:
                             <span/>:
                             <span/>  
                         }
                         
               </div>
               </StyledOuterCont>
               :<span>Cluster link is disabled</span>:<span/>:
               <div>
               {errMess.toString()}
               </div>
               
               :
               <FullHeiLoading/>
          )
     }
}

export default ClusterCompWithRouter;
