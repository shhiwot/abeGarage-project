const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Route to add a new customer
router.post(
  '/api/customer',
  [authMiddleware.verifyToken], // Add other middlewares if needed
  customerController.addCustomer
);

// Route to get all customers
router.get(
  '/api/customers',
  [authMiddleware.verifyToken], // Add other middlewares if needed
  customerController.getAllCustomers
);

// Route to get a customer by ID
router.get(
  '/api/customer/:id',
  [authMiddleware.verifyToken], // Add other middlewares if needed
  customerController.getCustomerById
);
// Update customer
router.put('/customer', customerController.updateCustomer);

// Delete customer
router.delete('/customer/:id', customerController.deleteCustomer);

module.exports = router;
