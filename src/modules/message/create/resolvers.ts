import { combineResolvers } from 'graphql-resolvers'

import { ResolverMap, Resolver } from '../../../types/graphql-utils'
import { isAuthenticated } from '../../../utils/permissions'
import { Message } from '../../../entity/Message'
import { PUBSUB_NEW_MESSAGE } from '../../../constants'

const createMessage: Resolver = async (_, { text, offerId }, { session: { userId }, pubsub }) => {
  const message = Message.create({ text, offerId, userId })
  await message.save()

  pubsub.publish(PUBSUB_NEW_MESSAGE, { newMessage: message })

  return true
}

export const resolvers: ResolverMap = {
  Mutation: {
    createMessage: combineResolvers(isAuthenticated, createMessage)
  }
}
