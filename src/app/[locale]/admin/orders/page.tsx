'use client'

import { fetchAllOrders } from '@/api/services'

import withAdminRedirect from '@/hoc/withAdminRedirect'

import { OrdersTable } from '@/components/orders'

const OrdersPanel = () => <OrdersTable fetchOrders={fetchAllOrders} />

export default withAdminRedirect(OrdersPanel)
