import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo11.png";
import { logOut } from "../../../services/login.service";
import { useAuth } from "../../../Contexts/AuthContext.jsx";
// My Additional
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { Navbar, Offcanvas, Container, Nav } from "react-bootstrap";

function Header(props) {
  const { isLogged, setIsLogged, employee } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update the windowWidth state on window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if the window width is `md` or `sm`
  const isMdScreen = windowWidth >= 1280; // Bootstrap `md` breakpoint is 768px

  const handleLogout = () => {
    logOut();
    setIsLogged(false);
  };
  const linkStyle = {
    fontSize: "18px",
    fontWeight: "900",
    color: "#000",
    padding: "3px",
    opacity: "1",
  };

  console.log(employee);
  // Check if the logged-in user is an admin or manager
 const isAdmin = employee?.employee_role === 2 || employee?.employee_role === 3;

  console.log(isAdmin)

  return (
    <div>
      <header className="main-header header-style-one">
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">Quality Service, Trusted Care.</div>
                <div className="office-hour">
                  Monday - Saturday 7:00AM - 6:00PM
                </div>
              </div>
              <div className="right-column">
                {isLogged ? (
                  <div className="link-btn">
                    <div className="phone-number">
                      <strong className="mr-4">
                        Welcome {employee?.employee_first_name}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <div className="phone-number">
                    Schedule Appointment:
                    <strong className="mr-4">1800 456 7890</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {isMdScreen ? (
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container">
                <div className="logo-box">
                  <div className="logo">
                    <a href="/">
                      <img src={logo} alt="Logo" />
                    </a>
                  </div>
                </div>
                <div className="right-column">
                  <div className="nav-outer">
                    <div className="mobile-nav-toggler"></div>
                    <nav className="main-menu navbar-expand-md navbar-light">
                      <div
                        className="collapse navbar-collapse show clearfix"
                        id="navbarSupportedContent"
                      >
                        <ul className="navigation">
                          <li className="dropdown">
                            <Link to="/">Home</Link>
                          </li>
                          <li className="dropdown">
                            <Link to="/about">About Us</Link>
                          </li>
                          <li className="dropdown">
                            <Link to="/services">Services</Link>
                          </li>
                          <li>
                            <Link to="/contact">Contact Us</Link>
                          </li>
                          {isAdmin && isLogged && (
                            <li>
                              <Link to="/admin">Admin</Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </nav>
                  </div>
                  <div className="search-btn"></div>
                  {isLogged ? (
                    <div className="link-btn">
                      <Link
                        to="/"
                        className="theme-btn btn-style-one blue"
                        onClick={handleLogout}
                      >
                        Log out
                      </Link>
                    </div>
                  ) : (
                    <div className="link-btn">
                      <Link to="/login" className="theme-btn btn-style-one">
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Navbar bg="light" expand={false}>
            <Container fluid>
              <Navbar.Brand href="/">
                <img src={logo} alt="Logo" style={{ width: "150px" }} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="offcanvasNavbar" />
              <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
              >
                <Offcanvas.Body className="mt-5">
                  <Nav className="justify-content-end flex-grow-1 pe-3 pt-5">
                    <Link to="/" style={linkStyle}>
                      Home
                    </Link>
                    <Link to="/about" style={linkStyle}>
                      About Us
                    </Link>
                    <Link to="/services" style={linkStyle}>
                      Services
                    </Link>
                    <Link to="/contact" style={linkStyle}>
                      Contact Us
                    </Link>
                    {isAdmin && isLogged && (
                      <Link to="/admin" style={linkStyle}>
                        Admin
                      </Link>
                    )}
                    {isLogged ? (
                      <Nav.Link as={Link} to="/" onClick={handleLogout}>
                        Log out
                      </Nav.Link>
                    ) : (
                      <Nav.Link as={Link} to="/login">
                        Login
                      </Nav.Link>
                    )}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        )}
      </header>
    </div>
  );
}

export default Header;
