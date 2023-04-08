import { useState } from 'react';
import {Navbar} from "../Components/Navbar";
import { ScheduledDrug } from '../Components/schedule/ScheduledDrug';
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, app } from "../config/firebaseconfig"
import { Link, redirect, Navigate } from 'react-router-dom';
import { getDatabase, ref, set, off, child, get } from 'firebase/database';



const Schedule = ({user = ""}) => {
  const [count, setCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userdata, setuserdata] = useState("null")

  console.log("hi here we are ")
  console.log(JSON.stringify(user));
  const userid = JSON.stringify(user);

  const h1styles = "text-black text-4xl text-center text-bold";
  const db = getDatabase();
  const dbRef = ref(db);
  // this currently causes a 
  get(child(dbRef, `users/${user}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("def");
      console.log(snapshot.val());
      setuserdata(snapshot.val());


     
    }
  }).catch((error) => {
    console.log(error);
  });


  

  return (
    <div>
      <Navbar />
      <h1 className={h1styles}> {"Hi, " + userdata.username}  </h1>
      <ScheduledDrug />

      
      



      <p>Upload and Display Image</p>      
      <br />
      {selectedImage && (
        <div>
        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
}

export default Schedule