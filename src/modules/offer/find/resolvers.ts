import { combineResolvers } from 'graphql-resolvers'

import { ResolverMap, Resolver } from '../../../types/graphql-utils'
import { Offer } from '../../../entity/Offer'
import { isAuthenticated } from '../../../utils/permissions'

const findSellingOffers: Resolver = async (_, __, { session: { userId } }) => {
  return Offer.find({ where: { sellerId: userId } })
}

const findBuyingOffers: Resolver = async (_, __, { session: { userId } }) => {
  return Offer.find({ where: { buyerId: userId } })
}

const findSellingOffersByItemId: Resolver = async (_, { itemId }, { session: { userId } }) => {
  return Offer.find({ where: { itemId, sellerId: userId } })
}

export const resolvers: ResolverMap = {
  Query: {
    findSellingOffers: combineResolvers(isAuthenticated, findSellingOffers),
    findBuyingOffers: combineResolvers(isAuthenticated, findBuyingOffers),
    findSellingOffersByItemId: combineResolvers(isAuthenticated, findSellingOffersByItemId)
  }
}
