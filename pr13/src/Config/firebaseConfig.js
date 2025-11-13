import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAohkJfuxzwSty6xDsPemVU31XZak1Xr3g",
  authDomain: "fir-606b3.firebaseapp.com",
  projectId: "fir-606b3",
  storageBucket: "fir-606b3.firebasestorage.app",
  messagingSenderId: "282406953247",
  appId: "1:282406953247:web:58e62f3a3baa289292102a",
  measurementId: "G-NWD97BYWGS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
