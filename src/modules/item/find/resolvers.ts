import { Item } from '../../../entity/Item'
import { ResolverMap } from '../../../types/graphql-utils'
import { User } from '../../../entity/User'

export const resolvers: ResolverMap = {
  Item: {
    images: (parent, _, { url }) => parent.images.map((image: string) => `${url}/images/${image}`),
    seller: ({ userId }) => User.findOne({ id: userId })
  },
  Query: {
    findItems: async () => {
      return Item.find({ cache: true })
    }
  }
}
