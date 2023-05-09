const express = require("express");
const app = express();

//************************************************************REST APIs************************************************************
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const apiDoc = require('./docs/apidoc');
const restRoutes = require("./routes/restapi");
const yaml = require('js-yaml');
const apiDefinition = {definition: apiDoc.apiDocumentation, apis: []};
const swaggerSpec = swaggerJSDoc(apiDefinition);
app.use('/api/v1/rest/docs', swaggerUi.serve, swaggerUi.setup(apiDoc.apiDocumentation));
app.get('/api/v1/rest/sbl-trn-rest-api.yaml', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // res.send(yaml.dump(swaggerSpec));
  res.send(swaggerSpec);
});
app.use(express.json());
app.use("/api/v1/rest/", restRoutes);
//************************************************************REST APIs************************************************************

//************************************************************SOAP APIs************************************************************
const fs = require("fs");
const path = require("path");
const soap = require("soap");
const server = require("http").createServer(app);
const soapController = require("./controllers/soapController");
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
//************************************************************SOAP APIs************************************************************

server.listen(80, () => {
  console.log("SOAP & REST API Server started and Listening on port 80");
});
