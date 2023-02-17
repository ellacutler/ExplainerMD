import { useState } from 'react';
import Navbar from '../Components/Navbar';

const Schedule = () => {
  const [count, setCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

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