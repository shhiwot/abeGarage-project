//import order model
const Order = require("../services/order.service");



  async function createOrder (req, res) {
  // Destructure request body
  const {
    customer_id,
    additional_request,
    employee_id,
    vehicle_id,
    service_id,
    estimated_completion_date,
    completion_date,
    order_description,
    order_completed,
    order_services,
    order_total_price,
  } = req.body;

  // Validation
  if (
    !customer_id ||
    !employee_id ||
    !vehicle_id ||
    !service_id ||
    !additional_request||
    !estimated_completion_date ||
    order_completed === undefined ||
    !order_services||
    !order_total_price
    
  ) {
    return res
      .status(400)
      .json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
  }

  try {
    // Create the order
    const result = await Order.createOrder({
      customer_id,
      additional_request,
      employee_id,
      vehicle_id,
      service_id,
      estimated_completion_date,
      completion_date,
      order_description,
      order_completed,
      order_services,
      order_total_price,
    });

    if (result) {
      res.status(201).json({
        message: "Order created successfully",
        success: "true",
        data: result.id,
      });
    } else {
      res
        .status(500)
        .json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
    
      });
  }
};


//create a function to handle the get all orders request on get 
 async function getAllOrders (req, res) {
  try {
    const orders = await Order.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
  }
};
//create a function to handle the get single order request on get
 async  function getOrderById (req, res) {
  try {
    const orderId = req.params.id;
    const result = await Order.getOrderById(orderId);
console.log(result);
    if (result.status === 404) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "Order not found" });
    }

    if (result.status === 500) {
      return res
        .status(500)
        .json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
  }
};



async function updateOrder(req, res) {
  try {
    // Extract fields from the request body
    const {
      id, // This is the order_id
      order_services = [], // Ensure it's an array
      order_date,
      order_completed,
    } = req.body;

    // Validate required fields
    if (!id || typeof order_completed === "undefined") {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Call the service function
    const result = await Order.updateOrderInDatabase({
      id,
      order_services,
      order_date,
      order_completed,
    });

    // Handle response based on the result
    if (result.status === 200) {
      return res.status(200).json({
        message: result.message,
        success: "true",
      });
    } else {
      return res.status(result.status).json({
        error: result.message,
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}



//create a function to handle the delete order request on delete  
async function deleteOrder(req, res, next) {
  try {
    // Call the deleteOrder method from the order service
    const result = await Order.deleteOrder(req.params.id);

    // Check if the order was deleted successfully
    if (result.status === 200) {
      // If successful, send a response to the client
      res.status(200).json({
        message: result.message, // Make sure to return only the message part
      });
    } else {
      // If unsuccessful, send a response to the client
      res.status(result.status).json({
        message: result.message, // Return the error message
      });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error("Error in deleteOrder controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}




async function getCustomerInfo(req, res) {
  try {
    const customerIds = req.body.customer_ids;

    if (
      !customerIds ||
      !Array.isArray(customerIds) ||
      customerIds.length === 0
    ) {
      return res.status(400).json({ error: "Invalid customer_ids" });
    }

    // Fetch customer info from the database
    const customerInfo = await Order.getCustomerInfoFromDb(customerIds);
    res.status(200).json(customerInfo);
  } catch (error) {
    console.error("Error fetching customer info:", error);
    res.status(500).json({ error: "Database query error" });
  }
}


//create a route to handle the get vehicle info request
async function getVehicleInfo(req, res) {
  try {
    const vehicleIds = req.body.vehicle_ids;

    if (!vehicleIds || !Array.isArray(vehicleIds) || vehicleIds.length === 0) {
      return res.status(400).json({ error: "Invalid vehicle_ids" });
    }

    // Fetch vehicle info from the database
    const vehicleInfo = await Order.getVehicleById(vehicleIds);

    res.status(200).json(vehicleInfo);
  } catch (error) {
    console.error("Error fetching vehicle info:", error);
    res.status(500).json({ error: "Database query error" });
  }
}

//create a route to handle the employee info request
async function getEmployeeInfo(req, res) {
  const { order_ids } = req.body;

  if (!Array.isArray(order_ids) || order_ids.length === 0) {
    return res.status(400).json({ error: "An array of order IDs is required" });
  }

  try {
    // Call the service function to get employee info
    const employeeInfo = await Order.getEmployeeInfoByOrderIds(order_ids);

    // Check if any employee info was found
    if (employeeInfo.length === 0) {
      return res.status(404).json({ error: "Employees not found" });
    }

    // Send the employee info in the response
    res.status(200).json(employeeInfo);
  } catch (error) {
    console.error("Error fetching employee info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}




//create a route to handle the get service info request
async function getServiceInfo(req, res) {
  const { id } = req.params; // Extract 'id' from URL parameters
  console.log(id);
  if (!id) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  try {
    // Call the service function to get service info
    const serviceInfo = await Order.getServiceInfoByOrderId(id);
    // Check if any service info was found
    if (serviceInfo.length === 0) {
      return res.status(404).json({ error: "Service not found" });
    }
    // Send the service info in the response
    res.status(200).json(serviceInfo);
  } catch (error) {
    console.error("Error fetching service info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//create a function to get coustomer and vehicle info
async function getCustomerAndVehicleInfo(req, res) {
  const {id}=req.params;
  try {
   const customerAndVehicleInfo = await Order.getCustomerAndVehicleInfo(id);
    res.status(200).json(customerAndVehicleInfo);
  } catch (error) {   
    console.error("Error fetching customer and vehicle info:", error);
    res.status(500).json({ error: "Internal server error" });
  } 
}   


//create a function to get all orders done by a customer
async function getOrdersByCustomerId(req,res) {

  const { customer_id } = req.params; // Extract 'customer_id' from request body  
console.log(customer_id);
  if (!customer_id) { 
    return res.status(400).json({ error: "Customer ID is required" });
  }
  try {
    // Call the service function to get orders by customer
    const orders = await Order.getOrdersByCustomerId(customer_id);
    // Check if any orders were found
    if (orders.length === 0) {
      return res.status(404).json({ error: "Orders not found" });
    }
    // Send the orders in the response
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error); 
    res.status(500).json({ error: "Internal server error" });
  }  
  
}


//export the functions    
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getCustomerInfo,
  getVehicleInfo,
  getEmployeeInfo,
  getServiceInfo,
  getOrdersByCustomerId,
  getCustomerAndVehicleInfo
};