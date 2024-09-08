//import express
const express = require("express");
//call the router method from express to create the router  
const router = express.Router();
//import the customer controller
const customerController = require("../controllers/customer.controller");
//import the auth middleware
const authMiddleware = require("../middlewares/auth.middleware");
//create a route to handle the add customer request on post
router.post("/api/customer", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.createCustomer);
//create a route to handle the get all customers request on get
router.get("/api/customers", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.getAllCustomers);
//create a route to handle the get single customer request on get
router.get("/api/customer/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.getCustomerById);
//create a route to handle the update customer request on put
router.put("/api/customer/", [authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.updateCustomer);
//export the router
module.exports = router;                                                  