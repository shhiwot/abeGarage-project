import React from "react";
import bannerImage from "../../../../assets/images/about2.png";
import "./MainBanner.css";
import { MdPadding } from "react-icons/md";

const MainBanner = () => {
  return (
    <div
      className="main-banner"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="banner-content">
        <h1>About Us</h1>
        <nav className="breadcrumb">
          <a href="/" style={{ color: "red" }}>
            Home
          </a>{" "}
          &gt; {/* This is the first right arrow */}
          <a href="/about" style={{ color: "white" }}>
            About Us
          </a>{" "}
          {/* Made About Us clickable */}
        </nav>
      </div>
    </div>
  );
};

export default MainBanner;


