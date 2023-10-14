import { useEffect } from "react"
import ListGroup from "./components/listGroup"
import { feedDocInCollectionById } from "./firebase_control"
import { feedDocInCollection } from "./firebase_control"
import { getDocById } from "./firebase_control"
import HeaderFront from "./components/header"
import "./App.css"
import ChatBase from "./components/chat.base"
import React from "react"
import NotificationMessage from "./components/notification"


const cities = ['london' , 'newyork' , 'paris' , 'san fanscico']
// feedDocInCollection("robin" , {name:'kok' , age:19});


//here is the notification infomation
var messgaes = ["Welcome to Open Chat, connect and share your ideas"
              ,"\n Before indulging in chat set you NAME and AGE" ,
                "To set you name and age tap on star [star tab] at the top of screen and fill the corrosponding attributes accordingly",
              "To replay on message tap on the emoji-logo left to that message",
              "To DM people register yourself first and then log in by using appropriate commands",
              "Type \\reg>>[name]>>[password] to register yourself",
              "Type \\log>>[name]>>[password] to register yourself",
              "To get the list of commands tap on the COM button left to FILLER text field inside [star tap]",
              "Thats all tap ok to continue" ]

function App(){

  const [name , setname ] = React.useState("anonymous");
  const [age , setage ] = React.useState(0);


  return <div className="mainapp" > 
  
  <div className="inframeMain">
    
    <HeaderFront appname="OPEN CHAT" userinfo={{username:'anonymous' , age:0} } callage={(age:number)=>(setage(age))}  callname={(name:string) =>{setname(name)}}/>
    <NotificationMessage title="NOTIFICATION" messages={messgaes}/>
    <ChatBase name={name} age={age}/>
   

  

  </div>
     /</div>

}

export default App