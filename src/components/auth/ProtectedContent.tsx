'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { usePathname, useRouter } from '@/i18n/navigation'
import type { RootState } from '@/store'
import { AuthForm, LoadingSpinner, BackButton } from '@/components'
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

  const [isAuthStateSynced, setIsAuthStateSynced] = useState(false)

  const isAuthPage =
    pathname.endsWith('/register') || pathname.endsWith('/reset-password')

  useEffect(() => {
    const tokenExists = !!getAccessToken()
    if (isAuthenticated === tokenExists) setIsAuthStateSynced(true)
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated && isAuthPage) router.replace('/')
  }, [isAuthenticated, isAuthPage, router])

  if (!isAuthStateSynced) return <LoadingSpinner />

  if (!isAuthenticated) {
    if (isAuthPage) return <>{children}</>

    return <AuthForm />
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
