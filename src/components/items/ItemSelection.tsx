'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { fetchItems } from '@/api/services'

import { LoadingSpinner, Snackbar, Pagination } from '@/components'

import useSnackbarState from '@/hooks/useSnackbarState'

import ItemSelectionItem from './ItemSelectionItem'

import { ITEMS_PAGE_SIZE } from '@/constants/pagination'
import { ItemsResponse } from '@/types'

const ItemSelection = () => {
  const translations = useTranslations('ItemSelection')

  const [currentPage, setCurrentPage] = useState(1)
  const { snackbar, show, close } = useSnackbarState()

  const {
    data: paginatedItems,
    isLoading,
    error
  } = useQuery<ItemsResponse>({
    queryKey: ['items', currentPage, ITEMS_PAGE_SIZE],
    queryFn: () =>
      fetchItems({ pageNumber: currentPage, pageSize: ITEMS_PAGE_SIZE }),
    staleTime: 60 * 1000, // 1 minute
    refetchOnMount: true
  })

  useEffect(() => {
    if (!error) return

    show({ message: error.message, variant: 'error' })
  }, [error, show])

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold">{translations('selectItem')}</h2>

      <ul className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
        {paginatedItems?.items.map(item => (
          <ItemSelectionItem key={item.id} item={item} />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={paginatedItems?.totalPages}
        onPageChange={setCurrentPage}
      />

      <Snackbar {...snackbar} onClose={close} />
    </div>
  )
}

export default ItemSelection
