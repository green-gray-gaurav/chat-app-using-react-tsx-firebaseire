//here is teh top compneto the app
import "bootstrap/dist/css/bootstrap.css"
import { useState } from "react"
import { ChangeEvent } from "react"
import React from "react"
import { DmBar } from "./dm_bar"
import NotificationMessage from "./notification"



interface headerfrontprops{
    appname:string,
    userinfo:{username:string , age:number}
    callname:(name:string)=>void,
    callage:(age:number)=>void
    
}


function HeaderFront({appname = "OPEN CHAT" , userinfo ,callname , callage}:headerfrontprops){

    var [pressed , setpressed] = useState(false)
    const [name , setname ] = React.useState(userinfo.username);
    const [age , setage ] = React.useState(userinfo.age);

    //here is the call back function
    const func = (name:string)=>{setname(name) ; callname(name)}
    const func2 = (age:number)=>{setage(age) ;callage(age)}


    const iconsfillstar = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
    const iconnullstar = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg>


//her im usig the use effect

  

    return(
        <div className="header">
        
        <div className = "headerfrontbase">

            <div className="hf-userinfo">
                <p>{name}</p>
                <span>AGE: {age}</span>
            </div>
            
            <div className="hf-logo" onClick={
                (event)=>{
                    setpressed(! pressed)
                }
             }>
                {!pressed ? iconsfillstar: iconnullstar }

            </div>

            <div className="hf-appname">
                {appname}
                <div>
                    <button className="hf-projects-button" > 
                    <a href="https://github.com/green-gray-gaurav?tab=repositories" style={{color:'black'}}>PROJECTS</a>
    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    </button>
                </div>
            </div>
            
        </div>
        {/* //here is the other thing to seitch b/w the dm */}

       
        {pressed ? <HeaderBack callbackname={func} callbackage={func2}/> : null} 
        <DmBar/>
        </div>
        


    );
}

interface headerbackprops{
    button1?:string,
    button2?:string,
    inputplc?:string,
    callbackname:(name:string)=>void,
    callbackage :(age:number)=>void
}


function HeaderBack({button1 = "NAME", button2  = "AGE", inputplc  ="FILLER", callbackname , callbackage}:headerbackprops){


    var [Selected , setSelected] = useState(0);
    var [displayCommands , setDisCom] = useState(false);
    var commands:any = ["THRER ARE TWO TYPES OF COMMAANDS" 
                        , "AFTER COMMANDS : these commands format the text on data retrival from server" 
                        ,"1. \\reg>>[name]>>[passcode] 2. \\log>>[name]>>[passcode]"
                        ,"BEFORE COMMANDS : these commands format the text on sending the data to server"
                        ,"1. img :: [url] 2. imgl::[label] ::[url] \n3. link :: [name] :: [url] \n 4. linkB [name] :: [url]\n 5. def :: [term] :: [definition]"
                        ]

    
    return(
        <div className = "headerbackbase">
            <div className={Selected==0 ?"hb-button-pressed" :"hb-namebutton"} onClick={()=>{setSelected(0)}} >
                {button1}
            </div>

            <div className={Selected==1?"hb-button-pressed":"hb-agebutton"}  onClick={()=>{setSelected(1)}}>
                {button2}
            </div>

            <div className="hb-input">
                <input type="text" name="" id="" placeholder ={inputplc} onChange={(event)=>{
                    if(Selected==0){
                        callbackname(event.target.value);
                    }
                    else{
                        var age:number = parseInt(event.target.value)
                        callbackage(Math.min(Math.max(10,age) , 100))
                    }      
                }} />
            </div>

            <button className="hb-com-button" onClick={(e)=>{
                setDisCom(true);
            }} >COM</button>

            {displayCommands?<NotificationMessage title = "COMMANDS" messages={commands}  callback={()=>{setDisCom(false)}}/>:null}

        </div>
    );
}

export default HeaderFront