'use client'

import { useQuery } from '@tanstack/react-query'

import { decodeUserFromToken, getAccessToken } from '@/utils'

const useUser = () => {
  const token = getAccessToken()

  const { data: user } = useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      if (!token) return

      const user = decodeUserFromToken(token)

      return user
    },
    enabled: !!token,
    staleTime: 60000
  })

  return { user: user || null }
}

export default useUser
