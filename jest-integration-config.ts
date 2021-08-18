import type { Config } from '@jest/types'

import jestConfig from './jest.config'

export default async (): Promise<Config.InitialOptions> =>
    jestConfig().then(config => ({
        ...config,
        testMatch: ['**/*.test.ts']
    }))
