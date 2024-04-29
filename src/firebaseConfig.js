// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "moss-cea02.firebaseapp.com",
  projectId: "moss-cea02",
  storageBucket: "moss-cea02.appspot.com",
  messagingSenderId: "978623141325",
  appId: "1:978623141325:web:bc42f8b1324e4d9f9e6084",
  databaseURL:
    "https://moss-cea02-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
