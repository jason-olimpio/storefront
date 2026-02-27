'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'

import type { OrderFilterType } from '@/types'

const useOrdersFilterParam = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filterRaw = searchParams.get('filter')

  const filter = parseFilterParam(filterRaw) ?? {}

  const setFilter = (newFilter: OrderFilterType) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', JSON.stringify(newFilter))
    router.push(`${pathname}?${params.toString()}`)
  }

  return { filter, filterRaw, setFilter }
}

const parseFilterParam = (raw: string | null): OrderFilterType | null => {
  if (!raw) return null

  try {
    return JSON.parse(raw) as OrderFilterType
  } catch {
    return null
  }
}

export default useOrdersFilterParam
