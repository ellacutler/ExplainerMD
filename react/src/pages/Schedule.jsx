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

import axios from 'axios';
import { useEffect } from "react";

const Schedule = ({user, allUsers}) => {
  
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

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
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  // Using the ImgBB API (i gave up on having firebase host images lmaooo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post('https://api.imgbb.com/1/upload?key=c94645b6776f603f01ed1556d0ac0303', formData);
    console.log("res finished, heres the URL")
    console.log(res.data.data.url)
    setUrl(res.data.data.url);
    // continues running in useEffect when URL is updated
  };

  // makes sure url is done being updated with whatever the file is before more stuff gets run
  useEffect(() => {
    const getJSONFromImage = async (imageURL) => {
      return fetch('http://127.0.0.1:5000/ner', {
        method: 'POST',
        body: imageURL
      })
      .then(response => response.json())
      .then(data => {
      console.log(data);
      // when modelDrug is set, new modelOutput is in AddDrugToUserModal, 
      // which it's useEffect picks up on, then sets new values
      setModelDrug(data);
      console.log("gonna showAddDrugModal now");
      setShowAddDrugModal(true);
      // Do something with the data here
      })
      .catch(error => {
      console.error(error);
      });
    }
    const runAsyncUrlStuff = async () => {
      console.log(url)
      // Now that the URL has been updated you can add that to the user
      addImageToUser(allUsers[user.uid].id, url);
      // somehow the file is just already updated even though we dont setFile..?
      // anyways use that when making post request to Flask server
      await getJSONFromImage(file);
      
    }

    if(url){
      runAsyncUrlStuff();
    }
    
  }, [url]); //useEffect only runs when url changes, which is only in handleSubmit 

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
        </div>
      )}
      <br />
      
      {/* Aaaaaahhhhhhhhhh idk how mantine works */}
      {/* 
      <form onSubmit={ form.onSubmit(handleUpload)}>
        <FileInput
          label="Upload Image" 
          placeholder='Choose image file'
          accept="image/png, image/jpeg" 
          {...form.getInputProps('image')}
        />
        <Button type="submit">Add Drug from Image</Button>
      </form>
      */}

      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {url && <img src={url} alt="Uploaded image" />}
      </div>

      <br/>
      
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