//import connection
const conn = require("../config/db.config");
//const { getConnection } = require('./dbConnection'); // Import getConnection function
const { pool } = require("../config/db.config");
//import uuid
const { v4: uuidv4 } = require("uuid"); // Use uuid for unique IDs
// const { getCustomerInfo } = require("../controllers/order.controller");
const { query } = require("express");

async function createOrder(order) {
  const id = uuidv4().toUpperCase();
  try {
    // Insert the order into the orders table
    const query = `
      INSERT INTO orders (id, employee_id, customer_id, vehicle_id, order_date, active_order, order_hash, order_description) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await conn.query(query, [
      id,
      order.employee_id,
      order.customer_id,
      order.vehicle_id,
      new Date(), // Use current date for order_date
      order.order_completed,
      uuidv4(),
      order.order_description,
    ]);

    if (result.affectedRows !== 1) {
      return false;
    }

    // Insert order info with provided order_total_price
    const orderInfoQuery = `
      INSERT INTO order_info (id, order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await conn.query(orderInfoQuery, [
      id,
      result.insertId,
      order.order_total_price, // Use the price provided from the front end
      new Date(order.estimated_completion_date), // Convert string to Date object
      order.completion_date ? new Date(order.completion_date) : null, // Convert string to Date object if present
      order.additional_request,
      "", // Assuming internal notes are empty
      "", // Assuming customer notes are empty
      order.order_completed,
    ]);

    // Insert order services
    const services = order.order_services.split(","); // Assuming a comma-separated list of service IDs
    for (const service_id of services) {
      const orderServiceQuery = `
        INSERT INTO order_services (id, order_id, service_id, service_completed) 
        VALUES (?, ?, ?, ?)
      `;
      await conn.query(orderServiceQuery, [
        id,
        result.insertId,
        service_id,
        order.order_completed,
      ]);
    }
    return { id };
  } catch (error) {
    console.error("Error creating order:", error);
    return false;
  }
}



async function getAllOrders() {
  try {
    // Query to get all orders
    const ordersQuery = `
      SELECT o.id, o.order_id, o.employee_id, o.customer_id, o.vehicle_id, o.order_date, o.order_description, o.active_order, oi.estimated_completion_date, oi.completion_date, oi.additional_requests_completed
      FROM orders o
      LEFT JOIN order_info oi ON o.order_id = oi.order_id
    `;
    const ordersRows = await conn.query(ordersQuery);

    // Prepare the result
    const orders = [];

    // Loop through each order and fetch associated services
    for (const order of ordersRows) {
      const servicesQuery = `
        SELECT os.order_service_id, os.service_id, os.service_completed
        FROM order_services os
        WHERE os.order_id = ?
      `;
      const servicesRows = await conn.query(servicesQuery, [order.order_id]);

      orders.push({
        id: order.id,
        order_id: order.order_id,
        employee_id: order.employee_id,
        customer_id: order.customer_id,
        vehicle_id: order.vehicle_id,
        order_description: order.order_description,
        order_date: order.order_date.toISOString(), // Convert to ISO string
        estimated_completion_date: order.estimated_completion_date
          ? order.estimated_completion_date.toISOString()
          : "",
        completion_date: order.completion_date
          ? order.completion_date.toISOString()
          : "",
        order_completed: order.active_order, // Assuming this is the completion flag
        order_services: servicesRows,
      });
    }

    return orders;
  } catch (error) {
    console.error("Error getting all orders:", error);
    throw error;
  }
}
// A function to get order by id

async function getOrderById(id) {
  try {
    // Query to get order details based on `id`
    const orderQuery = `
      SELECT 
        o.id, 
        o.order_id, 
        o.employee_id, 
        o.customer_id, 
        o.vehicle_id, 
        o.order_description, 
        o.order_date, 
        oi.estimated_completion_date, 
        oi.completion_date, 
        oi.additional_requests_completed
      FROM orders o
      LEFT JOIN order_info oi ON o.order_id = oi.order_id
      WHERE o.id = ?;
    `;

    // Execute the query
    const [orderRows] = await conn.query(orderQuery, [id]);

    // Debugging: Log the result of the query
    console.log("Order Rows:", orderRows);

    // Check if any order was found
    if (orderRows.length === 0) {
      return { status: 404, message: "Order not found" };
    }

    const order = orderRows; // Extract the first order object
    console.log(order);
    // Query to get associated services based on `id`
    const servicesQuery = `
      SELECT 
        os.order_service_id, 
        os.service_id, 
        os.service_completed
      FROM order_services os
      LEFT JOIN orders o ON os.order_id = o.order_id
      WHERE o.id = ?;
    `;

    // Execute the query
    const [servicesRows] = await conn.query(servicesQuery, [id]);

    // Debugging: Log the result of the query
    console.log("Services Rows:", servicesRows);

    // Format the response
    return {
      id: order.id,
      order_id: order.order_id,
      employee_id: order.employee_id,
      customer_id: order.customer_id,
      vehicle_id: order.vehicle_id,
      order_description: order.order_description,
      order_date: order.order_date ? order.order_date.toISOString() : null, // Convert to ISO string if exists
      estimated_completion_date: order.estimated_completion_date
        ? order.estimated_completion_date.toISOString()
        : null,
      completion_date: order.completion_date
        ? order.completion_date.toISOString()
        : "",
      order_completed: order.additional_requests_completed, // Assuming this is the completion flag
      order_services: servicesRows,
    };
  } catch (error) {
    console.error("Error getting order by ID:", error);
    return { status: 500, message: "Internal server error" };
  }
}

// A function to update an existing order// Function to update an existing order

async function updateOrderInDatabase(orderData) {
  const {
    id, // This is the order_id
    order_services = [], // Ensure it's an array
    order_completed, // Should map to `active_order` in your schema
  } = orderData;

  // Use connection pool for database operations
  const connection = await pool.getConnection();

  try {
    // Begin transaction
    await connection.beginTransaction();

    // Prepare and execute service update queries
    for (const service of order_services) {
      await connection.query(
        `UPDATE order_services SET service_completed = ? WHERE id = ? AND service_id = ?`,
        [service.service_completed, id, service.service_id]
      );
    }

    // Prepare and execute the order update query
    await connection.query(`UPDATE orders SET active_order = ? WHERE id = ?`, [
      order_completed,
      id,
    ]);

    // Commit transaction
    await connection.commit();

    return { status: 200, message: "Order updated successfully" };
  } catch (error) {
    // Rollback transaction on error
    await connection.rollback();
    console.error("Error updating order data:", error);
    return { status: 500, message: "An unexpected error occurred" };
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}


// A function to delete an order by ID
// Update with the correct path

async function deleteOrder(id) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    try {
      // Delete related entries from order_services
      await connection.query("DELETE FROM order_services WHERE id = ?", [id]);

      // Delete related entries from order_status
      await connection.query("DELETE FROM order_status WHERE id = ?", [id]);

      // Delete related entries from order_info
      await connection.query("DELETE FROM order_info WHERE id = ?", [id]);

      // Delete the order itself
      await connection.query("DELETE FROM orders WHERE id = ?", [id]);

      // Commit the transaction
      await connection.commit();

      return {
        status: 200,
        message: "Order deleted successfully",
      };
    } catch (err) {
      // Rollback the transaction in case of an error
      await connection.rollback();
      throw err;
    }
  } catch (error) {
    console.error("Error in deleteOrder function:", error);
    return {
      status: 500,
      message: "Internal server error",
    };
  } finally {
    connection.release();
  }
}


