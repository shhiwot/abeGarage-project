

//create a route to handle the update order request on put
router.put(
  "/api/order/",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.updateOrder
);
//create a route to handle the delete order request on delete
router.delete(
  "/api/order/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  orderController.deleteOrder
);


