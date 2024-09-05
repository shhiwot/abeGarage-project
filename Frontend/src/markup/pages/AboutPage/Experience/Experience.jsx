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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ac faucibus urna. Aliquam erat volutpat.
            </p>
            <p>
            Phasellus tincidunt enim ut risus bibendum, non pretium risus aliquet. Integer tincidunt convallis neque, ac scelerisque lacus vulputate et. Nulla facilisi. Duis dictum magna sit amet sapien malesuada, non dignissim nunc vestibulum.
            </p>

          <button className="about-button">About Us</button>
        </div>
        {/* <img src={rightImage} alt="Right side image" /> */}
      </div>
    </section>
  );
};

export default Experience;