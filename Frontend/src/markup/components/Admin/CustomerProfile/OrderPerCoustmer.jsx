import React, { useState, useEffect } from "react";
import { getOrdersPerCustomer } from "../../../../services/Order/Allorders.service";



export default function OrderPerCustomer({ customerId, loggedInEmployeeToken }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersPerCustomer(customerId, loggedInEmployeeToken);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error);
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
    return <p>Error: {error.message}</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found</p>;
  }

  return (
    <div>
      <h2>Orders for Customer {customerId}</h2>
      <ul>
        {orders.map((order) => (
          <li key={order?.order_id}>
            Order ID: {order?.order_id}
            <br />
            Total Price: ${order?.order_total_price}
            <br />
            Status: {order?.order_status}
            <br />
            Order Date: {new Date(order?.order_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
