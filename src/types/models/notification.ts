import { Role } from './user'

export type NotificationDataTypes = {
  orderStatusUpdate: {
    orderId?: number
    status?: string
  }
  roleUpdated: {
    role: Role
  }
}

export type NotificationKey = keyof NotificationDataTypes

export type NotificationType = {
  id: number
  messageKey: NotificationKey
  isRead: boolean
  createdAt: string
  additionalData?: string
}
