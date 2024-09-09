//import connection
const conn = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");
async function createVehicle(vehicle) {
  const id = uuidv4().toUpperCase();
  vehicle.id = id;

  try {
    console.log("Creating vehicle with:", vehicle);

    // Validate presence of required fields
    const requiredFields = [
      "customer_id",
      "id",
      "vehicle_year",
      "vehicle_make",
      "vehicle_model",
      "vehicle_type",
      "vehicle_mileage",
      "vehicle_tag",
      "vehicle_serial",
      "vehicle_color",
    ];
    for (const field of requiredFields) {
      if (vehicle[field] === undefined || vehicle[field] === null) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Convert string to integer for fields that should be integers
    const integerFields = ["vehicle_year", "vehicle_mileage"];
    for (const field of integerFields) {
      if (isNaN(parseInt(vehicle[field], 10))) {
        throw new Error(`Invalid value for field: ${field}`);
      }
      vehicle[field] = parseInt(vehicle[field], 10);
    }

    // Check if the customer_id exists
    const customerCheckQuery = "SELECT * FROM customer_identifier WHERE customer_id = ?";
    const customerRows = await conn.query(customerCheckQuery, [vehicle.customer_id]);
    if (!customerRows || customerRows.length === 0) {
      throw new Error("Customer ID does not exist.");
    }

    // // Check if the provided id exists in customer_identifier
    // const idCheckQuery = "SELECT * FROM customer_identifier WHERE id = ?";
    // const idRows = await conn.query(idCheckQuery, [vehicle.id]);
    // if (!idRows || idRows.length === 0) {
    //   throw new Error("ID does not exist in customer_identifier.");
    // }

    // Prepare SQL query
    const query = `
      INSERT INTO customer_vehicle_info (
        vehicle_id, customer_id, id, vehicle_year, vehicle_make, vehicle_model,
        vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute query
    const insertResult = await conn.query(query, [
      vehicle.vehicle_id || null,
      vehicle.customer_id || null,
      vehicle.id, // Use the generated ID
      vehicle.vehicle_year || null,
      vehicle.vehicle_make || null,
      vehicle.vehicle_model || null,
      vehicle.vehicle_type || null,
      vehicle.vehicle_mileage || null,
      vehicle.vehicle_tag || null,
      vehicle.vehicle_serial || null,
      vehicle.vehicle_color || null,
    ]);

    if (insertResult.affectedRows === 1) {
      return {
        status: 201,
        message: "Vehicle created successfully.",
        insertResult: insertResult,
      };
    } else {
      console.log("Error inserting vehicle.");
      return { status: 500, message: "Error inserting vehicle." };
    }
  } catch (err) {
    console.error("Error creating vehicle:", err.message);
    console.error("Error stack trace:", err.stack);
    return { status: 500, message: "An unexpected error occurred." };
  }
}





async function getAllVehicles(customer_id) {
  try {
    const query = "SELECT * FROM customer_vehicle_info WHERE customer_id = ?";
    const rows = await conn.query(query, [customer_id]);
    return rows;
  } catch (err) {
    console.error("Error getting vehicles:", err);
    throw err;
  }
}

async function getVehicleById(id) {
  try {
    const query = "SELECT * FROM customer_vehicle_info WHERE id = ?";
    const rows = await conn.query(query, [id]);
    console.log("Query executed. Rows:", rows);
    return rows.length > 0 ? rows : null;
  } catch (err) {
    console.error("Error getting vehicle by ID:", err);
    throw err;
  }
}

async function doesVehicleExist(vehicle_id, customer_id) {
  try {
    const query =
      "SELECT COUNT(*) AS count FROM customer_vehicle_info WHERE vehicle_id = ? AND customer_id = ?";
    const [rows] = await conn.query(query, [vehicle_id, customer_id]);
    return rows.count > 0;
  } catch (err) {
    console.error("Error checking vehicle existence:", err);
    throw err;
  }
}

async function updateVehicle(vehicle) {
  try {
    const query =
      "UPDATE customer_vehicle_info SET vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ? WHERE vehicle_id = ? AND customer_id = ?";
    const result = await conn.query(query, [
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
      vehicle.vehicle_id,
      vehicle.customer_id,
    ]);

    return result.affectedRows === 1;
  } catch (err) {
    console.error("Error updating vehicle:", err);
    throw err;
  }
}


async function deleteVehicle(id) {
  try {
    console.log(`Attempting to delete vehicle with ID: ${id}`);


    const query = "DELETE FROM customer_vehicle_info WHERE id = ?";
    const result = await conn.query(query, [id]);

    console.log(`Delete result: ${JSON.stringify(result)}`);
    return result.affectedRows === 1;
  } catch (err) {
    console.error("Error deleting vehicle:", err);
    throw err;
  }
}


module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  doesVehicleExist,
  updateVehicle,
  deleteVehicle,
};
