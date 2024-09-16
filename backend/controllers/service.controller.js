
//import the service service
const serviceController = require("../services/service.service");


// A function to check if service exists in the database


//add a new service
exports.createService = async (req, res, next) => {
  //console.log("Calling createService controller with:", req.body);
  // validation 
  if (
    !req.body.service_name ||
    !req.body.service_description ||
    !req.body.service_price
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }  


  try {
    const service = await serviceController.createService(req.body);
    res.status(200).json(service);
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: error.message });
  }
};
// get all services
exports.getAllServices = async (req, res, next) => {
  try {
    const services = await serviceController.getServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get service by id
exports.getServiceById = async (req, res, next) => {
  
  try {
    const service = await serviceController.getServiceById(req.params.id);
    res.status(200).json(service);
    console.log(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//update service
exports.updateService = async (req, res, next) => {
  try {
    const service = await serviceController.updateService( req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a service
exports.deleteService = async (req, res, next) => {
  try {
    const { status, message } = await serviceController.deleteService(
      req.params.id
    );
    res.status(status).json({ message });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





