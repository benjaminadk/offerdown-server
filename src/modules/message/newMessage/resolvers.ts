import { withFilter } from 'graphql-yoga'
import { ResolverMap } from '../../../types/graphql-utils'

import { PUBSUB_NEW_MESSAGE } from '../../../constants'

export const resolvers: ResolverMap = {
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(PUBSUB_NEW_MESSAGE),
        (payload, variables) => {
          return payload.newMessage.offerId === variables.offerId
        }
      )
    }
  }
}
