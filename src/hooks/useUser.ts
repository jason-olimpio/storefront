'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchUserRole } from '@/api/services/users'

import { decodeUserFromToken, getAccessToken } from '@/utils'

const useUser = () => {
  const token = getAccessToken()

  const { data: user } = useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
      if (!token) return

      const user = decodeUserFromToken(token)

      if (!user) return

      const role = await fetchUserRole(Number(user.id))

      return { ...user, role }
    },
    enabled: !!token,
    staleTime: 60000
  })

  return { user: user || null }
}

export default useUser
