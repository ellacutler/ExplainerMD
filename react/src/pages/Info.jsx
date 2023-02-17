import { useState } from 'react';
import Navbar from '../Components/navbar';
import Schedule from '../schedule';
import { Link } from 'react-router-dom';


const Profile = () => {
  const [count, setCount] = useState(0);
  const [tabKey, setTabKey] = useState("schedule");

  return (
    <div>
      <Navbar />
      <h1>Profile page</h1>

    </div>
  );
}

export default Profile