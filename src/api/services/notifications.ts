import { NotificationType } from '@/types/models/notification'
import { mockNotificationService } from '@/utils'

export const fetchNotifications = async (): Promise<NotificationType[]> =>
  mockNotificationService.getNotifications()

export const markAsRead = async (id: number): Promise<void> =>
  mockNotificationService.markAsRead(id)

export const deleteAllNotifications = async (): Promise<void> =>
  mockNotificationService.deleteAllNotifications()
