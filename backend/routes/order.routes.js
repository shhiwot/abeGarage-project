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
  "/api/order/",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.updateOrder
);
//create a route to handle the delete order request on delete
router.delete(
  "/api/order/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.deleteOrder
);
//export the router
module.exports = router;