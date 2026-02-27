'use client'

import { useSelector } from 'react-redux'

import { RootState } from '@/store'

import { useUser, useClickOutside, useNavbar } from '@/hooks'

import { Role } from '@/types'

import NavbarBrand from './navbar/NavbarBrand'
import NavigationItems from './navbar/NavigationItems'
import MobileMenuButton from './navbar/MobileMenuButton'
import MobileMenu from './navbar/MobileMenu'

const Navbar = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth?.isAuthenticated
  )
  const { user } = useUser()

  const {
    isMenuOpen,
    isDesktop,
    menuRef,
    menuIconRef,
    toggleMenu,
    handleLinkClick
  } = useNavbar()

  useClickOutside([menuRef, menuIconRef], () => {
    if (isMenuOpen) toggleMenu()
  })

  const isAdmin = user?.role === Role.Admin

  return (
    <nav className="relative flex justify-between py-4 px-8 bg-secondary dark:bg-secondary-dark">
      <NavbarBrand />

      {!isDesktop && (
        <MobileMenuButton onClick={toggleMenu} menuIconRef={menuIconRef} />
      )}

      {isDesktop && (
        <div className="flex items-center justify-center space-x-6">
          <NavigationItems
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            onLinkClick={handleLinkClick}
          />
        </div>
      )}

      <MobileMenu
        isOpen={isMenuOpen}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        menuRef={menuRef}
        onLinkClick={handleLinkClick}
      />
    </nav>
  )
}

export default Navbar
