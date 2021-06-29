import React,{useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Links from "./links";
import Analytics from "./analytics";
import Profile from "./profile";
import Dash from "./dash";
import user from "../../../comp/utils/user";
import firebaseHelper,{getUid,checkToken} from "../../../comp/helpers/firebaseHelper";
import { withRouter, NextRouter } from 'next/router'
import FullHeiLoading from '../fullHeightLoading';
import Head from "next/head";
import  {Dropdown, Modal}  from "react-bootstrap";
import { ToastContainer } from "react-toastify";


const WelcomeHead:React.FC<any> = ()=>{
     const [show,setShow] = useState<boolean>(true);
     return(
          show?
          <div className='dash-wel-main-cont'>
                    Welcome to<br/>Sakura
                    <svg width="31" height="27" viewBox="0 0 31 27" fill="none" className='dash-wel-main-cont-ico' onClick={()=>{
                         setShow(false);
                    }}>
                    <path d="M15.8815 4.80617C10.3925 4.80617 5.95557 9.06947 5.95557 14.3437C5.95557 19.618 10.3925 23.8813 15.8815 23.8813C21.3706 23.8813 25.8075 19.618 25.8075 14.3437C25.8075 9.06947 21.3706 4.80617 15.8815 4.80617ZM20.1497 18.4449C19.7626 18.8169 19.1373 18.8169 18.7501 18.4449L15.8815 15.6885L13.0129 18.4449C12.6258 18.8169 12.0005 18.8169 11.6134 18.4449C11.2263 18.0729 11.2263 17.4721 11.6134 17.1001L14.482 14.3437L11.6134 11.5874C11.2263 11.2154 11.2263 10.6146 11.6134 10.2426C12.0005 9.87062 12.6258 9.87062 13.0129 10.2426L15.8815 12.9989L18.7501 10.2426C19.1373 9.87062 19.7626 9.87062 20.1497 10.2426C20.5368 10.6146 20.5368 11.2154 20.1497 11.5874L17.2811 14.3437L20.1497 17.1001C20.5269 17.4625 20.5269 18.0729 20.1497 18.4449Z" fill="#F7F7FC"/>
                    </svg>
          </div>:
          <span/>
     )
}
const FirebaseHelper = new firebaseHelper();
const User = new user();



interface WithRouterProps {
     router: NextRouter
   }
   

interface LandProps extends WithRouterProps {
     
}


class Land extends React.Component<LandProps,any>{
     constructor(props:LandProps){
          super(props);
          this.state = {
               createLinkModalVisi:false,
               isLoading:false,
               isAuth:false,
          }
          this.initDataLoad = this.initDataLoad.bind(this);
          this.setAuth = this.setAuth.bind(this);
          this.setLoading = this.setLoading.bind(this);
          this.setcreateLinkModalVisi = this.setcreateLinkModalVisi.bind(this);
     }

     setcreateLinkModalVisi(b:boolean){
          this.setState({createLinkModalVisi:b})
     }

     setLoading(b:boolean){
          this.setState({isLoading:b})
     }

     setAuth(b:boolean){
          this.setState({isAuth:b});
     }

     async initDataLoad(){
               this.setLoading(true);
               if(await getUid()){
                    this.setAuth(true);
                    this.setLoading(false);
               }else{
                    this.props.router.replace('/src/login');
                    this.setAuth(false);
               }
     }

     

     renderLink(ind:number,name:string,gen_link:string,dest_link:string){
          return(
               <div className='lnk-lnk-main-cont'>
                    <div className='lnk-lnk-head-main-cont'>
                              <div className='lnk-lnk-head-main-cont-name-cont'>
                                    {name}
                              </div>

                              <button
                              className='lnk-lnk-head-edit-butt'
                              >
                                   <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M2.375 13.8225V16.2292C2.375 16.4508 2.54917 16.625 2.77083 16.625H5.1775C5.28042 16.625 5.38333 16.5854 5.45458 16.5062L14.0996 7.86916L11.1308 4.90041L2.49375 13.5375C2.41458 13.6167 2.375 13.7117 2.375 13.8225ZM16.3954 5.57333C16.7042 5.26458 16.7042 4.76583 16.3954 4.45708L14.5429 2.60458C14.2342 2.29583 13.7354 2.29583 13.4267 2.60458L11.9779 4.05333L14.9467 7.02208L16.3954 5.57333Z" fill="white"/>
                                   </svg>
                              
                              </button>
                              <div  className='lnk-lnk-head-right-butt-cont'>
                              <label className="switch">
                                   <input type="checkbox"/>
                                   <span className="slider round"></span>
                              </label>
                              {/* <button className='dash-links-cont-link-right-copy-butt'>
                                 <svg className='dash-links-cont-link-right-enal-butt-ico turned-on' viewBox='0 0 512 512'><title>Power</title><path d='M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                              </button> */}
                              </div>
                    </div>
                    <div className='lnk-lnk-gen-cont'>
                         <div className='lnk-lnk-gen-link'>
                              {gen_link}
                         </div>
                         <div className='lnk-lnk-gen-right-cont'>
                              <button className='lnk-lnk-gen-right-butt'>                             
                                   <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M0.375 11.8225V14.2292C0.375 14.4508 0.549167 14.625 0.770833 14.625H3.1775C3.28042 14.625 3.38333 14.5854 3.45458 14.5062L12.0996 5.86916L9.13083 2.90041L0.49375 11.5375C0.414583 11.6167 0.375 11.7117 0.375 11.8225ZM14.3954 3.57333C14.7042 3.26458 14.7042 2.76583 14.3954 2.45708L12.5429 0.604579C12.2342 0.295829 11.7354 0.295829 11.4267 0.604579L9.97792 2.05333L12.9467 5.02208L14.3954 3.57333Z" fill="currentColor"/>
                                   </svg>
                              </button>
                              <button className='lnk-lnk-gen-right-butt'>                             
                                   <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M16.1155 5H7.4436C6.21391 5 5.21704 5.99687 5.21704 7.22656V15.8984C5.21704 17.1281 6.21391 18.125 7.4436 18.125H16.1155C17.3452 18.125 18.342 17.1281 18.342 15.8984V7.22656C18.342 5.99687 17.3452 5 16.1155 5Z" stroke="currentColor" stroke-linejoin="round"/>
                                   <path d="M15.1975 5L15.217 4.0625C15.2154 3.48285 14.9844 2.9274 14.5745 2.51753C14.1646 2.10765 13.6092 1.87665 13.0295 1.875H4.59204C3.9296 1.87696 3.29485 2.14098 2.82644 2.6094C2.35802 3.07781 2.094 3.71256 2.09204 4.375V12.8125C2.09369 13.3922 2.32469 13.9476 2.73457 14.3575C3.14445 14.7674 3.69989 14.9984 4.27954 15H5.21704" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                   </svg>
                              </button>
                              

                         </div>
                    </div>
                    

               </div>
          )
     }

     componentDidMount(){
          console.log('component mount');
          this.initDataLoad();
     }

     render(){
          if(!this.state.isLoading && this.state.isAuth){
          return(
               <div className='app-main-cont-main-body login-body-cont'>
                    <Head>
                    <title>Login</title>
                    <meta name="description" content="Cicada Login Activity" />
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="icon" href="/favicon.ico" />
                    </Head>
                          <div className='app-head-main-cont link-head-body-cont'>
                              <div className='app-head-main-cont-logo link-head-logo'>
                              Sakura
                              </div>
                              <div className='app-head-main-right-cont'>
                                   <button
                                   className='app-input-class-raised-pressable link-add-butt'
                                   onClick={()=>{
                                        this.setcreateLinkModalVisi(true);
                                   }}
                                   >
                                        Create Link
                                   </button>
                              </div>
                         </div>
                         <div className='app-body-main-cont'>
                              <div className='app-sub-head-main-cont'>Links</div>
                              <div className='app-sub-head-des-main-cont'>Create your own deep links</div>

                              <WelcomeHead/>

                              <div className='app-create-link-modal-hr'/>
                              {this.renderLink(
                              1,
                              'YoutubeLink ',
                              'cyte.com/fsavb',
                              'https://www.figma.com/file/fasf/...'
                         )}
                         {this.renderLink(
                              1,
                              'YoutubeLink ',
                              'cyte.com/fsavb',
                              'https://www.figma.com/file/fasf/...'
                         )}
                         {this.renderLink(
                              1,
                              'YoutubeLink ',
                              'cyte.com/fsavb',
                              'https://www.figma.com/file/fasf/...'
                         )}

                         <div className='app-create-link-modal-hr'/>

                         </div>
                         <Modal
                              show={this.state.createLinkModalVisi}
                              onHide={()=>{this.setcreateLinkModalVisi(false)}}
                              size="lg"
                              centered
                              animated
                              >
                              <div className='app-create-link-modal-main-cont'>
                                   <div className='app-create-link-modal-main-cont-tit'>
                                   Create Link
                                   </div>
                                   <div className='app-create-link-modal-main-cont-des'>
                                   Create a link by entering a name and it's address.
                                   Select from given Platforms
                                   </div>
                                   
                                   <div className='app-create-link-modal-main-cont-fld-cont'>
                                             <div className='app-create-link-modal-main-cont-fld-tit'>Link Name</div>
                                             <input 
                                             type='text' 
                                             placeholder='eg: YoutubeLink'
                                             className='app-create-link-modal-main-cont-fld'/>
                                   </div>
                                   <div className='app-create-link-modal-main-cont-fld-cont'>
                                             <div className='app-create-link-modal-main-cont-fld-tit'>Link Address</div>
                                             <input 
                                             type='text' 
                                             placeholder='eg: www.link.com'
                                             className='app-create-link-modal-main-cont-fld'/>
                                   </div>

                                   <div className='app-create-link-modal-main-cont-fld-cont'>
                                   <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic" className='app-create-link-modal-main-cont-drop'>
                                        Platform
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu >
                                        <Dropdown.Item as="button">Instagran</Dropdown.Item>
                                        </Dropdown.Menu>
                                        </Dropdown>
                                   </div>

                                   <div className='app-create-link-modal-main-cont-fld-cont'>
                                   <button className='app-create-link-modal-crt-lnk-butt'>Create Link</button>
                                   </div>
                                   
                              </div>
                              </Modal>
                              <ToastContainer />
            </div>
          )}
          else{
               return (
                    <FullHeiLoading/>
               )
          }
     }
}

export default withRouter(Land)



// <Tabs>
// <TabList className='ecsp-tab-main-cont'>
//   <Tab className='app-bottom-tab-cont'>
//        <div className='app-bottom-butt-main-outer-cont'>
//           <button className='app-bottom-butt-main-cont'>
//                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
//           <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor"/>
//           </svg></button>
//           </div>
//           </Tab>
//           <Tab className='app-bottom-tab-cont'>   
//           <div className='app-bottom-butt-main-outer-cont'>
//                <button className='app-bottom-butt-main-cont'>
//                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
//                <path d="M17 7H14C13.45 7 13 7.45 13 8C13 8.55 13.45 9 14 9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H14C13.45 15 13 15.45 13 16C13 16.55 13.45 17 14 17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM8 12C8 12.55 8.45 13 9 13H15C15.55 13 16 12.55 16 12C16 11.45 15.55 11 15 11H9C8.45 11 8 11.45 8 12ZM10 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H10C10.55 9 11 8.55 11 8C11 7.45 10.55 7 10 7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H10C10.55 17 11 16.55 11 16C11 15.45 10.55 15 10 15Z" fill="currentColor"/>
//                </svg>
//                </button>
//                </div>
//           </Tab>
//           <Tab className='app-bottom-tab-cont'> 
//                <div className='app-bottom-butt-main-outer-cont'>
//                <button className='app-bottom-butt-main-cont'>
//                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
//                <path d="M21 8C19.55 8 18.74 9.44 19.07 10.51L15.52 14.07C15.22 13.98 14.78 13.98 14.48 14.07L11.93 11.52C12.27 10.45 11.46 9 10 9C8.55 9 7.73 10.44 8.07 11.52L3.51 16.07C2.44 15.74 1 16.55 1 18C1 19.1 1.9 20 3 20C4.45 20 5.26 18.56 4.93 17.49L9.48 12.93C9.78 13.02 10.22 13.02 10.52 12.93L13.07 15.48C12.73 16.55 13.54 18 15 18C16.45 18 17.27 16.56 16.93 15.48L20.49 11.93C21.56 12.26 23 11.45 23 10C23 8.9 22.1 8 21 8Z" fill="currentColor"/>
//                <path d="M15 9L15.94 6.93L18 6L15.94 5.07L15 3L14.08 5.07L12 6L14.08 6.93L15 9Z" fill="currentColor"/>
//                <path d="M3.5 11L4 9L6 8.5L4 8L3.5 6L3 8L1 8.5L3 9L3.5 11Z" fill="currentColor"/>
//                </svg>
//                </button>
//                </div>
//           </Tab>
        
//           <Tab className='app-bottom-tab-cont'> 
//                <div className='app-bottom-butt-main-outer-cont'>
//                <button className='app-bottom-butt-main-cont'>
//                <svg width="24" height="24" viewBox="0 0 24 23" fill="none" className='app-bottom-butt-main-cont-ico'>
//                <path d="M3.08928 21.9859C1.76509 21.1674 -0.287408 18.9164 2.09614 16.4608C5.07557 13.3913 12.0276 13.3913 12.5241 13.3913C13.0207 13.3913 21.1781 14.4426 22.4556 17.0747C23.9453 20.1442 21.959 22.1906 21.4624 21.9859" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                <path d="M17 5.73913C17 8.31505 14.8038 10.4783 12 10.4783C9.19622 10.4783 7 8.31505 7 5.73913C7 3.16321 9.19622 1 12 1C14.8038 1 17 3.16321 17 5.73913Z" stroke="currentColor" stroke-width="2"/>
//                </svg>
//                </button>
//                </div>
//           </Tab>
// </TabList>

// <TabPanel>
//   <Dash/>
// </TabPanel>
// <TabPanel>
//   <Links/>
// </TabPanel>
// <TabPanel>
//   <Analytics/>
// </TabPanel>
// <TabPanel>
//   <Profile/>
// </TabPanel>
// </Tabs>