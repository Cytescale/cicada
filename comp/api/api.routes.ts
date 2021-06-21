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
     getFollowBool:string
     addFollow:string
     delFollow:string
     getFollowCount:string
     updateUserInfo:string
     createSpace:string
     imagekitAuth:string
     getSpaceFeedData:string
     getSpaceDatabySid:string
}
const URLS:URLinter = {
     getSpaceDatabySid:_BASE_API_URL+'getSpaceDatabySid',
     getSpaceFeedData:_BASE_API_URL+'getSpaceFeedData',
     getUserInfo:_BASE_API_URL+'getUserDatabyUid',
     getUserByJoiningId:_BASE_API_URL+'getUserDatabyJid',
     imagekitAuth:_BASE_API_URL+"imageKitAuth",
     updateUserInfo:_BASE_API_URL+"updateUserData",
     getFollowBool:_BASE_API_URL+"getRelationData",
     getFollowCount:_BASE_API_URL+"getFollowCount",
     delFollow:_BASE_API_URL+"delRelationData",
     addFollow:_BASE_API_URL+"makeRelationData",
     createSpace:_BASE_API_URL+"makeSpaceData",
}
export default URLS;