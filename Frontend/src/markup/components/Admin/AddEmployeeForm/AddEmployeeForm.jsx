import React, { useState } from "react";
// import employee.service.js
import employeeService from "../../../../services/employee.service";
// Import the useAuth hook
import { useAuth } from "../../../../Contexts/AuthContext.jsx";
import "./addEmployee.css";
// Additional feature
import { FaEye, FaEyeSlash } from "react-icons/fa";



function AddEmployeeForm(props) {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };

    employeeService
      .createEmployee(formData, loggedInEmployeeToken)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess("Employee added successfully!");
          setServerError("");
          setTimeout(() => {
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
        setServerError(resMessage);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      {success && (
                        <div className="success-message" role="alert">
                          {success}
                        </div>
                      )}
                      <input
                        type="email"
                        name="employee_email"
                        value={employee_email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Employee email"
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        value={employee_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="Employee first name"
                      />
                      {firstNameRequired && (
                        <div className="validation-error" role="alert">
                          {firstNameRequired}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        value={employee_last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Employee last name"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        value={employee_phone}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        placeholder="Employee phone (555-555-5555)"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        value={company_role_id}
                        onChange={(event) =>
                          setCompany_role_id(event.target.value)
                        }
                        className="custom-select-box"
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12">
                      <div className="password-container">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="employee_password"
                          value={employee_password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Employee password"
                          className="password-input"
                        />
                        <span
                          className="password-toggle-icon"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                      {passwordError && (
                        <div className="validation-error" role="alert">
                          {passwordError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                        style={{ width: "77%" }}
                      >
                        <span>Add employee</span>
                      </button>
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

export default AddEmployeeForm;
