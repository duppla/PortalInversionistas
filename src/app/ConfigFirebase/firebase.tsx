// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAtgF11MwjQu4l8z7rftKu4xyKrOBVx6ZA",
  authDomain: "portal-inversionistas.firebaseapp.com",
  projectId: "portal-inversionistas",
  storageBucket: "portal-inversionistas.appspot.com",
  messagingSenderId: "734688292937",
  appId: "1:734688292937:web:5a56290b68e28f09e88f98",
  measurementId: "G-4H1W5N6ZWF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Configurar la persistencia en el navegador
setPersistence(auth, browserLocalPersistence);
