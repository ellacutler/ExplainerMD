import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

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
export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);
