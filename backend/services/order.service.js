//import connection
const conn = require("../config/db.config");
//const { getConnection } = require('./dbConnection'); // Import getConnection function
const { pool } = require("../config/db.config");
//import uuid
const { v4: uuidv4 } = require("uuid"); // Use uuid for unique IDs  


// A function to create a new order in the database
// async function createOrder(order) {
//   try {
//     console.log("Calling createOrder with:", order);

//     // Validate employee_id exists
//     const [employee] = await conn.query(
//       "SELECT * FROM employee WHERE employee_id = ?",
//       [order.employee_id]
//     );
//     if (employee.length === 0) {
//       throw new Error(`Employee with ID ${order.employee_id} does not exist.`);
//     }

//     // Validate customer_id exists
//     const [customer] = await conn.query(
//       "SELECT * FROM customer_identifier WHERE customer_id = ?",
//       [order.customer_id]
//     );
//     if (customer.length === 0) {
//       throw new Error(`Customer with ID ${order.customer_id} does not exist.`);
//     }

//     // Validate vehicle_id exists
//     const [vehicle] = await conn.query(
//       "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?",
//       [order.vehicle_id]
//     );
//     if (vehicle.length === 0) {
//       throw new Error(`Vehicle with ID ${order.vehicle_id} does not exist.`);
//     }

//     // Insert into orders table
//     const query = `
//       INSERT INTO orders (id, employee_id, customer_id, vehicle_id, order_date, active_order, order_hash)
//       VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;
//     const orderHash = uuidv4(); // Generate a unique hash
//     const [result] = await conn.query(query, [
//       uuidv4().toUpperCase(), // New unique ID for the order
//       order.employee_id,
//       order.customer_id,
//       order.vehicle_id,
//       order.order_date,
//       1, // Set active_order flag
//       orderHash,
//     ]);

//     if (result.affectedRows !== 1) {
//       console.error("Error inserting order, no rows affected.");
//       return { status: 500, message: "Error inserting order" };
//     }

//     // Insert into order_info table
//     const infoQuery = `
//       INSERT INTO order_info (id, order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     await conn.query(infoQuery, [
//       uuidv4().toUpperCase(), // New unique ID for order_info
//       result.insertId,
//       order.order_total_price || 0,
//       order.estimated_completion_date,
//       order.completion_date || null,
//       order.order_description || "",
//       "", // Default empty string for internal notes
//       "", // Default empty string for customer notes
//       order.order_completed || 0,
//     ]);

//     // Insert into order_services table
//     if (order.order_services && Array.isArray(order.order_services)) {
//       const servicePromises = order.order_services.map((service) =>
//         conn.query(
//           "INSERT INTO order_services (id, order_id, service_id, service_completed) VALUES (?, ?, ?, ?)",
//           [
//             uuidv4().toUpperCase(), // New unique ID for the service
//             result.insertId,
//             service.service_id,
//             0, // Default service completion flag
//           ]
//         )
//       );
//       await Promise.all(servicePromises);
//     }

//     // Return the created order with its ID
//     return { status: 200, id: result.insertId };
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return { status: 500, message: "Internal server error" };
//   }
// }
 // Ensure you have a db connection module

async function createOrder (order) {
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
      new Date(order.order_date), // Convert string to Date object
      order.order_completed,
      uuidv4(),
      order.order_description,
    ]);

    if (result.affectedRows !== 1) {
      return false;
    }

    // Insert order info
    const orderInfoQuery = `
      INSERT INTO order_info (id, order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await conn.query(orderInfoQuery, [
      id,
      result.insertId,
      0, // Assuming order total price is calculated later
      new Date(order.estimated_completion_date), // Convert string to Date object
      order.completion_date ? new Date(order.completion_date) : null, // Convert string to Date object if present
      "", // Assuming additional request is empty
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

    return { id: id };
  } catch (error) {
    console.error("Error creating order:", error);
    return false;
  }
};

 async function getAllOrders (){
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
        order_completed: order.additional_requests_completed, // Assuming this is the completion flag
        order_services: servicesRows,
      });
    }

    return orders;
  } catch (error) {
    console.error("Error getting all orders:", error);
    throw error;
  }
};
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
    const servicesRows = await conn.query(servicesQuery, [id]);

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

async function updateOrder(orderData) {
  const {
    order_id,
    customer_id,
    employee_id,
    vehicle_id,
    service_id,
    order_date,
    estimated_completion_date,
    completion_date,
    order_description,
    order_completed,
    order_services,
  } = orderData;

  try {
    // Update the `orders` table
    const updateOrderQuery = `
      UPDATE orders
      SET
        customer_id = ?,
        employee_id = ?,
        vehicle_id = ?,
        order_date = ?,
        estimated_completion_date = ?,
        completion_date = ?,
        order_description = ?,
        active_order = ?
      WHERE order_id = ?
    `;

    const result = await conn.query(updateOrderQuery, [
      customer_id,
      employee_id,
      vehicle_id,
      order_date,
      estimated_completion_date,
      completion_date,
      order_description,
      order_completed,
      order_id,
    ]);

    if (result.affectedRows === 0) {
      return { status: 404 }; // Order not found
    }

    // Handle `order_services` if provided
    if (order_services) {
      // Remove existing services for this order
      const deleteServicesQuery = `DELETE FROM order_services WHERE order_id = ?`;
      await conn.query(deleteServicesQuery, [order_id]);

      // Add new services
      const addServicesQuery = `INSERT INTO order_services (order_id, service_id, service_completed) VALUES ?`;
      const serviceValues = order_services.map((service) => [
        order_id,
        service.service_id,
        service.service_completed,
      ]);
      await conn.query(addServicesQuery, [serviceValues]);
    }

    return { status: 200 };
  } catch (error) {
    console.error("Error updating order in database:", error);
    throw new Error("Internal Server Error");
  }
}


// A function to delete an order by ID
async function deleteOrder(id) {
  try {
    console.log("Calling deleteOrder with:", id);
    const [result] = await conn.query(
      "DELETE FROM orders WHERE id = ?",
      [id]
    );
    console.log("Query executed. Rows:", result);
    if (result.affectedRows === 0) {
      console.log("Order not found, returning 404");
      return { status: 404, message: "Order not found" };
    }
    console.log("Order found, returning the order");
    return { status: 200, message: "Order deleted successfully" };
  } catch (error) {
    console.error("Error in deleteOrder order:", error);
    return { status: 500, message: "Internal server error" };
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};

