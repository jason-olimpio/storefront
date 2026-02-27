import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD
} from '@/components'
import { STORAGE_KEYS } from './storageKeys'

const initializePasswords = () => {
  if (typeof window === 'undefined') return

  const passwords = localStorage.getItem(STORAGE_KEYS.PASSWORDS)

  if (!passwords) {
    mockPasswordService.setPassword(DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD)
    mockPasswordService.setPassword(DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD)
  }
}

export const mockPasswordService = {
  setPassword: (email: string, password: string): void => {
    const passwords = localStorage.getItem(STORAGE_KEYS.PASSWORDS)
    const passwordMap: Record<string, string> = passwords
      ? JSON.parse(passwords)
      : {}

    passwordMap[email] = password
    localStorage.setItem(STORAGE_KEYS.PASSWORDS, JSON.stringify(passwordMap))
  },

  validatePassword: (email: string, password: string): boolean => {
    const passwords = localStorage.getItem(STORAGE_KEYS.PASSWORDS)
    const passwordMap: Record<string, string> = passwords
      ? JSON.parse(passwords)
      : {}

    return passwordMap[email] === password
  },

  updatePassword: (email: string, newPassword: string): void =>
    mockPasswordService.setPassword(email, newPassword)
}

if (typeof window !== 'undefined') initializePasswords()
