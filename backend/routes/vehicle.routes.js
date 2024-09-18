//import express
const express = require("express");   
//call the router method from express to create the router
const router = express.Router();
//import the vehicle controller
const vehicleController = require("../controllers/vehicle.controller");
//import the auth middleware
const authMiddleware = require("../middlewares/auth.middleware");
//create a route to handle the add vehicle request on post
router.post("/api/vehicle", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.createVehicle);
//create a route to handle the get all vehicles request per customer on get
router.get("/api/vehicles/:customer_id", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.getAllVehicles);
//create a route to handle the get single vehicle request on get
router.get("/api/vehicle/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.getVehicleById);

//create a route to handle the update vehicle request on put
router.put("/api/vehicle/", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.updateVehicle);
//create a route to handle the delete vehicle request on delete
router.delete("/api/vehicle/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], vehicleController.deleteVehicle);
//export the router
module.exports = router;