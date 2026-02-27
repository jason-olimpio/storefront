import { NotificationType } from '@/types/models/notification'
import { STORAGE_KEYS } from './storageKeys'

const initializeNotifications = () => {
  if (typeof window === 'undefined') return

  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS))
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]))
}

if (typeof window !== 'undefined') initializeNotifications()

export const mockNotificationService = {
  getNotifications: (): NotificationType[] => {
    const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)
    const allNotifications: NotificationType[] = notifications
      ? JSON.parse(notifications)
      : []

    return allNotifications
  },

  createNotification: (
    notification: Omit<NotificationType, 'id' | 'createdAt'>
  ): NotificationType => {
    const notifications = mockNotificationService.getNotifications()
    const newNotification = {
      ...notification,
      id:
        Math.max(...notifications.map(notification => notification.id), 0) + 1,
      createdAt: new Date().toISOString()
    } as NotificationType

    notifications.push(newNotification)

    localStorage.setItem(
      STORAGE_KEYS.NOTIFICATIONS,
      JSON.stringify(notifications)
    )

    return newNotification
  },

  markAsRead: (id: number): void => {
    const notifications = mockNotificationService.getNotifications()
    const notificationIndex = notifications.findIndex(
      notification => notification.id === id
    )

    if (notificationIndex !== -1) {
      notifications[notificationIndex].isRead = true

      localStorage.setItem(
        STORAGE_KEYS.NOTIFICATIONS,
        JSON.stringify(notifications)
      )
    }
  },

  deleteAllNotifications: (): void =>
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]))
}
