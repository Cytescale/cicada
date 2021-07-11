import React from 'react';
import {Spinner} from 'react-bootstrap';


const loading:React.FC<any> = (props:any)=>{
     return (
          <div className='app-full-loading-main-cont'>
              
               <svg className='app-full-loading-main-cont-ico' width="58" height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M54 41.2412L33.8343 5.62844C32.6831 3.59545 29.7526 3.60039 28.6083 5.63726L16.6067 27L4.51089 48.5306C3.38741 50.5304 4.83263 53 7.1264 53H54" 
                stroke="url(#paint0_linear)"
               strokeWidth="8" 
               strokeLinecap="round" 
               strokeLinejoin="round" 
               className="svg-elem-1"></path>
               <defs>
               <linearGradient id="paint0_linear" x1="50" y1="0.000610352" x2="50" y2="100.001" gradientUnits="userSpaceOnUse">
               <stop stop-color="#FEE27F"/>
               <stop offset="1" stop-color="#F6BC4F"/>
               </linearGradient>
               </defs>
               </svg>

              {/* <svg className='app-full-loading-main-cont-ico' width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M5 85V18C5 10.8203 10.8203 5 18 5H72C79.1797 5 85 10.8203 85 18V72C85 79.1797 79.1797 85 72 85H22" 
               stroke="url(#paint0_linear)"
               strokeWidth="12" 
               strokeLinecap="round" 
               strokeLinejoin="round" 
               className="svg-elem-1"></path>
                <linearGradient id="paint0_linear" x1="50" y1="0.000610352" x2="50" y2="100.001" gradientUnits="userSpaceOnUse">
               <stop stop-color="#FEE27F"/>
               <stop offset="1" stop-color="#F6BC4F"/>
               </linearGradient>
               </svg> */}
          </div>
     );
}
export default loading