import { IController } from '@adapters/presentation/controller/Controller'
import { RegisterGreetingsController } from '@adapters/presentation/controller/home/RegisterGreetingsController/RegisterGreetingsController'
import { SendGreetingsController } from '@adapters/presentation/controller/home/SendGreetingsController/SendGreetingsController'
import { Home } from '@usecases/home'
import { InMemoryGreetingsRepository } from '@usecases/ports/repositories/inMemomoryGreetings'

const greetingsRepository = new InMemoryGreetingsRepository([])
const home = new Home(greetingsRepository)
export class MakeHomeControllers {
    static registerGreetings(): IController {
        return new RegisterGreetingsController(home)
    }

    static sendGreetings(): IController {
        return new SendGreetingsController(home)
    }
}
