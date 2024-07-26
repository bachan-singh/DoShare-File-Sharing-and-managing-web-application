import React from 'react';
import features from './Feature';
import './Features.css'

const Features = () => {
  return (
    <div className='features'>
      <div className="content">
        <span>Features</span>
        <h2>What we are offering you.</h2>
        <p>Some unique features that are only present in our specialized services.</p>
        <div className="feature">
          <ul>
            {features.map((feature, key) => (
              <li key={key}>
                <span><feature.icon /></span>
                <h3>{feature.heading}</h3>
                <p>{feature.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Features;
