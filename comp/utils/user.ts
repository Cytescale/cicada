declare type userData = {
     _id:string,
     uid:string,
     email:string,
     dname:string,
     cname:string,
     uname:string,
     pro_photo_url:string,
     pro_photo_thumb_url:string,
     pro_photo_file_id:string,
     bio:string,
     login_method:number,
     deleted_bool:boolean,
     init_bool:boolean,
     pvt_bool:boolean,
     admin_bool:boolean,
     joining_id:number,
     api_key:number,
}
export type{userData}

export default class User {
     public static TOKEN:string|null;
     public static UID:string|null;
     public static DATA:userData|null;
     constructor(){

     }

     public setUserToken(val:string|null):void{
          User.TOKEN = val;
     }
     public  setUserUid(val:string|null):void{
          User.UID = val;
     }
     public  setUserData(val:userData|null):void{
          User.DATA = val;
          
     }
     public  getUserData():userData|null{
          return User.DATA;
     }
     public getUserToken():string|null{
          return User.TOKEN;
     }
     public  getUserUid():string|null{
          return User.UID
     }

     public purgeData():boolean{
          this.setUserData(null);
          this.setUserToken(null);
          this.setUserUid(null);
          return true;
     }

}