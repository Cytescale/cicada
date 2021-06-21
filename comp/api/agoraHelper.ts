import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser, IMicrophoneAudioTrack, IRemoteAudioTrack, UID } from "agora-rtc-sdk-ng";
import nexusResponse from "./nexusResponse";
import BackendHelper from "./backendHelper";
import spaceDataInter from "../components/spaceInter";

let backendHelper:BackendHelper|null = new BackendHelper(null);


export default class agoraHelper{
     public static MIC:boolean = false
     public static PUBLISED:boolean= false;
     
     
     public static UID:string|null  = null;
     public static JOINING_ID:string|number|null = null;
     public static JOINED_SID:UID|null = null;
     
     public static RTC_CLIENT:IAgoraRTCClient|null = null;
     public static LOCAL_AUDIO_TRACK:IMicrophoneAudioTrack|null = null;
     public static REMOTE_AUDIO_TRACK:IRemoteAudioTrack|null = null;


     public static APP_ID:string = "d95380ef73954640840d0b042d9e128d";
     public static CHANNEL_TOKEN:string|null = null;
     public static CHANNEL_NAME:string|null = null;
     public static CAN_TALK:boolean = true;

     public static spaceData:spaceDataInter|null = null;


     constructor(uid?:string|null){
          if(uid && uid!==null){
               console.log("agoraHelper: set init user id"+uid);
               agoraHelper.UID  = uid!;
          }
          
     }
     public setSpaceData(v : spaceDataInter|null) {
          agoraHelper.spaceData = v!;
          console.log("agoraHelper: space data set"+JSON.stringify(v));
     }
     public setUid(uid:string){
          agoraHelper.UID = uid!;
          
     }

     public async getJoiningId(){
          backendHelper?._getUserInfo(agoraHelper.UID!).then((res:nexusResponse)=>{
               if(res && !res.errBool){
                    if(res.responseData){
                         if(res.responseData.joining_id){
                         this.setJoiningId(res.responseData.joining_id)
                         }
                         else{
                              console.log("agoraHelper: joinining id not found");
                         }
                    }
               }else{
                    console.log("agoraHelper: joining id failed res");
               }
          })
     }


     public isConnected(){
          if(agoraHelper.RTC_CLIENT){
          if(agoraHelper.RTC_CLIENT!.connectionState == 'CONNECTED'){
               return true;
          }else{
               return false;
          }}
          else{
               return false;
          }
     }

     public setJoiningId(id:number|string){
          agoraHelper.JOINING_ID = id;
     }
     public setjoinDetails(CHANNEL_NAME:string,CHANNEL_TOKEN:string,CAN_TALK?:boolean){
          agoraHelper.CHANNEL_NAME = CHANNEL_NAME!;
          agoraHelper.CHANNEL_TOKEN = CHANNEL_TOKEN!;
          agoraHelper.CAN_TALK = CAN_TALK!;
     }
     public setCanTalk(v:boolean){
          agoraHelper.CAN_TALK  = v;
     }

     public setMic(v:boolean){
          agoraHelper.MIC = v;
          this._setMicState();
     }

     public async _eventHandlers(){
          if(agoraHelper.RTC_CLIENT){
               try{
                    console.log("agoraHelper: Event success");                                          
                    agoraHelper.RTC_CLIENT!.on("error", (err:any) => {
                         console.log("agoraHelper:" +err)
                         })
                    
                         agoraHelper.RTC_CLIENT!.on("user-joined",(user: IAgoraRTCRemoteUser)=>{
                         console.log("agoraHelper: user joined" +user.uid);
                         console.log("agoraHelper: user count"+ agoraHelper.RTC_CLIENT?.getRTCStats().UserCount);
                         })
                         agoraHelper.RTC_CLIENT!.on("user-left", (user: IAgoraRTCRemoteUser)=> {
                         console.log("agoraHelper: user left" +user.uid)
                         })
                    
                         agoraHelper.RTC_CLIENT!.on("user-published", async (user:IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
                              console.log("agoraHelper: stream published by ID"+user.uid);
                              agoraHelper.REMOTE_AUDIO_TRACK = await agoraHelper.RTC_CLIENT!.subscribe(user,'audio');
                              if(agoraHelper.REMOTE_AUDIO_TRACK){
                                   agoraHelper.REMOTE_AUDIO_TRACK.play();
                              }
                              else{
                                   console.log("agoraHelper: null remote to play");          
                              }
                         })
                         
                         agoraHelper.RTC_CLIENT!.on("user-unpublished", function (user :any) {
                         console.log("agoraHelper: stream-un-published")
                         })
               }
               catch(e){
                    console.log("agoraHelper: Event failure"+e);     
               }
          }
     }

