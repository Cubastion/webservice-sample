const md5 = require("md5");
let calculatePremium = async (req, res) => {
    const age = req.body.age;
    const sumInsured = req.body.sumInsured;
    const factor = 0 < age <= 10 ? 4 : 10 < age <= 25 ? 5 : 25 < age <= 45 ? 6 : 45 < age <= 60 ? 7 : 60 < age ? 9 : 1;
    return res.status(200).send({ data: {premium: sumInsured * factor/100} });
}

let fetchPrice = async (req, res) => {
    let items = [];
    const min = 20, max = 40;
    req.body.items?.forEach((data) => {
        items.push({productName: data.productName, unitPrice: (Math.floor(Math.random() * (max - min + 1)) + min)*100});
    });
    return res.status(200).send({ data: {
            bookingId: req.body.bookingId,
            items: items
        }});
}

let validatePAN = async (req, res) => {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return res.status(200).send({ data: {
            status_message: regex.test(req.body.pan) ? "PAN Number format is valid" : "PAN Number format in not valid"
        }});
}

let submitHealthPolicy = async (req, res) => {
    const integrationId = req.body.integrationId;
    let insured = [];
    req.body.insured?.forEach((data) => {
        insured.push({integrationId: data.integrationId, insuredNumber: md5(data.integrationId)});
    });

    return res.status(200).send({ data: {
            integrationId: integrationId,
            policyNumber: md5(integrationId),
            insured: insured
        }});
}

let submitExpenseReport = async (req, res) => {
    const integrationId = req.body.integrationId;
    let items = [];
    req.body.items?.forEach((data) => {
        items.push({integrationId: data.integrationId, expenseReportItemNumber: md5(data.integrationId)});
    });

    return res.status(200).send({ data: {
            integrationId: integrationId,
            expenseReportNumber: md5(integrationId),
            items: items
        }});
}

let createSR = async (req, res) => {
    const integrationId = req.body.integrationId;
    return res.status(200).send({ data: {
            integrationId: integrationId,
            srNumber: md5(integrationId)
        }});
}

module.exports = {
    calculatePremium,
    fetchPrice,
    validatePAN,
    submitHealthPolicy,
    submitExpenseReport,
    createSR
}
