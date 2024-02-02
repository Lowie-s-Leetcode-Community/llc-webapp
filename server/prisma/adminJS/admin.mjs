import { createRequire } from "module";
const require = createRequire(import.meta.url);
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import argon2 from 'argon2';
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'

const winstonLogger = require('../../logger')
const prisma = new PrismaClient()

AdminJS.registerAdapter({ Database, Resource })

const PORT = process.env.ADMIN_PORT

const start = async () => {
    
    const adminOptions = {
        resources: [
          {
            resource: { model: getModelByName('User'), client: prisma },
        }, 
        {
            resource: { model: getModelByName('Account'), client: prisma },
            options: {
                properties: { password: { isVisible: false } },
                actions: {
                  list: {
                    isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
                  },
                  new: {
                    isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
                    handler: async (request, response, data) => {
                      const { record, resource, h } = data;
                
                      if (request.method === 'post') {
                        const payload = request.payload;
                        const hashedPassword = await argon2.hash(payload.password);
                        // Create a new account using Prisma
                        const newAccount = await prisma.account.create({
                          data: {
                            id: payload.id,
                            email: payload.email,
                            password: hashedPassword,
                            role: payload.role,
                          },
                        });
                
                        return {
                          record: resource.build(newAccount),
                          redirectUrl: h.resourceActionUrl({ resourceId: resource.id(), actionName: 'list' }),
                          notice: {
                            message: 'Successfully created a new account',
                          },
                        };
                      } else {
                        return {
                          record: resource.build(),
                        };
                      }
                    },
                  },
                },
            },
        }, {
            resource: { model: getModelByName('Problem'), client: prisma },
        }
      ]
    }
    const app = express()

    const admin = new AdminJS(adminOptions)
    
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {

        authenticate: async (email, password) => {
          const account = await prisma.account.findFirst({ 
            where: { email: email },
          });
          if (account && email === account.email && await argon2.verify(account.password, password)) {
            return { email: account.email, role: account.role };
          }
          return null;
        },
        cookiePassword: 'your-cookie-secret'
      }, null, {
        resave: false,
        saveUninitialized: true,
      });

    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
        winstonLogger.info(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}

start()