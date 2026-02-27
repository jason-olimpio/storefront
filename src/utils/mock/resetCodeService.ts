import { STORAGE_KEYS } from './storageKeys'

const initializeResetCodes = () => {
  if (typeof window === 'undefined') return

  if (!localStorage.getItem(STORAGE_KEYS.RESET_CODES))
    localStorage.setItem(STORAGE_KEYS.RESET_CODES, JSON.stringify({}))
}

if (typeof window !== 'undefined') initializeResetCodes()

export const mockResetCodeService = {
  generateResetCode: (email: string): string => {
    const codes = localStorage.getItem(STORAGE_KEYS.RESET_CODES)
    const resetCodes: Record<string, string> = codes ? JSON.parse(codes) : {}
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    resetCodes[email] = code

    localStorage.setItem(STORAGE_KEYS.RESET_CODES, JSON.stringify(resetCodes))

    console.log(`🔑 Password reset code for ${email}: ${code}`)
    console.log(
      `🔗 Reset URL: /reset-password?email=${encodeURIComponent(email)}&token=${code}`
    )

    return code
  },

  getResetCode: (email: string): string | null => {
    const codes = localStorage.getItem(STORAGE_KEYS.RESET_CODES)
    const resetCodes: Record<string, string> = codes ? JSON.parse(codes) : {}

    return resetCodes[email] || null
  },

  validateResetCode: (email: string, code: string): boolean => {
    const codes = localStorage.getItem(STORAGE_KEYS.RESET_CODES)
    const resetCodes: Record<string, string> = codes ? JSON.parse(codes) : {}

    return resetCodes[email] === code
  },

  clearResetCode: (email: string): void => {
    const codes = localStorage.getItem(STORAGE_KEYS.RESET_CODES)
    const resetCodes: Record<string, string> = codes ? JSON.parse(codes) : {}

    delete resetCodes[email]

    localStorage.setItem(STORAGE_KEYS.RESET_CODES, JSON.stringify(resetCodes))
  }
}
