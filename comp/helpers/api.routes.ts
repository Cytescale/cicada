let _BASE_API_URL = process.env.PUBLIC_API_HOST
if(process.env.NODE_ENV=='development'){
     _BASE_API_URL = 'http://localhost:8200/api/'
}
if(process.env.NODE_ENV=='production'){
     _BASE_API_URL = 'http://ec2-65-2-40-247.ap-south-1.compute.amazonaws.com:8200/api/'
}

export declare type URLinter = {
     getUserInfo: string
     getUserByJoiningId:string
     updateUserInfo:string
     imagekitAuth:string
}
const URLS:URLinter = {
 
     getUserInfo:_BASE_API_URL+'getUserDatabyUid',
     getUserByJoiningId:_BASE_API_URL+'getUserDatabyJid',
     imagekitAuth:_BASE_API_URL+"imageKitAuth",
     updateUserInfo:_BASE_API_URL+"updateUserData",
}
export default URLS;