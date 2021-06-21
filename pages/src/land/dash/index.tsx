import React,{useState} from "react";


const WelcomeHead:React.FC<any> = ()=>{
     const [show,setShow] = useState<boolean>(true);
     return(
          show?
          <div className='dash-wel-main-cont'>
                    Welcome to<br/>Cicada
                    <svg width="31" height="27" viewBox="0 0 31 27" fill="none" className='dash-wel-main-cont-ico' onClick={()=>{
                         setShow(false);
                    }}>
                    <path d="M15.8815 4.80617C10.3925 4.80617 5.95557 9.06947 5.95557 14.3437C5.95557 19.618 10.3925 23.8813 15.8815 23.8813C21.3706 23.8813 25.8075 19.618 25.8075 14.3437C25.8075 9.06947 21.3706 4.80617 15.8815 4.80617ZM20.1497 18.4449C19.7626 18.8169 19.1373 18.8169 18.7501 18.4449L15.8815 15.6885L13.0129 18.4449C12.6258 18.8169 12.0005 18.8169 11.6134 18.4449C11.2263 18.0729 11.2263 17.4721 11.6134 17.1001L14.482 14.3437L11.6134 11.5874C11.2263 11.2154 11.2263 10.6146 11.6134 10.2426C12.0005 9.87062 12.6258 9.87062 13.0129 10.2426L15.8815 12.9989L18.7501 10.2426C19.1373 9.87062 19.7626 9.87062 20.1497 10.2426C20.5368 10.6146 20.5368 11.2154 20.1497 11.5874L17.2811 14.3437L20.1497 17.1001C20.5269 17.4625 20.5269 18.0729 20.1497 18.4449Z" fill="#F7F7FC"/>
                    </svg>
          </div>:
          <span/>
     )
}


export default class Dash extends React.Component {
     constructor(props:any){
          super(props);
     }

     renderBottomFader(){return(<div className='app-bottom-fader-main-cont'/>)}

     renderBottomNav(){
          return(
               <div className='app-bottom-main-cont'>
                         <div className='app-bottom-butt-main-outer-cont'>
                         <button className='app-bottom-butt-main-cont'>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
                         <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="white"/>
                         </svg></button>
                         </div>

                         <div className='app-bottom-butt-main-outer-cont'>
                         <button className='app-bottom-butt-main-cont'>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
                         <path d="M17 7H14C13.45 7 13 7.45 13 8C13 8.55 13.45 9 14 9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H14C13.45 15 13 15.45 13 16C13 16.55 13.45 17 14 17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM8 12C8 12.55 8.45 13 9 13H15C15.55 13 16 12.55 16 12C16 11.45 15.55 11 15 11H9C8.45 11 8 11.45 8 12ZM10 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H10C10.55 9 11 8.55 11 8C11 7.45 10.55 7 10 7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H10C10.55 17 11 16.55 11 16C11 15.45 10.55 15 10 15Z" fill="white"/>
                         </svg>
                         </button>
                         </div>

                         <div className='app-bottom-butt-main-outer-cont'>
                         <button className='app-bottom-butt-main-cont'>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className='app-bottom-butt-main-cont-ico'>
                         <path d="M21 8C19.55 8 18.74 9.44 19.07 10.51L15.52 14.07C15.22 13.98 14.78 13.98 14.48 14.07L11.93 11.52C12.27 10.45 11.46 9 10 9C8.55 9 7.73 10.44 8.07 11.52L3.51 16.07C2.44 15.74 1 16.55 1 18C1 19.1 1.9 20 3 20C4.45 20 5.26 18.56 4.93 17.49L9.48 12.93C9.78 13.02 10.22 13.02 10.52 12.93L13.07 15.48C12.73 16.55 13.54 18 15 18C16.45 18 17.27 16.56 16.93 15.48L20.49 11.93C21.56 12.26 23 11.45 23 10C23 8.9 22.1 8 21 8Z" fill="white"/>
                         <path d="M15 9L15.94 6.93L18 6L15.94 5.07L15 3L14.08 5.07L12 6L14.08 6.93L15 9Z" fill="white"/>
                         <path d="M3.5 11L4 9L6 8.5L4 8L3.5 6L3 8L1 8.5L3 9L3.5 11Z" fill="white"/>
                         </svg>
                         </button>
                         </div>

                         <div className='app-bottom-butt-main-outer-cont'>
                         <button className='app-bottom-butt-main-cont'>
                         <svg width="24" height="24" viewBox="0 0 24 23" fill="none" className='app-bottom-butt-main-cont-ico'>
                         <path d="M3.08928 21.9859C1.76509 21.1674 -0.287408 18.9164 2.09614 16.4608C5.07557 13.3913 12.0276 13.3913 12.5241 13.3913C13.0207 13.3913 21.1781 14.4426 22.4556 17.0747C23.9453 20.1442 21.959 22.1906 21.4624 21.9859" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                         <path d="M17 5.73913C17 8.31505 14.8038 10.4783 12 10.4783C9.19622 10.4783 7 8.31505 7 5.73913C7 3.16321 9.19622 1 12 1C14.8038 1 17 3.16321 17 5.73913Z" stroke="white" stroke-width="2"/>
                         </svg>
                         </button>
                         </div>


               </div>
          )
     }


