//import order model
const Order = require("../services/order.service");
//create a function to handle the update order request on put 
async function updateOrder(req, res, next) {
  //call the updateOrder method from the order service
  const order = await Order.updateOrder(req.body);
  //check if the order was updated successfully
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
  updateOrder,
  deleteOrder
}