import { type OrderStats, type OrderType, OrderStatusEnum } from '@/types'

const keyByStatus: Partial<Record<OrderStatusEnum, keyof OrderStats>> = {
  [OrderStatusEnum.Delivered]: 'deliveredToday',
  [OrderStatusEnum.Pending]: 'pendingOrders',
  [OrderStatusEnum.Shipping]: 'shippingOrders'
}

export const computeOrderStats = (orders: OrderType[]): OrderStats =>
  orders.reduce<OrderStats>(
    (accumulator, { status }) => {
      const key = keyByStatus[status]
      if (key) accumulator[key]++

      return accumulator
    },
    { deliveredToday: 0, pendingOrders: 0, shippingOrders: 0 }
  )

export default computeOrderStats
