/* eslint-disable no-use-before-define */
export class GeneralError extends Error {
    status = 'error'

    constructor(readonly data: unknown) {
        super()
    }

    getCode(): number {
        if (this instanceof BadRequest) return 400
        if (this instanceof Unauthorized) return 401
        if (this instanceof NotFound) return 404
        if (this instanceof AlreadyExists) return 409
        if (this instanceof Unprocessable) return 422
        return 500
    }
}

export class BadRequest extends GeneralError {
    status = 'bad request'
}
export class Unauthorized extends GeneralError {
    status = 'unauthorized'
}
export class NotFound extends GeneralError {
    status = 'not found'
}
export class Unprocessable extends GeneralError {
    status = 'unprocessable'
}
export class AlreadyExists extends GeneralError {
    status = 'already exists'
}
