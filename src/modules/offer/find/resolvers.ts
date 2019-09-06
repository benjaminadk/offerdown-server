import { combineResolvers } from 'graphql-resolvers'

import { ResolverMap, Resolver } from '../../../types/graphql-utils'
import { Offer } from '../../../entity/Offer'
import { isAuthenticated } from '../../../utils/permissions'

const findOffers: Resolver = async (_, { type }, { session: { userId } }) => {
  if (type === 'BUYING') {
    return Offer.find({ where: { buyerId: userId } })
  }

  if (type === 'SELLING') {
    return Offer.find({ where: { sellerId: userId } })
  }

  throw Error('type argument must be of enum OfferType')
}

export const resolvers: ResolverMap = {
  Query: {
    findOffers: combineResolvers(isAuthenticated, findOffers)
  }
}
