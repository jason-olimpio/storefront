'use client'

import { useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const Root = () => {
  const router = useRouter()

  useEffect(
    () => router.replace('/', { locale: routing.defaultLocale }),
    [router]
  )

  return
}

export default Root
