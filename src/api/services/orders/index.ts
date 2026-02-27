import getAuthenticatedUser from './auth'
import paginate from './pagination'
import filterOrders from './filters'
import buildOrderItems from './orderItems'

import {
  OrderType,
  OrderRequest,
  OrderStatusEnum,
  OrderFilterType,
  OrdersResponse,
  PaginationParams,
  NotificationType
} from '@/types'
import {
  mockNotificationService,
  mockOrderService,
  mockUserService
} from '@/utils'

export const createOrder = async (
  request: OrderRequest
): Promise<OrderType> => {
  const user = getAuthenticatedUser()
  const { orderItems, totalPrice } = await buildOrderItems(request)

  return mockOrderService.createOrder({
    username: String(user.email),
    totalPrice,
    items: orderItems
  })
}

export const fetchOrderById = async (id: number): Promise<OrderType> => {
  const order = mockOrderService.getOrderById(id)

  if (!order) throw new Error('orderNotFound')

  return order
}

export const fetchMyOrders = async (
  params: PaginationParams,
  filter: OrderFilterType = {}
): Promise<OrdersResponse> => {
  const user = getAuthenticatedUser()

  let dbUser = mockUserService.getUserById(Number(user.id))

  if (!dbUser && user.email)
    dbUser = mockUserService.getUserByEmail(String(user.email))

  const email = dbUser?.email || user.email

  if (!email) return { orders: [], totalItems: 0, totalPages: 0 }

  const sorted = mockOrderService
    .getOrders()
    .filter(order => order.username === email)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const filtered = filterOrders(sorted, filter)
  const page = paginate(filtered, params)

  return {
    orders: page.items,
    totalItems: page.totalItems,
    totalPages: page.totalPages
  }
}

export const fetchAllOrders = async (
  params: PaginationParams,
  filter: OrderFilterType = {}
): Promise<OrdersResponse> => {
  const filtered = filterOrders(mockOrderService.getOrders(), filter)
  const page = paginate(filtered, params)

  return {
    orders: page.items,
    totalItems: page.totalItems,
    totalPages: page.totalPages
  }
}

export const updateOrderStatus = async (
  orderId: number,
  newStatus: OrderStatusEnum
): Promise<void> => {
  mockOrderService.updateOrderStatus(orderId, newStatus)

  const order = mockOrderService.getOrderById(orderId)

  if (!order) return

  const targetUser = mockUserService.getUserByEmail(order.username)

  const notification: Omit<NotificationType, 'id' | 'createdAt'> = {
    messageKey: 'orderStatusUpdate',
    isRead: false,
    additionalData: JSON.stringify({
      orderId: order.id,
      status: OrderStatusEnum[newStatus]
    }),
    userId: Number(targetUser?.id)
  }

  mockNotificationService.createNotification(notification)
}
