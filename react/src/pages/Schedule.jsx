import { useState } from 'react';
import {Navbar} from "../components/Navbar";
import ScheduledDrug from "../components/schedule/ScheduledDrug";
import AddDrugToUserModal from '../components/schedule/AddDrugToUserModal';
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { addImageToUser, uploadFile, getImageLinkOfExistingImage, deleteFile, updateUserDrugs } from "../config/firebaseconfig"
import { Link, redirect, Navigate } from 'react-router-dom';
import { getDatabase, ref, set, off, child, get } from 'firebase/database';

import { Button } from '@mantine/core';

const Schedule = ({user, allUsers}) => {
  const [count, setCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const [showAddDrugModal, setShowAddDrugModal] = useState(false);

  const handleShowAddDrugModal = () => setShowAddDrugModal(true);
  const handleCloseAddDrugModal = () => setShowAddDrugModal(false);

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

  // useEffect(() => {
  //   eventData && setEvents(Object.values(eventData));
  // });
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
  const defaultDrug = {
    CHEMICAL: "Wellbutruin",
    TIME: "Morning",
    DOSAGE: "75mg",
    DISEASE: "Being too hot",
    FILLTIME: "Abc",
    REFILLTIME: " Idk if we fr need these",
    QUANTITY: " 30 pills",
    INFO: "stop being anxious",
  }
  
  const handleAddNewDrug = (drug) => {
    let updatedUserDrugs;
    if (!allUsers[user.uid].drugs) {
      updatedUserDrugs = {
        drugs: [drug],
      };
    } else {
      updatedUserDrugs = {
        drugs: [...allUsers[user.uid].drugs, drug],
      };
    }
    updateUserDrugs(user.uid, updatedUserDrugs);
  }


  return (
    <div>
      <Navbar />
      <AddDrugToUserModal
        show={showAddDrugModal}
        handleClose={handleCloseAddDrugModal}
        handleSubmit={handleAddNewDrug}
        user={user}
        allUsers={allUsers}
      />
      {/* userdata.username */}
      <h1 className={h1styles}> {allUsers && user ? "Hello, " + allUsers[user.uid].username : "Hello!"}  </h1> 
      {
        !allUsers || !allUsers[user.uid].drugs || allUsers[user.uid].drugs.length === 0 ? (
          <div>
            <h1 className={h1styles}> You have no scheduled drugs </h1>
          </div>
        ) : (
          allUsers[user.uid].drugs.map((drug) => (
            <ScheduledDrug drug={drug} />
          ))
        )
      }
      <br />

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
      <Button onClick={handleShowAddDrugModal}>Add Drug</Button>
    </div>
  );
}

export default Schedule