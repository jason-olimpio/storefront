import CartItem from './CartItem'
import { CartItem as CartItemType } from '@/store'

type CartItemsListProps = {
  items: CartItemType[]
  onRemove: (itemId: number) => void
  onQuantityChange: (itemId: number, delta: number) => void
}

const CartItemsList = ({
  items,
  onRemove,
  onQuantityChange
}: CartItemsListProps) => (
  <ul>
    {items.map(item => (
      <CartItem
        key={item.id}
        item={item}
        onRemove={onRemove}
        onQuantityChange={onQuantityChange}
      />
    ))}
  </ul>
)

export default CartItemsList
