// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBlrbP2VJL5t5-IM4r0-NDnP-WYG8Ti_FI",
  authDomain: "reels-e48a7.firebaseapp.com",
  projectId: "reels-e48a7",
  storageBucket: "reels-e48a7.appspot.com",
  messagingSenderId: "132524626928",
  appId: "1:132524626928:web:a42d4ff283221456e4c335",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const storage = getStorage();
const db = getFirestore();
export { auth, storage, db };
export default app;
