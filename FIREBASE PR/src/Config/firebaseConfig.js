import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXhKHYTqQwl5do5k2fS98AZl7uYajYSFY",
  authDomain: "clone-bcd9b.firebaseapp.com",
  projectId: "clone-bcd9b",
  storageBucket: "clone-bcd9b.firebasestorage.app",
  messagingSenderId: "706679172723",
  appId: "1:706679172723:web:d727da074a1897a9c40406",
  measurementId: "G-BMDEX5SN09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);