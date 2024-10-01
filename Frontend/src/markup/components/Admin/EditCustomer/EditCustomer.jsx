import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customerService from "../../../../services/customer.service.js";
import { useAuth } from "../../../../Contexts/AuthContext.jsx";
import { BeatLoader } from "react-spinners";
import "./EditCustomer.css";

function EditCustomer() {
  const { id } = useParams(); // Get customer id from the URL params
  const { employee } = useAuth(); // Get authenticated employee token
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    customer_id: "",
    customer_email: "", // Added customer email
    active_customer_status: false, // Default to false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [spin, setSpinner] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  // create a variable to hold the user's token
  let loggedInEmployeeToken = "";

  // Destructure the auth hook and get the token
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // Fetch customer data
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        if (employee && employee.employee_token) {
          const result = await customerService.getCustomerById(
            id,
            loggedInEmployeeToken
          );
          const customerData = result;

          setFormData({
            customer_id: customerData.customer_id,
            customer_first_name: customerData.customer_first_name || "",
            customer_last_name: customerData.customer_last_name || "",
            customer_phone_number: customerData.customer_phone_number || "",
            customer_email: customerData.customer_email || "",
            active_customer_status:
              customerData.active_customer_status !== undefined
                ? customerData.active_customer_status
                : false,
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [id, employee, loggedInEmployeeToken]);

  // Handle input change (for both text and checkbox)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employee && employee.employee_token) {
        setSpinner(true);
        const result = await customerService.updateCustomer(
          formData,
          employee.employee_token,
          id
        );
        if (result) {
          setServerMsg("Customer updated successfully");
          setTimeout(() => {
            setSpinner(false);
            navigate("/admin/customers");
          }, 500);
        } else {
          throw new Error("Failed to update customer data");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSpinner(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit: {formData.customer_first_name} {formData.customer_last_name}
          </h2>
          <h5>Customer email: {formData.customer_email}</h5>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    {/* First Name */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        placeholder="Customer first name"
                        value={formData.customer_first_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Last Name */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_last_name"
                        placeholder="Customer last name"
                        value={formData.customer_last_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone_number"
                        placeholder="Customer phone (555-555-5555)"
                        value={formData.customer_phone_number}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Active Customer */}
                    <div className="form-group col-md-12">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="active_customer_status" // Update to match the state variable
                          checked={formData.active_customer_status}
                          onChange={handleChange}
                        />
                        is active customer
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group col-md-12">
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
                            "Update Customer"
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

export default EditCustomer;
