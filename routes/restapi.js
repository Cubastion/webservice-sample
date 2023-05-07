const routes = require("express").Router();
const restController = require("../controllers/restController");

routes.post("/calculatePremium", restController.calculatePremium)
routes.post("/fetchPrice", restController.fetchPrice)
routes.post("/validatePAN", restController.validatePAN)
routes.post("/submitHealthPolicy", restController.submitHealthPolicy)
routes.post("/submitExpenseReport", restController.submitExpenseReport)
routes.post("/createSR", restController.createSR)

module.exports = routes;
