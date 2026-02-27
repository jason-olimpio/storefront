import type { PaginationParams } from '@/types'

const paginate = <T>(items: T[], params: PaginationParams) => {
  const startIndex = (params.pageNumber - 1) * params.pageSize
  const endIndex = startIndex + params.pageSize

  return {
    items: items.slice(startIndex, endIndex),
    totalItems: items.length,
    totalPages: Math.ceil(items.length / params.pageSize)
  }
}

export default paginate
