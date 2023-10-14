//here is teh jave cpde to parse a messsae

import { createElement } from "react";
import { GAM_REG } from "./gameRegLog";




const delimiter_reply = "$$[???*???]$$"

export function message_reply_parser_(message:string , delimter:string = "$$[???*???]$$"){
    //here os the function bode
    var messages = message.split(delimter)
    var lastindex = messages.length-1

    //here is teh replied format
    if(messages.length > 1) {

        var message_to_reply = messages[lastindex-2];
        var repied_to = messages[lastindex-1];
        var replied_message = messages[lastindex];
       
       return ( <p>
            
            {replied_message}
            <br />
            <span className="message-reply-text">REPLIED TO <span> {repied_to}</span> </span> 
            <br />
            <div className="message-reply-box-text">
                 {command_parser(message_to_reply)}
            </div>
            
        </p>)
        
    }

    //here is the normal format
    else{
        return command_parser(messages[0]) 
    }
    
}


 export function message_sending_parser(userinfo: {user:string , age : number  , message : string} , message_replied:string ,delimter = delimiter_reply ){

    if (userinfo){
        var replied_to_string = `${userinfo.user} (${userinfo.age})`
        var replied_message_string = `${userinfo.message} ${delimter}  ${replied_to_string}  ${delimter} ${message_replied}` 
        return replied_message_string
    }
    else{
        return message_replied
    }     
}


//her ewe need a coomad parse

function command_parser(message:string){

    // console.log(message)

    var message_unstruct = message.split("::");

        if (message_unstruct.length > 1){

            //here is the command for the images
            if (message_unstruct[0] == "img"){
                var image_src = message_unstruct[1]

                //her si teh dom object to ge teh width and height of teh image
                var dom_image = document.createElement("img");
                dom_image.setAttribute("src" , image_src );
                const width = dom_image.naturalWidth;
                const height = dom_image.naturalHeight;
                const aspect_ratio = height/width;
                const set_width = 320;

                // console.log(message_unstruct , dom_image)
                return (
                    <>
                    <br />
                    <img src={image_src} alt="not found" className="image_message_box" width={set_width} height={aspect_ratio * set_width}/>
                    </>
                )

            }
            if(message_unstruct[0] =="imgl"){

                var image_src = message_unstruct[1]
                var image_label = message_unstruct[2]



                //her si teh dom object to ge teh width and height of teh image
                var dom_image = document.createElement("img");
                dom_image.setAttribute("src" , image_src );
                const width = dom_image.naturalWidth;
                const height = dom_image.naturalHeight;
                const aspect_ratio = height/width;
                const set_width = 320;

                // console.log(message_unstruct , dom_image)
                return (
                    <>
                    <p style={{color:"white"}}>{image_label}</p>
    
                    <img src={image_src} alt="not found" className="image_message_box" width={set_width} height={aspect_ratio * set_width}/>
                    </>
                )
                

            }



            //other connads
            if(message_unstruct[0] == "link" && message_unstruct.length == 3){
                var link_ = message_unstruct[1]
                var link_handle = message_unstruct[2]
                return(
                    <>
                     <br />
                    <a href={link_}> {link_handle}</a>
                    </>
                   
                )
            }
            if(message_unstruct[0] == "linkB" && message_unstruct.length == 3){
                var link_ = message_unstruct[1]
                var link_handle = message_unstruct[2]
                return(
                    <>
                     <br />
                     <button type="button" className="btn btn-primary" ><a href={link_} style={{color:'black' , fontFamily:"monospace"}}> {link_handle}</a></button>
                    </>
                   
                )
            }

            if (message_unstruct[0] == "def"){
                var head = message_unstruct[1]
                var msg = message_unstruct[2]
                return(
                    <p className="define_comm">

                        <h5 >
                           {head}
                        </h5>
                        <span>
                            {msg}
                        </span>
                       
                    </p>
                )
            }
   
            
            

            


        }
        //here thisi s for plane text
        else{
            return <p>{message}</p>
        }
}


function formatting_parser(message:string){




    //here is the foramtion parser
    const format = (fragment:string)=>{
        return (
            <p>
               {fragment}
            </p>
        )
    }
   





   
}