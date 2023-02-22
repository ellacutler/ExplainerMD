import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Assistant from './pages/Assistant';

import { useAuthState, useDbData } from './utilities/firebase';


function App() {
  const user = useAuthState();
  const [dbUsers, dbUsersError] = useDbData("users");

  if (dbUsersError) {
    console.log(
        "Error retrieving users from database: ",
        dbUsersError
    );
}

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/schedule' element={<Schedule user={user}/>} />
          <Route path="/" element={user && dbUsers && dbUsers[user.uid] ? (
                            <Navigate to="/schedule"/>
                        ) : (
                            <Home allUsers={dbUsers}/>
                        )} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
