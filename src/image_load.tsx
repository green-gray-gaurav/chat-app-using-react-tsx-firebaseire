

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



export async function geturl(fileobj:any , callback:(url:string)=>void , callbackarray:Function[]){



const storage = getStorage();
const storageRef = ref(storage, fileobj.name);
const uploadTask = uploadBytesResumable(storageRef, fileobj);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {

    console.log(snapshot)
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);

      callback(downloadURL)
    //here the call array 
     var array = [true , false]
     for(var i =0 ; i < callbackarray.length ; ++i){
            callbackarray[i](array[i]);
     }
        
    
    });
  }
);

}