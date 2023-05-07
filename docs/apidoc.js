const {createSR, createSRBody} = require("./serviceRequest");

const apiDocumentation = {
    openapi: "3.0.3",
    info: {
        version: '1.0.0',
        title: 'Siebel Training REST API',
        description: 'Sample REST APIs for Siebel Training',
    },
    servers: [
        {
            url: 'http://webservice.ws.svc.cluster.local:8081/api/v1/rest/',
            description: 'Training Server',
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
            createSRBody,
        },
    },
};

module.exports = { apiDocumentation };
