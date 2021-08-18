import { HttpResponse } from '@adapters/presentation/helpers/HttpResponses'
import { IHttpRequest } from '@adapters/presentation/ports/http'
import { Greeting } from '@entities/Greetings'
import { Home } from '@usecases/home'
import { InMemoryGreetingsRepository } from '@usecases/ports/repositories/inMemomoryGreetings'

import { SendGreetingsController } from './SendGreetingsController'

const dummyGreetings = [new Greeting('Olá, seja bem vindo!')]
// const dummyMessage = 'Olá, como vai?'

describe('SendGreetingsController', () => {
    const greetingsRepository = new InMemoryGreetingsRepository(dummyGreetings)
    const home = new Home(greetingsRepository)
    const controller = new SendGreetingsController(home)

    test('sendGreeting() deve retornar 200 e a mensagem', async () => {
        const request: IHttpRequest = { body: { message: '' } }
        const response = await controller.handle(request)
        expect(response).toBeInstanceOf(HttpResponse)
        expect(response.data).toBe(dummyGreetings[0].message)
        expect(response.code).toBe(200)
    })

    // test('sendGreeting() não deve aceitar uma requisição com message vazia', async () => {
    //     const request: IHttpRequest = { body: { message: '' } }
    //     const response = await controller.handle(request)
    //     expect(response).toBeInstanceOf(HttpResponse)
    //     expect(response.code).toBe(422)
    // })

    // test('sendGreeting() não deve aceitar uma requisição com message muito grande', async () => {
    //     let message = ''
    //     for (let i = 0; i < 256; i += 1) {
    //         message += 'c'
    //     }
    //     const request: IHttpRequest = { body: { message } }
    //     const response = await controller.handle(request)
    //     expect(response).toBeInstanceOf(HttpResponse)
    // expect(response.code).toBe(422)
    // })
})
