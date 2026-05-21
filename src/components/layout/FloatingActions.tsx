import { FileText, MessageCircle, Phone, UserRound } from 'lucide-react'

const actions = [
  { label: 'Call Us', icon: Phone, href: 'tel:+16142663317', tone: 'blue' },
  { label: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/16142663317', tone: 'green' },
  { label: 'Submit Your CV', icon: UserRound, href: '/careers', tone: 'blue' },
  { label: 'Submit Requirement', icon: FileText, href: '#contact', tone: 'accent' },
]

export function FloatingActions() {
  return (
    <aside className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 xl:flex" aria-label="Quick actions">
      {actions.map(({ label, icon: Icon, href, tone }) => (
        <a
          key={label}
          href={href}
          className={[
            'group flex h-10 w-10 items-center overflow-hidden rounded-full px-2 text-neutral-white shadow-lg transition-all duration-300 hover:w-[140px]',
            tone === 'green'
              ? 'bg-gradient-to-b from-[#60d66a] to-[#20b038]'
              : tone === 'accent'
                ? 'bg-brand-accent text-brand-primary'
                : 'bg-brand-primary',
          ].join(' ')}
        >
          <Icon size={21} aria-hidden="true" />
          <span className="ml-3 whitespace-nowrap text-body12 font-extrabold opacity-0 transition group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </aside>
  )
}
