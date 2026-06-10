"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { figmaAssets } from '@/lib/assets'

const actions = [
  {
    label: 'Call Us',
    iconSrc: figmaAssets.floatingActions.call,
    iconWidth: 21,
    iconHeight: 21,
    href: 'tel:+16142663317',
    tone: 'blue',
  },
  {
    label: 'WhatsApp',
    iconSrc: figmaAssets.floatingActions.whatsapp,
    iconWidth: 23,
    iconHeight: 23,
    href: 'https://wa.me/16142663317',
    tone: 'green',
  },
  {
    label: 'Submit Your CV',
    iconSrc: figmaAssets.floatingActions.fileUser,
    iconWidth: 23,
    iconHeight: 25,
    href: '/careers',
    tone: 'blue',
  },
  {
    label: 'Submit Requirement',
    iconSrc: figmaAssets.floatingActions.file,
    iconWidth: 20,
    iconHeight: 25,
    href: '#contact',
    tone: 'accent',
  },
]

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 160)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="back-to-top-button fixed right-4 bottom-5 z-50 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white border-[5px] border-[#4D9BFF] shadow-[0_20px_40px_rgba(15,63,138,0.16)] transition duration-300 ease-in-out hover:-translate-y-0.5 hover:border-[#74B7FF] hover:bg-[#FFFFFF] hover:shadow-[0_28px_48px_rgba(15,63,138,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D9BFF]/80"
        style={{ display: showBackToTop ? 'flex' : 'none' }}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" className="h-[26px] w-[26px] text-[#1F63C9] back-to-top-arrow" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 18V6" />
          <path d="M7 11l5-5 5 5" />
        </svg>
      </a>

      <aside className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-[10px] xl:flex" aria-label="Quick actions">
        {actions.map(({ label, iconSrc, iconWidth, iconHeight, href, tone }) => (
          <a
            key={label}
            href={href}
            className={[
              'group flex h-[50px] w-[50px] items-center overflow-hidden rounded-full px-[12px] text-[#FFFFFF] shadow-[0_14px_30px_rgba(21,21,21,0.18)] transition duration-700 ease-in-out hover:w-fit hover:shadow-[0_18px_36px_rgba(21,21,21,0.22)] focus-visible:w-[216px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCA62B]',
              tone === 'green'
                ? 'bg-[linear-gradient(135deg,#65D96F_0%,#35C84A_52%,#18A832_100%)]'
                : tone === 'accent'
                  ? 'bg-[linear-gradient(135deg,#FFC85A_0%,#FCA62B_62%,#E8951F_100%)] text-[#000D6B]'
                  : 'bg-[linear-gradient(135deg,#050947_0%,#162072_60%,#213791_100%)]',
            ].join(' ')}
            aria-label={label}
          >
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center">
              <Image
                src={iconSrc}
                alt=""
                width={iconWidth}
                height={iconHeight}
                className="shrink-0"
                unoptimized
                aria-hidden={true}
              />
            </span>
            <span className="ml-[14px] whitespace-nowrap text-[14px] font-[800] leading-[16px] tracking-[-0.03em] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {label}
            </span>
          </a>
        ))}
      </aside>
    </>
  )
}
