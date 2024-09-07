// customer.service.js
const conn = require("../config/db.config"); // Config file for DB connection settings
// Assuming you have a database module
const { v4: uuidv4 } = require('uuid'); // Use UUID for unique IDs

// Add a new customer
exports.addCustomer = async (customerData) => {
  let createdCustomer = {};
  try {
    // Generate a unique customer ID
    const customer_id = uuidv4().toUpperCase();

    // Add to customer_identifier table
    const query1 =
      'INSERT INTO customer_identifier (customer_id, customer_email, customer_phone_number, customer_added_date, customer_hash) VALUES (?, ?, ?, ?, ?)';
    const result1 = await conn.query(query1, [
      customer_id,
      customerData.customer_email,
      customerData.customer_phone_number,
      customerData.customer_added_date,
      customerData.customer_hash,
    ]);

    if (result1.affectedRows !== 1) {
      return false;
    }

    // Add to customer_info table
    const query2 =
      'INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)';
    await conn.query(query2, [
      customer_id,
      customerData.customer_first_name,
      customerData.customer_last_name,
      customerData.active_customer_status,
    ]);

    createdCustomer = {
      customer_id,
    };
  } catch (error) {
    console.error('Error adding customer:', error);
    throw new Error('Error adding customer');
  }
  return createdCustomer;
};

// Get all customers
exports.getAllCustomers = async () => {
  try {
    const query =
      `SELECT * 
       FROM customer_identifier AS identifier 
       INNER JOIN customer_info AS info 
       ON identifier.customer_id = info.customer_id
       ORDER BY identifier.customer_id DESC LIMIT 10`;
    const [rows] = await conn.query(query);
    return rows;
  } catch (error) {
    console.error('Error retrieving customers:', error);
    throw new Error('Error retrieving customers');
  }
};

// Get customer by ID
exports.getCustomerById = async (id) => {
  try {
    const query =
      `SELECT * 
       FROM customer_identifier AS identifier 
       INNER JOIN customer_info AS info 
       ON identifier.customer_id = info.customer_id 
       WHERE identifier.customer_id = ?`;
    const [rows] = await conn .query(query, [id]);

    if (rows.length === 0) {
      return { status: 404, message: 'Customer not found' };
    }

    return { status: 200, data: rows[0] };
  } catch (error) {
    console.error('Error retrieving customer by ID:', error);
    throw new Error('Error retrieving customer by ID');
  }
};

// Update an existing customer
exports.updateCustomer = async (customerData) => {
  const {
    customer_id,
    customer_first_name,
    customer_last_name,
    customer_phone_number,
    active_customer_status,
  } = customerData;

  try {
    // Check if customer exists by ID
    const [customer] = await conn .query(
      'SELECT customer_email FROM customer_identifier WHERE customer_id = ?',
      [customer_id]
    );

    if (customer.length === 0) {
      return { status: 404, message: 'Customer not found' };
    }

    // Update customer_identifier table
    await conn.query(
      'UPDATE customer_identifier SET customer_phone_number = ? WHERE customer_id = ?',
      [customer_phone_number, customer_id]
    );

    // Update customer_info table
    await conn.query(
      `UPDATE customer_info 
       SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? 
       WHERE customer_id = ?`,
      [customer_first_name, customer_last_name, active_customer_status, customer_id]
    );

    return { status: 200, message: 'Customer updated successfully' };
  } catch (error) {
    console.error('Error updating customer:', error);
    throw new Error('Error updating customer');
  }
};

// Delete an existing customer
exports.deleteCustomer = async (id) => {
  try {
    // Check if customer exists by ID
    const [customer] = await conn.query(
      'SELECT customer_email FROM customer_identifier WHERE customer_id = ?',
      [id]
    );

    if (customer.length === 0) {
      return { status: 404, message: 'Customer not found' };
    }

    // Delete from customer_identifier table
    await conn.query('DELETE FROM customer_identifier WHERE customer_id = ?', [id]);

    return { status: 200, message: 'Customer deleted successfully' };
  } catch (error) {
    console.error('Error deleting customer:', error);
    return { status: 500, message: 'Internal server error' };
  }
};

const conn = require("../config/db.config"); // Assuming you have a database module

// Update an existing order
exports.updateOrder = async (orderData) => {
  try {
    const [result] = await conn.query(
      `UPDATE orders 
       SET customer_id = ?, employee_id = ?, vehicle_id = ?, service_id = ?, order_date = ?, 
           estimated_completion_date = ?, completion_date = ?, order_description = ?, 
           order_completed = ?, order_services = ? 
       WHERE order_id = ?`,
      [
        orderData.customer_id,
        orderData.employee_id,
        orderData.vehicle_id,
        orderData.service_id,
        orderData.order_date,
        orderData.estimated_completion_date,
        orderData.completion_date,
        orderData.order_description,
        orderData.order_completed,
        orderData.order_services,
        orderData.order_id,
      ]
    );

    if (result.affectedRows === 0) {
      throw new Error('Order not found or no changes made');
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating order:', error.message);
    throw new Error('Error updating order');
  }
};

// Delete an existing order
exports.deleteOrder = async (id) => {
  try {
    const [result] = await conn.query(
      'DELETE FROM orders WHERE order_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Order not found');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error.message);
    throw new Error('Error deleting order');
  }
};
