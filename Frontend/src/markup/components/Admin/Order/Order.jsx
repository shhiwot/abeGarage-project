import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import {
  getAllorder,
  getCustomerInfo,
  getVehicleInfo,
  getEmployeeInfo,
} from "../../../../services/Order/Allorders.service";
import { useAuth } from "../.../../../../../Contexts/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons from react-icons
import { format } from "date-fns"; // Import date-fns
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaExternalLinkAlt } from "react-icons/fa";
import "./Table.module.css"


const Table = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState({});
  const [vehicles, setVehicles] = useState({});
  const [employees, setEmployees] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { employee } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrdersAndDetails = async () => {
      try {
        if (employee && employee.employee_token) {
          const ordersData = await getAllorder(employee.employee_token);
          setOrders(ordersData);

          const customerIds = [
            ...new Set(ordersData.map((order) => order.customer_id)),
          ];
          const vehicleIds = [
            ...new Set(ordersData.map((order) => order.vehicle_id)),
          ];
          const orderIds = [
            ...new Set(ordersData.map((order) => order.order_id)),
          ];

          if (customerIds.length > 0) {
            const customerInfo = await getCustomerInfo(
              employee.employee_token,
              customerIds
            );
            const customerInfoMap = customerInfo.reduce((acc, info) => {
              acc[info.customer_id] = info;
              return acc;
            }, {});
            setCustomers(customerInfoMap);
          }

          if (vehicleIds.length > 0) {
            const vehicleInfo = await getVehicleInfo(
              employee.employee_token,
              vehicleIds
            );
            const vehicleInfoMap = vehicleInfo.reduce((acc, info) => {
              acc[info.vehicle_id] = info;
              return acc;
            }, {});
            setVehicles(vehicleInfoMap);
          }

          if (orderIds.length > 0) {
            const employeeInfo = await getEmployeeInfo(
              employee.employee_token,
              orderIds
            );
            const employeeInfoMap = employeeInfo.reduce((acc, info) => {
              acc[info.employee_id] = info;
              return acc;
            }, {});
            setEmployees(employeeInfoMap);
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndDetails();
  }, [employee]);

  const handleEdit = (id) => {
    navigate(`/admin/order/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/admin/order/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="contact-section" style={{ paddingTop: "0" }}>
      <div className="contact-title" style={{ marginBottom: "50px" }}>
        <h2 className="ml-5">Orders</h2>
      </div>
      {successMessage && (
        <div
          className="success-message"
          style={{ color: "green", marginBottom: "20px", fontSize: "20px" }}
        >
          {successMessage}
        </div>
      )}
      {error && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "20px" }}
        >
          Error: {error}
        </div>
      )}
      <div style={{ width: "90%", margin: "0 auto" }}>
        <table className={styles.customTable}>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Order Date</th>
              <th>Received By</th>
              <th>Order Status</th>
              <th>View/Edit</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord.order_id}>
                <td
                  data-label="Order Id"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {ord.order_id}
                </td>
                <td data-label="Customer">
                  {customers[ord.customer_id] ? (
                    <>
                      <div className="fw-bold" style={{ color: "#08194A" }}>
                        {customers[ord.customer_id].customer_first_name}{" "}
                        {customers[ord.customer_id].customer_last_name}
                      </div>
                      <div>{customers[ord.customer_id].customer_email}</div>
                      <div>
                        {customers[ord.customer_id].customer_phone_number}
                      </div>
                    </>
                  ) : (
                    "Loading..."
                  )}
                </td>
                <td data-label="Vehicle">
                  {vehicles[ord.vehicle_id] ? (
                    <>
                      <div className="fw-bold" style={{ color: "#08194A" }}>
                        {vehicles[ord.vehicle_id].vehicle_model}
                      </div>
                      <div>{vehicles[ord.vehicle_id].vehicle_year}</div>
                      <div>{vehicles[ord.vehicle_id].vehicle_tag}</div>
                    </>
                  ) : (
                    "Loading..."
                  )}
                </td>
                <td data-label="Order Date">
                  {format(new Date(ord.order_date), "M-d-yyyy")}
                </td>
                <td data-label="Received By">
                  {employees[ord.employee_id]
                    ? `${employees[ord.employee_id]?.employee_first_name} ${
                        employees[ord.employee_id].employee_last_name
                      }`
                    : "Loading..."}
                </td>
                <td
                  data-label="Order Status"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <span
                    className={
                      ord.order_completed === 0
                        ? styles.statusInProgress
                        : styles.statusCompleted
                    }
                  >
                    {ord.order_completed === 0 ? "In Progress" : "Completed"}
                  </span>
                </td>
                <td data-label="Actions">
                  <FaExternalLinkAlt
                    onClick={() => handleView(ord.id)}
                    className={`${styles.viewButton} ml-4`}
                    color="#06175B"
                    size={18}
                  />
                  <FaEdit
                    className={`${styles.editButton} ml-2`}
                    onClick={() => handleEdit(ord.id)}
                    color="#06175B"
                    size={20}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;













