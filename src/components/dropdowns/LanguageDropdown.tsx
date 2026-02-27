'use client'

import { useRef, useState } from 'react'

import Image from 'next/image'
import { useLocale } from 'next-intl'

import { usePathname, useRouter } from '@/i18n/navigation'

import { useClickOutside } from '@/hooks'

import { withBasePath } from '@/utils'

type Language = {
  code: string
  flag: string
}

const LanguageDropdown = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)

  useClickOutside([ref], () => setIsOpen(false))

  const languages: Language[] = [
    { code: 'en', flag: withBasePath('/icons/flags/en.png') },
    { code: 'it', flag: withBasePath('/icons/flags/it.png') },
    { code: 'nl', flag: withBasePath('/icons/flags/nl.png') }
  ]

  const currentLanguage = languages.find(({ code }) => code === locale)
  const toggleMenu = () => setIsOpen(isOpen => !isOpen)

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) {
      setIsOpen(false)
      return
    }

    router.replace(pathname, { locale: nextLocale })
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center justify-center w-full"
        onClick={toggleMenu}
      >
        {currentLanguage && (
          <Image
            width={20}
            height={20}
            src={currentLanguage.flag}
            alt={`Flag for ${locale}`}
            className="w-5 h-5 object-contain flex-shrink-0"
            priority
          />
        )}

        <Image
          src={withBasePath('/icons/arrows/arrow-expand.svg')}
          width={10}
          height={10}
          alt="Arrow expand"
          className={`w-[10px] h-[10px] object-contain transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } ease-out ml-2 dark:invert hidden lg:block`}
          priority
        />
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-2 w-fit min-w-[40px] rounded-xl bg-background -right-2.5 lg:right-0
                    dark:bg-background-dark overflow-hidden shadow-md"
        >
          {languages.map(({ code, flag }) => (
            <li
              key={code}
              className="block p-2 hover:bg-secondary hover:dark:bg-secondary-dark cursor-pointer"
              onClick={() => handleLanguageChange(code)}
            >
              <div className="flex items-center justify-center">
                <Image
                  width={20}
                  height={20}
                  src={flag}
                  alt={`Flag for ${code}`}
                  className="w-5 h-5 object-contain flex-shrink-0"
                  priority
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LanguageDropdown
