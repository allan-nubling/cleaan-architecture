import { Greeting } from '@entities/Greetings'
import { InMemoryGreetingsRepository } from '@usecases/ports/repositories/inMemomoryGreetings'

import { Home } from '.'

const dummyGreetings = [new Greeting('Olá, seja bem vindo!')]
const dummyMessage = ['Olá, como vai?']

describe('Home usecase specs', () => {
    const greetingsRepository = new InMemoryGreetingsRepository(dummyGreetings)
    const home = new Home(greetingsRepository)

    test('sendGreeting() deve retornar uma "message"', async () => {
        const data = await home.sendGreetings()
        expect(data).toBe(dummyGreetings[0].message)
    })

    test('registerGreetings() deve retornar a "Greeting" adicionada', async () => {
        const data = await home.registerGreetings({ message: dummyMessage[0] })
        expect(data.message).toBe(dummyMessage[0])
    })

    // test.todo('clear() deve limpar todas as greetings do repositório.')

    // test('não deve criar uma Greeting com mensagem inválida (muitos caracteres)', async () => {
    //     let message = ''
    //     for (let i = 0; i < 256; i += 1) {
    //         message += 'c'
    //     }
    //     expect(() => {
    //         Greeting.create({ message })
    //     }).toThrow(BadRequest)
    // })
})
