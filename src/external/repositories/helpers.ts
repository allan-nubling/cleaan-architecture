import { ConnectionOptions, createConnection, getConnection } from 'typeorm'

import 'reflect-metadata'
import 'mssql'
import { AzureKeyVault } from '../azureKeyVault'

export default class Database {
    static async getConfigs(): Promise<ConnectionOptions[]> {
        const [
            DB_MYSQL_HOST,
            DB_MYSQL_USERNAME,
            DB_MYSQL_PASSWORD,
            DB_MYSQL_DATABASE,
            DB_MSSQL_HOST,
            DB_MSSQL_USERNAME,
            DB_MSSQL_PASSWORD,
            DB_MSSQL_DATABASE
        ] = await Promise.all(
            [
                'DB_MYSQL_HOST',
                'DB_MYSQL_USERNAME',
                'DB_MYSQL_PASSWORD',
                'DB_MYSQL_DATABASE',
                'DB_MSSQL_HOST',
                'DB_MSSQL_USERNAME',
                'DB_MSSQL_PASSWORD',
                'DB_MSSQL_DATABASE'
            ].map(key => AzureKeyVault.getSecret(key))
        )
        const { DB_LOGGING } = process.env
        const mssql: ConnectionOptions = {
            name: 'mssql',
            type: 'mssql',
            host: DB_MSSQL_HOST,
            port: 1433,
            username: DB_MSSQL_USERNAME,
            password: DB_MSSQL_PASSWORD,
            database: DB_MSSQL_DATABASE,
            extra: {
                enableArithAbort: true,
                encrypt: true,
                trustServerCertificate: true
            },
            pool: {
                idleTimeoutMillis: 20000,
                acquireTimeoutMillis: 20000
            },
            logging: JSON.parse(DB_LOGGING || 'false')
        }
        const mysql: ConnectionOptions = {
            name: 'mysql',
            type: 'mysql',
            host: DB_MYSQL_HOST,
            port: 3306,
            username: DB_MYSQL_USERNAME,
            password: DB_MYSQL_PASSWORD,
            database: DB_MYSQL_DATABASE,
            logging: JSON.parse(DB_LOGGING || 'false')
        }

        return [mssql, mysql]
    }

    static async connect(): Promise<void> {
        const configs = await Database.getConfigs()
        await Promise.all(
            configs.map(async config => {
                try {
                    getConnection(config.name)
                } catch (error) {
                    await createConnection(config)
                    if (process.env.NODE_ENV === 'development') {
                        // eslint-disable-next-line no-console
                        console.info(`⚡️[server]: DB ${config.name} connected`)
                    }
                }
            })
        )
    }
}
