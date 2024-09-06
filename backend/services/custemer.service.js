const db = require('../db'); // Assuming you have a database module

// Add a new customer
exports.addCustomer = async (customerData) => {
  try {
    // Add to customer_identifier table
    await db.query(
      'INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_added_date, customer_hash) VALUES (?, ?, ?, ?)',
      [
        customerData.customer_email,
        customerData.customer_phone_number,
        customerData.customer_added_date,
        customerData.customer_hash,
      ]
    );

    // Get the last inserted customer ID
    const [result] = await db.query('SELECT LAST_INSERT_ID() AS customer_id');
    const customerId = result[0].customer_id;

    // Add to customer_info table
    await db.query(
      'INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)',
      [
        customerId,
        customerData.customer_first_name,
        customerData.customer_last_name,
        customerData.active_customer_status,
      ]
    );

  } catch (error) {
    throw new Error('Error adding customer');
  }
};

// Get all customers
exports.getAllCustomers = async () => {
  try {
    const [rows] = await db.query(
      `SELECT * 
       FROM customer_identifier AS identifier 
       JOIN customer_info AS info 
       ON identifier.customer_id = info.customer_id`
    );
    return rows;
  } catch (error) {
    throw new Error('Error retrieving customers');
  }
};

// Get customer by ID
exports.getCustomerById = async (id) => {
  try {
    const [rows] = await db.query(
      `SELECT * 
       FROM customer_identifier AS identifier 
       JOIN customer_info AS info 
       ON identifier.customer_id = info.customer_id 
       WHERE identifier.customer_id = ?`,
      [id]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Error retrieving customer by ID');
  }
};

// Update an existing customer
exports.updateCustomer = async (customerData) => {
  try {
    // Update customer_identifier table
    const [result1] = await db.query(
      'UPDATE customer_identifier SET customer_phone_number = ? WHERE customer_id = ?',
      [customerData.customer_phone_number, customerData.customer_id]
    );

    // Update customer_info table
    const [result2] = await db.query(
      `UPDATE customer_info 
       SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? 
       WHERE customer_id = ?`,
      [
        customerData.customer_first_name,
        customerData.customer_last_name,
        customerData.active_customer_status,
        customerData.customer_id,
      ]
    );

    // Check if any rows were updated
    return result1.affectedRows > 0 && result2.affectedRows > 0;
  } catch (error) {
    throw new Error('Error updating customer');
  }
};

// Delete an existing customer
exports.deleteCustomer = async (id) => {
  try {
    // Delete from customer_identifier table (this should cascade delete in customer_info if foreign key constraints are properly set)
    const [result] = await db.query(
      'DELETE FROM customer_identifier WHERE customer_id = ?',
      [id]
    );

    // Check if any rows were deleted
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error('Error deleting customer');
  }
};