async function getCustomerInfoFromDb(customerIds) {
  if (!Array.isArray(customerIds) || customerIds.length === 0) {
    throw new Error("Invalid customer_ids");
  }

  // Create a comma-separated list of placeholders for the IN clause
  const placeholders = customerIds.map(() => "?").join(",");

  // SQL query to fetch customer information along with the id from the customer_info table
  const query = `
    SELECT 
      ci.customer_first_name,
      ci.customer_last_name,
      c.customer_email,
      c.customer_phone_number,
      c.customer_id,
      ci.id AS customer_info_id
    FROM
      customer_info ci
    JOIN
      customer_identifier c ON ci.customer_id = c.customer_id
    WHERE
      ci.customer_id IN (${placeholders})
  `;

  try {
    // Execute the query with the customerIds as parameters
    const rows = await conn.query(query, customerIds);
    return rows;
  } catch (error) {
    console.error("Error fetching customer info:", error);
    throw new Error("Database query error");
  }
}

//a function to get vehicle by id
async function getVehicleById(vehicleIds) {
  try {
    // Create a comma-separated list of placeholders based on the number of vehicle IDs
    const placeholders = vehicleIds.map(() => "?").join(",");
    console.log("placeholders:", placeholders);

    // Construct the SQL query
    const query = `
      SELECT
        cvi.vehicle_id,
        cvi.vehicle_model,
        cvi.vehicle_year,
        cvi.vehicle_tag
      FROM
        customer_vehicle_info cvi
      JOIN
        orders o ON o.vehicle_id = cvi.vehicle_id
      WHERE
        o.vehicle_id IN (${placeholders})
    `;

    // Execute the query with the vehicle IDs as parameters
    const rows = await conn.query(query, vehicleIds);

    // Return the result
    return rows;
  } catch (error) {
    console.error("Error fetching vehicle info:", error);
    throw new Error("Database query error");
  }
}

