import { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Schedule from '../Components/schedule';
import { Link } from 'react-router-dom';


const Tracker = () => {
  const [count, setCount] = useState(0);
  const [tabKey, setTabKey] = useState("schedule");

  return (
    <div>

      <Navbar />

      <h1>Info page</h1>
        {/* <Tabs 
          // defaultActiveKey="schedule" 
          activeKey={tabKey}
          onSelect={(tab) => setTabKey(tab)}
          className="flex mb-3 items-stretch"
          >
          <Tab eventKey="schedule" title="Schedule">
          Schedule

          </Tab>
          <Tab eventKey="assistant" title="Assistant">
            Assistant
          </Tab>
          <Tab eventKey="info" title="Info">
            Info
          </Tab>
        </Tabs> */}

    </div>
  );
}

export default Tracker