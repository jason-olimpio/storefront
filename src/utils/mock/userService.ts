import { User, Role } from '@/types/models/user'
import { STORAGE_KEYS } from './storageKeys'

const initializeUsers = () => {
  if (localStorage.getItem(STORAGE_KEYS.USERS)) return

  const defaultUsers: User[] = [
    {
      id: 1,
      email: 'admin@storehub.com',
      name: 'Admin User',
      role: Role.Admin
    },
    {
      id: 2,
      email: 'user@storehub.com',
      name: 'Test User',
      role: Role.User
    }
  ]

  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers))
}

if (typeof window !== 'undefined') initializeUsers()

export const mockUserService = {
  getUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS)

    return users ? JSON.parse(users) : []
  },

  getUserByEmail: (email: string): User | undefined => {
    const users = mockUserService.getUsers()

    return users.find(user => user.email === email)
  },

  getUserById: (id: number): User | undefined => {
    const users = mockUserService.getUsers()

    return users.find(user => user.id === id)
  },

  createUser: (user: Omit<User, 'id'>): User => {
    const users = mockUserService.getUsers()
    const newUser: User = {
      ...user,
      id: Math.max(...users.map(u => u.id || 0), 0) + 1
    }

    users.push(newUser)
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))

    return newUser
  },

  updateUserRole: (id: number, roleId: Role): void => {
    const users = mockUserService.getUsers()
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex !== -1) {
      users[userIndex].role = roleId
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
    }
  }
}