async function getEmployeeInfoByOrderIds(orderIds) {
  if (!Array.isArray(orderIds) || orderIds.length === 0) {
    throw new Error("An array of order IDs is required");
  }

  // Ensure orderIds are unique and escape any special characters to avoid SQL injection
  const uniqueOrderIds = [
    ...new Set(orderIds.map((id) => id.toString().trim())),
  ];
  const placeholders = uniqueOrderIds.map(() => "?").join(",");
  const query = `
    SELECT 
      ei.employee_first_name,
      ei.employee_last_name,
      ei.employee_id
    FROM
      orders o
    JOIN
      employee_info ei ON o.employee_id = ei.employee_id
    WHERE
      o.order_id IN (${placeholders});
  `;

  try {
    const rows = await conn.query(query, uniqueOrderIds); // Assuming conn.query returns an array of rows
    return rows;
  } catch (error) {
    console.error("Error fetching employee info:", error);
    throw new Error("Database query error");
  }
}


// async function getServiceInfoByOrderId(orderId) {
//   console.log("orderId:", orderId);
//   if (!orderId) {
//     throw new Error("Order ID is required");
//   }

//   const query = ` 
//     SELECT 
//     oi.additional_request,
//     cs.service_name,
//     cs.service_description,
//     cvi.vehicle_tag
// FROM 
//     orders o
// JOIN 
//     order_info oi ON o.order_id = oi.order_id
// JOIN 
//     order_services os ON o.order_id = os.order_id
// JOIN 
//     common_services cs ON os.service_id = cs.service_id
// JOIN 
//     customer_vehicle_info cvi ON o.vehicle_id = cvi.vehicle_id
// WHERE 
//     o.id = ?; 
//   `;

//   try {
//     const rows = await conn.query(query, [orderId]); // Assuming conn.query returns a tuple with rows as the first element
//     return rows;
//     console.log("rows:", rows);
//   } catch (error) {
//     console.error("Error fetching service info:", error);
//     throw new Error("Database query error");
//   }
// }

//a function to get getCustomerAndVehicleInfo

async function getServiceInfoByOrderId(orderId) {
  console.log("orderId:", orderId);
  if (!orderId) {
    throw new Error("Order ID is required");
  }

  const query = ` 
    SELECT 
     o.active_order,
    oi.additional_request,
    cs.service_name,
    cs.service_description,
    cs.service_id,
    cvi.vehicle_tag
FROM 
    orders o
JOIN 
    order_info oi ON o.order_id = oi.order_id
JOIN 
    order_services os ON o.order_id = os.order_id
JOIN 
    common_services cs ON os.service_id = cs.service_id
JOIN 
    customer_vehicle_info cvi ON o.vehicle_id = cvi.vehicle_id
WHERE 
    o.id = ?; 
  `;

  try {
    const rows = await conn.query(query, [orderId]); // Assuming conn.query returns a tuple with rows as the first element
    return rows;
    console.log("rows:", rows);
  } catch (error) {
    console.error("Error fetching service info:", error);
    throw new Error("Database query error");
  }
}

async function getCustomerAndVehicleInfo(id) {
  if (!id) { 
    throw new Error("Order ID is required");
  } 
 const query = `
   SELECT 
    ci_info.customer_first_name AS customer_first_name,
    ci_info.customer_last_name AS customer_last_name,
    ci.customer_id AS customer_id,
    ci.id AS id,
    ci.customer_phone_number AS customer_phone_number,
    ci.customer_email AS customer_email,
    cvi.id AS vehicleId,
    cvi.vehicle_id AS vehicle_id,
    cvi.vehicle_model AS vehicle_model,
    cvi.vehicle_tag AS vehicle_tag,
    cvi.vehicle_year AS vehicle_year,
    cvi.vehicle_mileage AS vehicle_mileage,
    cvi.vehicle_color AS vehicle_color,
    o.active_order AS active_order
FROM 
    orders o
JOIN 
    customer_identifier ci ON o.customer_id = ci.customer_id
JOIN 
    customer_info ci_info ON ci.customer_id = ci_info.customer_id
JOIN 
    customer_vehicle_info cvi ON o.vehicle_id = cvi.vehicle_id
WHERE 
    o.id = ?;
`;

 try {
   // Execute the query with the provided id parameter
   const [rows] = await conn.query(query, [id]);
   return rows;
 } catch (error) {
   // Log the error and throw a new error with a descriptive message
   console.error("Error fetching customer and vehicle info:", error);
   throw new Error("Database query error");
 }

}   

//a function to get all order per coustmer
async function getOrdersByCustomerId(customer_id) {
  if (!customer_id) {
    throw new Error("Order ID is required");
  }
  const query = `SELECT 
    o.order_id,
    oi.order_total_price,
    CASE 
        WHEN o.active_order = 1 THEN 'Completed'
        ELSE 'Not Completed'
    END AS order_status,
    o.order_date
FROM orders o
LEFT JOIN order_info oi ON o.order_id = oi.order_id
WHERE o.customer_id = ?
ORDER BY o.order_id DESC;`;


  try {
    const rows = await conn.query(query, [customer_id]);
    return rows;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Database query error");
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderInDatabase,
  deleteOrder,
  getCustomerInfoFromDb,
  getVehicleById,
  getEmployeeInfoByOrderIds,
  getServiceInfoByOrderId,
  getOrdersByCustomerId,
  getCustomerAndVehicleInfo
};
