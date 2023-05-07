const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const md5 = require("md5");
const path = require("path");
const app = express();
const soap = require("soap");
const server = require("http").createServer(app);
const swaggerUi = require('swagger-ui-express');
const apiDoc = require('./docs/apidoc');

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDoc.apiDocumentation));

//***********************************REST APIs***********************************
let restRoutes = require("./routes/restapi");
app.use(express.json());
app.use("/api/v1/rest/", restRoutes);
//***********************************REST APIs***********************************

//***********************************SOAP APIs***********************************
const createSRService = {
  CreateSR_Service: {
    CreateSR_Port: {
      CreateSR_Operation: function (args) {
        const integrationId = args.integrationId;
        return {
          integrationId: integrationId,
          srNumber: md5(integrationId)
        };
      }
    }
  }
};

const submitExpenseReportService = {
  SubmitExpenseReport_Service: {
    SubmitExpenseReport_Port: {
      SubmitExpenseReport_Operation: function (args) {
        const integrationId = args.integrationId;
        let ListOfExpenseReportItemOutput = {expenseReportItem: []};
        args.ListOfExpenseReportItemInput?.expenseReportItem?.forEach((data) => {
          ListOfExpenseReportItemOutput.expenseReportItem.push({integrationId: data.integrationId, expenseReportItemNumber: md5(data.integrationId)});
        });
        return {
          integrationId: integrationId,
          expenseReportNumber: md5(integrationId),
          ListOfExpenseReportItemOutput: ListOfExpenseReportItemOutput
        };
      }
    }
  }
};

const submitHealthPolicyService = {
  SubmitHealthPolicy_Service: {
    SubmitHealthPolicy_Port: {
      SubmitHealthPolicy_Operation: function (args) {
        const integrationId = args.integrationId;
        let ListOfInsuredOutput = {insured: []};
        args.ListOfInsuredInput?.insured?.forEach((data) => {
          ListOfInsuredOutput.insured.push({integrationId: data.integrationId, insuredNumber: md5(data.integrationId)});
        });
        return {
          integrationId: integrationId,
          policyNumber: md5(integrationId),
          ListOfInsuredOutput: ListOfInsuredOutput
        };
      }
    }
  }
};

const calculatePremiumService = {
  CalculatePremium_Service: {
    CalculatePremium_Port: {
      CalculatePremium_Operation: function (args) {
        const age = args.age;
        const sumInsured = args.sumInsured;
        const factor = 0 < age <= 10 ? 4 : 10 < age <= 25 ? 5 : 25 < age <= 45 ? 6 : 45 < age <= 60 ? 7 : 60 < age ? 9 : 1;
        return {
          premium: sumInsured * factor/100,
        };
      }
    }
  }
};

const fetchPriceService = {
  FetchPrice_Service: {
    FetchPrice_Port: {
      FetchPrice_Operation: function (args) {
        let ListOfItems = {items: []};
        const min = 20, max = 40;
        args.ListOfItems?.items?.forEach((data) => {
          ListOfItems.items.push({productName: data.productName, unitPrice: (Math.floor(Math.random() * (max - min + 1)) + min)*100});
        });
        return {
          bookingId: args.bookingId,
          ListOfItems: ListOfItems
        };
      }
    }
  }
};

const validatePANService = {
  ValidatePAN_Service: {
    ValidatePAN_Port: {
      ValidatePAN_Operation: function (args) {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return {
          status_message: regex.test(args.panNumber) ? "PAN Number format is valid" : "PAN Number format in not valid"
        };
      }
    }
  }
};

let srWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/createSR.wsdl"), "utf8");
let expenseReportWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/submitExpenseReport.wsdl"), "utf8");
let healthPolicyWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/submitHealthPolicy.wsdl"), "utf8");
let calculatePremiumWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/calculatePremium.wsdl"), "utf8");
let fetchPriceWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/fetchPrice.wsdl"), "utf8");
let validatePANWSDL = fs.readFileSync(path.join(__dirname, "./wsdl/validatePAN.wsdl"), "utf8");

soap.listen(server, "/api/v1/soap/createSR", createSRService, srWSDL);
soap.listen(server, "/api/v1/soap/submitExpenseReport", submitExpenseReportService, expenseReportWSDL);
soap.listen(server, "/api/v1/soap/submitHealthPolicy", submitHealthPolicyService, healthPolicyWSDL);
soap.listen(server, "/api/v1/soap/calculatePremium", calculatePremiumService, calculatePremiumWSDL);
soap.listen(server, "/api/v1/soap/fetchPrice", fetchPriceService, fetchPriceWSDL);
soap.listen(server, "/api/v1/soap/validatePAN", validatePANService, validatePANWSDL);
//***********************************SOAP APIs***********************************

server.listen(8081, () => {
  console.log("Application started and Listening on port 8081");
});
