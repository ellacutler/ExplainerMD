import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";

import { useState, useEffect } from "react";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as sRef,
  uploadBytes,
} from "firebase/storage";

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

export const firebase = initializeApp(firebaseConfig);

export const database = getDatabase(firebase);



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

// USER FUNCTIONALITY

// Add a new user to the users table in the database
export const addNewUser = (newUser, uid) => {
  set(ref(database, "users/" + uid), newUser);
};

// Update list of user drugs
export const updateUserDrugs = (userId, newDrugs) => {
  set(ref(database, `users/${userId}/drugs`), newDrugs);
}
// Image upload and delete functions

const storage = getStorage();

export const uploadFile = async (file) => {
  let fileLink = `images/${file.name}`;
  let downloadURL = "";
  let isSuccessful = false;
  const imageReference = sRef(storage, fileLink);

  try {
    await uploadBytes(imageReference, file);
    downloadURL = await getDownloadURL(imageReference);
    console.log("File upload successful");
    isSuccessful = true;
  } catch (err) {
    console.log("Error: " + err);
  }

  return [isSuccessful, downloadURL];
};

export const addImageToUser = (userId, imageLink) => {
  set(ref(database, `users/${userId}/images/photoURL`), imageLink);
}

export const deleteFile = async (url) => {
  let fileRef = sRef(storage, url);
  try {
    let deleteResult = await deleteObject(fileRef);
    console.log(deleteResult);
  } catch (error) {
    console.log(error);
  }
};

export const deleteImageFromUser = (userId, imageLink) => {
  const imageRef = ref(database, `users/${userId}/images/`);
  onValue(imageRef, (snapshot) => {
    const data = snapshot.val();
    if (data === imageLink) {
      remove(imageRef);
    }
  });
};

export const getImageLinkOfExistingImage = async (imageFileName) => {
  let fileLink = `images/${imageFileName}`;
  let imageLink = "";
  const imageReference = sRef(storage, fileLink);
  try {
    imageLink = await getDownloadURL(imageReference);
  } catch (err) {
    console.log(err);
  }

  return imageLink;
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