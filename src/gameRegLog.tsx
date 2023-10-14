//her is teh code foet ha game login
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./firebase_config";
import { feedDocInCollectionById } from "./firebase_control";
import { doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";

const gameroom = "gameReg"


class gameReg {
  username: string;
  userpassword: string;
  usergameid: string;
  islogin: boolean;

  constructor() {
   this.username = "";
   this.userpassword = "";
   this.usergameid = "";
   this.islogin = false;
  }
  register(username: string, password: string ) {

    var status:number
    const data_fetch = async () => {
      var existing: boolean = false;
      var data = await getDocs(collection(db, "room"));
      data.docs.forEach((doc) => {
        if (doc.id==gameroom) {
          var m_reg_array:any = doc.data().registered;
          console.log(m_reg_array)
          m_reg_array.forEach((elm:any) => {
            console.log(elm)
              if(elm.name == username){
                existing = true;
              }
          });
        }
      }
      
      );
      //her we goonache the exiting flag
      if (!existing) {
        //crate teh new account

        const docRef = doc(db, "room", gameroom);
        updateDoc(docRef, {
        registered: arrayUnion({name: username,password: password,gameid: username + "#" + Math.round(Math.random()),})
        }); 

        return 1


      } else {
        //alreag ye xist
        return 0
      }
    };


    return data_fetch();

    

  }

  login(username: string, userpassword: string) {

    
    const data_fetch = async () => {
      var existing = false;
      var data = await getDocs(collection(db, "room"));

      data.docs.forEach((doc) => {
        if (doc.id==gameroom) {
          var m_reg_array:any = doc.data().registered;
          m_reg_array.forEach((elm:any) => {
              if(elm.name == username && elm.password == userpassword){
               existing = true;
               //seting the internal state
               this.username = elm.name;
               this.userpassword = elm.password;
               this.usergameid = elm.gameid;
               this.islogin = true
              }
              
          });
        }
      });

      if(existing){
        return 1;
      }
      else{
        return 0;
      }
    };
    return data_fetch();
  }



  getdata(){
    return {
        name:this.username,
        gameid:this.usergameid
    }

  }

  hasLogin(){
    return this.islogin
  }
}






// this object handles all the game registed stuff
export const GAM_REG = new gameReg()



