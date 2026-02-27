import { OrderType, OrderStatusEnum } from '@/types/models/order'
import { STORAGE_KEYS } from './storageKeys'
import { mockUserService } from './userService'

const initializeOrders = () => {
  if (typeof window === 'undefined') return

  if (!localStorage.getItem(STORAGE_KEYS.ORDERS))
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]))
}

if (typeof window !== 'undefined') initializeOrders()

export const mockOrderService = {
  getOrders: (): OrderType[] => {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS)

    return orders ? JSON.parse(orders) : []
  },

  getOrderById: (id: number): OrderType | undefined => {
    const orders = mockOrderService.getOrders()

    return orders.find(order => order.id === id)
  },

  getUserOrders: (userId: number): OrderType[] => {
    const user = mockUserService.getUserById(userId)
    if (!user || !user.email) return []

    const orders = mockOrderService.getOrders()
    return orders.filter(order => order.username === user.email)
  },

  createOrder: (
    order: Omit<OrderType, 'id' | 'date' | 'status'>
  ): OrderType => {
    const orders = mockOrderService.getOrders()
    const newOrder: OrderType = {
      ...order,
      id: Math.max(...orders.map(o => o.id), 0) + 1,
      date: new Date().toISOString(),
      status: OrderStatusEnum.Pending
    }

    orders.push(newOrder)
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders))

    return newOrder
  },

  updateOrderStatus: (id: number, status: OrderStatusEnum): void => {
    const orders = mockOrderService.getOrders()
    const orderIndex = orders.findIndex(order => order.id === id)

    if (orderIndex !== -1) {
      orders[orderIndex].status = status
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders))
    }
  }
}