     public  async _initClient(sucessCallback?:any,failureCallback?:any){
          AgoraRTC.setLogLevel(3);
          if(!agoraHelper.RTC_CLIENT){
               try{
               agoraHelper.RTC_CLIENT=AgoraRTC.createClient({mode:'live',codec:'vp8'});
               this._eventHandlers();
               console.log("agoraHelper: Client make success");
               }
               catch(e:any){
                    console.log("agoraHelper: Client make failure"+e);     
                    if(failureCallback){failureCallback(e);}
                    throw new Error(e);
               }
          }
          else{
               console.log("agoraHelper: Client already exist");
          }
     }


     public  async _changeRole(b:boolean){
          if(b){
               agoraHelper.CAN_TALK = true;
          }else{
               agoraHelper.CAN_TALK = false;
          }
     }

     public async _joinStream(CHANNEL_NAME?:string,CHANNEL_TOKEN?:string,sucessCallback?:any,failureCallback?:any){
          let cn = null;
          let ct = null;
          CHANNEL_NAME?cn=CHANNEL_NAME:cn=agoraHelper.CHANNEL_NAME;
          CHANNEL_TOKEN?ct=CHANNEL_TOKEN:ct=agoraHelper.CHANNEL_TOKEN;
          console.log("PROBAL JOIN_ID"+agoraHelper.JOINING_ID);
          if(cn&&ct&&agoraHelper.JOINING_ID){
               try{
                    if(agoraHelper.CAN_TALK){agoraHelper.RTC_CLIENT!.setClientRole('host')}
                    else{agoraHelper.RTC_CLIENT!.setClientRole('audience')}
                    const JOINED_CLIENT_SID =  await agoraHelper.RTC_CLIENT!.join(
                      agoraHelper.APP_ID, 
                      cn,
                      ct,
                      parseInt(agoraHelper.JOINING_ID.toString()),
                      );
                      console.log(agoraHelper.JOINING_ID);
                      agoraHelper.JOINED_SID = JOINED_CLIENT_SID!;
                      if(JOINED_CLIENT_SID){
                        this._iniialLocalTrackInit().then(()=>{
                         this._setMicState();
                        }).catch((e)=>{

                        });
                        if(sucessCallback){sucessCallback();}
                      }
                      return JOINED_CLIENT_SID;
                      
               }
               catch(e:any){
                    console.log("agoraHelper: join stream failed"+e);
                    if(failureCallback){failureCallback(e);}
                    throw new Error(e);
               }
          }
          else{
               console.log("agoraHelper: join stream failed , less data");
               if(failureCallback){failureCallback();}
               return new Error('agoraHelper: join stream failed , less data');
          }
     }



     private async _iniialLocalTrackInit(){
          try{
          const LOCAL_AUDIO_TRACK = await AgoraRTC.createMicrophoneAudioTrack({
               encoderConfig: "speech_low_quality",
          });
          LOCAL_AUDIO_TRACK.setEnabled(false);
          agoraHelper.LOCAL_AUDIO_TRACK = LOCAL_AUDIO_TRACK;
          }
          catch(e:any){
               console.log("agoraHelper: init local track failed"+e);
               throw new Error(e);
          }

     }

     public async _setMicState(){
          if(agoraHelper.LOCAL_AUDIO_TRACK){
               try{
                  console.log(agoraHelper.MIC);  
               if(agoraHelper.MIC && agoraHelper.CAN_TALK){
                    agoraHelper.LOCAL_AUDIO_TRACK!.setEnabled(true).then(async ()=>{
                   await agoraHelper.RTC_CLIENT!.publish([agoraHelper.LOCAL_AUDIO_TRACK!]);
                 });  
                 console.log("agoraPlayer: Audio track umuted");
                 //agoraHelper.LOCAL_AUDIO_TRACK!.play();  
               }
               else{
                 console.log("agoraPlayer: Audio track muted");
                 agoraHelper.LOCAL_AUDIO_TRACK!.setEnabled(false);  
               }
               }
               catch(e:any){
                    console.log("agoraPlayer: mic change error"+e);
                    throw new Error(e);
               }
           }
           else{
               console.log("agoraPlayer: mic change error no local track found");
           }
     }

     public async _destroyCall(sucessCallback?:any,failureCallback?:any){
          try{
               if(agoraHelper.LOCAL_AUDIO_TRACK!){
                    agoraHelper.LOCAL_AUDIO_TRACK!.close();
                    await agoraHelper.RTC_CLIENT!.leave();
                    console.log("agoraPlayer:  Audio local track destroyed");
               }
               if(agoraHelper.REMOTE_AUDIO_TRACK){
                    agoraHelper.REMOTE_AUDIO_TRACK.stop();
                    await agoraHelper.RTC_CLIENT!.leave();
                    console.log("agoraPlayer:  Audio remote track destroyed");
               }
               if(sucessCallback){sucessCallback();}
          }
          catch(e:any){
               console.log("agoraPlayer:  audio destrory error"+e);
               if(failureCallback){failureCallback(e);}
               throw new Error(e);
          }
     }

}