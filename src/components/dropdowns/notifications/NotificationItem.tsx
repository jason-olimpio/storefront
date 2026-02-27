'use client'

import { useTranslations } from 'next-intl'
import { useLocale } from 'use-intl'
import Link from 'next/link'

import { useEffect, useRef, useMemo } from 'react'

import { formatRelativeDate } from '@/utils/dateUtils'
import { getNotificationMessage } from '@/utils/notificationUtils'
import { getOrderStatusLabels } from '@/utils/orderUtils'

import {
  NotificationType,
  NotificationDataTypes,
  NotificationKey
} from '@/types/models/notification'

import { OrderStatusEnum } from '@/types/models/order'
import { Role } from '@/types/models/user'

type NotificationItemProps = {
  notification: NotificationType
  markAsRead: (id: number) => void
}

type NotificationHandlerResult = {
  href?: string
  translationParams: Record<string, string>
}

const STATUS_STRING_TO_ENUM: Record<string, OrderStatusEnum> = {
  Pending: OrderStatusEnum.Pending,
  Processing: OrderStatusEnum.Processing,
  Shipping: OrderStatusEnum.Shipping,
  Delivered: OrderStatusEnum.Delivered
}

const getStatusLabel = (
  status: string | undefined,
  statusLabels: Record<OrderStatusEnum, string>
): string => {
  if (!status) return ''

  const statusEnum = STATUS_STRING_TO_ENUM[status]
  return statusEnum !== undefined && statusLabels[statusEnum]
    ? statusLabels[statusEnum]
    : status
}

type NotificationHandlers = {
  [K in NotificationKey]: (
    values: NotificationDataTypes[K]
  ) => NotificationHandlerResult
}

const createNotificationHandlers = (
  statusLabels: Record<OrderStatusEnum, string>,
  roleTranslations: (key: string) => string
): NotificationHandlers => ({
  orderStatusUpdate: (
    values: NotificationDataTypes['orderStatusUpdate']
  ): NotificationHandlerResult => {
    const { orderId, status } = values
    const statusLabel = getStatusLabel(status, statusLabels)

    return {
      href: orderId ? `/orders/${orderId}` : undefined,
      translationParams: {
        status: statusLabel.toLowerCase()
      }
    }
  },
  roleUpdated: (
    values: NotificationDataTypes['roleUpdated']
  ): NotificationHandlerResult => {
    const { role } = values
    const translatedRole = roleTranslations(Role[role].toLowerCase())

    return {
      translationParams: {
        role: translatedRole.toLowerCase()
      }
    }
  }
})

const NotificationItem = ({
  notification,
  markAsRead
}: NotificationItemProps) => {
  const { id, isRead, createdAt } = notification

  const translations = useTranslations('NotificationItem')
  const statusTranslations = useTranslations('OrderStatus')
  const roleTranslations = useTranslations('Roles')

  const locale = useLocale()
  const itemRef = useRef<HTMLLIElement>(null)

  const { translationKey, translationValues } =
    getNotificationMessage(notification)
  const formattedRelativeDate = formatRelativeDate(createdAt, locale)
  const statusLabels = getOrderStatusLabels(statusTranslations)

  const handlers = useMemo(
    () => createNotificationHandlers(statusLabels, roleTranslations),
    [statusLabels, roleTranslations]
  )

  const processNotification = <K extends NotificationKey>(
    key: K,
    values: NotificationDataTypes[K]
  ): NotificationHandlerResult => {
    const handler = handlers[key]
    return handler(values)
  }

  const { href, translationParams } = processNotification(
    translationKey,
    translationValues
  )

  const notificationContent = translations(translationKey, translationParams)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isRead) markAsRead(id)
      },
      { threshold: 0.5 }
    )
    const currentItem = itemRef.current

    if (currentItem) observer.observe(currentItem)

    return () => {
      if (currentItem) observer.unobserve(currentItem)
    }
  }, [id, isRead, markAsRead])

  const innerContent = (
    <>
      <p className="text-sm mb-1">{notificationContent}</p>

      <p className="text-xs text-foreground-secondary dark:text-foreground-secondary-dark">
        {formattedRelativeDate}
      </p>
    </>
  )

  const content = href ? (
    <Link href={href} passHref>
      {innerContent}
    </Link>
  ) : (
    innerContent
  )

  return (
    <li
      ref={itemRef}
      className="my-4 py-1.5 px-4 rounded-2xl border-none bg-secondary dark:bg-secondary-dark
                 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      {content}
    </li>
  )
}

export default NotificationItem
