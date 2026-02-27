'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import useUser from './useUser'

import {
  deleteAllNotifications,
  fetchNotifications,
  markAsRead
} from '@/api/services/notifications'

import type { NotificationType } from '@/types/models/notification'

const useNotifications = () => {
  const queryClient = useQueryClient()

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 60 * 1000 // 1 minute
  })

  const { user } = useUser()

  const filteredNotifications = notifications?.filter(
    notification => notification.userId === user?.id
  )

  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => markAsRead(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] })

      const previousNotifications = queryClient.getQueryData<
        NotificationType[]
      >(['notifications'])

      queryClient.setQueryData<NotificationType[]>(
        ['notifications'],
        currentNotifications =>
          currentNotifications?.map(notification =>
            notification.id === id
              ? { ...notification, isRead: true }
              : notification
          )
      )

      return { previousNotifications }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ['notifications'],
        context?.previousNotifications
      )
    }
  })

  const deleteAllNotificationsMutation = useMutation({
    mutationFn: () => deleteAllNotifications().then(() => {}),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] })
      const previousNotifications = queryClient.getQueryData<
        NotificationType[]
      >(['notifications'])

      queryClient.setQueryData(['notifications'], [])

      return { previousNotifications }
    },
    onError: (_, __, context) =>
      queryClient.setQueryData(
        ['notifications'],
        context?.previousNotifications
      ),
    onSuccess: () => {
      queryClient.setQueryData(['notifications'], [])
    }
  })

  const unreadCount = filteredNotifications?.filter(
    notification => !notification.isRead
  ).length
  const hasNotifications = Boolean(
    filteredNotifications && filteredNotifications.length > 0
  )

  return {
    notifications: filteredNotifications,
    isLoading,
    unreadCount,
    hasNotifications,
    markAsRead: markAsReadMutation.mutate,
    deleteAll: deleteAllNotificationsMutation.mutate
  }
}

export default useNotifications
