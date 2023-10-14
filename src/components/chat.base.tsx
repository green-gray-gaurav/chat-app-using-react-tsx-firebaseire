import "bootstrap/dist/css/bootstrap.css"
import { Fragment, useEffect, useState } from "react"
import { ChangeEvent } from "react"
import React from "react"
import { __appendObjectInDocArray, feedDocInCollectionById } from "../firebase_control"
import { getDocById } from "../firebase_control"
// import { DocumentData, DocumentSnapshot, SnapshotOptions, onSnapshot } from "firebase/firestore"
// import { doc } from "firebase/firestore"
import { db } from "../firebase_config"
import { Timestamp, collection } from "firebase/firestore"
import { getDocs } from "firebase/firestore"
import { render } from "react-dom"
import { __appendObjectInDocArray_replies } from "../firebase_control"
import { message_reply_parser_ , message_sending_parser } from "../message_parser"
import { geturl } from "../image_load"
import { command_parser } from "../commands"
import { SELECTED_CHAT_MODE  , SELECTED_DM_USER_OBJ} from "./dm_bar"
import { GAM_REG } from "../gameRegLog"



var selected_message = -1
var message_reply = false;
var message_reply_obj:{user:string , age:number , message:string}
var messages_all = []
var load_image_url:string =""

export const NEGLECTCODE = "@^<|HYPER|>^@"




interface chatbaseprops{
    name:string,
    age:number,

}


function ChatBase(props : chatbaseprops){

    const [render , setrender] = useState(false);

    return(
        <>
       
        <div className="base">
           
            {/* here comes the messsgae component */}
            <ChatMessages/>

            {/* here comes the input field */}
            <ChatInputField userinfo={props} rendercall={()=>{}}/>

        </div>
        </>

    );

}


interface chatinputprops{
    userinfo:chatbaseprops,
    rendercall: ()=>void
}


function imageurloader(url:string){
    load_image_url = url
    console.log("url:" , load_image_url);
}


function ChatInputField({userinfo , rendercall}:chatinputprops){

    const inactiveicon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                        </svg>

    const activeicon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-square-fill" viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z"/>
                        </svg>


    const loadingicon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                         <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
    const imagelogo =   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-image-fill" viewBox="0 0 16 16">
                        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                         <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"/>
                        </svg>


    var data_to_send:string ="";
    const [sendable , setsendable] = useState(false);
    const [input , setinput] = useState("");
    const [isloading ,setloading] = useState(false);
    
    const send = async ()=>{
        if (sendable){
            //here some server sending teh data

            var message_string:string = input;
            //processing ythe image using the command
            if (load_image_url){
                message_string = "imgl::"+load_image_url+"::"+input
            }
            
            const callback_handler_replies = ()=>{
                
                selected_message =-1
                message_reply = false
                load_image_url = ""

            }
            command_parser(message_string , [message_reply , message_reply_obj , callback_handler_replies ])!.then((value)=>{

                

                //meglecting message
                if(value == NEGLECTCODE){
                    setsendable(false);
                    setinput("");
                    return;
                }

                //here is teh conent messaahe
                var usersmessages:any = {
                  user: userinfo.name,
                  age: userinfo.age,
                  message: value,
                  timestamp: new Date().toLocaleString(),
                };

                // feedDocInCollectionById('room', 'users' , object );
                console.log(message_reply , message_reply_obj)
                if (message_reply) {
                  //here your reyinh  the message
                  usersmessages.message = message_sending_parser(
                    message_reply_obj,
                    usersmessages.message
                  );
                  __appendObjectInDocArray("room", "users", usersmessages);
                } else {
                  //here you are senfing a new message
                  __appendObjectInDocArray("room", "users", usersmessages);
                }


                setsendable(false);
                setinput("");


                selected_message = -1
                message_reply = false
                load_image_url = ""

            })
            
            
           

            

           
            //rerender the component

        }
        
    }
    return (
        <div className="inputbase">

            <input type="file" id="image_loader" onChange={async (e)=>{

                setloading(true) ; 
                if (e.target.files)
                    geturl(e.target.files[0] , imageurloader , [setsendable , setloading])
                
                }} style={{display:"none"}}/>

            <label htmlFor="image_loader">
                  {isloading?loadingicon:imagelogo}
             </label>


            <input type="text" value={input} id="inputbase_input" onChange={(event)=>{

                if (event.target.value){

                    data_to_send = event.target.value;
                    setinput(data_to_send)
                    setsendable(true)  
                    //soneanitation stuff
                    document.getElementById("inputbase_input")?.classList.toggle("inputbase_animation"); 
                }
                
                else{
                    setsendable(false);
                    setinput("")
                }


            }} placeholder="type..."/>
            <button onClick={(event)=>{
                send()
                

            }}>
            
            {sendable?activeicon:inactiveicon}

            </button>
        </div>

    );

}


