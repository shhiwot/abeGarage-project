import React from "react";
// import EmailIcon from "@mui/icons-material/Email";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { CiPhone } from "react-icons/ci";
function Contact() {
  return (
    <>
      <section>
        <div data-parallax='{"y": 50}' className="sec-bg1"></div>
      </section>

      <section className="why-choose-us">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <div className="text"></div>
              </div>

              <div className="work-img">
                <iframe
                  className="contact"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12757.42343889299!2d174.88380914777218!3d-36.929662702548335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d4b80ba5515b5%3A0x10c0cba902602964!2sAutoserv!5e0!3m2!1sen!2set!4v1725348905074!5m2!1sen!2set"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sec-title style-two">
                <br />
                <br />
                <h1>Our Address</h1>
                <p>
                  completely synergize resource taxing relationships via premier
                  niche markets. professionally cultivate one-to-one customer
                  servise
                </p>
                <div className="col-md-7">
                  <ul className="">
                    
                    
                        <div className="Address">
                          <LuMapPin className="mr-3" size={30} />
                          <h3>Address:</h3>
                        </div>
                      
                      (54b, Tailstoi Town 5238 MT la city, IA 52224)
                  
                    <li>
                      <span class="email">
                        <div className="Email">
                          <MdOutlineMailOutline className="mr-3" size={30} />
                          <h3> Email:</h3>
                        </div>
                      </span>
                      (contact@buildtruck.com)
                    </li>
                    <li>
                      <span class="bi bi-envelope">
                        <div className="phone">
                          <CiPhone className="mr-3" size={35} />
                          <h3>phone:</h3>
                        </div>
                      </span>
                      1800 456 7890/1254 89703654
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className="image4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="auto-container">
          <div className="wrapper-box">
            <div className="left-column">
              <h3>Schedule Your Appointment Today</h3>
              <div className="text">
                Your Automotive Repair & Maintenance Service Specialist
              </div>
            </div>
            <div className="right-column">
              <div className="phone">1800.456.7890</div>
              <div className="btn">
                <a href="#" className="theme-btn btn-style-one">
                  <span>Contact us</span>
                  <i className="flaticon-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
