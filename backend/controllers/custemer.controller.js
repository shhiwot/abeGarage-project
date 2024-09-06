const customerService = require('../services/customer.service');

// Add a new customer
async function addCustomer(req, res) {
  const {
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone_number,
    active_customer_status,
    customer_hash,
    customer_added_date,
  } = req.body;

  // Basic validation
  if (
    !customer_first_name ||
    !customer_last_name ||
    !customer_email ||
    !customer_phone_number ||
    active_customer_status === undefined ||
    !customer_hash ||
    !customer_added_date
  ) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Please provide all required fields',
    });
  }

  try {
    // Call the service to add a new customer
    await customerService.addCustomer({
      customer_first_name,
      customer_last_name,
      customer_email,
      customer_phone_number,
      active_customer_status,
      customer_hash,
      customer_added_date,
    });

    return res.status(201).json({
      message: 'Customer created successfully',
      success: 'true',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred.',
    });
  }
}

// Get all customers
async function getAllCustomers(req, res) {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json({
      limit: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Get customer by ID
async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const customer = await customerService.getCustomerById(id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({
        error: "Not Found",
        message: "Customer not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Update an existing customer
async function updateCustomer(req, res) {
  const {
    customer_id,
    customer_first_name,
    customer_last_name,
    customer_phone_number,
    active_customer_status
  } = req.body;

  // Basic validation
  if (
    !customer_id ||
    !customer_first_name ||
    !customer_last_name ||
    !customer_phone_number ||
    active_customer_status === undefined
  ) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Please provide all required fields',
    });
  }

  try {
    const updated = await customerService.updateCustomer({
      customer_id,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    });

    if (updated) {
      return res.status(200).json({
        message: 'Customer updated successfully',
        success: 'true',
      });
    } else {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Customer not found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred.',
    });
  }
}

// Delete an existing customer
async function deleteCustomer(req, res) {
  const { id } = req.params;

  try {
    const deleted = await customerService.deleteCustomer(id);

    if (deleted) {
      return res.status(200).json({
        message: 'Customer deleted successfully',
        success: 'true',
      });
    } else {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Customer not found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred.',
    });
  }
}

// Export the customer controllers in the specified sequence
module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
