import { ResolverMap } from '../../../types/graphql-utils'
import { Message } from '../../../entity/Message'
import { User } from '../../../entity/User'

export const resolvers: ResolverMap = {
  Message: {
    user: async ({ userId }) => {
      return User.findOne({ where: { id: userId } })
    }
  },
  Query: {
    findMessages: async (_, { offerId }) => {
      return Message.find({ where: { offerId } })
    }
  }
}
