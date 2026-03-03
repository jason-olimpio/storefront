import { Item, ItemsResponse } from '@/types'
import { PaginationParams } from '@/types'

const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    imageUrl: '/assets/images/items/t_shirt.png',
    nameKey: 't_shirt_name',
    descriptionKey: 't_shirt_description',
    price: 19.99
  },
  {
    id: 2,
    imageUrl: '/assets/images/items/mug.png',
    nameKey: 'mug_name',
    descriptionKey: 'mug_description',
    price: 12.99
  },
  {
    id: 3,
    imageUrl: '/assets/images/items/notebook.png',
    nameKey: 'notebook_name',
    descriptionKey: 'notebook_description',
    price: 8.99
  },
  {
    id: 4,
    imageUrl: '/assets/images/items/phone_case.png',
    nameKey: 'phone_case_name',
    descriptionKey: 'phone_case_description',
    price: 15.99
  },
  {
    id: 5,
    imageUrl: '/assets/images/items/backpack.png',
    nameKey: 'backpack_name',
    descriptionKey: 'backpack_description',
    price: 59.99
  },
  {
    id: 6,
    imageUrl: '/assets/images/items/water_bottle.png',
    nameKey: 'water_bottle_name',
    descriptionKey: 'water_bottle_description',
    price: 24.99
  },
  {
    id: 7,
    imageUrl: '/assets/images/items/sunglasses.png',
    nameKey: 'sunglasses_name',
    descriptionKey: 'sunglasses_description',
    price: 29.99
  },
  {
    id: 8,
    imageUrl: '/assets/images/items/headphones.png',
    nameKey: 'headphones_name',
    descriptionKey: 'headphones_description',
    price: 79.99
  },
  {
    id: 9,
    imageUrl: '/assets/images/items/kitchen_towel.png',
    nameKey: 'kitchen_towel_name',
    descriptionKey: 'kitchen_towel_description',
    price: 9.99
  },
  {
    id: 10,
    imageUrl: '/assets/images/items/wallet.png',
    nameKey: 'wallet_name',
    descriptionKey: 'wallet_description',
    price: 34.99
  },
  {
    id: 11,
    imageUrl: '/assets/images/items/hoodie.png',
    nameKey: 'hoodie_name',
    descriptionKey: 'hoodie_description',
    price: 44.99
  },
  {
    id: 12,
    imageUrl: '/assets/images/items/cap.png',
    nameKey: 'cap_name',
    descriptionKey: 'cap_description',
    price: 14.99
  },
  {
    id: 13,
    imageUrl: '/assets/images/items/tote_bag.png',
    nameKey: 'tote_bag_name',
    descriptionKey: 'tote_bag_description',
    price: 16.99
  },
  {
    id: 14,
    imageUrl: '/assets/images/items/sticky_notes.png',
    nameKey: 'sticky_notes_name',
    descriptionKey: 'sticky_notes_description',
    price: 4.99
  },
  {
    id: 15,
    imageUrl: '/assets/images/items/pen_set.png',
    nameKey: 'pen_set_name',
    descriptionKey: 'pen_set_description',
    price: 7.99
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
