const vehicleService = require("../services/vehicle.service");

async function createVehicle(req, res, next) {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    if (vehicle) {
      res.status(201).json({
        message: "Vehicle created successfully",
        success: true,
      });
    } else {
      res.status(400).json({
        error: "Bad Request",
        message: "Failed to create vehicle",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
      insertResult: insertResult,
    });
  }
}
//get all vehicles per customer 
async function getAllVehicles(req, res, next) {
  try {
    const vehicles = await vehicleService.getAllVehicles(
      req.params.customer_id
    );
    if (vehicles) {
      res.status(200).json({
        customer_id: req.params.customer_id,
        vehicles: vehicles,
      });
    } else {
      res.status(404).json({
        error: "Not Found",
        message: "No vehicles found for this customer",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

async function getVehicleById(req, res, next) {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({
        error: "Not Found",
        message: "Vehicle not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

async function updateVehicle(req, res, next) {
  try {
    // Validate request body
    const requiredFields = [
      "vehicle_id",
      "customer_id",
      "vehicle_mileage",
      "vehicle_tag",
      "vehicle_color",
    ];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Please provide all required fields",
        });
      }
    }

    // Check if the vehicle exists
    const vehicleExists = await vehicleService.doesVehicleExist(
      req.body.vehicle_id,
      req.body.customer_id
    );
    if (!vehicleExists) {
      return res.status(404).json({
        error: "Not Found",
        message: "Vehicle not found",
      });
    }

    // Proceed with the update
    const success = await vehicleService.updateVehicle(req.body);

    if (success) {
      res.status(200).json({
        message: "Vehicle updated successfully",
        success: true,
      });
    } else {
      res.status(400).json({
        error: "Bad Request",
        message: "Failed to update vehicle",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}


async function deleteVehicle(req, res, next) {
  console.log("req.params.id", req.params.id);
  try {
    const success = await vehicleService.deleteVehicleByOrderId(req.params.id);
    if (success) {
      res.status(200).json({
        message: "Vehicle deleted successfully",
        success: true,
      });
    } else {
      res.status(404).json({
        error: "Not Found",
        message: "Vehicle not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = {
  createVehicle,
  getAllVehicles,
   getVehicleById,
  updateVehicle,
  deleteVehicle,
};
