const conn = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");

async function createCustomer(customer) {
  let createdCustomer = {};
  try {
    // Generate a unique string ID
    const id = uuidv4().toUpperCase();

    // Insert into the customer_identifier table
    const query1 = `
      INSERT INTO customer_identifier (id, customer_email, customer_phone_number, customer_hash)
      VALUES (?, ?, ?, ?)
    `;
    const result1 = await conn.query(query1, [
      id,
      customer.customer_email,
      customer.customer_phone_number,
      customer.customer_hash,
      
    ]);

    if (result1.affectedRows !== 1) {
      throw new Error("Failed to insert into customer_identifier");
    }

    // Insert into the customer_info table
    const query2 = `
      INSERT INTO customer_info (customer_id, id, customer_first_name, customer_last_name, active_customer_status)
      VALUES ((SELECT customer_id FROM customer_identifier WHERE id = ?), ?, ?, ?, ?)
    `;
    const result2 = await conn.query(query2, [
      id, // Used to fetch the customer_id
      id,
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
    ]);

    if (result2.affectedRows !== 1) {
      throw new Error("Failed to insert into customer_info");
    }

    createdCustomer = {
      id: id,
    };

    return {
      status: 201,
      message: "Customer created successfully",
      success: true,
      createdCustomer: createdCustomer,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "An unexpected error occurred.",
      success: false,
      error: err.message,
    };
  }
}

// A function to get all customers
async function getAllCustomers() {
  try {
    const query = `
    SELECT
        ci.id,
        ci.customer_id,
        ci.customer_email,
        ci.customer_phone_number,
        ci.customer_hash,
        ci.customer_added_date,
        ci_info.customer_first_name,
        ci_info.customer_last_name,
        ci_info.active_customer_status
    FROM
        customer_identifier ci
    JOIN
        customer_info ci_info
    ON
        ci.customer_id = ci_info.customer_id
`;
  const rows = await conn.query(query);
  console.log(rows); 

    // Format the response
    const customers = rows.map((row) => ({
      id: row.id,
      customer_id: row.customer_id,
      customer_email: row.customer_email,
      customer_phone_number: row.customer_phone_number,
      customer_first_name: row.customer_first_name,
      customer_last_name: row.customer_last_name,
      customer_hash: row.customer_hash,
      active_customer_status: row.active_customer_status,
      customer_added_date: row.customer_added_date,
    }));

    return {
      success: true,
      status: 200,
      limit: customers.length, // Optional: include the limit
      data: customers,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      status: 500,
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    };
  }
}     




async function getCustomerById(id) {
  try {
    const query = `
    SELECT
        ci.id,
        ci.customer_id,
        ci.customer_email,
        ci.customer_phone_number,
        ci.customer_hash,
        ci.customer_added_date,
        ci_info.customer_first_name,
        ci_info.customer_last_name,
        ci_info.active_customer_status
    FROM
        customer_identifier ci
    JOIN
        customer_info ci_info
    ON
        ci.customer_id = ci_info.customer_id
    WHERE
        ci.id = ?
`;
    const rows = await conn.query(query, [id]);

    // Check if a customer was found
    if (rows.length === 0) {
      return {
        success: false,
        status: 404,
        error: "Not Found",
        message: "Customer not found",
      };
    }

    // Return the customer data
    const customer = rows[0];
    return {
      success: true,
      status: 200,
      data: {
        id: customer.id,
        customer_id: customer.customer_id,
        customer_email: customer.customer_email,
        customer_phone_number: customer.customer_phone_number,
        customer_first_name: customer.customer_first_name,
        customer_last_name: customer.customer_last_name,
        customer_hash: customer.customer_hash,
        active_customer_status: customer.active_customer_status,
        customer_added_date: customer.customer_added_date,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      status: 500,
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    };
  }
}





async function updateCustomerInDatabase(
  customer_id,
  customer_first_name,
  customer_last_name,
  customer_phone_number,
  active_customer_status
) {
  try {
    console.log("Calling updateCustomerInDatabase with:", {
      customer_id,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    });

    const query = `
      UPDATE customer_identifier ci
      JOIN customer_info ci2 ON ci.customer_id = ci2.customer_id
      SET ci.customer_phone_number = ?, ci2.customer_first_name = ?, ci2.customer_last_name = ?, ci2.active_customer_status = ?
      WHERE ci.customer_id = ?
    `;

    // Assuming 'conn' is a properly initialized database connection
    const result = await conn.query(query, [
      customer_phone_number,
      customer_first_name,
      customer_last_name,
      active_customer_status,
      customer_id,
    ]);

    console.log("Result of updateCustomerInDatabase:", result);

    return result;
  } catch (error) {
    console.error("Error in updateCustomerInDatabase:", error);
    throw new Error("Internal server error");
  }
}


 


module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerInDatabase,
  
};
