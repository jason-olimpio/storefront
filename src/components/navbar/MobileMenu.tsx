'use client'

import NavigationItems from './NavigationItems'

type MobileMenuProps = {
  isOpen: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  menuRef: React.RefObject<HTMLDivElement | null>
  onLinkClick: () => void
}

const MobileMenu = ({
  isOpen,
  isAuthenticated,
  isAdmin,
  menuRef,
  onLinkClick
}: MobileMenuProps) => {
  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className="fixed top-14 right-2 shadow-md rounded-xl p-3 w-20 flex bg-background dark:bg-secondary-dark
                 flex-col space-y-3 items-center justify-center z-[9999]"
    >
      <NavigationItems
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onLinkClick={onLinkClick}
      />
    </div>
  )
}

export default MobileMenu
