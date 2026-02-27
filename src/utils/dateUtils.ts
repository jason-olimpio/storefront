import { formatDistanceToNow, type Locale } from 'date-fns'
import { it, enUS, nl } from 'date-fns/locale'

export const formatRelativeDate = (date: string, locale: string) => {
  const utcDate = new Date(date.endsWith('Z') ? date : `${date}Z`)

  const localeMap: Record<string, Locale> = {
    it,
    nl,
    en: enUS
  }

  return formatDistanceToNow(utcDate, {
    addSuffix: true,
    locale: localeMap[locale] || enUS
  })
}
