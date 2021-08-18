import { Express, Request, Response } from 'express'
import fs from 'fs'
import { setup, serve } from 'swagger-ui-express'

export class Swagger {
    static async loadConfig(): Promise<any> {
        const config = {
            swagger: '2.0',
            basePath: '/api',
            info: {
                title: 'Tutorial de Node.JS',
                version: '1.0.0'
            },
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                Bearer: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            }
        }
        const defaultDefinitions = {
            ErrorResponse: {
                type: 'object',
                properties: {
                    errors: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/ErrorData'
                        }
                    }
                }
            },
            ErrorData: {
                type: 'object',
                properties: {
                    code: {
                        type: 'integer',
                        description: 'Error code'
                    },
                    message: {
                        type: 'string',
                        description: 'Error message'
                    }
                }
            }
        }
        const paths = {}

        const swaggerDocument = {
            ...config,
            paths: { ...paths },
            definitions: { ...defaultDefinitions }
        }

        await Promise.all(
            fs.readdirSync(`${__dirname}/../routes`).map(async file => {
                if (file.includes('.swagger.')) {
                    const { default: swagger } = await import(`../routes/${file}`)
                    swaggerDocument.paths = { ...swaggerDocument.paths, ...swagger.paths }
                    swaggerDocument.definitions = { ...swaggerDocument.definitions, ...swagger.definitions }
                }
            })
        )
        return swaggerDocument
    }

    static async register(app: Express): Promise<void> {
        const document = await Swagger.loadConfig()
        app.use('/api/docs', serve)
        app.get('/api/docs', setup(document))
        app.get('/api/docs.json', (_: Request, res: Response) => res.json(document))
    }
}
