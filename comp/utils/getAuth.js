import user from "./user";
import firebaseHelper,{getUid,checkToken} from "../helpers/firebaseHelper";
import backendHelper from "../helpers/backendHelper";

const User = new user();
const FirebaseHelper = new firebaseHelper();
const BackendHelper = new backendHelper();

const getAuth = async ()=>{
     console.log('Init authentication');     
     return new Promise(async (resolve, reject) => {
          const GOT_UID = await getUid();
          const GOT_TOKEN = await checkToken();     
          if(GOT_UID && GOT_TOKEN){
               resolve('User auth with success');}
          else{reject('User auth failure')}
    })
}
export default getAuth;