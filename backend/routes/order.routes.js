//import express
const express = require("express");
//call the router method from express to create the router  
const router = express.Router();
//import the order controller
const orderController = require("../controllers/order.controller");
//import the auth middleware  
const authMiddleware = require("../middlewares/auth.middleware");
//create a route to handle the add order request on post
router.post(
  "/api/order",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.createOrder
);
//create a route to handle the get all orders request on get
router.get(
  "/api/orders",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.getAllOrders
);
//create a route to handle the get single order request on get
router.get(
  "/api/order/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.getOrderById
);
//create a route to handle the update order request on put
router.put(
  "/api/order/edit/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.updateOrder
);
//create a route to handle the delete order request on delete
router.delete(
  "/api/order/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.deleteOrder
);

//create a route to handle the get customer info request on post
router.post(
  "/api/order/get-customer-info",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.getCustomerInfo
);

//create a route to handle the get vehicle info request on post 
router.post(
  "/api/order/get-vehicle-info",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.getVehicleInfo
);  

//create a route to handle the get empolyee info request on post
router.post(
  "/api/order/get-empolyee-info",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.getEmployeeInfo
);
//create a route to handle the get service info request based on order on post
router.post(
  "/api/order/get-service-info/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.getServiceInfo
);
//create a route to handle the get coustomer info and vechel info based on order on get 
router.get(
  "/api/order/get-customer-and-vehicle-info/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.getCustomerAndVehicleInfo
);


// create route to handle all orders per coustmer 
router.get(
  "/api/order/:customer_id/orders",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.getOrdersByCustomerId
);


//export the router
module.exports = router;