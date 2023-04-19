import { useState } from 'react';
import {Navbar} from "../components/Navbar";
import { ScheduledDrug } from '../Components/schedule/ScheduledDrug';
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { addImageToUser, uploadFile, getImageLinkOfExistingImage, deleteFile } from "../config/firebaseconfig"
import { Link, redirect, Navigate } from 'react-router-dom';
import { getDatabase, ref, set, off, child, get } from 'firebase/database';



const Schedule = ({user, allUsers}) => {
  const [count, setCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  
  // console.log("hi here we are ")
  // console.log(JSON.stringify(user));
  // const userid = JSON.stringify(user.id);

  const h1styles = "text-black text-4xl text-center text-bold";
  // const db = getDatabase();
  // const dbRef = ref(db);

  const handleUpload = async (imageFile) => {
    if (imageFile) {
      let [completed, fileLink] = await uploadFile(imageFile, allUsers[user.uid].id);
      if (completed) {
        addImageToUser(allUsers[user.uid].id, fileLink);
        console.log("file uploaded");
      }
    }
  };

  // remove image doesnt work yet
  const handleRemoveImage = async () => {
    if (selectedImage) {
      let fileLink = await deleteFile(selectedImage, allUsers[user.uid].id);
    }
  };

  // // this currently causes a 
  // get(child(dbRef, `users/${user}`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     // console.log("def");
  //     // console.log(snapshot.val());
  //     setuserdata(snapshot.val());


     
  //   }
  // }).catch((error) => {
  //   console.log(error);
  // });


  

  return (
    <div>
      <Navbar />
      {/* userdata.username */}
      <h1 className={h1styles}> {allUsers && user ? "Hello, " + allUsers[user.uid].username : "Hello!"}  </h1> 
      <ScheduledDrug />

      
      



      <p>Upload and Display Image</p>      
      <br />
      {allUsers && user && allUsers[user.uid].images && allUsers[user.uid].images.photoURL && (
        <div>
        <img alt="not found" width={"250px"} src={allUsers[user.uid].images.photoURL} />
        <br />
        <button onClick={()=>{
          setSelectedImage(null);
          handleRemoveImage();
        }}>Remove</button>
        </div>
      )}
      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
          handleUpload(event.target.files[0]);
        }}
      />
      <button 
        onClick={() => {console.log(user); console.log(allUsers[user.uid]);}}
      >Log</button>
    </div>
  );
}

export default Schedule