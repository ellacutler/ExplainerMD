import { useState } from 'react';
import Navbar from '../Components/Navbar';

const Schedule = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <h1>Schedule page</h1>
      <p>this is about counting numbers {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Schedule