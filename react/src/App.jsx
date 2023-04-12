
// import reactLogo from './assets/react.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Assistant from './pages/Assistant';
import { Navbar } from './Components/Navbar';
import { ScheduledDrug } from './Components/schedule/ScheduledDrug';
import React, {useState,useEffect} from "react";
import { onAuthStateChanged,getAuth} from 'firebase/auth';
import { getDatabase, ref, set, off, child, get } from 'firebase/database';
import { useDbData, useAuthState} from './config/firebaseconfig';




const App = () => {
  // Get the logged in user
  const user = useAuthState();
  const [allUsers, usersError] = useDbData("/users");
  if (usersError) {
    console.log(usersError);
  }
  // // After this component renders, we will call on auth lister which will begin auth listener process
  // componentDidMount(){
  //   this.authListener();
  // }
  // authListener() {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       const uid = user.uid;
  //       console.log(uid);
  //       console.log(this.state.user);
  //       this.setState({
  //         user:user.uid,
  //       });
  //       // SO THIS IS DOING THE RIGHT THING 
  //       // ...
  //     } else {
  //       this.setState({
  //         user: " ",
  //       });
  //       // User is signed out
  //       // ...
  //     }
  //   })
  // };
  return (
    <div className="App bg-slate-300">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home allUsers={allUsers} />} />
          <Route exact path='/schedule' element={
              <Schedule user={user} allUsers={allUsers}/>
          }/>
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/navtest" element={<Navbar />} />
          <Route path="/ptest" element = {<ScheduledDrug />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App
