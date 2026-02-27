'use client'

import { ReactNode, useEffect, useState } from 'react'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import store from '@/store'

import { AuthSync, LoadingSpinner } from '@/components'

const Providers = ({
  children,
  messages,
  locale
}: {
  children: ReactNode
  messages: AbstractIntlMessages
  locale: string
}) => {
  const [mounted, setMounted] = useState(false)
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => setMounted(true), [])

  if (!mounted) return <LoadingSpinner />

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>
            <AuthSync />
            {children}
          </ReduxProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

export default Providers
