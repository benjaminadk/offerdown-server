import * as yup from 'yup'
import { combineResolvers } from 'graphql-resolvers'

import { isAuthenticated } from '../../../utils/permissions'
import { ResolverMap, Resolver } from '../../../types/graphql-utils'
import { formatYupError } from '../../../utils/formatYupError'
import { Offer } from '../../../entity/Offer'
import { Message } from '../../../entity/Message'

const validator = yup
  .string()
  .max(500)
  .required()

const createOffer: Resolver = async (_, { itemId, text }, { session: { userId } }) => {
  try {
    await validator.validate(text, { abortEarly: false })
  } catch (error) {
    return formatYupError(error)
  }

  const offer = Offer.create({ itemId, userId })
  await offer.save()

  const message = Message.create({ text, offerId: offer.id, userId })
  await message.save()

  return null
}

export const resolvers: ResolverMap = {
  Mutation: {
    createOffer: combineResolvers(isAuthenticated, createOffer)
  }
}
