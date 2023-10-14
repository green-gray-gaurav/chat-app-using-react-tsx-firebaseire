import { SnapshotOptions, addDoc, deleteDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./firebase_config";
import { getDocs } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

//fire base testing
export const feedDocInCollection = async (collName:String , data : Object)=>{
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collName.toString()), data);
    return docRef.id;
    }
    
export const getDocsFromCollection =  async (collName:string)=> { 
      const citiesCol = collection(db, collName.toString());
      const citySnapshot = await getDocs(citiesCol);
      
      const cityList = citySnapshot.docs.map(doc => doc.data());
      
      return cityList
      // getCities().then((x)=>{console.log(x)})
    }


export const feedDocInCollectionById = async (collName:string , id:string , data:object)=>{
    await setDoc(doc(db, collName.toString(), id.toString()), data);
}


    
export const getDocById =  async (collName:string , docName:string)=> { 
    var dataObject:SnapshotOptions = {}
    const citiesCol = collection(db, collName.toString());
    const citySnapshot = await getDocs(citiesCol);

    citySnapshot.docs.forEach(doc => {
       if (doc.id == docName){
        dataObject= doc.data();
       }

    });
    return dataObject;
   
  }

export const deleteDocById = async(collName:string , docName:string) =>{
    await deleteDoc(doc(db , collName.toString() , docName.toString()))
}
    


//specifix purpose // application purpose
export const __appendObjectInDocArray = async  (collName:string , docName:string , valueToAppend:object) =>{
    const docRef = doc(db, collName.toString(), docName.toString());
    await updateDoc(docRef, {
        usermessages: arrayUnion(valueToAppend)
    }); 
}


export const __appendObjectInDocArray_replies = async  (collName:string , docName:string , valueToAppend:object) =>{
    const docRef = doc(db, collName.toString(), docName.toString());
   
    await updateDoc(docRef, {
        "usermessages[0].replies": arrayUnion(valueToAppend)
    }); 
}




