import React from 'react';
import leftImage from "../../../../assets/images/vban2.jpg"; 
import rightImage from "../../../../assets/images/vban1.jpg";

import './Experience.css';

const Experience = () => {
  return (
    <section className="experience">
      <div className="experience-images">
      <img src={leftImage} alt="Left side image" style={{ marginRight: '10px' }} />
      <img src={rightImage} alt="Right side image" />
      
      
        <div className="experience-text">
          <h2>We have 24 years experience</h2>
          <p>
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    a new normal that has evolved from generation X is on the
                    runway heading towards a streamlined cloud solution. User
                    generated content in real-time will have multiple
                    touchpoints for offshoring.
                  </p>
                  <p>
                    Capitalize on low hanging fruit to identify a ballpark value
                    added activity to beta test. Override the digital divide
                    with additional clickthroughs from DevOps. Nanotechnology
                    immersion along the information highway will close the loop
                    on focusing.
                  </p>
            <div className="btn">
                <a href="#" className="theme-btn btn-style-one">
                  <span>About Us</span>
                  <i className="flaticon-right"></i>
                </a>
              </div>
 
        </div>
    
      </div>
    </section>
  );
};

export default Experience;