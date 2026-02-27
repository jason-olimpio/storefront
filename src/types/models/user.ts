import { PaginationType } from '@/types/pagination'

export enum Role {
  User = 1,
  Admin
}

export type User = {
  id?: number
  email?: string
  name?: string
  role?: Role
}

export type UsersResponse = PaginationType & {
  users: User[]
}
