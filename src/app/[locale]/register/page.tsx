'use client'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocale } from 'next-intl'

import { useRouter } from '@/i18n/navigation'

import { RegisterForm } from '@/components/auth'
import { RootState } from '@/store'

const Register = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const router = useRouter()
  const locale = useLocale()

  useEffect(() => {
    if (isAuthenticated) router.push('/', { locale })
  }, [isAuthenticated, router, locale])

  return <>{!isAuthenticated && <RegisterForm />}</>
}

export default Register
