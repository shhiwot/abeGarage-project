import React from 'react';
import carImg4 from "../../../../assets/images/carImg4.png";
import './AdditionalServices.css';

const AdditionalServices = () => {
  return (
    <div className="additional-services-container">
      <h2 className="title-container">
       Additional Services <span className="title-line"></span>
      </h2>
      <div className="content-container">
        <div className="image-container">
          <img src={carImg4} alt="Additional Services" />
        </div>
        <div className="services-list-container">
          <ul className="services-list">
            
            <li><span className="service-icon" style={{ color: 'red' }}>✔️</span>General Auto Repair & Maintenance</li>
            <li><span className="service-icon">✔️</span>Transmission Repair & Replacement</li>
            <li><span className="service-icon">✔️</span>Tire Repair and Replacement</li>
            <li><span className="service-icon">✔️</span>State Emissions Inspection</li>
            <li><span className="service-icon">✔️</span>Break Job / Brake Services</li>
            <li><span className="service-icon">✔️</span>Electrical Diagnostics</li>
            <li><span className="service-icon">✔️</span>Fuel System Repairs</li>
            <li><span className="service-icon">✔️</span>Starting and Charging Repair</li>
            <li><span className="service-icon">✔️</span>Steering and Suspension Work</li>
            <li><span className="service-icon">✔️</span>Emission Repair Facility</li>
            <li><span className="service-icon">✔️</span>Wheel Alignment</li>
            <li><span className="service-icon">✔️</span>Computer Diagnostic Testing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdditionalServices;
