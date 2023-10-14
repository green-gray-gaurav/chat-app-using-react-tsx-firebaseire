
//her eim goint to make the notification component

import { useEffect, useState } from "react";

interface notificationmesgprops{
    title:string,
    messages:String[],
    callback?:()=>void
}

function NotificationMessage({title , messages , callback = ()=>{}}:notificationmesgprops){
    var messagesCount:number = messages.length
    const [messsgaeindex , setmessageindex] = useState(0);

    return(
        <div className="notificationbase">
            <div className="not-title">
                {title}
            </div>

            <div className="not-messagebox">
                <p>{messages[messsgaeindex]}</p>
            </div>

            <div className="not-button-box">
                <button className="not-button" onClick={
                    ()=>{//here is the next button
                        setmessageindex((messsgaeindex+1)%messagesCount)
                    }
                }> NEXT </button>
                <button className="not-button" onClick={
                    ()=>{//here isthe ok buttons
                        document.getElementsByClassName("notificationbase")[0].classList.add("hide")
                        callback()
                    }
                }> OK </button>

            </div>

        </div>
    );
}

export default NotificationMessage