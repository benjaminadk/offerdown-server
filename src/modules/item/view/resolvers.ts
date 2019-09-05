import { ResolverMap } from '../../../types/graphql-utils'
import { Item } from '../../../entity/Item'

export const resolvers: ResolverMap = {
  Query: {
    viewItem: async (_, { id }) => {
      return Item.findOne({ where: { id } })
    }
  }
}
