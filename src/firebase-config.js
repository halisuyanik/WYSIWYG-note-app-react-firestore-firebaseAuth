import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

export const app = initializeApp(firebaseConfig);
const auth=getAuth();
export const register=async(email, password)=>{
  const {user}=await createUserWithEmailAndPassword(auth, email, password);
  return user;

}
export const db=getFirestore(app);