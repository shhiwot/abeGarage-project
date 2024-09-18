import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../Contexts/AuthContext";
import {
  getCustomerById,
  getCustomerVehicles,
  getVehicleById,
 
} from "../../../../../services/Order/order.service";
import { deleteVehicle} from "../../../../../services/Order/Allorders.service";
import { FaEdit, FaTimes, FaHandPointer } from "react-icons/fa"; // Importing pointing hand icon// Importing other icons
import "./style.css";
import ChooseService from "./Chooseservice/ChooseService";
import { deleteOrder } from "../../../../../services/Order/Allorders.service";
import Modal from "../CoustmerOrder/Modal"; // Import the Modal component


import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles




export default function VehicleDetail() {
  const { id } = useParams(); // Get the id from the URL params
  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [customer, setCustomer] = useState(null); // State to hold customer data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to handle errors
  const [vehicles, setVehicles] = useState(null); // State to hold vehicle data
  const { employee } = useAuth(); // Assuming this provides the auth context with a token
  const navigate = useNavigate(); // For redirecting after deletion
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    async function fetchCustomer() {
      if (employee && employee.employee_token) {
        try {
          const data = await getCustomerById(
            customerId,
            employee.employee_token
          ); // Fetch customer data
          console.log("Customer fetch response:", data); // Log response for debugging
          setCustomer(data || null);
          setError(null); // Clear any previous errors
        } catch (error) {
          console.error("Error fetching customer data:", error);
          setError("An unexpected error occurred."); // Set generic error message
        } finally {
          setLoading(false); // Update loading state
        }
      } else {
        setError("Unauthorized. Please log in.");
        setLoading(false); // Update loading state
      }
    }

    fetchCustomer();
  }, [employee, customerId]);

  useEffect(() => {
    async function fetchVehicle() {
      if (employee && employee.employee_token) {
        try {
          const vehicleData = await getVehicleById(id, employee.employee_token);
          console.log("Vehicle fetch response:", vehicleData);
          setVehicles(
            vehicleData && vehicleData.length > 0 ? vehicleData[0] : null
          );
          setError(null); // Clear any previous errors
        } catch (error) {
          console.error("Error fetching vehicle:", error);
          setError("An unexpected error occurred while fetching vehicle data.");
        } finally {
          setLoading(false); // Update loading state
        }
      }
    }

    fetchVehicle();
  }, [employee, id]);
async function handleEditVehicle(type) {
  navigate(`/admin/vehicle/edit/${id}`,{ state: { from: location.pathname} });
}
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
          setVehicles((prev) => ({ ...prev, vehicle: null }));
        }
        toast.success(
          `${
            deleteType.charAt(0).toUpperCase() + deleteType.slice(1)
          } deleted successfully.`
        );
        navigate("/admin/order", { replace: true });
      } catch (error) {
        console.error(`Error deleting ${deleteType}:`, error);
        toast.error(
          `An unexpected error occurred while deleting the ${deleteType}.`
        );
      }
    }
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
                  <h2>
                    {customer.customer_first_name} {customer.customer_last_name}
                  </h2>
                  <h6>Email: {customer.customer_email}</h6>
                  <h6>Phone Number: {customer.customer_phone_number}</h6>
                  <h6>
                    Active Customer:{" "}
                    {customer.active_customer_status ? "Yes" : "No"}
                  </h6>
                  <h6>
                    Edit customer info:
                    <FaEdit
                      onClick={() => navigate(`/admin/customer-update/${customerId}`)}
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
              <div className="content">
                <div className="info">
                  <h2>Vehicle model: {vehicles?.vehicle_model}</h2>
                  <h6>Vehicle color: {vehicles?.vehicle_color}</h6>
                  <h6>Vehicle tag: {vehicles?.vehicle_tag}</h6>
                  <h6>Vehicle year: {vehicles?.vehicle_year}</h6>
                  <h6>Vehicle mileage: {vehicles?.vehicle_mileage}</h6>
                  <h6>Vehicle serial: {vehicles?.vehicle_serial}</h6>
                  <h6>
                    Edit vehicle info:
                    <FaEdit
                      color="red"
                      size={25}
                      style={{ paddingLeft: "5px" }}
                      onClick={() => handleEditVehicle()}
                    />
                  </h6>
                </div>
                <div className="close-icon" onClick={() => handleDelete(id)}>
                  <FaTimes />
                </div>
              </div>
            </div>
          </div>
          <div className="inner-column mt-5">
            <div className="contact-form display">
              <ChooseService
                customerId={customer.customer_id}
                vehicleId={vehicles?.vehicle_id}
                employee={employee}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}