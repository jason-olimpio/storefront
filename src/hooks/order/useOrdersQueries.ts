'use client'

import { useQuery } from '@tanstack/react-query'
import { ORDERS_PAGE_SIZE } from '@/constants/pagination'
import computeOrderStats from '@/api/services/orders/stats'
import { mockOrderService } from '@/utils'
import type {
  OrderFilterType,
  OrdersResponse,
  OrderStats,
  PaginationParams
} from '@/types'

export const useOrdersQuery = (args: {
  fetchOrders: (
    params: PaginationParams,
    filter: OrderFilterType
  ) => Promise<OrdersResponse>
  isMyOrders: boolean
  currentPage: number
  filter: OrderFilterType
  filterRaw: string | null
}) => {
  const { fetchOrders, isMyOrders, currentPage, filter, filterRaw } = args

  const queryKey = [
    isMyOrders ? 'my-orders' : 'orders',
    currentPage,
    filterRaw ?? ''
  ] as const

  return {
    queryKey,
    ...useQuery<OrdersResponse, Error>({
      queryKey,
      queryFn: () =>
        fetchOrders(
          { pageNumber: currentPage, pageSize: ORDERS_PAGE_SIZE },
          filter
        ),
      staleTime: Infinity
    })
  }
}

export const useOrderStatsQuery = (enabled: boolean) =>
  useQuery<OrderStats, Error>({
    queryKey: ['orders-stats'],
    queryFn: () => computeOrderStats(mockOrderService.getOrders()),
    staleTime: Infinity,
    enabled
  })
