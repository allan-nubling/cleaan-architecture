import { IHttpResponse } from '../ports/http'

export class HttpResponse implements IHttpResponse {
    constructor(readonly status: string, readonly code: number, readonly data: unknown) {}
}

export class Ok extends HttpResponse {
    constructor(data: unknown) {
        super('ok', 200, data)
    }
}

export class Created extends HttpResponse {
    constructor(data: unknown) {
        super('created', 201, data)
    }
}

export class NoContent extends HttpResponse {
    constructor(data: unknown) {
        super('no content', 204, data)
    }
}
