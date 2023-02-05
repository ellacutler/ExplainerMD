import { useState } from 'react';


const About = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>About page</h1>
      <p>this is about counting numbers {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default About