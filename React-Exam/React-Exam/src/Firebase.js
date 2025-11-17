
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA291D5sgbj8FMj3CblO91PdWHWkGc62ew",
  authDomain: "reactexam-8be1d.firebaseapp.com",
  projectId: "reactexam-8be1d",
  storageBucket: "reactexam-8be1d.firebasestorage.app",
  messagingSenderId: "70023221739",
  appId: "1:70023221739:web:509f12d8edfd3f06ee09ae",
  measurementId: "G-E103NZXSXB"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);