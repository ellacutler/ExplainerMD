import { useState } from 'react';
import {Navbar} from "../components/Navbar";
import ScheduledDrug from "../components/schedule/ScheduledDrug";
import AddDrugToUserModal from '../components/schedule/AddDrugToUserModal';
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { addImageToUser, uploadFile, getImageLinkOfExistingImage, deleteFile, updateUserDrugs } from "../config/firebaseconfig"
import { Link, redirect, Navigate } from 'react-router-dom';
import { getDatabase, ref, set, off, child, get } from 'firebase/database';

import { Button, FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const Schedule = ({user, allUsers}) => {
  const [count, setCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modelDrug, setModelDrug] = useState(null);

  const [showAddDrugModal, setShowAddDrugModal] = useState(false);

  const handleShowAddDrugModal = () => setShowAddDrugModal(true);
  const handleCloseAddDrugModal = () => setShowAddDrugModal(false);

  // console.log("hi here we are ")
  // console.log(JSON.stringify(user));
  // const userid = JSON.stringify(user.id);

  const h1styles = "text-black text-4xl text-center text-bold";
  const h3styles = "text-black text-2xl text-center text-bold";
  // const db = getDatabase();
  // const dbRef = ref(db);

  const form = useForm({
    initialValues: {
      image: null,
    },
    validate: {
      image: (value) => {
        if (!value) return 'Image is required';
        if (value.type !== 'image/png' && value.type !== 'image/jpeg') {
          return 'Only png and jpeg images are allowed';
        }
      }
    }
  });

  const handleUpload = async (imageFile) => {
    if (imageFile) {
      let [completed, fileLink] = await uploadFile(imageFile, allUsers[user.uid].id);
      if (completed) {
        addImageToUser(allUsers[user.uid].id, fileLink);
        console.log("file uploaded");
        setModelDrug(await getJSONFromImage(imageFile));
      }
    }
  };

  const getJSONFromImage = async (imageFile) => {
    return fetch('http://127.0.0.1:5000/ner', {
      method: 'POST',
      body: imageFile
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    })
    .catch(err => {
      console.log(err);
    });
  }
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
      updatedUserDrugs = [drug];
    } else {
      updatedUserDrugs = [...allUsers[user.uid].drugs, drug];
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
        modelOutput={modelDrug}
      />
      {/* userdata.username */}
      <h1 className={h1styles}> {allUsers && user ? "Hello, " + allUsers[user.uid].username : "Hello!"}  </h1> 
      {
        !allUsers || !allUsers[user.uid].drugs || allUsers[user.uid].drugs.length === 0 ? (
          <div>
            <h3 className ={h3styles}> You have no scheduled drugs </h3>
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
      <form onSubmit={ /* RYAN LOOK HERE*/
        form.onSubmit(handleUpload)}>
        <FileInput
          label="Upload Image" 
          placeholder='Choose image file'
          accept="image/png, image/jpeg" 
          {...form.getInputProps('image')}
        />
        <Button type="submit">Add Drug from Image</Button>
      </form>
      <Button onClick={handleShowAddDrugModal}>Add Drug</Button>
      <br />
      {/* <FileInput
        label="Upload Image"
        accept="image/png, image/jpeg"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
          handleUpload(event.target.files[0]);
        }}
      /> */}
      <button 
        onClick={() => {console.log(user); console.log(allUsers[user.uid]);}}
      >Log</button>
      
    </div>
  );
}

export default Schedule