import React, { useEffect, useState } from "react";
import "./CustomerProfile.css"; // Main styles
import { FaEdit, FaHandPointer } from "react-icons/fa";
import AdminMenu from "../../Admin/AdminMenu/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCustomerById,
  getCustomerVehicles,
} from "../../../../services/Order/order.service";
import vehicleService from "../../../../services/vehicle.service";

import { useAuth } from "../../../../Contexts/AuthContext";
import OrderPerCustomer from "./OrderPerCoustmer";

function CustomerProfile() {
  const [isFormVisible, setFormVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleLoading, setVehicleLoading] = useState(true);
  const [vehicleError, setVehicleError] = useState(null);
  const [formData, setFormData] = useState({
    customer_id: "",
    vehicle_year: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_serial: "",
    vehicle_color: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  useEffect(() => {
    async function fetchCustomer() {
      if (employee && employee.employee_token) {
        try {
          const data = await getCustomerById(id, loggedInEmployeeToken);

          if (data) {
            setCustomer(data);
            setFormData((prevFormData) => ({
              ...prevFormData,
              customer_id: data.customer_id,
            }));
            localStorage.setItem("customerId", data.id);
            localStorage.setItem("customerData", JSON.stringify(data));
          } else {
            setError("An error occurred while fetching customer data.");
          }
        } catch (error) {
          setError("An unexpected error occurred.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Unauthorized. Please log in.");
        setLoading(false);
      }
      console.log(formData.customer_id);
    }

    fetchCustomer();
  }, [id, loggedInEmployeeToken]);

  useEffect(() => {
    async function fetchVehicles() {
      console.log(customer.customer_id, loggedInEmployeeToken);
      if (employee && employee.employee_token && customer) {
        try {
          const data = await getCustomerVehicles(
            formData.customer_id,
            loggedInEmployeeToken
          );
          console.log(data);
          if (data) {
            setVehicles(data.vehicles || []);
          } else {
            setVehicleError("An error occurred while fetching vehicles.");
          }
        } catch (error) {
          setVehicleError("An unexpected error occurred.");
        } finally {
          setVehicleLoading(false);
        }
      }
    }

    fetchVehicles();
  }, [employee, customer, loggedInEmployeeToken]);

  const toggleForm = () => setFormVisible(!isFormVisible);

  const handleEdit = (id) => navigate(`/admin/customer-update/${id}`);

  // const validateForm = () => {
  //   const newError = {};
  //   Object.keys(formData).forEach((key) => {
  //     if (!formData[key]) {
  //       newError[key] = `${key.replace(/_/g, " ")} is required`;
  //     }
  //   });
  //   setError(newError);
  //   return Object.keys(newError).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    const requiredFields = [
      "vehicle_year",
      "vehicle_make",
      "vehicle_model",
      "vehicle_type",
      "vehicle_mileage",
      "vehicle_tag",
      "vehicle_serial",
      "vehicle_color",
    ];
    const isValid = requiredFields.every(
      (field) => formData[field] && formData[field].trim() !== ""
    );

    if (!isValid) {
      setError("Please provide valid data for all fields.");
      return;
    }

    // Check if year, mileage, and serial are numbers
    if (
      isNaN(formData.vehicle_year) ||
      isNaN(formData.vehicle_mileage) ||
      isNaN(formData.vehicle_serial)
    ) {
      setError(
        "Please enter valid numbers for year, mileage, and serial number."
      );
      return;
    }

    // Check if model, color, and type are strings
    if (
      typeof formData.vehicle_model !== "string" ||
      typeof formData.vehicle_color !== "string" ||
      typeof formData.vehicle_type !== "string"
    ) {
      setError("Please enter valid data for model, color, and type.");
      return;
    }

    try {
      const response = await vehicleService.createVehicle(
        formData,
        loggedInEmployeeToken
      );
      if (response) {
        setSuccess("Vehicle added successfully!");
        setTimeout(() => {
          setSuccess(null); // Clear success message
          navigate(`/admin/customers`);
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!customer) return <p>No customer data available.</p>;

  return (
    <div className="container-fluid dashboard-container">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 services-right-side main-content">
          <div className="app-containers">
            <div className="sidebar sidebar-with-line">
              <div className="sidebar-item">Info</div>
            </div>
            <div className="main-content">
              <h4>
                Customer: {customer.customer_first_name}{" "}
                {customer.customer_last_name}
              </h4>
              <div className="customer-profile">
                <p>
                  Email: <span>{customer.customer_email}</span>
                </p>
                <p>
                  Phone Number: <span>{customer.customer_phone_number}</span>
                </p>
                <p>
                  Active Customer:{" "}
                  <span>{customer.active_customer_status ? "Yes" : "No"}</span>
                </p>
                <div className="edit-link">
                  Edit customer info:
                  <a href="#edit">
                    <FaEdit
                      onClick={() => handleEdit(id)}
                      className="icon edit-icon"
                      size={18}
                      style={{ color: "red", marginLeft: "4px" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="app-containers">
            <div className="sidebar sidebar-with-line">
              <div className="sidebar-item">Cars</div>
            </div>
            <div className="main-content">
              <h4>Vehicles of {customer.customer_first_name}</h4>
              <div className="customer-profile">
                {vehicleLoading ? (
                  <p>Loading vehicles...</p>
                ) : error ? (
                  <p className="error-message">{error}</p>
                ) : vehicles.length > 0 ? (
                  <table className="dropdown-table">
                    <thead>
                      <tr>
                        <th className="bold-on-hover">Year</th>
                        <th className="bold-on-hover">Make</th>
                        <th className="bold-on-hover">Model</th>
                        <th className="bold-on-hover">Tag</th>
                        <th className="bold-on-hover">Color</th>
                        <th className="bold-on-hover">Choose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle, index) => (
                        <tr
                          key={vehicle.vehicle_id}
                          className={index % 2 === 0 ? "even-row" : "odd-row"}
                        >
                          <td data-label="Year">{vehicle.vehicle_year}</td>
                          <td data-label="Make">{vehicle.vehicle_make}</td>
                          <td data-label="Model">{vehicle.vehicle_model}</td>
                          <td data-label="Tag">{vehicle.vehicle_tag}</td>
                          <td data-label="Color">{vehicle.vehicle_color}</td>
                          <td data-label="Choose">
                            <button
                              className="select-icon-button"
                              onClick={() =>
                                handleVehicleSelect(vehicle.vehicle_id)
                              }
                            >
                              <FaHandPointer />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No vehicles found.</p>
                )}
              </div>
              <h4
                className="mt-3"
                onClick={toggleForm}
                style={{ cursor: "pointer" }}
              >
                Add a new vehicle{" "}
                <span className="close-btn">{isFormVisible ? "✖" : "➕"}</span>
              </h4>
              {isFormVisible && (
                <form className="vehicle-form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="vehicle_year"
                    value={formData.vehicle_year}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicle_year: e.target.value })
                    }
                    placeholder="Vehicle year"
                  />
                  <input
                    type="text"
                    name="vehicle_make"
                    value={formData.vehicle_make}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicle_make: e.target.value })
                    }
                    placeholder="Vehicle make"
                  />
                  <input
                    type="text"
                    name="vehicle_model"
                    value={formData.vehicle_model}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vehicle_model: e.target.value,
                      })
                    }
                    placeholder="Vehicle model"
                  />
                  <input
                    type="text"
                    name="vehicle_type"
                    value={formData.vehicle_type}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicle_type: e.target.value })
                    }
                    placeholder="Vehicle type"
                  />
                  <input
                    type="text"
                    name="vehicle_mileage"
                    value={formData.vehicle_mileage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vehicle_mileage: e.target.value,
                      })
                    }
                    placeholder="Vehicle mileage"
                  />
                  <input
                    type="text"
                    name="vehicle_tag"
                    value={formData.vehicle_tag}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicle_tag: e.target.value })
                    }
                    placeholder="Vehicle tag"
                  />
                  <input
                    type="text"
                    name="vehicle_serial"
                    value={formData.vehicle_serial}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vehicle_serial: e.target.value,
                      })
                    }
                    placeholder="Vehicle serial"
                  />
                  <input
                    type="text"
                    name="vehicle_color"
                    value={formData.vehicle_color}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vehicle_color: e.target.value,
                      })
                    }
                    placeholder="Vehicle color"
                  />
                  {success && <p className="success-message">{success}</p>}

                  <button type="submit" className="mt-3">
                    ADD VEHICLE
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="app-containers">
            <div className="sidebar sidebar-with-line2">
              <div className="sidebar-item">Orders</div>
            </div>
            <div className="main-content">
              <h4>Orders of {customer.customer_first_name}</h4>
              <div className="orders-section">
                <span>
                  <OrderPerCustomer
                    customerId={formData.customer_id}
                    loggedInEmployeeToken={loggedInEmployeeToken}
                    customer_first_name={customer.customer_first_name}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
