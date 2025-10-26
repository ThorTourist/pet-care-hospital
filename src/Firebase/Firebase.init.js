// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_g6BdzUAu94mRisu7-jw3L1HamAZitI8",
  authDomain: "pet-care-hospital-54fc5.firebaseapp.com",
  projectId: "pet-care-hospital-54fc5",
  storageBucket: "pet-care-hospital-54fc5.firebasestorage.app",
  messagingSenderId: "939838554667",
  appId: "1:939838554667:web:1a2ed203960f75e5d2606e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);