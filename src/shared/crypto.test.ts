// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from 'dotenv'

import Crypto from './Crypto'

config()

describe('Crypto Module', () => {
    test('encrypt() deve retornar uma hash', async () => {
        const data = 'teste'
        const encrypted = Crypto.encrypt(data)
        expect(encrypted).not.toBe(data)
        expect(typeof encrypted).toBe('string')
    })

    test('decrypt() deve retornar o valor original', async () => {
        const data = 'teste'
        const encrypted = Crypto.encrypt(data)
        const decrypted = Crypto.decrypt(encrypted)
        expect(decrypted).toBe(data)
    })

    test('encryptObject() deve retornar uma hash', async () => {
        const data = { test: true }
        const encrypted = Crypto.encryptObject(data)
        expect(encrypted).not.toBe(data)
        expect(typeof encrypted).toBe('string')
    })

    test('decryptObject() deve retornar o valor original', async () => {
        const data = { test: true }
        const encrypted = Crypto.encryptObject(data)
        const decrypted = Crypto.decryptObject(encrypted)
        expect(decrypted).toMatchObject(data)
    })

    test('hashPassword() deve retornar uma hash', async () => {
        const password = 'senhaforte123'
        const hash = await Crypto.hashPassword(password)
        expect(hash).not.toBe(password)
        expect(typeof hash).toBe('string')
    })

    test('hashPassword() deve retornar uma hash', async () => {
        const password = 'senhaforte123'
        const hash = await Crypto.hashPassword(password)
        const isValid = await Crypto.verifyPassword(password, hash)
        expect(isValid).not.toBe(password)
        expect(isValid).toBeTruthy()
    })
})
