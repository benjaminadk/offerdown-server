import 'reflect-metadata'
import 'dotenv/config'
import { GraphQLServer } from 'graphql-yoga'
import * as express from 'express'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis'
import * as RateLimit from 'express-rate-limit'
import * as RateLimitRedisStore from 'rate-limit-redis'

import { createTypeormConnection } from './utils/createTypeormConnection'
import { generateSchema } from './utils/generateSchema'
import { redis, pubsub } from './services/redis'
import { sessionPrefix, fifteenMinutes, oneWeek } from './constants'
import { confirmEmail } from './routes/confirmEmail'
import { createTestConnection } from './testUtils/createTestConnection'

const RedisStore = connectRedis(session as any)

export const startServer = async () => {
  if (process.env.NODE_ENV === 'test') {
    await redis.flushall()
  }

  const server = new GraphQLServer({
    schema: generateSchema() as any,
    context: ({ request }: any) => {
      return {
        redis,
        url: request ? request.protocol + '://' + request.get('host') : '',
        session: request ? request.session : undefined,
        request,
        pubsub
      }
    }
  })

  server.express.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: fifteenMinutes,
      max: 100
    })
  )

  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: sessionPrefix
      }),
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: oneWeek
      }
    } as any)
  )

  server.express.use('/images', express.static('images'))

  server.express.get('/confirm/:id', confirmEmail)

  if (process.env.NODE_ENV === 'test') {
    await createTestConnection(true)
  } else {
    await createTypeormConnection()
  }

  const app = await server.start({
    port: process.env.NODE_ENV === 'test' ? 0 : process.env.PORT,
    subscriptions: '/',
    cors: {
      origin: process.env.NODE_ENV === 'test' ? '*' : (process.env.FRONTEND as string),
      credentials: true
    },
    tracing: true
  })

  console.log(`Server listening on http://localhost:${process.env.PORT}`)

  return app
}
