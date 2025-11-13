// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwopvr6LGpq9IUUjJstuZMNnXEByAYE7o",
  authDomain: "youth-link-dccfe.firebaseapp.com",
  projectId: "youth-link-dccfe",
  storageBucket: "youth-link-dccfe.firebasestorage.app",
  messagingSenderId: "508158996786",
  appId: "1:508158996786:web:3bf87e4281112034a2672b",
  measurementId: "G-DWP6Z0K2CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);