'use client'

import { useState, useEffect, useRef } from 'react'

const useNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const menuIconRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024

      setIsDesktop(isLargeScreen)

      if (isLargeScreen) setIsMenuOpen(false)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  const handleLinkClick = () => {
    if (!isDesktop) setIsMenuOpen(false)
  }

  return {
    isMenuOpen,
    isDesktop,
    menuRef,
    menuIconRef,
    toggleMenu,
    handleLinkClick
  }
}

export default useNavbar
