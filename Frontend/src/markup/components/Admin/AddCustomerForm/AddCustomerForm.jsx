import React, { useState } from "react";
// Importing customerService to handle API calls related to customer data
import customerService from "../../../../services/customer.service";
// Importing BeatLoader from the react-spinners package to show a loading spinner during asynchronous operations
import { BeatLoader } from "react-spinners";
// Importing the useAuth hook from the AuthContext to access the current authenticated employee's information
import { useAuth } from "../../../../Contexts/AuthContext.jsx";
// Importing the crypto module to generate random id
import CryptoJS from "crypto-js";
import "./AddCustomerFormCss.css";
function AddCustomerForm() {
  // useStates
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState("");
  const [active_customer_status, setActive_customer] = useState(1);
  const [serverMsg, setServerMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [spin, setSpinner] = useState(false);

  // Get the logged-in employee token from the auth context
  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Email validation
    if (!customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    if (!valid) return;
    // Hashing with SHA256
    const customer_hash = CryptoJS.SHA256(customer_email).toString();
    // Prepare the data for form submission
    const formData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
      customer_hash,
    };

    // Call the customer service to create a new customer
    customerService
      .createCustomer(formData, loggedInEmployeeToken)
      .then((response) => response)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setServerMsg(data.error);
        } else {
          setServerMsg("Customer added successfully!");
          setSpinner(true);

          // Redirect to the homepage after 2 seconds
          setTimeout(() => {
            setSpinner(false);
            setServerMsg("");
            window.location.href = "/";
          }, 2000);
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerMsg(resMessage);
      });
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a New Customer</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    {/* Email */}
                    <div className="form-group col-12">
                      <input
                        type="email"
                        name="employee_email"
                        placeholder="Customer email"
                        value={customer_email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        // style={{ width: "77%" }}
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>

                    {/* First Name */}
                    <div className="form-group col-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        placeholder="Customer first name"
                        value={customer_first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        // style={{ width: "77%" }}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="form-group col-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        placeholder="Customer last name"
                        value={customer_last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        // style={{ width: "77%" }}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="form-group col-12">
                      <input
                        type="text"
                        name="employee_phone"
                        placeholder="Customer phone (555-555-5555)"
                        value={customer_phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        // style={{ width: "77%" }}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="form-group col-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                        // style={{ width: "65%" }}
                        style={{ width: "65%", height: "65%" }}
                      >
                        <span>
                          {spin ? (
                            <BeatLoader color="white" size={8} />
                          ) : (
                            "Add Customer"
                          )}
                        </span>
                      </button>
                      {serverMsg && (
                        <div
                          className="validation-error"
                          style={{
                            color: "green",
                            fontSize: "100%",
                            fontWeight: "600",
                            padding: "25px",
                          }}
                          role="alert"
                        >
                          {serverMsg}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCustomerForm;
