import Database from '@external/repositories/helpers'

import { Application } from './config/Application'

const { NODE_ENV, PORT = 3000 } = process.env
const app = Application.create()
Database.connect().then(() => {
    app.listen(PORT, () => {
        if (NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(`⚡️[server]: Server is running on port ${PORT || 3000}`)
        }
    })
})
