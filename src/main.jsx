import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from "./Home.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
   {/* <Route exact path = "/home" component = {<Home />} /> */}
  </React.StrictMode>
)
