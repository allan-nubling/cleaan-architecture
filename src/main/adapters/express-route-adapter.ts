import { Request, Response } from 'express'

import { IController } from '@adapters/presentation/controller/Controller'
import { IHttpRequest, IHttpResponse } from '@adapters/presentation/ports/http'

export const adaptRoute =
    (controller: IController) =>
    async (req: Request, res: Response): Promise<void> => {
        const httpRequest: IHttpRequest = {
            body: req.body
        }
        const httpResponse: IHttpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.code).json(httpResponse)
    }
