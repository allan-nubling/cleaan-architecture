import { Greeting } from '@entities/Greetings'

export interface IGreetingsRepository {
    getOne: () => Promise<Greeting>
    add: (greeting: Greeting) => Promise<Greeting>
}
