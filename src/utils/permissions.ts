import { Resolver } from '../types/graphql-utils'

export const isAuthenticated: Resolver = async (_, __, { session }) => {
  if (!session.userId) {
    throw Error('Invalid permissions')
  }
}
