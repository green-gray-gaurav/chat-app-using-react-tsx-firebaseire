import { useEffect, useState } from "react";
import { doc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase_config";
import { GAM_REG } from "../gameRegLog";
import NotificationMessage from "./notification";

//some more globals
export var SELECTED_CHAT_MODE = 0; 
export var SELECTED_DM_USER_OBJ:any;



function dm_send(message:any){

}



export function DmBar(){

    const [selected , setselected] = useState(0)

    const [drop , setdrop] = useState(false)

    const [error , seterror] = useState(false)

    const drop_down = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-menu-down" viewBox="0 0 16 16">
                    <path d="M7.646.146a.5.5 0 0 1 .708 0L10.207 2H14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3.793L7.646.146zM1 7v3h14V7H1zm14-1V4a1 1 0 0 0-1-1h-3.793a1 1 0 0 1-.707-.293L8 1.207l-1.5 1.5A1 1 0 0 1 5.793 3H2a1 1 0 0 0-1 1v2h14zm0 5H1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zM2 4.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                    </svg>
    
    const drop_up = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-menu-up" viewBox="0 0 16 16">
                <path d="M7.646 15.854a.5.5 0 0 0 .708 0L10.207 14H14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3.793l1.853 1.854zM1 9V6h14v3H1zm14 1v2a1 1 0 0 1-1 1h-3.793a1 1 0 0 0-.707.293l-1.5 1.5-1.5-1.5A1 1 0 0 0 5.793 13H2a1 1 0 0 1-1-1v-2h14zm0-5H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2zM2 11.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 0-1h-8a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0-.5.5z"/>
                    </svg>

    return (
        <div className="dmbar-base">
            <button className= {selected==0?"dmbar-button-pressed" :"dmbar-button"} id="button1" onClick={(e)=>{
                // document.getElementsByClassName("messagesbox")[0].classList.remove("messagesbox-dm")
                // document.getElementsByClassName("message-info")[0].classList.remove("message-info-dm")
                SELECTED_CHAT_MODE = 0
                setselected(0)
                setdrop(false)
                

            }}>OPEN</button>
            <button className={selected==1?"dmbar-button-pressed" :"dmbar-button"} id="button2" onClick={(e)=>{
                // document.getElementsByClassName("messagesbox")[0].classList.add("messagesbox-dm")
                // document.getElementsByClassName("message-info")[0].classList.add("message-info-dm")
                if (GAM_REG.hasLogin()){
                    SELECTED_CHAT_MODE = 1
                    setselected(1)
                    setdrop(true)
                }
                else{
                    seterror(true);
                }
                  

            }}>DIRECT </button>
           <button id="dm-selector-toggler" onClick={(e)=>{
                    if(GAM_REG.hasLogin())
                    setdrop(!drop)
                    else
                    seterror(true)

           }}>{drop?drop_up:drop_down}</button>

            {drop?<DmSelector/>:null}
            {error?<NotificationMessage messages={["please log in"]} title="ERROR" callback={()=>{seterror(false)}}/>:null}
        </div>
    )
}

// export default DmBar;

export function DmSelector(){

    //here getting the dm data

    const [dmusers , setdmusers] = useState([])
    const [selected , setselected] = useState(-1)

    const data_fetch = async () =>{
    var existing: boolean = false;
    var data = await getDocs(collection(db, "room"));
    data.docs.forEach((doc) => {
        if (doc.id=="gameReg") { 
            var m_reg_array:any = doc.data().registered;
            setdmusers(m_reg_array);
        }
        })

    }

    useEffect(()=>{
        //onyy runs on mounting
        data_fetch();
    },[])

    const selection_user = (index:number , object:any)=>{
            setselected(index);
            SELECTED_DM_USER_OBJ = object

    }
    return(
        <>
        <div className="dm-selector-title">
        {SELECTED_DM_USER_OBJ?SELECTED_DM_USER_OBJ.name:null}
        </div>
        <div className="dm-selector">
            {
                dmusers.map((dm_user:any , index)=>
                    <div className={selected == index?"dm-user-selector-pressed":"dm-user-selector"} onClick={()=>selection_user(index , dm_user)}>
                        {dm_user.name.substring(0 , 3)}
                    </div>
                )

            }
          
        </div> 
        </>
    )
}


