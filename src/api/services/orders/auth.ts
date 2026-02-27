import { decodeUserFromToken, getAccessToken } from '@/utils'

const getAuthenticatedUser = () => {
  const token = getAccessToken()

  if (!token) throw new Error('Unauthorized')

  const user = decodeUserFromToken(token)

  return user
}

export default getAuthenticatedUser
