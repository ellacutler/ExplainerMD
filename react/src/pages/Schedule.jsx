import { useState } from 'react';
import {Navbar} from "../components/Navbar";
import ScheduledDrug from "../components/schedule/ScheduledDrug";
import AddDrugToUserModal from '../components/schedule/AddDrugToUserModal';
import { addImageToUser,  updateUserDrugs } from "../config/firebaseconfig"


import { Button, FileInput, FileButton } from '@mantine/core';
import { useForm } from '@mantine/form';

import axios from 'axios';
import { useEffect } from "react";

const Schedule = ({user, allUsers}) => {
  
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const [modelDrug, setModelDrug] = useState(null);

  const [showAddDrugModal, setShowAddDrugModal] = useState(false);

  const [drugs, setDrugs] = useState([]);

  const [drugSchedule, setDrugSchedule] = useState(null);

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
  
  const handleAddNewDrug = (drug) => {
    switch (drug.FREQUENCY) {
      case 'Every Night':
        drug.FREQUENCYN = 24;
        break;
      case 'Weekly':
        drug.FREQUENCYN = 24 * 7;
        break;
      case 'Twice Daily':
        drug.FREQUENCYN = 12;
        break;
      case 'every other day':
        drug.FREQUENCYN = 24 * 2;
        break;
    }
    drug.START_TIME = new Date().toISOString();
    if (drug.FREQUENCY === 'Every Night') {
      let temp = new Date();
      temp.setHours(22, 0, 0, 0)
      drug.START_TIME = temp.toISOString();
    }
    console.log(drug);
    let updatedUserDrugs;
    if (!allUsers[user.uid].drugs) {
      updatedUserDrugs = [drug];
    } else {
      updatedUserDrugs = [...allUsers[user.uid].drugs, drug];
    }
    updateUserDrugs(user.uid, updatedUserDrugs);
  }

  // const getDrugSchedule = (drug) => {
  //   const schedule = [];
  //   const now = new Date();
  //   const nextScheduledTime = new Date(drug.START_TIME);
  //   while (nextScheduledTime < now) {
  //     nextScheduledTime.setTime(nextScheduledTime.getTime() + drug.frequency * 60 * 60 * 1000);
  //   }
  //   for (let i = 0; i < 7; i++) {
  //     schedule.push(new Date(nextScheduledTime));
  //     nextScheduledTime.setTime(nextScheduledTime.getTime() + drug.frequency * 60 * 60 * 1000);
  //   }
  //   return schedule;
  // };
  useEffect(() => {
    if (allUsers && user && allUsers[user.uid] && allUsers[user.uid].drugs) {
      setDrugs(allUsers[user.uid].drugs);
    }
  }, [allUsers, user]);

  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 7);

  const dates = [];
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  useEffect(() => {
    const schedule = [];

    // calculate schedule for the next 7 days
    const today = new Date();

    drugs.forEach((drug) => {
      for (let i = 0; i < 7; i++) {
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
        const nextday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i + 1);
        let curTime = day
        curTime.setHours(new Date(drug.START_TIME).getHours(), new Date(drug.START_TIME).getMinutes(), 0, 0);
        while (curTime < nextday) {
          let newTime = { drug: drug.CHEMICAL, time: new Date(curTime.getTime()) }
          schedule.push(newTime)
          curTime.setTime(curTime.getTime() + drug.FREQUENCYN*60*60*1000);
        }
      }
    });

    // for (let i = 0; i < 7; i++) {
    //   const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    //   const nextday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i + 1);
    //   drugs.forEach((drug) => {
    //     let curTime = day
    //     curTime.setHours(8, 0, 0, 0);
    //     const frequency = drug.FREQUENCYN;
    //     while (curTime >= day && curTime < nextday) {
    //       console.log("curTime: " + curTime)
    //       schedule.push({ drug: drug.CHEMICAL, time: curTime })
    //       curTime.setTime(curTime.getTime() + frequency*60*60*1000);
    //     }
    //   });
    // }

    // sort schedule by time
    // schedule.sort((a, b) => a.time - b.time);
    // console.log(schedule)
    setDrugSchedule(schedule);
  }, [drugs]);

  return (
    <div>
      <Navbar tab={'schedule'}/>
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
            <ScheduledDrug 
              key={drug.CHEMICAL}
              drug={drug} />
          ))
        )
      }
      <div class="p-2 flex justify-center items-center bg-[#cbd7e3]">
        <div class="h-auto  w-96 bg-white rounded-lg p-4">
          <p class="text-xl font-semibold mt-2 text-[#063c76]">Prescription Schedule</p>

            {dates.map((date) => (
              <div key={date.toISOString()}>
                <ScheduleDay date={date} drugSchedule={drugSchedule}/>
              </div>
            ))}
        </div>
      </div>
      <br />
      <p>Upload and Display Image</p>      
      {/* <br />
      {allUsers && user && allUsers[user.uid].images && allUsers[user.uid].images.photoURL && (
        <div>
        <img alt="not found" width={"250px"} src={allUsers[user.uid].images.photoURL} />
        </div>
      )} */}
      
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
          <Button variant="outline" type="submit">Upload</Button>
        </form>
        {url && <img src={url} alt="Uploaded image" />}
      </div>

      <br/>
      
      <Button variant="outline" onClick={handleShowAddDrugModal}>Add Drug</Button>
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

const ScheduleDay = ({ date, drugSchedule }) => {
  return (
    <div>
      <p>{date.toLocaleDateString([], { weekday: 'short' })}</p>
      <ul class="my-4 ">
        {drugSchedule && drugSchedule
          .filter(
            (drug) => {
              //console.log(drug.time.toLocaleDateString([], { weekday: 'short' }) === date.toLocaleDateString([], { weekday: 'short' }))
              return drug.time.toLocaleDateString([], { weekday: 'short' }) === date.toLocaleDateString([], { weekday: 'short' })
            }
          )
          .map((drug, id) => {
            //console.log("drugSchedule after map:");
            //console.log(drugSchedule);
            return (
              <li key={id} class=" mt-4" id="1">
                  <div class="flex gap-2">
                      <div class="w-9/12 h-12 bg-[#e0ebff] rounded-[7px] flex justify-start items-center px-3">
                          <p class=" text-sm ml-4 text-[#5b7a9d] font-semibold">
                            {drug.drug}
                          </p>
                      </div>
                      <span class="w-1/4 h-12 bg-[#e0ebff] rounded-[7px] flex justify-center text-sm text-[#5b7a9d] font-semibold items-center ">
                        {drug.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                  </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  )

}

export default Schedule