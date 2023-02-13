import { useState } from 'react';
import Navbar from '../Components/Navbar';


const About = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <NavBar />
      <h1>About page</h1>
      <p>this is about counting numbers {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default About