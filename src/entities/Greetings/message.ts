import { BadRequest } from '@shared/errors'

export class Message {
    constructor(private readonly message: string) {
        Object.freeze(this)
    }

    static create(message: string): Message {
        if (!Message.validate(message)) {
            throw new BadRequest('message inválida')
        }
        return new Message(message)
    }

    get value(): string {
        return this.message
    }

    static validate(message: string): boolean {
        if (!message || message.trim().length < 2 || message.trim().length > 255) {
            return false
        }
        return true
    }
}
