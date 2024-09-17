import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../../../Contexts/AuthContext";
import {
  getCustomerById,
  getCustomerVehicles,
} from "../../../../../services/Order/order.service";
import {
  deleteOrder,
  deleteVehicle,
} from "../../../../../services/Order/Allorders.service";
import { FaEdit, FaTimes, FaHandPointer } from "react-icons/fa"; // Importing pointing hand icon// Importing other icons
import Modal from "../CoustmerOrder/Modal"; // Import the Modal component


import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

import "./style.css";

function CustomerProfile() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [vehicleLoading, setVehicleLoading] = useState(true);
  const [vehicleError, setVehicleError] = useState(null);
  const { employee } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCustomer() {
      if (employee && employee.employee_token) {
        try {
          const data = await getCustomerById(id, employee.employee_token);
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

    fetchCustomer();
  }, [id, employee]);

  const location = useLocation(); // Get the current location

  // Track the previous path from the location state
  const previousPath = location.state?.from || "/admin/orders"; 

  useEffect(() => {
    async function fetchVehicles() {
      if (employee && employee.employee_token && customer) {
        try {
          const data = await getCustomerVehicles(
            customer.customer_id,
            employee.employee_token
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

    fetchVehicles();
  }, [employee, customer]);


   async function handleDelete(type) {
     setDeleteType(type);
     setShowModal(true);
   }

   async function confirmDelete() {
     setShowModal(false);
     if (employee && employee.employee_token) {
       try {
         await deleteOrder(employee.employee_token, id);
         if (deleteType === "customer") {
           setCustomer(null);
         } else {
           await deleteVehicle(employee.employee_token, id);
           setInfo((prev) => ({ ...prev, vehicle: null }));
         }
         toast.success(
           `${
             deleteType.charAt(0).toUpperCase() + deleteType.slice(1)
           } deleted successfully.`
         );
         navigate(previousPath, { replace: true });
       } catch (error) {
         console.error(`Error deleting ${deleteType}:`, error);
         toast.error(
           `An unexpected error occurred while deleting the ${deleteType}.`
         );
       }
     }
   }

  function handleVehicleSelect(vehicleId) {
    navigate(`/admin/customer/vehicle/${vehicleId}`);
    localStorage.setItem("selectedVehicleId", vehicleId);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!customer) {
    return <p>No customer data available.</p>;
  }

  return (
    <section className="contact-section">
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this ${deleteType}?`}
      />
      <ToastContainer />
      <div className="auto-container">
        <div className="contact-title">
          <h2>Create a new order</h2>
        </div>
        <div className="form-column col-lg-7">
          <div className="inner-column">
            <div className="contact-form display">
              <div className="content">
                <div className="info">
                  <h2 className="bold-on-hover">
                    {customer.customer_first_name} {customer.customer_last_name}
                  </h2>
                  <h6 className="bold-on-hover">
                    Email: {customer.customer_email}
                  </h6>
                  <h6 className="bold-on-hover">
                    Phone Number: {customer.customer_phone_number}
                  </h6>
                  <h6 className="bold-on-hover">
                    Active Customer:{" "}
                    {customer.active_customer_status ? "Yes" : "No"}
                  </h6>
                  <h6 className="bold-on-hover">
                    Edit customer info:
                    <FaEdit
                      onClick={() => navigate(`/admin/customer-update/${id}`)}
                      color="red"
                      size={25}
                      style={{ paddingLeft: "5px" }}
                    />
                  </h6>
                </div>
                <div
                  className="close-icon"
                  onClick={() => handleDelete("customer")}
                >
                  <FaTimes />
                </div>
              </div>
            </div>
          </div>

          <div className="inner-column mt-5">
            <div className="contact-form display">
              <div>
                <h5 className="bold-on-hover">Choose a Vehicle</h5>
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
                          <td data-label="Year">{vehicle.vehicle_year}</td>
                          <td data-label="Make">{vehicle.vehicle_make}</td>
                          <td data-label="Model">{vehicle.vehicle_model}</td>
                          <td data-label="Tag">{vehicle.vehicle_tag}</td>
                          <td data-label="Color">{vehicle.vehicle_color}</td>
                          <td data-label="Choose">
                            <button
                              className="select-icon-button"
                              onClick={() => handleVehicleSelect(vehicle.id)}
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerProfile;

