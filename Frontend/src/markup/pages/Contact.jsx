import React from "react";
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
            <div className="col-lg-7">
              <div className="sec-title style-two">
                <div className="text"></div>
              </div>

              <div className="work-img">
                <iframe
                  className="contact"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127590.063874522!2d38.65212029210835!3d9.039722089328936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85fccefe5fdf%3A0xf0673d57cf7ddf07!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1725348905074!5m2!1sen!2set"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="sec-title style-two">
                <br />
                <br />
                <h1>Our Address</h1>
                <p>
                  completely synergize resource taxing relationships via premier
                  niche markets. professionally cultivate one-to-one customer
                  service
                </p>
                <div className="col-md-12">
                  <ul className="">
                    <div className="Address">
                      <LuMapPin className="mr-3" size={30} />
                      <h3>Address:</h3>
                    </div>
                    (Addis Ababa, Ethiopia)
                    <li>
                      <span className="email">
                        <div className="Email">
                          <MdOutlineMailOutline className="mr-3" size={30} />
                          <h3>Email:</h3>
                        </div>
                      </span>
                      (mymom0937@gmail.com)
                    </li>
                    <li>
                      <span className="bi bi-envelope">
                        <div className="phone">
                          <CiPhone className="mr-3" size={35} />
                          <h3>Phone:</h3>
                        </div>
                      </span>
                      +251 937 59 79 17
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
                <a href="/contact" className="theme-btn btn-style-one">
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

