import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
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
export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

const database = getFirestore(app);


// Get data from a specific path in the entire database
export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
      () =>
          onValue( // reference error with on value 
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


// Image upload and delete functions

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

export const deleteFile = async (url) => {
  let fileRef = sRef(storage, url);
  try {
    let deleteResult = await deleteObject(fileRef);
    console.log(deleteResult);
  } catch (error) {
    console.log(error);
  }
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