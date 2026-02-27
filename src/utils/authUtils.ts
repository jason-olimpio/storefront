import { AuthTokenPayload, Role, User } from '@/types'

export const decodeUserFromToken = (token: string): User => {
  const decoded = decodeToken(token)

  return {
    id: Number(decoded.id),
    name: String(decoded.name),
    email: String(decoded.email),
    role: decoded.role as Role
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
