import { Message } from './message'

export interface IGreetingData {
    message: string
}

export class Greeting {
    constructor(public readonly message: string) {
        Object.freeze(this)
    }

    static create(data: IGreetingData): Greeting {
        const message = Message.create(data.message)
        return new Greeting(message.value)
    }
}
