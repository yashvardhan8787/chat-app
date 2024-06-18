// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmSRlDBoznqeYdne7Dhx_7-IGY88tUtuA",
  authDomain: "chat-app-6032d.firebaseapp.com",
  projectId: "chat-app-6032d",
  storageBucket: "chat-app-6032d.appspot.com",
  messagingSenderId: "323519995282",
  appId: "1:323519995282:web:2be9c99236115b8b18754b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth()
export const db =getFirestore()
export const storage =getStorage()