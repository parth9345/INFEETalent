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
      className={cn(
        'sticky top-0 z-[100] border-b border-neutral-border bg-neutral-white transition-shadow duration-300',
        scrolled && 'shadow-[0_10px_30px_rgba(21,21,21,0.14)]',
      )}
    >
      {children}
    </header>
  )
}
