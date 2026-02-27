'use client'

import { useSelector } from 'react-redux'

import { ItemSelection, Cart } from '@/components'

import { RootState } from '@/store'

const Index = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  return (
    <div className="flex">
      <div className="flex-1">
        <ItemSelection />
      </div>

      {cartItems.length > 0 && (
        <div>
          <Cart />
        </div>
      )}
    </div>
  )
}

export default Index
