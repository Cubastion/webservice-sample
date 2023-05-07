const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const soap = require("soap");
const server = require("http").createServer(app);
const swaggerUi = require('swagger-ui-express');
const apiDoc = require('./docs/apidoc');
const soapController = require("./controllers/soapController");

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDoc.apiDocumentation));

//***********************************REST APIs***********************************
const restRoutes = require("./routes/restapi");
app.use(express.json());
app.use("/api/v1/rest/", restRoutes);
//***********************************REST APIs***********************************

//***********************************SOAP APIs***********************************
const srWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/createSR.wsdl"), "utf8");
const expenseReportWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/submitExpenseReport.wsdl"), "utf8");
const healthPolicyWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/submitHealthPolicy.wsdl"), "utf8");
const calculatePremiumWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/calculatePremium.wsdl"), "utf8");
const fetchPriceWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/fetchPrice.wsdl"), "utf8");
const validatePANWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/validatePAN.wsdl"), "utf8");

soap.listen(server, "/api/v1/soap/createSR", soapController.createSRService, srWSDL);
soap.listen(server, "/api/v1/soap/submitExpenseReport", soapController.submitExpenseReportService, expenseReportWSDL);
soap.listen(server, "/api/v1/soap/submitHealthPolicy", soapController.submitHealthPolicyService, healthPolicyWSDL);
soap.listen(server, "/api/v1/soap/calculatePremium", soapController.calculatePremiumService, calculatePremiumWSDL);
soap.listen(server, "/api/v1/soap/fetchPrice", soapController.fetchPriceService, fetchPriceWSDL);
soap.listen(server, "/api/v1/soap/validatePAN", soapController.validatePANService, validatePANWSDL);
//***********************************SOAP APIs***********************************

server.listen(8081, () => {
  console.log("SOAP & REST API Server started and Listening on port 8081");
});
