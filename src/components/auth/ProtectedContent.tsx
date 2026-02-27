'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { useSelector } from 'react-redux'

import { usePathname, useRouter } from '@/i18n/navigation'
import { RootState } from '@/store'
import { LoginForm, LoadingSpinner, BackButton } from '@/components'
import { getAccessToken } from '@/utils'

type ProtectedContentProps = {
  children: ReactNode
}

const ProtectedContent = ({ children }: ProtectedContentProps) => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  const [isAuthStateSynced, setIsAuthStateSynced] = useState(false)

  const isAuthPage = pathname === '/register' || pathname === '/reset-password'

  useEffect(() => {
    const tokenExists = !!getAccessToken()
    if (isAuthenticated === tokenExists) setIsAuthStateSynced(true)
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated && isAuthPage) router.replace('/', { locale })
  }, [isAuthenticated, isAuthPage, router, locale])

  if (!isAuthStateSynced) return <LoadingSpinner />

  if (!isAuthenticated) {
    if (isAuthPage) return <>{children}</>
    return <LoginForm />
  }

  if (isAuthPage) return

  return (
    <>
      {pathname !== '/' && <BackButton />}
      {children}
    </>
  )
}

export default ProtectedContent
