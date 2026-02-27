import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

import Providers from '@/app/providers'

import { Navbar, ProtectedContent } from '@/components'

export const generateStaticParams = () =>
  routing.locales.map(locale => ({ locale }))

const LocaleLayout = async ({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <Providers locale={locale} messages={messages}>
      <Navbar />
      <ProtectedContent>{children}</ProtectedContent>
    </Providers>
  )
}

export default LocaleLayout
