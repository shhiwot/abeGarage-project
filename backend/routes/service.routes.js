//impport eaxpress
const express = require("express");
//call the router
const router = express.Router();
//import the service controller
const serviceController = require("../controllers/service.controller");
//import the auth middleware
const authMiddleware = require("../middlewares/auth.middleware");

//create a route to handle the add service request on post
router.post("/api/service",[authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.createService);
//create a route to handle the get all services request on get
router.get("/api/services",[authMiddleware.verifyToken], serviceController.getAllServices);
//create a route to handle the get single service request on get
router.get("/api/service/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.getServiceById);
//create a route to handle the update service request on put
router.put("/api/service/", [authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.updateService);
//create a route to handle the delete service request on delete
router.delete("/api/service/:id",[authMiddleware.verifyToken, authMiddleware.isAdmin], serviceController.deleteService);
//export the router
module.exports = router;