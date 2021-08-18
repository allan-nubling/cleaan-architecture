/* eslint-disable no-console */
import yup from '@external/yupValidation'
import { GeneralError, Unprocessable } from '@shared/errors'

import { IHttpRequest, IHttpResponse } from '../ports/http'
import { HttpResponse } from './HttpResponses'

const { NODE_ENV } = process.env

export class HttpHelpers {
    static handleErrors(error: GeneralError | Error): IHttpResponse {
        if (error instanceof GeneralError) {
            if (NODE_ENV === 'development') {
                console.error(error.data)
            }
            return new HttpResponse(error.status, error.getCode(), error.data)
        }
        console.error(`[${new Date().toISOString()}]: ${error.message}`)
        return new HttpResponse('internal server error', 500, error)
    }

    static async validateSchema(req: IHttpRequest, schema: yup.AnySchema): Promise<void> {
        try {
            await schema.validate(req, { abortEarly: false })
        } catch ({ errors }) {
            throw new Unprocessable(errors)
        }
    }
}