     renderLinkEnal(bool:boolean){
          return(
               <div className='app-input-class-raised-pressable dash-enal-cont'>
                         All Link {bool===true?<span className='dash-enal-on'>Enabled</span>:<span className='dash-enal-off'>Disabled</span>}
                         <div className='app-input-class dash-enal-butt-cont'>
                         {bool===true?<div className='dash-enal-indi-on'/>:<div className='dash-enal-indi-off'/>}
                         </div>
               </div>
          )
     }

     renderTile(str:string){
          return(
               <div  className='app-tit-main-cont'>
                    {str}
               </div>
          )
     }

     renderEnderLine(){
          return(
               <div className='app-ender-line-main-cont'>
                    Made with Love ❤️
               </div>
          )
     }

     renderLinkTable(){
          return(
               <div className='app-input-class-raised dash-links-cont'>
                    <div className='dash-links-cont-serch-cont'>
                    <input className='app-input-class dash-search-cont' placeholder='Search link'/>
                    </div>
                    <div className='dash-links-cont-link-cont'>
                         <div className='dash-links-cont-link-cont-ico'></div>
                         <div className='dash-links-cont-link-cont-lab'>Placeholder Link</div>
                         <div className='dash-links-cont-link-right-cont'>
                              <button className='dash-links-cont-link-right-copy-butt'>
                                   <svg className='dash-links-cont-link-right-copy-butt-ico' viewBox='0 0 512 512'><title>Copy</title><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                              </button>
                              <button className='dash-links-cont-link-right-copy-butt'>
                                 <svg className='dash-links-cont-link-right-enal-butt-ico turned-on' viewBox='0 0 512 512'><title>Power</title><path d='M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                              </button>
                         </div>
                         
                    </div>
                    
                    <div className='dash-links-cont-link-cont'>
                         <div className='dash-links-cont-link-cont-ico'></div>
                         <div className='dash-links-cont-link-cont-lab'>Placeholder Link</div>
                         <div className='dash-links-cont-link-right-cont'>
                              <button className='dash-links-cont-link-right-copy-butt'>
                                   <svg className='dash-links-cont-link-right-copy-butt-ico' viewBox='0 0 512 512'><title>Copy</title><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                              </button>
                              <button className='dash-links-cont-link-right-copy-butt'>
                                 <svg className='dash-links-cont-link-right-enal-butt-ico turned-off' viewBox='0 0 512 512'><title>Power</title><path d='M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                              </button>
                         </div>
                         
                    </div>
                    <div className='dash-links-cont-link-botom-cont' >
                         <button className='dash-links-cont-link-botom-crt-butt' >
                              Create Link
                         </button>
                         <button className='app-input-class-raised-pressable dash-links-cont-link-botom-show-butt' >
                              Show More
                         </button>
                    </div>

               </div>
          )
     }

     renderInsight(){
          return(
               <div className='app-input-class-raised insight-main-cont'>  


                    <div className='app-input-class-raised insight-bottom-main-cont'>
                         <button className='insight-bottom-butt insigh-selec'>
                              Today
                         </button>
                         <button className='insight-bottom-butt '>
                              Month
                         </button>
                         
                    </div>

               </div>
          )
     }
     render(){
          return(
               <div className='app-content-main-cont'>
                         <div className='app-head-main-cont'>
                              <div className='app-head-main-cont-logo'>
                              Cicada
                              </div>
                              <div className='app-head-main-right-cont'>
                                   <button
                                   className='app-input-class-raised-pressable link-add-butt'
                                   >
                                        Create Link
                                   </button>
                              </div>
                         </div>
                         <div className='app-body-main-cont'>
                              <div className='app-body-main-cont-lab'>Dashboard</div>                              
                            
                         </div>
                         <WelcomeHead/>
                         {this.renderLinkEnal(true)}
                         {this.renderTile('Your links')}
                         {this.renderLinkTable()}
                         {this.renderTile('Insights')}
                         {this.renderInsight()}
                         {this.renderEnderLine()}
                         {this.renderBottomFader()}
                        
               </div>
          )
     }


}