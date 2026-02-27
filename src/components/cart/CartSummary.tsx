import { useTranslations } from 'next-intl'

import { SubmitButton, ConfirmOrderAlert } from '@/components'

type CartSummaryProps = {
  totalPrice: number
  itemCount: number
  isLoading: boolean
  onConfirmOrder: () => void
  onShowConfirmAlert: () => void
  showConfirmAlert: boolean
  onCancelOrder: () => void
}

const CartSummary = ({
  totalPrice,
  itemCount,
  isLoading,
  onConfirmOrder,
  onShowConfirmAlert,
  showConfirmAlert,
  onCancelOrder
}: CartSummaryProps) => {
  const cartTranslations = useTranslations('Cart')

  return (
    <>
      {showConfirmAlert && (
        <ConfirmOrderAlert
          totalPrice={totalPrice}
          onConfirm={onConfirmOrder}
          onCancel={onCancelOrder}
          isLoading={isLoading}
        />
      )}

      <SubmitButton
        label={cartTranslations('confirmOrder')}
        onClick={onShowConfirmAlert}
        className="mt-4"
        disabled={isLoading || itemCount === 0}
      />
    </>
  )
}

export default CartSummary
