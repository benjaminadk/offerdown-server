import { combineResolvers } from 'graphql-resolvers'

import { ResolverMap, Resolver } from '../../../types/graphql-utils'
import { isAuthenticated } from '../../../utils/permissions'
import { Message } from '../../../entity/Message'

const createMessage: Resolver = async (_, { text, offerId }, { session: { userId } }) => {
  const message = Message.create({ text, offerId, userId })
  await message.save()
  return true
}

export const resolvers: ResolverMap = {
  Mutation: {
    createMessage: combineResolvers(isAuthenticated, createMessage)
  }
}
