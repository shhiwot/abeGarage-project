// Import the express module  
router.put(
  "/employee/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.updateEmployee
);

// Export the router
module.exports = router;


