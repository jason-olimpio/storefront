'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { usePathname, useRouter } from '@/i18n/navigation'
import type { RootState } from '@/store'
import { AuthForm, LoadingSpinner } from '@/components'
import { getAccessToken } from '@/utils'

type ProtectedContentProps = {
  children: ReactNode
}

const ProtectedContent = ({ children }: ProtectedContentProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const [isAuthSynced, setIsAuthSynced] = useState(false)

  const isResetPasswordPage = pathname === '/reset-password'

  useEffect(
    () => setIsAuthSynced(isAuthenticated === !!getAccessToken()),
    [isAuthenticated]
  )

  useEffect(() => {
    if (isAuthenticated && isResetPasswordPage) router.replace('/')
  }, [isAuthenticated, isResetPasswordPage, router])

  if (!isAuthSynced) return <LoadingSpinner />

  if (!isAuthenticated) return isResetPasswordPage ? children : <AuthForm />

  return children
}

export default ProtectedContent
