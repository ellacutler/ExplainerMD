import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuthState } from '../utilities/firebase';

const Schedule = (user) => { // does this need to be a class? 
  
  const [count, setCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  // getting the user 
  const [testuser, loading] = useAuthState(auth);

  // If the user is authenticated, user.uid will contain the user ID
  const userId = user ? user.uid : null; // basically if there is a user sets the user id to the user's user id 

  // then create a function that takes in inputs for a prescription and outputs from that  
  //const Prescription = () => 


   


  return (
    <div>
      <Navbar />
      <h1>Schedule page</h1>



      <p>Upload and Display Image</p>      
      <br />
      {selectedImage && (
        <div>
        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
}

export default Schedule