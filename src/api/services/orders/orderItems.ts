import { fetchItems } from '../items'

import type { OrderRequest } from '@/types'

const buildOrderItems = async (request: OrderRequest) => {
  const items = await fetchItems({ pageNumber: 1, pageSize: 100 })
  const itemMap = new Map(items.items.map(item => [item.id, item]))

  const orderItems = request.items.map(({ itemId, quantity }) => {
    const item = itemMap.get(itemId)

    if (!item) throw new Error(`itemNotFound: ${itemId}`)

    return { ...item, quantity }
  })

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return { orderItems, totalPrice }
}

export default buildOrderItems
