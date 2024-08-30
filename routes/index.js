// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee routes 
const employeeRouter = require('./employee.routes');
// Add the employee routes to the main router 
router.use(employeeRouter);
// Add the login routes to the main router
const loginRoutes=require("./login.routes") 
router.use(loginRoutes);
module.exports = router;
