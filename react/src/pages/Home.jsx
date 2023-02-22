import { useState } from 'react';
import Navbar from '../components/Navbar';
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { auth, app } from "../config/firebaseconfig"

const Home = () => {
  // this is basically the landing page 
  // don't need the nav bar if people aren't logged in that's going to cause problems 

  return (
    <div className="grid grid-cols-1 place-items-center gap-4">
      <br> 
      </br>
      <h1 className = "text-center text-4xl"> Hi! Welcome to "Explainer MD"</h1>
      <button onClick = {SignIn} className=" w-96 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"> Sign in With Google </button>
    
    </div>
  );
}

const SignIn = async => {
  

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user; // is this the user id?? ?
    console.log(user.toString())
     // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

export default Home