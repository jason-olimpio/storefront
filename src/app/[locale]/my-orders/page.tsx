'use client'

import { fetchMyOrders } from '@/api/services'

import { OrdersTable } from '@/components/orders'

const MyOrders = () => (
  <OrdersTable fetchOrders={fetchMyOrders} isMyOrders={true} />
)

export default MyOrders
