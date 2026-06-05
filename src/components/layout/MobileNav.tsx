'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type TouchEvent } from 'react'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Link as NavLink, SiteCTA } from '@/types/content'

type MobileNavProps = {
  navigation: NavLink[]
  cta?: SiteCTA
  socialLinks?: NavLink[]
}

export function MobileNav({ navigation, cta, socialLinks = [] }: MobileNavProps) {
  const menuId = useId()
  const [open, setOpen] = useState(false)
  const ignoreClickAfterTouchRef = useRef(false)

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
  const toggleMenu = () => setOpen((current) => !current)

  const handleTouchEnd = (event: TouchEvent<HTMLButtonElement>) => {
    event.preventDefault()
    ignoreClickAfterTouchRef.current = true
    toggleMenu()

    window.setTimeout(() => {
      ignoreClickAfterTouchRef.current = false
    }, 350)
  }

  const handleClick = () => {
    if (ignoreClickAfterTouchRef.current) {
      return
    }

    toggleMenu()
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="relative z-[120] inline-flex size-[44px] touch-manipulation cursor-pointer items-center justify-center border border-[#CCCCCC] bg-[#FFF8EE] text-[#262164] transition hover:border-[#262164] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCA62B]"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-controls={menuId}
        aria-expanded={open}
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <div
        id={menuId}
        className={cn(
          'fixed inset-x-0 top-[84px] z-[110] border-b border-neutral-border bg-[#FFF8EE] px-5 shadow-[0px_18px_36px_rgba(21,21,21,0.16)] transition-all duration-300 ease-out md:top-[96px] lg:hidden',
          'site-mobile-menu',
          open
            ? 'max-h-[calc(100vh-84px)] translate-y-0 overflow-y-auto overscroll-contain opacity-100 md:max-h-[calc(100vh-96px)] supports-[height:100dvh]:max-h-[calc(100dvh-84px)] md:supports-[height:100dvh]:max-h-[calc(100dvh-96px)]'
            : 'pointer-events-none max-h-0 -translate-y-2 overflow-hidden opacity-0',
        )}
      >
        <nav className="mx-auto grid max-w-[1800px] gap-[0px] py-[20px]" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={`${item.label}-${item.url}`}
              href={(item.url || '/') as Route}
              className="border-b border-[#CCCCCC]/70 py-[14px] text-[16px] font-[600] leading-[20px] tracking-[0px] text-[#151515] transition hover:text-[#262164]"
              onClick={closeMenu}
              target={item.newTab ? '_blank' : undefined}
              rel={item.newTab ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </Link>
          ))}
          {cta?.enabled && cta.label && cta.url ? (
            <Button
              href={cta.url}
              newTab={cta.newTab}
              variant={cta.variant || 'primary'}
              size="md"
              className="mt-[18px] w-full"
              onClick={closeMenu}
            >
              {cta.label}
            </Button>
          ) : null}
          {socialLinks.length ? (
            <div className="flex items-center gap-[24px] pt-[18px] text-[20px] font-[800] leading-[20px] text-[#262164]">
              {socialLinks.map((item) => (
                <a
                  key={`${item.label}-${item.url}`}
                  href={item.url || '#'}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  onClick={closeMenu}
                  aria-label={item.label}
                >
                  {socialGlyph(item.label)}
                </a>
              ))}
            </div>
          ) : null}
        </nav>
      </div>
    </div>
  )
}

function socialGlyph(label?: string) {
  const normalized = label?.toLowerCase() || ''

  if (normalized.includes('instagram')) {
    return (
      <span className="relative block size-[18px] rounded-[5px] border-[2px] border-current">
        <span className="absolute left-[4px] top-[4px] size-[6px] rounded-full border-[2px] border-current" />
        <span className="absolute right-[3px] top-[3px] size-[3px] rounded-full bg-current" />
      </span>
    )
  }

  if (normalized.includes('linkedin')) {
    return 'in'
  }

  if (normalized.includes('facebook')) {
    return 'f'
  }

  return label?.slice(0, 1).toLowerCase() || ''
}
