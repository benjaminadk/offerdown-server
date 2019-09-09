import * as Redis from 'ioredis'
import { RedisPubSub } from 'graphql-redis-subscriptions'

const dateReviver = (key: any, value: any) => {
  if (key === 'createdAt') {
    const isISO8601Z = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/
    if (typeof value === 'string' && isISO8601Z.test(value)) {
      return Date.parse(value)
    }
  }
  return value
}

export const redis = new Redis()
export const pubsub = new RedisPubSub({ reviver: dateReviver })
