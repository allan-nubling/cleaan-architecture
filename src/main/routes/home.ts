import { Router } from 'express'

import { MakeHomeControllers } from '@main/factories/home'

import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
    router.get('/', adaptRoute(MakeHomeControllers.sendGreetings()))
    router.post('/register', adaptRoute(MakeHomeControllers.registerGreetings()))
}
