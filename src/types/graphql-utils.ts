import { Redis } from 'ioredis'
import { RedisPubSub } from 'graphql-redis-subscriptions'

export interface Session extends Express.Session {
  userId?: string
}

export interface Context {
  redis: Redis
  url: string
  session: Session
  request: Express.Request
  pubsub: RedisPubSub
}

export type Resolver = (parent: any, args: any, context: Context, info: any) => any

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver }
  }
}
