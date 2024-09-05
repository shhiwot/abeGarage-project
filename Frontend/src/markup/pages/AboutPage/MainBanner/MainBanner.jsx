

import React from 'react';
import bannerImage from "../../../../assets/images/about2.png";
import './MainBanner.css';

const MainBanner = () => {
  return (
    <div
      className="main-banner"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="banner-content">
        <h1>About Us</h1>
        <nav className="breadcrumb">
          <a href="/" style={{ color: 'red' }}>Home</a> &gt; <span>About Us</span>
        </nav>
      </div>
    </div>
  );
};

export default MainBanner;
