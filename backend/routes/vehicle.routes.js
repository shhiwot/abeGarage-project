
// Import necessary modules
const express = require("express");
const vehicleController = require("../controllers/vehicle.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Create the router
const router = express.Router();

// Define routes with middleware and controller
router.get(
  "/api/vehicles/:customer_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.getAllVehicles
);

router.get(
  "/api/vehicle/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.getVehicleById
);

router.put(
  "/api/vehicle/",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.updateVehicle
);

router.delete(
  "/api/vehicle/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.deleteVehicle
);

router.post(
  "/api/vehicle",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.createVehicle
);

// Export the router
module.exports = router;
