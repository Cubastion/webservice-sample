const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const md5 = require("md5");
let path = require("path");
const app = express();
const soap = require("soap");
const server = require("http").createServer(app);

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(8081, () => {
  console.log("Application started and Listening on port 8081");
});

const createSRService = {
  CreateSR_Service: {
    CreateSR_Port: {
      CreateSR_Operation: function (args) {
        console.log('Request Body: '+JSON.stringify(args));
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
        console.log('Request Body: '+JSON.stringify(args));
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
        console.log('Request Body: '+JSON.stringify(args));
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

let srWSDL = path.join(__dirname, "./wsdl/createSR.wsdl");
let expenseReportWSDL = path.join(__dirname, "./wsdl/submitExpenseReport.wsdl");
let healthPolicyWSDL = path.join(__dirname, "./wsdl/submitHealthPolicy.wsdl");

let srWSDLXML = fs.readFileSync(srWSDL, "utf8");
let expenseReportWSDLXML = fs.readFileSync(expenseReportWSDL, "utf8");
let healthPolicyWSDLXML = fs.readFileSync(healthPolicyWSDL, "utf8");

soap.listen(server, "/createSR", createSRService, srWSDLXML);
soap.listen(server, "/submitExpenseReport", submitExpenseReportService, expenseReportWSDLXML);
soap.listen(server, "/submitHealthPolicy", submitHealthPolicyService, healthPolicyWSDLXML);
