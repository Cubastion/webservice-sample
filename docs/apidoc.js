const {createUser, createUserBody, deleteUser} = require("./users");

const apiDocumentation = {
    openapi: '3.1.0',
    swagger: "2.0",
    info: {
        version: '1.3.0',
        swagger: "2.0",
        title: 'Sample REST API - Documentation',
        description: 'Description of my API here',
        termsOfService: 'https://mysite.com/terms',
        contact: {
            name: 'Developer name',
            email: 'dev@example.com',
            url: 'https://devwebsite.com',
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        },
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
        users: {
            post: createUser,
        },
        'users/{id}': {
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