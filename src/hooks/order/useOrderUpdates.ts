'use client'

import { useQueryClient } from '@tanstack/react-query'

import { adjustStatusCount } from '@/utils/orderUtils'

import { OrderStatusEnum, OrderStats } from '@/types/models/order'

export const updateOrderStats = (
  queryClient: ReturnType<typeof useQueryClient>,
  previousStatus: OrderStatusEnum | null,
  newStatus: OrderStatusEnum,
  deliveryDate?: string
) => {
  queryClient.setQueryData<OrderStats>(['stats'], cachedStats => {
    const stats = cachedStats ?? {
      deliveredToday: 0,
      pendingOrders: 0,
      shippingOrders: 0
    }

    if (previousStatus !== null) adjustStatusCount(stats, previousStatus, -1)

    if (newStatus !== OrderStatusEnum.Processing)
      adjustStatusCount(stats, newStatus, 1, deliveryDate)

    return stats
  })
}
