import { HttpHelpers } from '@adapters/presentation/helpers/http'
import { Ok } from '@adapters/presentation/helpers/HttpResponses'
import { IHttpRequest, IHttpResponse } from '@adapters/presentation/ports/http'
import { Home } from '@usecases/home'

import { IController } from '../../Controller'

export class SendGreetingsController implements IController {
    constructor(private readonly home: Home) {}

    async handle(_req: IHttpRequest): Promise<IHttpResponse> {
        try {
            const data = await this.home.sendGreetings()
            return new Ok(data)
        } catch (error) {
            return HttpHelpers.handleErrors(error)
        }
    }
}
