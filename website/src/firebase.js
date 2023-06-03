// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfHVIsMr3xa0uAHXBHZpR-ttPwhXmsBJg",
  authDomain: "macrotracker-27770.firebaseapp.com",
  projectId: "macrotracker-27770",
  storageBucket: "macrotracker-27770.appspot.com",
  messagingSenderId: "499449358808",
  appId: "1:499449358808:web:f37403e532a172285a6aad",
  measurementId: "G-39GD4JRMLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);