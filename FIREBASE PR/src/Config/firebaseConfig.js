// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAohkJfuxzwSty6xDsPemVU31XZak1Xr3g",
  authDomain: "fir-606b3.firebaseapp.com",
  projectId: "fir-606b3",
  storageBucket: "fir-606b3.firebasestorage.app",
  messagingSenderId: "282406953247",
  appId: "1:282406953247:web:58e62f3a3baa289292102a",
  measurementId: "G-NWD97BYWGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);