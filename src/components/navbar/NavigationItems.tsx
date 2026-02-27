'use client'

import {
  LanguageDropdown,
  UserDropdown,
  NotificationsDropdown
} from '@/components'

import AuthenticatedLinks from './AuthenticatedLinks'
import ThemeToggle from './ThemeToggle'

type NavigationItemsProps = {
  isAuthenticated: boolean
  isAdmin: boolean
  onLinkClick: () => void
}

const NavigationItems = ({
  isAuthenticated,
  isAdmin,
  onLinkClick
}: NavigationItemsProps) => (
  <>
    {isAuthenticated && (
      <AuthenticatedLinks isAdmin={isAdmin} onLinkClick={onLinkClick} />
    )}

    <LanguageDropdown />

    <ThemeToggle />

    {isAuthenticated && (
      <>
        <NotificationsDropdown />
        <UserDropdown />
      </>
    )}
  </>
)

export default NavigationItems
