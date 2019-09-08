import * as yup from 'yup'
import { combineResolvers } from 'graphql-resolvers'

import { isAuthenticated } from '../../../utils/permissions'
import { ResolverMap, Resolver } from '../../../types/graphql-utils'
import { formatYupError } from '../../../utils/formatYupError'
import { Offer } from '../../../entity/Offer'
import { Message } from '../../../entity/Message'

const validator = yup.object().shape({
  itemId: yup.string().required(),
  sellerId: yup.string().required(),
  text: yup
    .string()
    .max(500)
    .required()
})

const createOffer: Resolver = async (_, { input }, { session: { userId } }) => {
  try {
    await validator.validate(input, { abortEarly: false })
  } catch (error) {
    return formatYupError(error)
  }

  const { itemId, sellerId, text } = input

  const existingOffer = await Offer.findOne({ where: { itemId, buyerId: userId } })

  if (existingOffer) {
    const message = Message.create({ text, offerId: existingOffer.id, userId })
    await message.save()
    return null
  }

  const offer = Offer.create({ itemId, sellerId, buyerId: userId })
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
