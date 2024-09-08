// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the install router
const installRouter = require("./install.routes");
// Import the employee routes
// const employeeRouter = require("./employee.routes");
// Add the install router to the main router
router.use(installRouter);
// Import the employee routes 
const employeeRouter = require('./employee.routes');
// Add the employee routes to the main router 
router.use(employeeRouter);
// Add the login routes to the main router
const loginRoutes=require("./login.routes") 
router.use(loginRoutes);

const customerRoutes=require("./customer.routes")
router.use(customerRoutes)
//import the order routes
const orderRoutes=require("./order.routes")
router.use(orderRoutes)
module.exports = router;
