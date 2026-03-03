'use client'

import { useSelector, useDispatch } from 'react-redux'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

import { RootState, removeFromCart, updateQuantity } from '@/store'
import { PageNavigator } from '@/components'
import { useCartOrder } from '@/hooks'
import { OrderRequest } from '@/types'

import CartItemsList from './CartItemsList'
import CartSummary from './CartSummary'

const ITEMS_PER_PAGE = 3

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const lastAddedItemIndex = useSelector(
    (state: RootState) => state.cart.lastAddedItemIndex
  )

  const dispatch = useDispatch()
  const cartTranslations = useTranslations('Cart')

  const [showConfirmAlert, setShowConfirmAlert] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const orderMutation = useCartOrder()

  const totalPages = Math.ceil(cartItems.length / ITEMS_PER_PAGE) || 1
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = cartItems.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const totalPrice = cartItems.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  )

  useEffect(() => {
    if (lastAddedItemIndex === null) return

    const newPage = Math.ceil((lastAddedItemIndex + 1) / ITEMS_PER_PAGE)
    setCurrentPage(newPage)
  }, [lastAddedItemIndex])

  const handleRemoveFromCart = (itemId: number) =>
    dispatch(removeFromCart(itemId))

  const handleQuantityChange = (itemId: number, delta: number) =>
    dispatch(updateQuantity({ itemId, quantity: delta }))

  const handleConfirmOrder = () => {
    const request: OrderRequest = {
      items: cartItems.map(({ id, quantity }) => ({
        itemId: id,
        quantity
      }))
    }

    orderMutation.mutate(request)
  }

  return (
    <div className="flex flex-col justify-center bg-secondary dark:bg-secondary-dark px-10 h-full">
      <h2 className="text-xl font-semibold">{cartTranslations('myOrder')}</h2>

      <hr className="border-gray-300 dark:border-gray-700 my-4" />

      <CartItemsList
        items={currentItems}
        onRemove={handleRemoveFromCart}
        onQuantityChange={handleQuantityChange}
      />

      <CartSummary
        totalPrice={totalPrice}
        itemCount={cartItems.length}
        isLoading={orderMutation.isPending}
        onConfirmOrder={handleConfirmOrder}
        onShowConfirmAlert={() => setShowConfirmAlert(true)}
        showConfirmAlert={showConfirmAlert}
        onCancelOrder={() => setShowConfirmAlert(false)}
      />

      <PageNavigator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        bgClasses="bg-background dark:bg-background-dark"
      />
    </div>
  )
}

export default Cart
