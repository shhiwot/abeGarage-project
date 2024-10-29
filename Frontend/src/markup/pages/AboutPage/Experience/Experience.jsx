import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import leftImage from "../../../../assets/images/vban2.jpg";
import rightImage from "../../../../assets/images/vban1.jpg";
import "./Experience.css";

const Experience = () => {
  const navigate = useNavigate(); // Create a navigate function

  // Function to handle button click
  const handleAboutClick = () => {
    navigate("/about"); // Navigate to About Us page
  };

  return (
    <section className="experience">
      <div className="experience-images">
        <img
          src={leftImage}
          alt="Left side image"
          style={{ marginRight: "10px" }}
        />
        <img src={rightImage} alt="Right side image" />

        <div className="experience-text">
          <h2>We have 24 years experience</h2>
          <p>
            At our garage, we prioritize seamless service and customer
            satisfaction. Our team ensures a hassle-free experience by providing
            expert assessments and solutions tailored to your vehicle’s needs.
          </p>
          <p>
            With a commitment to quality, we guarantee that your car receives
            the best care possible, allowing you to drive with confidence.
          </p>
          {/* Button to navigate to About Us page */}
          <button className="about-button" onClick={handleAboutClick}>
            About Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;
