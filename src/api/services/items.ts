import { Item, ItemsResponse } from '@/types'
import { PaginationParams } from '@/types'

const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    imageUrl: '/assets/images/items/dumbbells_set.png',
    nameKey: 'dumbbells_set_name',
    descriptionKey: 'dumbbells_set_description',
    price: 79.99
  },
  {
    id: 2,
    imageUrl: '/assets/images/items/kettlebell.png',
    nameKey: 'kettlebell_name',
    descriptionKey: 'kettlebell_description',
    price: 49.99
  },
  {
    id: 3,
    imageUrl: '/assets/images/items/jumping_rope.png',
    nameKey: 'jumping_rope_name',
    descriptionKey: 'jumping_rope_description',
    price: 12.99
  },
  {
    id: 4,
    imageUrl: '/assets/images/items/pull_up_bar.png',
    nameKey: 'pull_up_bar_name',
    descriptionKey: 'pull_up_bar_description',
    price: 29.99
  },
  {
    id: 5,
    imageUrl: '/assets/images/items/weight_disc.png',
    nameKey: 'weight_disc_name',
    descriptionKey: 'weight_disc_description',
    price: 34.99
  },
  {
    id: 6,
    imageUrl: '/assets/images/items/ez_barbell.png',
    nameKey: 'ez_barbell_name',
    descriptionKey: 'ez_barbell_description',
    price: 89.99
  },
  {
    id: 7,
    imageUrl: '/assets/images/items/angle_bar.png',
    nameKey: 'angle_bar_name',
    descriptionKey: 'angle_bar_description',
    price: 94.99
  },
  {
    id: 8,
    imageUrl: '/assets/images/items/triceps_row.png',
    nameKey: 'triceps_row_name',
    descriptionKey: 'triceps_row_description',
    price: 19.99
  },
  {
    id: 9,
    imageUrl: '/assets/images/items/lat_machine_bar.png',
    nameKey: 'lat_machine_bar_name',
    descriptionKey: 'lat_machine_bar_description',
    price: 24.99
  },
  {
    id: 10,
    imageUrl: '/assets/images/items/creatine.png',
    nameKey: 'creatine_name',
    descriptionKey: 'creatine_description',
    price: 39.99
  }
]

export const fetchItems = async ({
  pageNumber,
  pageSize
}: PaginationParams): Promise<ItemsResponse> => {
  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedItems = MOCK_ITEMS.slice(startIndex, endIndex)
  const totalPages = Math.ceil(MOCK_ITEMS.length / pageSize)

  return {
    items: paginatedItems,
    totalItems: MOCK_ITEMS.length,
    totalPages
  }
}
