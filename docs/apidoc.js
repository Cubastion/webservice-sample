const {createSR, createSRRequest, createSRResponse} = require("./serviceRequest");

const apiDocumentation = {
    openapi: "2.0",
    swagger: "2.0",
    info: {
        version: 'v1',
        title: 'Siebel Training REST API',
        description: 'Sample REST APIs for Siebel Training',
    },
    // host: "http://trnwebservice.cubastion.net/api/v1/rest/",
    host: "localhost/api/v1/rest/",
    schemes: [
        "http"
    ],
    servers: [
        {
            // url: 'http://trnwebservice.cubastion.net/api/v1/rest/',
            url: 'localhost/api/v1/rest/',
            description: 'Siebel Training Webservice Server',
        },
    ],
    paths: {
        "/createSR": {
            post: createSR,
        },
        // "/submitExpenseReport": {
        //     post: createUser,
        // },
        // "/submitHealthPolicy": {
        //     post: createUser,
        // },
        // "/calculatePremium": {
        //     post: createUser,
        // },
        // "/fetchPrice": {
        //     post: createUser,
        // },
        // "/validatePAN": {
        //     post: createUser,
        // }
    },
    components: {
        securitySchemes: {
        },
        schemas: {
            createSRRequest,
            createSRResponse
        },
    },
};

module.exports = { apiDocumentation };
