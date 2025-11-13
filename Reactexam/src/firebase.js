// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA291D5sgbj8FMj3CblO91PdWHWkGc62ew",
  authDomain: "reactexam-8be1d.firebaseapp.com",
  projectId: "reactexam-8be1d",
  storageBucket: "reactexam-8be1d.firebasestorage.app",
  messagingSenderId: "70023221739",
  appId: "1:70023221739:web:509f12d8edfd3f06ee09ae",
  measurementId: "G-E103NZXSXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);