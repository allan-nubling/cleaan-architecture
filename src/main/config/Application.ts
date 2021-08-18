import { urlencoded, json } from 'body-parser'
import cors from 'cors'
import express, { Express } from 'express'
// import passport from 'passport'

// import handleErrors from '@middlewares/handleErrors'

import { Router } from './Router'
import { Swagger } from './Swagger'
// import { strategy } from './passport'

export class Application {
    static create(): Express {
        const app = express()
        app.use(cors())
        app.use(urlencoded({ extended: false }))
        app.use(json())
        Router.register(app)
        Swagger.register(app)
        // app.use(handleErrors)
        return app
    }
}
