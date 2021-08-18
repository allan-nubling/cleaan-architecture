import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => ({
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@adapters/(.*)$': '<rootDir>/src/adapters/$1',
        '^@entities/(.*)$': '<rootDir>/src/entities/$1',
        '^@external/(.*)$': '<rootDir>/src/external/$1',
        '^@main/(.*)$': '<rootDir>/src/main/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '^@usecases/(.*)$': '<rootDir>/src/usecases/$1'
    }
})
