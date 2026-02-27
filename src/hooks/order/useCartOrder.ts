'use client'

import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useRouter } from '@/i18n/navigation'

import { emptyCart } from '@/store'
import { createOrder } from '@/api/services'
import { OrderRequest, OrderType } from '@/types'

export const useCartOrder = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const mutationOptions: UseMutationOptions<
    OrderType,
    Error,
    OrderRequest,
    unknown
  > = {
    mutationFn: createOrder,
    onSuccess: (data: OrderType) => {
      dispatch(emptyCart())
      router.push(`/orders/${data.id}`)
    }
  }

  return useMutation(mutationOptions)
}
