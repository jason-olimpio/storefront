'use client'

import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useLocale } from 'next-intl'

import { useRouter } from '@/i18n/navigation'

import { setAuthState } from '@/store'
import { useUser, useClickOutside } from '@/hooks'

import { SubmitButton } from '@/components'

import { removeTokens } from '@/utils'

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const locale = useLocale()

  const { user } = useUser()

  const ref = useRef<HTMLDivElement | null>(null)

  useClickOutside([ref], () => setIsOpen(false))

  const handleLogout = () => {
    removeTokens()
    dispatch(setAuthState(false))
    router.push('/', { locale })
  }

  const toggleDropdown = () => setIsOpen(isOpen => !isOpen)

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary dark:bg-primary-dark text-white"
        onClick={toggleDropdown}
      >
        {user?.name?.[0].toUpperCase()}
      </button>

      {isOpen && (
        <div
          className="absolute bg-background dark:bg-background-dark z-[9999] right-0 mt-2 w-48
                     shadow-lg font-semibold rounded-2xl p-7 pt-5 break-words"
        >
          <p className="mb-1">{user?.name}</p>

          <p className="text-foreground-secondary dark:text-foreground-secondary-dark text-sm mb-4">
            {user?.email}
          </p>

          <hr className="mb-4" />

          <SubmitButton label="Logout" onClick={handleLogout} variant="thin" />
        </div>
      )}
    </div>
  )
}

export default UserDropdown
