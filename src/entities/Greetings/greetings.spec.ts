import { BadRequest } from '@shared/errors'

import { Greeting } from '.'

describe('Greeting entidade de dominio', () => {
    test('não deve criar uma Greeting com mensagem inválida (poucos caracteres)', async () => {
        const message = 'a'
        expect(() => {
            Greeting.create({ message })
        }).toThrow(BadRequest)
    })

    test('não deve criar uma Greeting com mensagem inválida (muitos caracteres)', async () => {
        let message = ''
        for (let i = 0; i < 256; i += 1) {
            message += 'c'
        }
        expect(() => {
            Greeting.create({ message })
        }).toThrow(BadRequest)
    })

    test('não deve criar uma Greeting com mensagem inválida (apenas espaços)', async () => {
        const message = '    '
        expect(() => {
            Greeting.create({ message })
        }).toThrow(BadRequest)
    })

    // test('não deve criar uma Greeting com mensagem inválida (poucos caracteres)', async () => {
    //     const message = ''
    //     expect(() => {
    //         Greeting.create({ message })
    //     }).toThrow(BadRequest)
    // })
})
