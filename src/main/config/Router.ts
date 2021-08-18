import { Express, Router as ExpressRouter } from 'express'
import { readdirSync } from 'fs'

export class Router {
    static register(app: Express): void {
        const router = ExpressRouter()
        app.use('/api', router)
        readdirSync(`${__dirname}/../routes`).map(async file => {
            if (!file.includes('.test.') && !file.includes('.swagger.')) {
                ;(await import(`../routes/${file}`)).default(router)
            }
        })
    }
}
