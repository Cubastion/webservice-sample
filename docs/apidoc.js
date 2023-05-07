const {createUser, createUserBody, deleteUser} = require("./users");

const apiDocumentation = {
    openapi: "3.0.3",
    info: {
        version: '1.0.0',
        title: 'Sample REST API - Documentation',
        description: 'Sample REST API - Documentation',
    },
    servers: [
        {
            url: 'http://localhost:8081/',
            description: 'Training Server',
        },
    ],
    tags: [
        {
            name: 'Roles',
        },
        {
            name: 'Users',
        },
    ],
    paths: {
        "/users": {
            post: createUser,
        },
        "/users/{id}": {
            delete: deleteUser,
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            createUserBody,
        },
    },
};

module.exports = { apiDocumentation };
