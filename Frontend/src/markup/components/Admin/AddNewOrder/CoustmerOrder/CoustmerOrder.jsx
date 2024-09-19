import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../../../Contexts/AuthContext";
import {
  getCustomerById,
  getCustomerVehicles,
  getVehicleById,
} from "../../../../../services/Order/order.service";
import { getCustomerAndVehicleInfo } from "../../../../../services/Order/Allorders.service";
import {
  deleteOrder,
  deleteVehicle,
} from "../../../../../services/Order/Allorders.service";
import { FaEdit, FaTimes, FaArrowRight } from "react-icons/fa"; // Import additional icons if needed // Import additional icons if needed // Importing pointing hand icon// Importing other icons
import { MdCheck } from "react-icons/md"; // Importing checkmark icon from Material Design
import OrderDetail from "./CoustmerOrderDetail";
import "./style.css";
import Modal from "./Modal"; // Import the Modal component
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
const styles = {
  strong: {
    fontSize: "1rem",
    color: "#000019",
    fontWeight: 600,
  },
  span: {
    color: "#858585",
  },
  h6: {
    margin: "5px 0",
  },
};

export default function VehicleDetail() {
  const { id } = useParams();
 const [Customer, setCustomer] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const { employee } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.from || "/admin/orders";

  useEffect(() => {
    async function fetchCustomer() {
      if (employee && employee.employee_token) {
        try {
          const data = await getCustomerAndVehicleInfo(
            id,
            employee.employee_token
          );
          console.log(data);
          if (data) {
            setInfo(data);
            setError(null);
          } else {
            setError("An error occurred while fetching customer data.");
            setInfo(null);
          }
        } catch (error) {
          console.error("Error fetching customer data:", error);
          setError("An unexpected error occurred.");
          setInfo(null);
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

  async function handleDelete(type) {
    setDeleteType(type);
    setShowModal(true);
  }


const handleEdit = (id) => {
  if (id === info.vehicleId){ navigate(`/admin/vehicle/edit/${id}`, {
    state: { from: location.pathname },
  });}
  if (id === info.id) {
    navigate(`/admin/customer-update/${id}`, {
      state: { from: location.pathname },
    });
  }
   
};

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!info) return <p>No customer or vehicle data available.</p>;

  return (
    <section className="vehicle-detail">
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this ${deleteType}?`}
      />
      <ToastContainer /> {/* Add this to render toast notifications */}
      <div>
        <div className="titlewrap">
          <div className="row">
            <div className="col-10 ">
              <h5 className="col-10 row">
                <FaArrowRight className="icon col-1" />
                {info.customer_first_name} {info.customer_last_name}
              </h5>
            </div>
            <div
              className={`col-4 status1 ${
                info.active_order === 0
                  ? "statusHeaderProgress"
                  : "statusHeaderCompleted"
              }`}
            >
              {info.active_order === 0 ? "Inprogress" : "completed"}
            </div>
          </div>
          <p>
            You can track the progress of your order using this page to let you
            know how your order is going. As soon as we are done with the order,
            the status will turn to green which means your car is ready to be
            picked up.
          </p>
        </div>
      </div>
      <div className="container row">
        <div className="column col-sm-12 col-6">
          <div className="info">
            <h2>
              {info.customer_first_name} {info.customer_last_name}
            </h2>
            <h6 style={styles.h6}>
              <strong style={styles.strong}>Email :</strong>
              <span style={styles.span}>{info.customer_email}</span>{" "}
            </h6>
            <h6 style={styles.h6}>
              <strong style={styles.strong}>Phone Number:</strong>
              <span style={styles.span}>{info.customer_phone_number}</span>
            </h6>
            <h6>
              <strong>Active Customer:</strong>
              <span>{info.active_customer_status ? "Yes" : "No"}</span>
            </h6>
            <h6 style={styles.h6}>
              <strong style={styles.strong}>Edit customer info:</strong>
              <FaEdit
                color="red"
                size={25}
                style={{ paddingLeft: "5px" }}
                onClick={() => handleEdit(info.id)}
              />
            </h6>
          </div>
          <div className="close-icon" onClick={() => handleDelete("customer")}>
            <FaTimes />
          </div>
        </div>
        <div className="column col-sm-12 col-6">
          <div className="info">
            <h2>Vehicle Model: {info.vehicle_model}</h2>
            <h6>Vehicle Color: {info.vehicle_color}</h6>
            <h6>Vehicle Tag: {info.vehicle_tag}</h6>
            <h6>Vehicle Year: {info.vehicle_year}</h6>
            <h6>Vehicle Mileage: {info.vehicle_mileage}</h6>
            <h6>Vehicle Serial: {info.vehicle_serial}</h6>
            <h6 style={styles.h6}>
              Edit vehicle info:
              <FaEdit
                color="red"
                size={25}
                style={{ paddingLeft: "5px" }}
                onClick={() => handleEdit(info.vehicleId)}
              />
            </h6>
          </div>
          <div className="close-icon" onClick={() => handleDelete("vehicle")}>
            <FaTimes />
          </div>
        </div>
      </div>
      <OrderDetail />
    </section>
  );
}

