import { AuthTokenPayload } from '@/types'

export const decodeUserFromToken = (token: string) => {
  const decoded = decodeToken(token)

  return {
    id: decoded.id || 0,
    name: decoded.name || '',
    email: decoded.email || ''
  }
}

export const decodeToken = (token: string): AuthTokenPayload => {
  try {
    const decoded = atob(token)

    return JSON.parse(decoded)
  } catch (error) {
    console.error('Failed to decode token:', error)
    return {}
  }
}
