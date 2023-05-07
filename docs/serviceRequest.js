const createSR = {
    description: 'Create a new Service Request in external system using REST API',
    operationId: 'createSR',
    consumes: ["application/json"],
    produces: ["application/json"],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createSRBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '203': {
            description: 'SR created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            integrationId: {
                                type: 'string',
                                example: '88-ABDC198',
                            },
                            srNumber: {
                                type: 'string',
                                example: 'b26b3713f276e952ea32db9ad90d0538',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal Server Error',
                            },
                        },
                    },
                },
            },
        },
    },
};

const createSRBody = {
    type: 'object',
    properties: {
        fullName: {
            type: 'integrationId',
            example: '88-ABDC198',
        },
        accountName: {
            type: 'string',
            example: 'Cubastion Consulting Private Limited',
        },
        type: {
            type: 'string',
            example: 'Link Down',
        },
        raiseDate: {
            type: 'date',
            example: '2023-01-31',
        },
        comments: {
            type: 'string',
            example: 'Demo SR Created For REST API',
        },
        dff: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: "string",
                        example: 'Contact Number',
                    },
                    value: {
                        type: "string",
                        example: '9876543210',
                    },
                    mandatoryFlag: {
                        type: "string",
                        example: 'Y',
                    },
                }
            }
        },
        tasks: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: "string",
                        example: 'Contact Customer',
                    }
                }
            }
        }
    },
};

module.exports = { createSR, createSRBody};
