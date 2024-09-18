import React from 'react';
import './CallToAction.css';

import { Link } from "react-router-dom";
const CallToAction = () => {
  return (
    <section className="call-to-action">
      <h2>Schedule Your Appointment Today</h2>
      <p>1-800-456-7890</p>
      <Link to="/contact">
  <button className="cta-button">Contact Us</button>
</Link>
    </section>
  );
};

export default CallToAction;
