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
function CustomerProfile() {
  // State to control form visibility
  const [isFormVisible, setFormVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const { createVehicle } = vehicleService;

  const [vehicleLoading, setVehicleLoading] = useState(true);
  const [vehicleError, setVehicleError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { employee } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Vehicle_year: "",
    Vehicle_make: "",
    Vehicle_model: "",
    Vehicle_type: "",
    Vehicle_mileage: "",
    Vehicle_tag: "",
    Vehicle_serial: "",
    Vehicle_color: "",
  });

  let loggedInEmployeeToken = employee?.employee_token || "";

  useEffect(() => {
    async function fetchCustomer() {
      if (employee && employee.employee_token) {
        try {
          const data = await getCustomerById(id, loggedInEmployeeToken);
          if (data) {
            setCustomer(data);
            setError(null);
            localStorage.setItem("customerId", data.id);
            localStorage.setItem("customerData", JSON.stringify(data));
          } else {
            setError("An error occurred while fetching customer data.");
            setCustomer(null);
          }
        } catch (error) {
          setError("An unexpected error occurred.");
          setCustomer(null);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Unauthorized. Please log in.");
        setLoading(false);
      }
    }

    async function fetchVehicles() {
      if (employee && employee.employee_token && customer) {
        try {
          const data = await getCustomerVehicles(
            customer.customer_id,
            loggedInEmployeeToken
          );
          if (data) {
            setVehicles(data.vehicles);
            setVehicleError(null);
          } else {
            setVehicleError("An error occurred while fetching vehicles.");
            setVehicles([]);
          }
        } catch (error) {
          setVehicleError("An unexpected error occurred.");
          setVehicles([]);
        } finally {
          setVehicleLoading(false);
        }
      }
    }
    fetchCustomer();
    fetchVehicles();
  }, [id, loggedInEmployeeToken, customer]);

  // Toggle form visibility when clicking on the heading
  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleEdit = (id) => {
    navigate(`/admin/customer-update/${id}`);
  };

  const validateForm = () => {
    const {
      Vehicle_year,
      Vehicle_make,
      Vehicle_model,
      Vehicle_type,
      Vehicle_mileage,
      Vehicle_tag,
      Vehicle_serial,
      Vehicle_color,
    } = formData;
    const newError = {};
    if (!Vehicle_year) newError.Vehicle_year = "Vehicle year is required";
    if (!Vehicle_make) newError.Vehicle_make = "Vehicle make is required";
    if (!Vehicle_model) newError.Vehicle_model = "Vehicle model is required";
    if (!Vehicle_type) newError.Vehicle_type = "Vehicle type is required";
    if (!Vehicle_mileage)
      newError.Vehicle_mileage = "Vehicle mileage is required";
    if (!Vehicle_tag) newError.Vehicle_tag = "Vehicle tag is required";
    if (!Vehicle_serial) newError.Vehicle_serial = "Vehicle serial is required";
    if (!Vehicle_color) newError.Vehicle_serial = "Vehicle color is required";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await createVehicle(
        formData,
        loggedInEmployeeToken,
      );
      console.log(response);

      if (response.error) {
        setError(response.error);
      } else {
        setSuccess("Vehicle added successfully!");
        setTimeout(() => navigate("/admin/customers"), 2000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (error) return <p>Error: {error}</p>;
  if (!customer) {
    return <p>No customer data available.</p>;
  }
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
                Customer: {customer?.customer_first_name}{" "}
                {customer.customer_last_name}
              </h4>
              <div className="customer-profile">
                <p>
                  Email: <span>{customer?.customer_email}</span>
                </p>
                <p>
                  Phone Number:<span> {customer?.customer_phone_number}</span>
                </p>
                <p>
                  Active Customer:{" "}
                  <span>{customer?.active_customer_status ? "Yes" : "No"}</span>
                </p>
                <div className="edit-link">
                  Edit customer info:
                  <a href="#edit">
                    <FaEdit
                      onClick={() => handleEdit(id)}
                      className="icon edit-icon "
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
                <div>
                  {vehicleLoading ? (
                    <p>Loading vehicles...</p>
                  ) : vehicleError ? (
                    <p>Error: {vehicleError}</p>
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
                            <td data-label="Year">{vehicle?.vehicle_year}</td>
                            <td data-label="Make">{vehicle?.vehicle_make}</td>
                            <td data-label="Model">{vehicle?.vehicle_model}</td>
                            <td data-label="Tag">{vehicle?.vehicle_tag}</td>
                            <td data-label="Color">{vehicle?.vehicle_color}</td>
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
                    name="Vehicle year"
                    value={formData.Vehicle_year}
                    onChange={(e) =>
                      setFormData({ ...formData, Vehicle_year: e.target.value })
                    }
                    placeholder="Vehicle year"
                  />
                  <input
                    type="text"
                    name="Vehicle make"
                    value={formData.Vehicle_make}
                    onChange={(e) =>
                      setFormData({ ...formData, Vehicle_make: e.target.value })
                    }
                    placeholder="Vehicle make"
                  />
                  <input
                    type="text"
                    name="Vehicle model"
                    value={formData.Vehicle_model}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Vehicle_model: e.target.value,
                      })
                    }
                    placeholder="Vehicle model"
                  />
                  <input
                    type="text"
                    name="Vehicle type"
                    value={formData.Vehicle_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Vehicle_type: e.target.value,
                      })
                    }
                    placeholder="Vehicle type"
                  />
                  <input
                    type="text"
                    name="Vehicle mileage"
                    value={formData.Vehicle_mileage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Vehicle_mileage: e.target.value,
                      })
                    }
                    placeholder="Vehicle mileage"
                  />
                  <input
                    type="text"
                    name="Vehicle tag"
                    value={formData.Vehicle_tag}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Vehicle_tag: e.target.value,
                      })
                    }
                    placeholder="Vehicle tag"
                  />
                  <input
                    type="text"
                    name="Vehicle serial"
                    value={formData.Vehicle_serial}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Vehicle_serial: e.target.value,
                      })
                    }
                    placeholder="Vehicle serial"
                  />
                  <input
                    type="text"
                    name="Vehicle color"
                    value={formData.Vehicle_color}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Vehicle_color: e.target.value,
                      })
                    }
                    placeholder="Vehicle color"
                  />
                  {success && <p className="success-message">{success}</p>}
                  {error && <p className="error-message">{error}</p>}
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
                <span>No Orders found</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
