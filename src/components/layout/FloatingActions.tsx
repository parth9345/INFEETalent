import Image from 'next/image'

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
  return (
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
  )
}
