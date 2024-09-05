import React from 'react';
import introImage from "../../../../assets/images/frt.png";
import './Introduction.css';

const Introduction = () => {
  return (
    <section className="introduction">
      <div className="content">
        <h2>We are highly skilled mechanics for your car repair</h2>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ac faucibus urna. Aliquam erat volutpat.
        </p>
        <p>
        Phasellus tincidunt enim ut risus bibendum, non pretium risus aliquet. Integer tincidunt convallis neque, ac scelerisque lacus vulputate et. Nulla facilisi. Duis dictum magna sit amet sapien malesuada, non dignissim nunc vestibulum.
        </p>

      </div>
      <div className="image">
      <img src={introImage} alt="Mechanic working" />
      </div>
    </section>
  );
};

export default Introduction;
