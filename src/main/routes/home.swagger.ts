const paths = {
    '/': {
        get: {
            tags: ['Home'],
            summary: 'home',
            description: 'Get user by Id',
            security: [
                {
                    Bearer: []
                }
            ],
            responses: {
                200: {
                    description: 'OK',
                    schema: {
                        $ref: '#/definitions/Greetings'
                    }
                },
                404: {
                    description: 'Not Found',
                    schema: {
                        $ref: '#/definitions/ErrorResponse'
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    schema: {
                        $ref: '#/definitions/ErrorResponse'
                    }
                }
            }
        }
    },
    '/register': {
        post: {
            tags: ['Home'],
            summary: 'User',
            description: 'Create user',
            security: [
                {
                    Bearer: []
                }
            ],
            parameters: [
                {
                    in: 'body',
                    name: 'update',
                    required: true,
                    schema: {
                        $ref: '#/definitions/RegisterPayload'
                    }
                }
            ],
            responses: {
                201: {
                    description: 'Created',
                    schema: {
                        $ref: '#/definitions/Greetings'
                    }
                },
                404: {
                    description: 'Not Found',
                    schema: {
                        $ref: '#/definitions/ErrorResponse'
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    schema: {
                        $ref: '#/definitions/ErrorResponse'
                    }
                }
            }
        }
    }
}

const definitions = {
    Greetings: {
        type: 'object',
        properties: {
            status: { type: 'string' },
            code: { type: 'number' },
            data: { type: 'string' }
        }
    },
    RegisterPayload: {
        type: 'object',
        properties: {
            message: { type: 'string' }
        }
    }
}

export default {
    paths,
    definitions
}
