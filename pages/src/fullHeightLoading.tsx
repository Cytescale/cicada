import React from 'react';
import {Spinner} from 'react-bootstrap';


const loading:React.FC<any> = (props:any)=>{
     return (
          <div className='app-full-loading-main-cont'>
                <Spinner animation="border" role="status" variant="light"/>
               
          </div>
     );
}
export default loading