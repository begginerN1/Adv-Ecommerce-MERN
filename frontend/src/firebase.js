// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mern-estate-test.firebaseapp.com",
  projectId: "mern-estate-test",
  storageBucket: "mern-estate-test.appspot.com",
  messagingSenderId: "1024367090804",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-56ERCB7T91"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);