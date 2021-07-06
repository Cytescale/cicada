import axios from 'axios';
import URLS from './api.routes';
import imageKitCert from '../certs/imagekit.config';
import {userData} from '../utils/user';
import nexusResponse from './nexusResponse';
import { setUid,setToken,unseUserToken,unsetUid} from './firebaseHelper';


// var data = qs.stringify({
//   'uid': 'value' 
// });




export default class BackendHelper{
     public static SuccessPass = 0;
     public static MaxPass = 10;
     public static CurrentPass = 0;
     public static REQUEST_TIMEOUT = 5000;
     UID :string|null = null;
     constructor(){
     
     }
     

     async initUserLogout():Promise<boolean>{
          return new Promise(async (resolve, reject) => {
               try{
                     await unseUserToken();
                     await unsetUid();
                    resolve(true);
               } catch(e){
                    reject(false);
               }
          })
     }

     async _getUserInfo(uid:any):Promise<nexusResponse>{    
          var data = JSON.stringify({"uid": uid});             
          return new Promise((resolve, reject) => {
                axios({
                         method: 'post',
                         url:URLS.getUserInfo,
                         headers: { 'Content-Type': 'application/json'},
                         data : data,
                         timeout: BackendHelper.REQUEST_TIMEOUT,
                    })
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
          })
      }


     async _checkURLValid(got_data:any):Promise<nexusResponse>{
          return new Promise((resolve, reject) => {
                axios({
                         method: 'post',
                         url:URLS.checkURLValidity,
                         headers: { 'Content-Type': 'application/json'},
                         data : got_data,
                         timeout: BackendHelper.REQUEST_TIMEOUT,})
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
          })
     }


     _createLink(got_data:any):Promise<nexusResponse>{
          return new Promise((resolve, reject) => {
                axios({
                         method: 'post',
                         url:URLS.makeLinkData,
                         headers: { 'Content-Type': 'application/json'},
                         data : got_data,
                         timeout: BackendHelper.REQUEST_TIMEOUT,})
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
          })
     }

     async _getLinksData(uid:string):Promise<nexusResponse>{
          var data = JSON.stringify({"uid": uid});             
          return new Promise((resolve, reject) => {
                axios({
                         method: 'post',
                         url:URLS.getLinkData,
                         headers: { 'Content-Type': 'application/json'},
                         data : data,
                         timeout: BackendHelper.REQUEST_TIMEOUT,
                    })
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
          })
     }

     _updateLinkData(uid:string,linkId:string,updateData:any):Promise<nexusResponse>{
          var data = JSON.stringify({"uid": uid, "linkid":linkId,"update_data":updateData});             
          return new Promise((resolve, reject) => {
                          axios({
                         method: 'post',
                         url:URLS.updateLinkData,
                         headers: { 'Content-Type': 'application/json'},
                         data : data,
                         timeout: BackendHelper.REQUEST_TIMEOUT,}
                         )
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
          })
     }
    
 
     
     async _getUserDatabyUname(uname:string):Promise<nexusResponse>{
          var data = JSON.stringify({"uname": uname});             
          return new Promise((resolve, reject) => {
                      axios({
                         method: 'post',
                         url:URLS.getUserDatabyUname,
                         headers: { 'Content-Type': 'application/json'},
                         data : data,
                         timeout: BackendHelper.REQUEST_TIMEOUT,
                         }
                         )
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
          })
     }
    


     
    async _getLinksDatabyUniId(uid:string,uniId:string):Promise<nexusResponse>{
          var data = JSON.stringify({"uid": uid,"uniid":uniId});             
          return new Promise((resolve, reject) => {
                      axios({
                         method: 'post',
                         url:URLS.getLinkDatabyUniId,
                         headers: { 'Content-Type': 'application/json'},
                         data : data,
                         timeout: BackendHelper.REQUEST_TIMEOUT,
                         }
                         
                         )
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
          })
     }
    

     async _updateUserInfo(data:userData){
          let respn =  null;
           await axios.post(URLS.updateUserInfo,{uid:this.UID,data:data,
               headers: {"Access-Control-Allow-Origin": "*"}})
              .then(res=>{
                respn = res.data;
              })
              .catch(err=>{
                   console.log(err);
              });
           return respn;
      }

     async _get_image_kit_auth(){
          let gotFile = null;
          await axios.post(URLS.imagekitAuth,{})
             .then(res=>{
                 if(res){
                      gotFile =res.data;
                 }
             })
             .catch(err=>{
                  
                  console.log(err);
               
             });
             return gotFile;
     }
     async _image_upload(file_data:any){
          let tok:any = await this._get_image_kit_auth();     
          const formData = new FormData();
          formData.append('file',file_data['data_url']);
          formData.append('publicKey',imageKitCert.publicKey);
          formData.append('signature',tok.signature);
          formData.append('expire',tok.expire);
          formData.append('token',tok.token);
          formData.append('fileName',"titan-user-img");
          formData.append('useUniqueFileName','true');
          formData.append('isPrivateFile','false');
          const res  = await axios.post("https://upload.imagekit.io/api/v1/files/upload", formData, {
               headers: {
                    'content-type': 'multipart/form-data'
                }
             });        
          return res.data;
     }


}