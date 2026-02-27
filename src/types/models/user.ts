import { PaginationType } from '@/types/pagination'

export type UsersResponse = PaginationType & {
  users: User[]
}

export type User = {
  id?: number
  email?: string
  name?: string
  role?: Role
}

export enum Role {
  User = 'User',
  Admin = 'Admin'
}
