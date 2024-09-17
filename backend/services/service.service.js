// import db config
const conn = require("../config/db.config");
const { v4: uuidv4 } = require("uuid"); // Use uuid for unique IDs

// A function to check if service exists in the database
async function checkIfServiceExists(id) {
  const query = "SELECT * FROM common_services WHERE id = ? ";
  const rows = await conn.query(query, [id]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new service 
async function createService(service) {
  console.log("Calling createService with:", service);
  let createdService = [];
  try {
    console.log("Calling createService with:", service);
    // generate a unique string ID
    const id = uuidv4().toUpperCase();
    //cheack if service already exists
    const serviceExists = await checkIfServiceExists(id);
    console.log("Service exists:", serviceExists);
    if (serviceExists) {
      console.log("Service already exists, returning false");
      return false;
    }


    // insert service_name and  service_description into the common_services table with the generated ID

   const query =
     "INSERT INTO common_services (id, service_name, service_description, service_price) VALUES (?, ?, ?, ?)";
   console.log("About to execute query:", query);
   console.log(
     "With values:",
     id,
     service.service_name,
     service.service_description,
     service.service_price
   );
   const rows = await conn.query(query, [
     id,
     service.service_name,
     service.service_description,
     service.service_price,
   ]);

    console.log("Query executed. Rows:", rows);
    console.log(rows);
 if (rows.affectedRows !== 1) {
      console.log("Error inserting service, returning false");
      return false;
    } else {
      console.log("Service inserted successfully, returning createdService");
      createdService = {
        id: id,
      };
    } 
  } catch (err) {
    console.log("Error creating service:", err);     
    console.log(err);
         
  }
  return createdService;
} 



// A function to get service by id
async function getServiceById(id) {
  try {
    console.log("Calling getServiceById with:", id);
    const [service] = await conn.query(
      "SELECT * FROM common_services WHERE id = ?",
      [id]  
    );
    console.log("Query executed. Rows:", service);
       
    if (service.length === 0) {
      console.log("Service not found, returning 404");
      return { status: 404, message: "Service not found" };
    }
    console.log("Service found, returning the service");
    return service;
  } catch (error) {
    console.error("Error in getServiceById service:", error);
    console.log(error);
    console.error("Error in getServiceById service:", error);           
    return { status: 500, message: "Internal server error" };
  }
}


// A function to get all services
async function getServices() {
  try {   
    const services = await conn.query("SELECT * FROM common_services");
    return services;
  } catch (error) {  
    console.error("Error in getServices service:", error);
    return { status: 500, message: "Internal server error" };
  }
}     

// A function to delete a service by ID

async function deleteService(id) {
  try {
    const [service] = await conn.query(
    
      "SELECT * FROM common_services WHERE id = ?",
      [id]
    );
    if (!service) {
      console.log("Service not found, returning 404");
      return { status: 404, message: "Service not found" };
    }

    const result = await conn.query(
      "DELETE FROM common_services WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
   
      return { status: 404, message: "Service not found" };
    }

    return { status: 200, message: "Service deleted successfully" };
  } catch (error) {
    console.error("Error in deleteService service:", error);
    return { status: 500, message: "Internal server error" };
  }
}


// a function to update service
async function updateService( service) {  
  try {     
    const services = await conn.query(
      "UPDATE common_services SET service_name = ?, service_description = ? WHERE  service_id = ?",
      [service.service_name, service.service_description, service.service_id]
    );
    return { status: 200, message: "Service updated successfully" };
  } catch (error) {
    console.error("Error in updateService service:", error);
    return { status: 500, message: "Internal server error" };
  }
}

  

module.exports = { createService, getServiceById, getServices, deleteService, updateService }