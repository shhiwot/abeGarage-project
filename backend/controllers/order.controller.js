const orderService = require('../services/order.service');

exports.orderController = {
  // Update an existing order
  updateOrder: async (req, res) => {
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

    // Basic validation
    if (
      !order_id ||
      !customer_id ||
      !employee_id ||
      !vehicle_id ||
      !service_id ||
      !order_date ||
      !order_completed ||
      !order_services
    ) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Please provide all required fields',
      });
    }

    try {
      const updated = await orderService.updateOrder({
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

    if (updated) {
        return res.status(200).json({
        message: 'Order updated successfully',
        success: true,
        });
    } else {
        return res.status(404).json({
        error: 'Not Found',
        message: 'Order not found',
        });
    }
    } catch (error) {
    return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred.',
    });
    }
},

  // Delete an existing order
deleteOrder: async (req, res) => {
    const { id } = req.params;

    try {
    const deleted = await orderService.deleteOrder(id);

    if (deleted) {
        return res.status(200).json({
        message: 'Order deleted successfully',
        success: true,
        });
    } else {
        return res.status(404).json({
        error: 'Not Found',
        message: 'Order not found',
        });
    }
    } catch (error) {
    return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred.',
    });
    }
}
};
