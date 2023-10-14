
import { GAM_REG } from "./gameRegLog"
import { NEGLECTCODE } from "./components/chat.base"
import { getDocs } from "firebase/firestore"
import { collection } from "firebase/firestore"
import { updateDoc } from "firebase/firestore"
import { db } from "./firebase_config"
import { doc } from "firebase/firestore"
import { arrayUnion } from "firebase/firestore"
import { SELECTED_DM_USER_OBJ  , SELECTED_CHAT_MODE } from "./components/dm_bar"
import { message_sending_parser } from "./message_parser"


const botmsg = (message:string)=>{
    return "def::BOT::" + message
}




export function command_parser(message:string , extra:any = []){

    //here handling the dm message
    if(SELECTED_CHAT_MODE==1 && SELECTED_DM_USER_OBJ){
        var message = "\\dm>>"+ SELECTED_DM_USER_OBJ.name + ">>" +message
    }

    //if this message is normal one // store it
    if(!message.startsWith("\\")){
        return new Promise((resolve , reject)=>{resolve(message)})
    }

    //if this is the command // no storing
    var message_unstruct = message.substring(1 , message.length).split(">>")

    if(message_unstruct[0] == "reg"){
        var name = message_unstruct[1]
        var passcode = message_unstruct[2]
        var msg = ""
        const handle_reg = async()=>{
            var status= await GAM_REG.register(name , passcode)
            if(status){
                return botmsg("SUCCESSFULY REGISTERED UNDER "+name)
            }
            else{
               return botmsg("USER ALREADY EXISTS PLEASE CHOOSE ANOTHER NAME")
            }

        }
       return handle_reg()
    }

    //other commands

    if(message_unstruct[0] == "log"){
        var name = message_unstruct[1]
        var passcode = message_unstruct[2]
        var msg = ""
        const handle_reg = async()=>{
            var status= await GAM_REG.login(name , passcode)

            if(status){
                return botmsg("LOGIN SUCCESSFUL")
            }
            else{
               return botmsg("CHECK THE PASSWORD OR USERNAME ELSE REGISTER ACCORDINGLY")
            }
        }
       return handle_reg()
    }
    if(message_unstruct[0] == "i"){
        if(GAM_REG.username){
            
            return new Promise((resolve , reject)=>{resolve(botmsg("your id:"+  GAM_REG.username))})
        }
        else{
            
            return new Promise((resolve , reject)=>{resolve(botmsg("UNKNOWN <NOT IN LOGINED MEMBER LIST"))})
        }
    }

    if(message_unstruct[0] =="dm"){
        if (!GAM_REG.hasLogin()){
            //here is the promise to return
            return new Promise((resolve , reject)=>resolve(botmsg("PLEASE LOGIN TO AVAIL DM")))
        }



        //if useris alreafy logined

        var touser = message_unstruct[1]
        var dm_message =  message_unstruct[2]

        const data_fetch = async () => {
            var existing: boolean = false;
            var data = await getDocs(collection(db, "room"));

            data.docs.forEach((doc) => {
              if (doc.id=="gameReg") {
                var m_reg_array:any = doc.data().registered;
                m_reg_array.forEach((elm:any) => {
                    if(elm.name == touser){
                        existing = true
                    }
                });
              }
            }
            );
            //parse the message lexically

            // if (message_reply) {
            //     //here your reyinh  the message
            //      dm_message  = message_sending_parser(message_reply_obj,dm_message);
            // }


            //her we goonache the exiting flag
            if (existing){
              //crate teh new account
              var obj = {user: GAM_REG.username, age: 0, message: dm_message , timestamp: new Date().toLocaleString() , to : touser  , from : GAM_REG.username }
              
              if(extra){
                if(extra[0]){
                    obj.message = message_sending_parser(extra[1] , dm_message)
                    //call back
                   
                }
              }
              
              
              const docRef = doc(db, "room", "DMS");
              updateDoc(docRef, {
              DMmessages: arrayUnion(obj)

              


              }); 

              extra[2]()
      
              return NEGLECTCODE
            }
            else{
                return botmsg("SORRY THIS USER DOESNT EXIST")
            }

        }

        return data_fetch()

    }


} 