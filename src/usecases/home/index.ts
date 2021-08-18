import { Greeting, IGreetingData } from '@entities/Greetings'
import { IGreetingsRepository } from '@usecases/ports/repositories/greetings'

export type SendGreetingsResponse = Promise<string>
export type GreetingRegisterResponse = Promise<Greeting>

export class Home {
    constructor(private readonly greetingsRepository: IGreetingsRepository) {}

    async sendGreetings(): SendGreetingsResponse {
        const greeting = await this.greetingsRepository.getOne()
        return greeting?.message || null
    }

    async registerGreetings(data: IGreetingData): GreetingRegisterResponse {
        return this.greetingsRepository.add(data)
    }
}
