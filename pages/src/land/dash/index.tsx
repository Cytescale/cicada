import React,{useState} from "react";


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


export default class Dash extends React.Component {
     constructor(props:any){
          super(props);
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

     renderLinkTable(){
          return(
               <div className='app-input-class-raised dash-links-cont'>
                    <div className='dash-links-cont-serch-cont'>
                    <input className='app-input-class dash-search-cont' placeholder='Search link'/>
                    </div>
                    <div className='dash-links-cont-link-cont'>
                         <div className='dash-links-cont-link-cont-ico'></div>
                         <div className='dash-links-cont-link-cont-lab'>Link 1</div>
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
                         <div className='dash-links-cont-link-cont-lab'>Link 2</div>
                         <div className='dash-links-cont-link-right-cont'>
                              <button className='dash-links-cont-link-right-copy-butt'>
                                   <svg className='dash-links-cont-link-right-copy-butt-ico' viewBox='0 0 512 512'><title>Copy</title><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                              </button>
                              <button className='dash-links-cont-link-right-copy-butt'>
                                 <svg className='dash-links-cont-link-right-enal-butt-ico turned-off' viewBox='0 0 512 512'><title>Power</title><path d='M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                              </button>
                         </div>
                         
                    </div>
                    <div className='dash-links-cont-link-cont'>
                         <div className='dash-links-cont-link-cont-ico'></div>
                         <div className='dash-links-cont-link-cont-lab'>Link 3</div>
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


     render(){
          return(
               <div className='app-content-main-cont'>
                         <div className='app-head-main-cont'>
                              <div className='app-head-main-cont-logo'>
                                   Sakura
                              </div>
                              <div className='app-head-main-right-cont'>
                                   <button
                                   className='app-input-class-raised-pressable dash-add-butt'
                                   >
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className='dash-add-butt-ico'>
                                   <path d="M14.0625 9H3.9375M9 3.9375V14.0625V3.9375Z" stroke="#11E4D1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                   </svg>         
                                        Add
                                   </button>
                              </div>
                         </div>
                         <div className='app-body-main-cont'>
                              <div className='app-body-main-cont-lab'>Dashboard</div>                              
                            
                         </div>
                         <WelcomeHead/>
                         {this.renderLinkEnal(true)}
                         {this.renderLinkTable()}
               </div>
          )
     }


}