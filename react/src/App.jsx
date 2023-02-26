import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Assistant from './pages/Assistant';
import { useDbData } from './config/firebaseconfig.js';


function App() {
  const [dbUsers, dbUsersError] = useDbData('/users');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/schedule' element={<Schedule/>} />
          <Route path="/" element={<Home allUsers={dbUsers}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
