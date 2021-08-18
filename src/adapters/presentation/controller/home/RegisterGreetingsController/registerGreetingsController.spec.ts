import { HttpResponse } from '@adapters/presentation/helpers/HttpResponses'
import { IHttpRequest } from '@adapters/presentation/ports/http'
import { Home } from '@usecases/home'
import { InMemoryGreetingsRepository } from '@usecases/ports/repositories/inMemomoryGreetings'

import { RegisterGreetingsController } from './RegisterGreetingsController'

const dummyMessage = 'Olá, como vai?'

describe('RegisterGreetingsController', () => {
    const greetingsRepository = new InMemoryGreetingsRepository([])
    const home = new Home(greetingsRepository)
    const controller = new RegisterGreetingsController(home)

    test('registerGreetings() deve retornar 201 quando registrar a mensagem', async () => {
        const request: IHttpRequest = { body: { message: dummyMessage } }
        const response = await controller.handle(request)
        expect(response).toBeInstanceOf(HttpResponse)
        expect(response.code).toBe(201)
    })

    test('registerGreetings() não deve aceitar uma requisição com message vazia', async () => {
        const request: IHttpRequest = { body: { message: '' } }
        const response = await controller.handle(request)
        expect(response).toBeInstanceOf(HttpResponse)
        expect(response.code).toBe(422)
    })

    test('registerGreetings() não deve aceitar uma requisição com message muito grande', async () => {
        let message = ''
        for (let i = 0; i < 256; i += 1) {
            message += 'c'
        }
        const request: IHttpRequest = { body: { message } }
        const response = await controller.handle(request)
        expect(response).toBeInstanceOf(HttpResponse)
        expect(response.code).toBe(422)
    })
})
