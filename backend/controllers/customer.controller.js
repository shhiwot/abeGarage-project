const customerService = require("../services/customer.service");

async function createCustomer(req, res, next) {
  try {
    // Call the createCustomer method from the customer service
    const customerResponse = await customerService.createCustomer(req.body);

    // Check if the customer was created successfully
    if (customerResponse.status === 201) {
      // If successful, send a response to the client
      res.status(201).json({
        message: customerResponse.message,
        success: true,
        data: customerResponse.createdCustomer,
      });
    } else {
      // If unsuccessful, send a response to the client
      res.status(customerResponse.status).json({
        message: customerResponse.message,
        success: false,
        error: customerResponse.error,
      });
    }
  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({
      message: "Unexpected error occurred",
      success: false,
      error: err.message,
    });
  }
}


//create a function to handle the get all customers request on get
async function getAllCustomers(req, res, next) {
  try {
    // Call the getAllCustomers method from the customer service
    const customers = await customerService.getAllCustomers();

    // Check if the customers were retrieved successfully
    if (customers.success) {
      // If successful, send a response to the client
      res.status(200).json({
        limit: customers.limit, // Assuming you want to return a limit field
        customers: customers.data,
      });
    } else {
      // If unsuccessful, send a response to the client
      res.status(customers.status).json({
        error: customers.error,
        message: customers.message,
      });
    }
  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
//create a function to handle the get single customer request on get
async function getCustomerById(req, res, next) {
  try {
    // Call the getCustomerById method from the customer service
    const customer = await customerService.getCustomerById(req.params.id);

    // Check if the customer was retrieved successfully
    if (customer.success) {
      // If successful, send a response to the client
      res.status(customer.status).json(customer.data);
    } else {
      // If unsuccessful, send a response to the client
      res.status(customer.status).json({
        error: customer.error,
        message: customer.message,
      });
    }
  } catch (err) {
    // Handle unexpected errors
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

//create a function to handle the update customer request on put
async function updateCustomer(req, res, next) {
  try {
    console.log("Calling updateCustomer controller with:", req.body);

    // Ensure req.body exists
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    // Destructure the input
    const {
      customer_id,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    } = req.body;

    if (
      !customer_id ||
      !customer_first_name ||
      !customer_last_name ||
      !customer_phone_number ||
      active_customer_status === undefined
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Call the service function
    const result = await customerService.updateCustomerInDatabase(
      customer_id,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status
    );

    console.log("Result of updateCustomerInDatabase:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error in updateCustomer controller:", error);
    res.status(500).json({ message: error.message });
  }
}





//create a function to handle the delete customer request on delete

//export the functions
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer
  
};
