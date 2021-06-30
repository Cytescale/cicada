let _BASE_API_URL = process.env.PUBLIC_API_HOST
if(process.env.NODE_ENV=='development'){
     _BASE_API_URL = 'http://localhost:8200/api/'
}
if(process.env.NODE_ENV=='production'){
     _BASE_API_URL = 'https://9ukpweulq2.execute-api.ap-south-1.amazonaws.com/v2/'
}

export declare type URLinter = {
     getUserInfo: string
     updateUserInfo:string
     makeLinkData:string
     getLinkData:string
     checkURLValidity:string
     visit:string
     imagekitAuth:string
}
const URLS:URLinter = {
     visit:_BASE_API_URL+'visit',
     checkURLValidity :_BASE_API_URL+'checkURLData',
     getLinkData:_BASE_API_URL+'getLinksData',
     makeLinkData:_BASE_API_URL+'makeLinkData',
     getUserInfo:_BASE_API_URL+'getUserDatabyUid',
     imagekitAuth:_BASE_API_URL+"imageKitAuth",
     updateUserInfo:_BASE_API_URL+"updateUserData",
}
export default URLS;