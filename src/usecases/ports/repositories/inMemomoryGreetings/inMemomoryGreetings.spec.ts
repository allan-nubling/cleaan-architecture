import { Greeting } from '@entities/Greetings'

import { InMemoryGreetingsRepository } from '.'

// const dummyGreetings = [new Greeting('Olá, seja bem vindo!')]
const dummyMessage = ['Olá, como vai?']

describe('InMemory Greeting repository', () => {
    const greetingsRepository = new InMemoryGreetingsRepository([])

    test('getOne() deve retornar null se não houver greetings', async () => {
        const greeting = await greetingsRepository.getOne()
        expect(greeting).toBeNull()
    })

    test('add() deve retornar a "Greeting" adicionada', async () => {
        const greeting = Greeting.create({ message: dummyMessage[0] })
        const addedGreeting = await greetingsRepository.add(greeting)
        expect(addedGreeting).toBeInstanceOf(Greeting)
        expect(addedGreeting.message).toBe(greeting.message)
    })

    // greetingsRepository.add(dummyGreetings[0])

    test('getOne() deve retornar uma "Greeting"', async () => {
        const greeting = await greetingsRepository.getOne()
        expect(greeting).toBeInstanceOf(Greeting)
    })

    test.todo('clear() deve limpar todas as greetings do repositório.')

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
