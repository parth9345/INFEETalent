'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { cn } from '@/lib/utils'
import type { Link as NavLink } from '@/types/content'

type MobileNavProps = {
  navigation: NavLink[]
}

export function MobileNav({ navigation }: MobileNavProps) {
  const menuId = useId()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center border border-neutral-border bg-neutral-white text-brand-primary transition hover:border-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-controls={menuId}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <div
        id={menuId}
        className={cn(
          'fixed inset-x-0 top-[82px] z-[90] overflow-hidden border-b border-neutral-border bg-neutral-white px-5 shadow-[0_18px_36px_rgba(21,21,21,0.16)] transition-all duration-300 ease-out lg:hidden',
          open ? 'max-h-[calc(100dvh-82px)] translate-y-0 opacity-100' : 'pointer-events-none max-h-0 -translate-y-2 opacity-0',
        )}
      >
        <nav className="mx-auto grid max-w-[1500px] gap-1 py-5" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={`${item.label}-${item.url}`}
              href={(item.url || '/') as Route}
              className="border-b border-neutral-border/70 py-3 text-header14 font-extrabold uppercase tracking-[0.8px] text-neutral-dark transition hover:text-brand-primary"
              onClick={closeMenu}
              target={item.newTab ? '_blank' : undefined}
              rel={item.newTab ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact" className="mt-4 w-full" onClick={closeMenu}>
            Get Started
          </ButtonLink>
        </nav>
      </div>
    </div>
  )
}
