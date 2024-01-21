import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import Connect from 'connect-pg-simple'
import session from 'express-session'

import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

AdminJS.registerAdapter({ Database, Resource })

const PORT = 3000

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
  }
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}
const start = async () => {
    const usersNavigation = {
        name: 'Users',
        icon: 'User',
    }
    const adminOptions = {
        resources: [{
            resource: { model: getModelByName('User'), client: prisma },
            options: {
                navigation: usersNavigation,
            },
        }, {
            resource: { model: getModelByName('Problem'), client: prisma },
            options: {},
        }, {
            resource: { model: getModelByName('UserSolvedProblem'), client: prisma },
            options: {},
        }],
    }
    const app = express()

    const admin = new AdminJS(adminOptions)
    
    const ConnectSession = Connect(session)
    const sessionStore = new ConnectSession({
        conObject: {
        connectionString: 'postgres://adminjs:@localhost:5432/adminjs',
        ssl: process.env.NODE_ENV === 'production',
        },
        tableName: 'session',
        createTableIfMissing: true,
    })

    const adminRouter = AdminJSExpress.buildRouter(admin)

    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}

start()