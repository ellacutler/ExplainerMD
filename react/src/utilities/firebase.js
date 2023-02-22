// Firebase Functionality

import { useEffect, useState } from "react";

// Import Firebase SDK functions
import { initializeApp } from "firebase/app";

import {
  child,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Firebase configuration data
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

// Initialize Firebase and database
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

/* DATABASE FUNCTIONS */

// Get data from a specific path in the entire database
export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

// Add new user to the user table in the database
export const addNewUser = (newUser, uid) => {
  set(ref(database, "users/" + uid), newUser);
};

/* USER AUTHENTICATION FUNCTIONS */

// Open Google sign in popup and sign in the user
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

// Sign out the user
const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut };

// Get the authentication state of the user (is the user signed in or not)
// If user is signed in, return value is a Google user object (console.log to see all)
export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return user;
};
