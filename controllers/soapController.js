const md5 = require("md5");

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

module.exports = {
    createSRService,
    submitExpenseReportService,
    submitHealthPolicyService,
    calculatePremiumService,
    fetchPriceService,
    validatePANService
}
