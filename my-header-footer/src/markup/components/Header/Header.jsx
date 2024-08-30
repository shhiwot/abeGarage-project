import React from 'react';
// Import the logo image 
import logo from '../../../assets/images/eee.jpg';
import "./Header.css"

function Header(props) {
  return (
    <div>
      <header class="main-header header-style-one">
        <div class="header-top">
          <div class="auto-container">
            <div class="inner-container">
              <div class="left-column">
                <div class="text">Your Car's Health, Our Priority</div>
                <div class="office-hour">Monday - Saturday 7:00AM - 6:00PM</div>
              </div>
              <div class="right-column">
                <div class="phone-number">Schedule Your Appointment Today : <strong>1800 456 7890</strong>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="header-upper">
          <div class="auto-container">
            <div class="inner-container">
              <div class="logo-box">
                <div class="logo"><a href="/"><img src={logo} alt="" /></a>
                </div>
              </div>
              <div class="right-column">
                <div class="nav-outer">
                  <div class="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt="" />
                  </div>
                  <nav class="main-menu navbar-expand-md navbar-light">
                    <div class="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                      <ul class="navigation">
                        <li class="dropdown"><a href="/">Home</a>
                        </li>
                        <li class="dropdown"><a href="/about">About Us</a>
                        </li>
                        <li class="dropdown"><a href="/services">Services</a>
                        </li>
                        <li><a href="/contact">Contact Us</a></li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div class="search-btn"></div>
                <div class="link-btn"><a href="/login" class="theme-btn btn-style-one">Login</a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="sticky-header">
          <div class="header-upper">
            <div class="auto-container">
              <div class="inner-container">
                <div class="logo-box">
                  <div class="logo"><a href="/"><img src="assets/images/custom/logo.png" alt="" /></a>
                  </div>
                </div>
                <div class="right-column">
                  <div class="nav-outer">
                    <div class="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt="" />
                    </div>

                    <nav class="main-menu navbar-expand-md navbar-light">
                    </nav>
                  </div>
                  <div class="search-btn"></div>
                  <div class="link-btn"><a href="/login" class="theme-btn btn-style-one">Login</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mobile-menu">
          <div class="menu-backdrop"></div>
          <div class="close-btn"><span class="icon flaticon-remove"></span></div>

          <nav class="menu-box">
            <div class="nav-logo"><a href="index.html">
              <img src="assets/images/logo-two.png" alt=""
                title="" /></a></div>
            <div class="menu-outer">

            </div>

          </nav>
        </div>

        <div class="nav-overlay">
          <div class="cursor"></div>
          <div class="cursor-follower"></div>
        </div>
      </header>
    </div>
  );
}

export default Header;





// import React from 'react';
// // Import the Link component from react-router-dom 
// // import { Link } from 'react-router-dom'
// // Import the logo image 
// import logo from '../../../assets/images/eee.jpg';
// // import logo from '../../../assets/images/custom/logo.png';
// // Import the login service to access the logout function
// // import loginService from '../../../services/login.service';
// // Import the custom context hook 
// // import { useAuth } from '../../../context/AuthContext';
// import "./Header.css"


// function Header(props) {
//   // Use the custom hook to access the data in the context 
//   const { isLogged, setIsLogged, employee } = useAuth();
//   // console.log(useAuth());

//   // Log out event handler function
//   const logOut = () => {
//     // Call the logout function from the login service 
//     loginService.logOut();
//     // Set the isLogged state to false 
//     setIsLogged(false);
//   }

//   return (
//     <div>
//       <header className="main-header header-style-one">
//         <div className="header-top">
//           <div className="auto-container">
//             <div className="inner-container">
//               <div className="left-column">
//                 <div className="text">
//                   Maximize your time while we manage your car maintenance.
//                 </div>
//                 <div className="office-hour">
//                   Monday - Saturday 7:00AM - 6:00PM
//                 </div>
//               </div>
//               <div className="right-column">
//                 {isLogged ? (
//                   <div className="link-btn">
//                     <div className="phone-number">
//                       <strong>Welcome {employee?.employee_first_name}</strong>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="phone-number">
//                     Schedule Appointment:
//                     <strong className="mr-4">1800 456 7890 </strong>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="header-upper">
//           <div className="auto-container">
//             <div className="inner-container">
//               <div className="logo-box">
//                 <div className="logo">
//                   <a href="/">
//                     <img src={logo} alt="" />
//                   </a>
//                 </div>
//               </div>
//               <div className="right-column">
//                 <div className="nav-outer">
//                   <div className="mobile-nav-toggler">
//                     <img src="assets/images/icons/icon-bar.png" alt="" />
//                   </div>
//                   <nav className="main-menu navbar-expand-md navbar-light">
//                     <div
//                       className="collapse navbar-collapse show clearfix"
//                       id="navbarSupportedContent"
//                     >
//                       <ul className="navigation">
//                         <li className="dropdown">
//                           <a href="/">HOME</a>
//                         </li>
//                         <li className="dropdown">
//                           <a href="/about">ABOUT US</a>
//                         </li>
//                         <li className="dropdown">
//                           <a href="/services">SERVICES</a>
//                         </li>
//                         <li>
//                           <a href="/contact">CONTACT US</a>
//                         </li>
//                         <li>
//                           <a href="/admin">ADMIN</a>
//                         </li>
//                       </ul>
//                     </div>
//                   </nav>
//                 </div>
//                 <div className="search-btn"></div>
//                 {isLogged ? (
//                   <div className="link-btn">
//                     <Link
//                       to="/"
//                       className="theme-btn btn-style-one blue"
//                       onClick={logOut}
//                     >
//                       Log out
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="link-btn">
//                     <Link to="/login" className="theme-btn btn-style-one">
//                       Login
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="sticky-header">
//           <div className="header-upper">
//             <div className="auto-container">
//               <div className="inner-container">
//                 <div className="logo-box">
//                   <div className="logo">
//                     <a href="/">
//                       <img src="assets/images/custom/logo.png" alt="" />
//                     </a>
//                   </div>
//                 </div>
//                 <div className="right-column">
//                   <div className="nav-outer">
//                     <div className="mobile-nav-toggler">
//                       <img src="assets/images/icons/icon-bar.png" alt="" />
//                     </div>

//                     <nav className="main-menu navbar-expand-md navbar-light"></nav>
//                   </div>
//                   <div className="search-btn"></div>
//                   <div className="link-btn">
//                     <a href="/login" className="theme-btn btn-style-one">
//                       Login
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mobile-menu">
//           <div className="menu-backdrop"></div>
//           <div className="close-btn">
//             <span className="icon flaticon-remove"></span>
//           </div>

//           <nav className="menu-box">
//             <div className="nav-logo">
//               <a href="index.html">
//                 <img src="assets/images/logo-two.png" alt="" title="" />
//               </a>
//             </div>
//             <div className="menu-outer"></div>
//           </nav>
//         </div>

//         <div className="nav-overlay">
//           <div className="cursor"></div>
//           <div className="cursor-follower"></div>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Header;