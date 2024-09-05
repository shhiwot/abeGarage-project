import React from 'react';
import bannerImage from "../../../../assets/images/Banner2.png";

import './MainBanner.css';

const MainBannerr = () => {
  return (
    <div
      className="main-banner"
      style={{ backgroundImage: `url(${bannerImage})` }}

    >
      <div className="banner-content">
        {/* <h1>About Us</h1> */}
        <nav className="breadcrumb">
          {/* <a href="/">Home</a> &gt; <span>About Us</span> */}
        </nav>
      </div>
    </div>
  );
};

export default MainBannerr;

