import type { OrderFilterType, OrderType } from '@/types'
import { checkOrderAgainstFilters } from '@/utils'

const filterOrders = (
  orders: OrderType[],
  filter: OrderFilterType
): OrderType[] => {
  if (!filter || Object.keys(filter).length === 0) return orders

  return orders.filter(order => checkOrderAgainstFilters(order, filter))
}

export default filterOrders
