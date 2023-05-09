const {createSR, createSRBody} = require("./serviceRequest");

const apiDocumentation = {
    openapi: "3.0.3",
    // swagger: "2.0",
    info: {
        version: '1.0.0',
        title: 'Siebel Training REST API',
        description: 'Sample REST APIs for Siebel Training',
    },
    schemes: [
        "http"
    ],
    servers: [
        {
            url: 'http://trnwebservice.cubastion.net/api/v1/rest/',
            description: 'Siebel Training Webservice Server',
        },
    ],
    // externalDocs: {
    //     description: "Download Swagger File",
    //     url: "/api/v1/rest/docs/sbl-trn-rest-api.yaml"
    // },
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
            createSRBody,
        },
    },
};

module.exports = { apiDocumentation };
