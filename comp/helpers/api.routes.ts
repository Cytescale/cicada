let _BASE_API_URL = process.env.PUBLIC_API_HOST
let _BASE_CLIENT_URL:string|null = null;
if(process.env.NODE_ENV=='development'){
     _BASE_API_URL = 'http://localhost:8200/api/'
     _BASE_CLIENT_URL = 'http://localhost:3000/'
}
if(process.env.NODE_ENV=='production'){
     _BASE_CLIENT_URL = 'https://cicada-two.vercel.app/'
     _BASE_API_URL = 'https://9ukpweulq2.execute-api.ap-south-1.amazonaws.com/v2/'
}

export declare type URLinter = {
     getUserInfo: string
     getUserDatabyUname:string
     updateUserInfo:string
     makeUserInfo:string,
     makeLinkData:string
     getLinkData:string
     getLinkDatabyId:string
     getLinkDatabyUniId:string
     checkURLValidity:string
     visit:string
     imagekitAuth:string
     updateLinkData:string
     getClusterConfigByUid:string
     updateClusterConfigData:string
     buildClusterLinkArray:string
}
const URLS:URLinter = {
     buildClusterLinkArray:_BASE_API_URL+'buildClusterLinkArray',
     updateClusterConfigData:_BASE_API_URL+'updateClusterConfigData',
     getClusterConfigByUid:_BASE_API_URL+'getClusterConfigbyUid',
     makeUserInfo:_BASE_API_URL+'createaccount',
     getUserDatabyUname:_BASE_API_URL+'getUserDatabyUname',
     updateLinkData:_BASE_API_URL+'updateLinkData',
     getLinkDatabyUniId:_BASE_API_URL+'getLinksDatabyUniId',
     visit:_BASE_API_URL+'visit',
     checkURLValidity :_BASE_API_URL+'checkURLData',
     getLinkDatabyId:_BASE_API_URL+'getLinksDatabyId',
     getLinkData:_BASE_API_URL+'getLinksData',
     makeLinkData:_BASE_API_URL+'makeLinkData',
     getUserInfo:_BASE_API_URL+'getUserDatabyUid',
     imagekitAuth:_BASE_API_URL+"getimageKitAuth",
     updateUserInfo:_BASE_API_URL+"updateUserData",
}
export default URLS;
export {_BASE_CLIENT_URL}