function ChatMessages(){

   

    var objlist = [{user:'gaurav' , age:20 , message:'helo world'},
    {user:'gaurav' , age:20 , message:'helo world'},
    {user:'gaurav' , age:20 , message:'helo world'}];

    const [chatmsg , setchatmsg] = useState([]);

   
    // var prms =  getDocById('room' , "users")

    // prms.then(({usermessages})=>{

    //     if (chatmsg.length != usermessages.length){
            
    //     }
    // });
   

    const scroll = ()=>{
        var elm = document.getElementsByClassName("messagesbox")[0]
        if(elm){
        elm.scrollTop = elm.scrollHeight;
        }
    }

    useEffect(()=>{
        const data_fetch = async()=>{
            var data = await getDocs(collection(db , 'room'));
            // var m_array = data.docs.map((doc)=>  
            //         doc.data().usermessages
            // )[0];

            var m_array = []!;

            data.docs.forEach((doc)=>{
                if (SELECTED_CHAT_MODE==0){
                    if(doc.id=="users"){
                        m_array = doc.data().usermessages
                    }
                }
                else if(SELECTED_CHAT_MODE==1 && SELECTED_DM_USER_OBJ){

                    if(doc.id =="DMS"){


                        var unfiltered_dms = doc.data().DMmessages

                        m_array = unfiltered_dms.filter((dm:any)=>
                        {if((dm.to==SELECTED_DM_USER_OBJ.name && dm.from == GAM_REG.username
                            || dm.from==SELECTED_DM_USER_OBJ.name && dm.to == GAM_REG.username
                            )) return dm})

                        
                }
                }
                
            })

            if (m_array.length != chatmsg.length){
              setTimeout(scroll ,500)
            }
            setchatmsg(m_array);

            
            


        };
        data_fetch();    
    })





    return(

        

            <div className="messagesbox">
                    {
                    chatmsg && chatmsg.map((obj :any , index:number)=>
                            
                           <Message key={index} selectionIndex = {index} user={obj.user} age={obj.age} message={obj.message} timestamp={obj.timestamp}/>
      
                    )}




                    
            </div>
            
            
    
        ); 

}

interface messageprops{
    selectionIndex:number,
    user:string,
    age:number,
    message:string,
    timestamp:string,
  

}

function Message({selectionIndex , user , age , message , timestamp} : messageprops){

    const [reply , setreply] = useState(false)


    const emoji_inverted = <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-emoji-smile-upside-down-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5zM4.285 6.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM10 8c-.552 0-1 .672-1 1.5s.448 1.5 1 1.5 1-.672 1-1.5S10.552 8 10 8z"/>
                            </svg>
    const emoji_normal = <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-emoji-laughing-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5c0 .501-.164.396-.415.235C6.42 6.629 6.218 6.5 6 6.5c-.218 0-.42.13-.585.235C5.164 6.896 5 7 5 6.5 5 5.672 5.448 5 6 5s1 .672 1 1.5zm5.331 3a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zm-1.746-2.765C10.42 6.629 10.218 6.5 10 6.5c-.218 0-.42.13-.585.235C9.164 6.896 9 7 9 6.5c0-.828.448-1.5 1-1.5s1 .672 1 1.5c0 .501-.164.396-.415.235z"/>
                        </svg>

    return (
        <div className="message">

            <div className="user-logo" onClick={()=>{

                message_reply = !message_reply
                console.log(message_reply)
                selected_message = selected_message == selectionIndex?-1:selectionIndex
                message_reply_obj = {user: user , age: age , message:message}

                }}>

                {(selected_message == selectionIndex) ?emoji_inverted:emoji_normal}

            </div>

            <div className="message-info">
                <span> {user}{"("+age+")"}</span>
                {message_reply_parser_(message)}
                <h6>{timestamp}</h6>
                
                
            </div>

        </div>

    );
}






interface replyprops{
    user:string,
    age:number,
    message:string
    timestamp:string
}

function Reply({user , age , message , timestamp} : replyprops){

    return (
        <div className="replybox">
            <div className="reply-user-logo">
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-emoji-laughing-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5c0 .501-.164.396-.415.235C6.42 6.629 6.218 6.5 6 6.5c-.218 0-.42.13-.585.235C5.164 6.896 5 7 5 6.5 5 5.672 5.448 5 6 5s1 .672 1 1.5zm5.331 3a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zm-1.746-2.765C10.42 6.629 10.218 6.5 10 6.5c-.218 0-.42.13-.585.235C9.164 6.896 9 7 9 6.5c0-.828.448-1.5 1-1.5s1 .672 1 1.5c0 .501-.164.396-.415.235z"/>
                </svg>
            </div>
            <div className="reply-message-info">
                <span> {user}{"("+age+")"}</span>
                <p>{message}</p>
                <h6>{timestamp}</h6>
            </div>

        </div>
    );
}


export default ChatBase



