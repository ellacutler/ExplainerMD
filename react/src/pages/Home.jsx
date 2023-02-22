import { useState } from 'react';
import Navbar from '../components/Navbar';
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { auth, app } from "../config/firebaseconfig"
import { Link, redirect, Navigate } from 'react-router-dom';

const  Home = () => {
  // this is basically the landing page 
  // don't need the nav bar if people aren't logged in that's going to cause problems 
 //  const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
  
  return (
   
    <div className="grid grid-cols-1 place-items-center gap-4">
      <br> 
      </br>
      <h1 className = "text-center text-4xl"> Hi! Welcome to "Explainer MD"</h1>
      <button onClick = {SignIn} className=" w-96 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"> Sign in With Google </button>
      
    
    </div>
  );
}
const Redirect = async => {


}

const SignIn = async => {
  var test = "test";
  var object = {"something":"test"}
  console.log(object)
  console.log(object.something)
  console.log(JSON.stringify(object))
//   const [user, setUser] = useState(0)

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user; // is this the user id?? ?
    console.log(JSON.stringify(user));
    window.location.href = "http://localhost:5173/schedule";
   
     // IdP data available using getAdditionalUserInfo(result)
    
     return 1  
  /*  .then( () => {
        redirect("./schedule")
    }) */

   
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


/*

USER 
{"uid":"7z8I242fCQW3WpsZX132lmB2vPJ3",
"email":"ellacutler02@gmail.com",
"emailVerified":true,
"displayName":"Ella Cutler","
isAnonymous":false,
"photoURL":"https://lh3.googleusercontent.com/a/AEdFTp7gjkjzyMDZ1g7gl2eZ3cLBwe6VaT41GvwWvhvsZZg=s96-c",
"providerData":[{"providerId":"google.com","uid":"111273487645527978145",
"displayName":"Ella Cutler","email":"ellacutler02@gmail.com",
"phoneNumber":null,
"photoURL":"https://lh3.googleusercontent.com/a/AEdFTp7gjkjzyMDZ1g7gl2eZ3cLBwe6VaT41GvwWvhvsZZg=s96-c"}],"stsTokenManager":{"refreshToken":"APJWN8dzlD9oZvXqj2-rERtYg1k-6ys4bEoNoi4t2abMEdihSApMse-1SsXwYUq-IyvoEGfgESNmJcievEkFuvfrClUnUe_JO580ZPofK37ksPL2p-z34JJc7LQz1hBKL7hzbNWM2tkTgEJiiClWvZmUs8AxVvxHkd-jUMLOKaGc8eZZ0iL47r4rPPXUvqEjrhcCy_HLueXVEAEw879DORuCUJ6WdYVWK67bQ8TiWIgtPUGeX9MO_KldIAlFOipYmjAlwnyG8hw7RllhKJpdDEfkt3RbGjVN73_R8iEDhn-jsktxEDCFyAL-XkAXobv-Lrb25ibOONIELJx2-T8J-oMJqR1wFHewyYo9TaheT1SbKCKjJ1zjTi-TieZWiTRyPyVGM2maMtkPdU-86paxhLntBYUN2eqejgHK_kY7-IJV6aGHMd-OUAw","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1YzJiNDBhYTJmMzIyNzk4NjY2YTZiMzMyYWFhMDNhNjc3MzAxOWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRWxsYSBDdXRsZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwN2dqa2p6eU1EWjFnN2dsMmVaM2NMQndlNlZhVDQxR3Z3V3ZodnNaWmc9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZXhwbGFpbmVybWQtY2M1YWEiLCJhdWQiOiJleHBsYWluZXJtZC1jYzVhYSIsImF1dGhfdGltZSI6MTY3NzAzOTE3NSwidXNlcl9pZCI6Ijd6OEkyNDJmQ1FXM1dwc1pYMTMybG1CMnZQSjMiLCJzdWIiOiI3ejhJMjQyZkNRVzNXcHNaWDEzMmxtQjJ2UEozIiwiaWF0IjoxNjc3MDM5MTc1LCJleHAiOjE2NzcwNDI3NzUsImVtYWlsIjoiZWxsYWN1dGxlcjAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTExMjczNDg3NjQ1NTI3OTc4MTQ1Il0sImVtYWlsIjpbImVsbGFjdXRsZXIwMkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.q8M754CLDzE1dPcYLVfAJdkNY8QMS2o1et7SIVPTJdYityMhGSNTOK1TloTcNIgzNtzWOykt-ThghPbty0aKiwx5sPXyLFxBqnSecgQMnESV8H4NQHwhEORdv5zGSDzCH5GE5BLZ5jGOknQ91COKR2_qDswDNL0LwgcKefxrqXjAxtzFnN5xMx5YREg2gfPyqLJQDVVVSpF8bQ47W05RjSJf-a_UKIlzknaxXpVINkNOTvrd7-RdupY3wnY72X9kNv2cINPI_O2N_BeyitWcLgHhTuKWCWuyXWaJ_8WDoHKuPbt7A50l9ftgTueTawTqx6lhC1T7tsFrS9H3CmAH7Q","expirationTime":1677042775627},"createdAt":"1677033694116","lastLoginAt":"1677039146481","apiKey":"AIzaSyDWQwGfrw

*/