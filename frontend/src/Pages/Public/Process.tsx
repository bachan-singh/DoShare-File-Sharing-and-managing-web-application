import React, { useState } from 'react';
import { BiMessageSquareAdd } from "react-icons/bi";
import './Process.css';
import steps from './Step'

const Process = () => {
  const [activeKey, setActiveKey] = useState<number | null >(null);


  return (
    <div className="process">
      <div className="content">
        <span>Our Process</span>
        <h2>Steps you have to follow</h2>
        <p>Follow these simple steps to get started with our platform and share your files with a secure environment.</p>
      </div>
      <div className="process-container">
        <ul>
          {steps.map((step, key) => (
            <li key={key}>
              <h3 onClick={() => setActiveKey(activeKey === key ? null : key)}>
                <span><BiMessageSquareAdd /></span>
                {step.heading}
              </h3>
              {activeKey === key && <p>{step.content}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Process;
