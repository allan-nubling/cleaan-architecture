import { HttpHelpers } from '@adapters/presentation/helpers/http'
import { Created } from '@adapters/presentation/helpers/HttpResponses'
import { IHttpRequest, IHttpResponse } from '@adapters/presentation/ports/http'
import { Home } from '@usecases/home'

import { IController } from '../../Controller'
import { RegisterGreetingsControllerSchema } from './registerGreetingsController.schema'

export class RegisterGreetingsController implements IController {
    constructor(private readonly home: Home) {}

    async handle(req: IHttpRequest): Promise<IHttpResponse> {
        try {
            await HttpHelpers.validateSchema(req.body, RegisterGreetingsControllerSchema)
            const { message } = req.body as Record<string, string>
            const data = await this.home.registerGreetings({ message })
            return new Created(data)
        } catch (error) {
            return HttpHelpers.handleErrors(error)
        }
    }
}
