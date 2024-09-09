//import order model
const Order = require("../services/order.service");



  async function createOrder (req, res) {
  // Destructure request body
  const {
    customer_id,
    employee_id,
    vehicle_id,
    service_id,
    order_date,
    estimated_completion_date,
    completion_date,
    order_description,
    order_completed,
    order_services,
  } = req.body;

  // Validation
  if (
    !customer_id ||
    !employee_id ||
    !vehicle_id ||
    !service_id ||
    !order_date ||
    !estimated_completion_date ||
    order_completed === undefined ||
    !order_services
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
      employee_id,
      vehicle_id,
      service_id,
      order_date,
      estimated_completion_date,
      completion_date,
      order_description,
      order_completed,
      order_services,
    });

    if (result) {
      res.status(201).json({
        message: "Order created successfully",
        success: "true",
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


//create a function to handle the update order request on put 
// orderController.js
// Function to handle updating an order
async function updateOrder(req, res) {
  try {
    // Extract fields from the request body
    const {
      order_id,
      customer_id,
      employee_id,
      vehicle_id,
      service_id,
      order_date,
      estimated_completion_date,
      completion_date,
      order_description,
      order_completed,
      order_services,
    } = req.body;

    // Validate required fields
    if (
      !order_id ||
      !customer_id ||
      !employee_id ||
      !vehicle_id ||
      !order_date ||
      !estimated_completion_date ||
      typeof order_completed === "undefined"
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Call the service function
    const result = await Order.updateOrder({
      order_id,
      customer_id,
      employee_id,
      vehicle_id,
      service_id,
      order_date,
      estimated_completion_date,
      completion_date,
      order_description,
      order_completed,
      order_services,
    });

    // Handle response based on the result
    if (result.status === 404) {
      return res.status(404).json({
        error: "Not Found",
        message: "Order not found",
      });
    }
    if (result.status === 500) {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
    }
    res.status(200).json({
      message: "Order updated successfully",
      success: "true",
    });
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
  //call the deleteOrder method from the order service
  const order = await Order.deleteOrder(req.params.id);
  //check if the order was deleted successfully
  if (order.status === 200) {
    //if successful, send a response to the client
    res.status(200).json({
      message: order
    });
  } else {
    //if unsuccessful, send a response to the client
    res.status(500).json({
      message: order
    });
  }
}

//export the functions    
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};