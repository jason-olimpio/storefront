// src/api/orders/stats.ts
import { OrderStatusEnum } from '@/types'
import type { OrderStats, OrderType } from '@/types'

const computeOrderStats = (orders: OrderType[]): OrderStats =>
  orders.reduce<OrderStats>(
    (accumulator, order) => {
      if (order.status === OrderStatusEnum.Delivered)
        accumulator.deliveredToday++
      if (order.status === OrderStatusEnum.Pending) accumulator.pendingOrders++
      if (order.status === OrderStatusEnum.Shipping)
        accumulator.shippingOrders++

      return accumulator
    },
    { deliveredToday: 0, pendingOrders: 0, shippingOrders: 0 }
  )

export default computeOrderStats
