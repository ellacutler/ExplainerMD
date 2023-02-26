import { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Schedule from '../pages/Schedule';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Profile = () => {
  const [count, setCount] = useState(0);
  const [tabKey, setTabKey] = useState("schedule");

  return (
    <div>
      <Navbar/>
      

      <h1>Profile page</h1>
      
      
    </div>
  );
}

export default Profile