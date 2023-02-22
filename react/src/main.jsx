import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWQwGfrwlkyAZuwBatkhzQJVH5IPnFv7A",
  authDomain: "explainermd-cc5aa.firebaseapp.com",
  databaseURL: "https://explainermd-cc5aa-default-rtdb.firebaseio.com",
  projectId: "explainermd-cc5aa",
  storageBucket: "explainermd-cc5aa.appspot.com",
  messagingSenderId: "968084990615",
  appId: "1:968084990615:web:97268d712ed3a691f5d7d2",
  measurementId: "G-3JYG3DB1G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
