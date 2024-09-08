
// A function to update an existing order
async function updateOrder(id, orderData) {
  const {
    employee_id,
    customer_id,
    vehicle_id,
    order_date,
    order_total_price,
    estimated_completion_date,
    completion_date,
    order_description,
    order_completed,
    order_hash,
  } = orderData;      

  try {
    console.log("Calling updateOrder with:", id, orderData);
    const [result] = await conn.query(
      "UPDATE orders SET ? WHERE id = ?",
      [
        {
          employee_id,
          customer_id,
          vehicle_id,
          order_date,
          order_total_price,
          estimated_completion_date,
          completion_date,
          order_description,
          order_completed,
          order_hash,
        },
        id,
      ]   

    );
    console.log("Query executed. Rows:", result);
    if (result.affectedRows === 0) {
      console.log("Order not found, returning 404");
      return { status: 404, message: "Order not found" };
    }
    console.log("Order found, returning the order");
    return { status: 200, message: "Order updated successfully" };
  } catch (error) {     
    console.error("Error in updateOrder order:", error);
    return { status: 500, message: "Internal server error" };
  }
}

// A function to delete an order by ID
async function deleteOrder(id) {
  try {
    console.log("Calling deleteOrder with:", id);
    const [result] = await conn.query(
      "DELETE FROM orders WHERE id = ?",
      [id]
    );
    console.log("Query executed. Rows:", result);
    if (result.affectedRows === 0) {
      console.log("Order not found, returning 404");
      return { status: 404, message: "Order not found" };
    }
    console.log("Order found, returning the order");
    return { status: 200, message: "Order deleted successfully" };
  } catch (error) {
    console.error("Error in deleteOrder order:", error);
    return { status: 500, message: "Internal server error" };
  }
}

module.exports = {
  updateOrder,deleteOrder
};

