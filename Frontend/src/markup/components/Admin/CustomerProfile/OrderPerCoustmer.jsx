import React, { useState, useEffect } from "react";
import { getOrdersPerCustomer } from "../../../../services/Order/Allorders.service";
import "./customerProfile.css"




export default function OrderPerCustomer({
  customerId,
  loggedInEmployeeToken,
 
}) {
  const [orders, setOrders] = useState([]); // Ensure orders is initialized as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersPerCustomer(
          customerId,
          loggedInEmployeeToken
        );

        if (!Array.isArray(data)) {
          setError("No orders found for this customer.");
          setOrders([]); // Ensure orders is always an array
        } else {
          setOrders(data);
          setError(null); // Clear previous errors if data is valid
        }
      } catch (error) {
        setError("An error occurred while fetching orders.");
        console.error("Fetch orders error:", error); // Log the actual error for debugging
      } finally {
        setLoading(false);
      }
    };

    if (customerId && loggedInEmployeeToken) {
      fetchOrders();
    }
  }, [customerId, loggedInEmployeeToken]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found</p>;
  }

  return (
    <div className="inner-column mt-5">
      <div className="order_list">
        <table className="dropdown-table">
          <thead>
            <tr>
              <th
                className="bold-on-hover"
                style={{ textAlign: "center"}}
              >
                Order ID
              </th>
              <th className="bold-on-hover">Total Price</th>
              <th
                className="bold-on-hover"
              >
                Status
              </th>
              <th className="bold-on-hover">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.order_id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td
                  data-label="Order ID"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  {order.order_id}
                </td>
                <td data-label="Total Price">${order.order_total_price}</td>
                <td
                  data-label="Status"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <p
                    style={{
                      backgroundColor:
                        order.order_status === "Completed"
                          ? "green"
                          : "#FFC108",
                      color:
                        order.order_status === "Completed" ? "white" : "black",
                      padding: "4px",
                      fontSize: "clamp(7px,1.2vw,12px)",
                      borderRadius: "12px",
                      width: "70%",
                    }}
                  >
                    {order.order_status === "Completed"
                      ? "Completed"
                      : "In Progress"}
                  </p>
                </td>
                <td data-label="Order Date">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
