'use client'

import { useEffect, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type HeaderShellProps = {
  children: ReactNode
}

export function HeaderShell({ children }: HeaderShellProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 8)

    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })

    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  return (
    <header
      data-scrolled={scrolled ? 'true' : 'false'}
      className={cn(
        'group/header z-[100] bg-[#FFF8EE] transition-shadow duration-300 site-header',
        'relative',
        scrolled && 'shadow-[0px_10px_30px_rgba(21,21,21,0.12)]',
      )}
    >
      {children}
    </header>
  )
}
