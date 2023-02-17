import { useState } from 'react';
import Navbar from '../Components/Navbar';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <h1 className = "text-center"> Home</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Home