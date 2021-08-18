import { Greeting } from '@entities/Greetings'

import { IGreetingsRepository } from '../greetings'

export class InMemoryGreetingsRepository implements IGreetingsRepository {
    constructor(public greetings: Greeting[]) {}

    async getOne(): Promise<Greeting> {
        if (!this.greetings.length) {
            return null
        }
        return this.greetings[0]
    }

    async add(greeting: Greeting): Promise<Greeting> {
        this.greetings.push(greeting)
        return greeting
    }
}
