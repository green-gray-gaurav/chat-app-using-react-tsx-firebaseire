// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG2WyScXytbDZx5kI-sBiPYUldGZ_K3P0",
  authDomain: "sample-app-71dda.firebaseapp.com",
  projectId: "sample-app-71dda",
  storageBucket: "sample-app-71dda.appspot.com",
  messagingSenderId: "333178045367",
  appId: "1:333178045367:web:cc7f6a7a51519ebbb89e32"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

