import React from 'react';
import introImage from "../../../../assets/images/frt.png";
import './Introduction.css';

const Introduction = () => {
  return (
    <section className="introduction">
      <div className="content">
        <h2>We are highly skilled mechanics for your car repair</h2>
        <p>
          At our garage, we pride ourselves on our team of highly skilled
          mechanics dedicated to providing exceptional car repair services. With
          a focus on quality and customer satisfaction, we ensure your vehicle
          receives the utmost care and attention.
        </p>
        <p>
          Our dedication to excellence shines through our tailored services
          designed to meet your unique needs. With advanced diagnostic tools, we
          accurately identify and resolve any vehicle issues. Trust our
          expertise to keep your car running smoothly and safely—your
          satisfaction is our top priority, and we aim to exceed your
          expectations with every visit.
        </p>
      </div>
      <div className="image">
        <img src={introImage} alt="Mechanic working" />
      </div>
    </section>
  );
};

export default Introduction;
