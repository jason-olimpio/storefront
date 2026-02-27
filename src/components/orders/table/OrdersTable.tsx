'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import {
  LoadingSpinner,
  Snackbar,
  Pagination,
  OrderStatCard,
  OrdersFilter,
  OrderRow,
  OrdersTableHeader
} from '@/components'

import {
  useOrdersFilterParam,
  useOrdersQuery,
  useOrderStatsQuery,
  useSnackbarState
} from '@/hooks'

import type { OrderFilterType, OrdersResponse, PaginationParams } from '@/types'

type OrdersTableProps = {
  fetchOrders: (
    params: PaginationParams,
    filter: OrderFilterType
  ) => Promise<OrdersResponse>
  isMyOrders?: boolean
}

const OrdersTable = ({ fetchOrders, isMyOrders = false }: OrdersTableProps) => {
  const t = useTranslations(isMyOrders ? 'MyOrders' : 'OrdersPanel')

  const { snackbar, show, close } = useSnackbarState()
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)

  const { filter, filterRaw, setFilter } = useOrdersFilterParam()

  const {
    queryKey,
    data: paginatedOrders,
    isLoading,
    isError,
    error
  } = useOrdersQuery({
    fetchOrders,
    isMyOrders,
    currentPage,
    filter,
    filterRaw
  })

  const { data: stats } = useOrderStatsQuery(!isMyOrders)

  useEffect(() => {
    if (!isError) return
    show({ message: t(error?.message || ''), variant: 'error' })
  }, [isError, error?.message, show, t])

  const handleFilterChange = (newFilter: OrderFilterType) => {
    setCurrentPage(1)
    setFilter(newFilter)
  }

  const handleStatusUpdateSuccess = () => {
    show({ message: t('statusUpdatedSuccessfully'), variant: 'success' })
  }

  if (isLoading) return <LoadingSpinner />

  if (isError)
    return (
      <div className="m-10">
        <div className="text-center py-8">
          <p className="text-red-500 dark:text-red-400">{t(error.message)}</p>
        </div>
        <Snackbar {...snackbar} onClose={close} />
      </div>
    )

  const showStats = !isMyOrders
  const orders = paginatedOrders?.orders ?? []
  const totalPages = paginatedOrders?.totalPages ?? 1

  const renderStats = () => {
    if (!showStats) return null

    return (
      <div className="flex justify-center lg:justify-start space-x-6 mb-8">
        <OrderStatCard
          value={stats?.deliveredToday || 0}
          label={t('stats.ordersDeliveredToday')}
        />

        <OrderStatCard
          value={stats?.pendingOrders || 0}
          label={t('stats.pendingOrders')}
        />

        <OrderStatCard
          value={stats?.shippingOrders || 0}
          label={t('stats.shippingOrders')}
        />
      </div>
    )
  }

  const renderContent = () => {
    if (orders.length === 0)
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {t(isMyOrders ? 'noOrders' : 'noOrderFound')}
        </div>
      )

    return (
      <div className="space-y-6">
        <table className="min-w-full shadow-md rounded-xl shadow-secondary dark:shadow-secondary-dark bg-secondary dark:bg-secondary-dark table-auto border-collapse">
          <OrdersTableHeader isMyOrders={isMyOrders} />
          <tbody>
            {orders.map((order, index) => (
              <OrderRow
                key={order.id}
                order={order}
                isMyOrders={isMyOrders}
                expandedOrderId={expandedOrderId}
                onToggleExpand={setExpandedOrderId}
                onStatusChangeSuccess={handleStatusUpdateSuccess}
                queryKey={queryKey}
                isFirst={index === 0}
                isLast={index === orders.length - 1}
              />
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    )
  }

  return (
    <div className="m-10">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="font-semibold text-xl mb-3 sm:mb-0">
          {t(isMyOrders ? 'orderHistory' : 'title')}
        </h1>

        <OrdersFilter onFilterChange={handleFilterChange} />
      </div>

      <hr className="my-10 border-gray-300 dark:border-gray-600" />

      {renderStats()}
      {renderContent()}

      <Snackbar {...snackbar} onClose={close} />
    </div>
  )
}

export default OrdersTable
