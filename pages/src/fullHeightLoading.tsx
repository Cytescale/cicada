import React from 'react';
import {Spinner} from 'react-bootstrap';

const loading:React.FC<any> = (props:any)=>{
     return (
          <div className='app-full-loading-main-cont'>
               We are rushing
               <Spinner animation="border" role="status" className='app-full-loading-main-cont-loader'>
               </Spinner>
          </div>
     );
}
export default loading