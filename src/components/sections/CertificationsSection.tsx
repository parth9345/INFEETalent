import { CheckCircle2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type CertificationsBlock = Extract<PageBlock, { blockType: 'certifications' }>

export function CertificationsSection({ block, isHomepage = false }: { block: CertificationsBlock; isHomepage?: boolean }) {
  if (isHomepage) {
    return (
      <section className="relative overflow-hidden bg-brand-primary py-[64px] text-neutral-white">
        <div className="absolute right-[0px] top-[0px] h-full w-[50%] opacity-[0.18] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto grid max-w-[1152px] gap-[72px] px-[24px] lg:grid-cols-[420px_1fr] lg:px-[0px]">
          <div>
            <h2 className="text-h2 font-extrabold leading-[38px] tracking-[0px] text-neutral-white">{block.heading}</h2>
            <div className="mt-[46px] h-[78px] w-[176px] rounded-[999px] border border-neutral-white/10 bg-neutral-white/[0.04]" />
          </div>
          <div className="grid gap-x-[82px] gap-y-[25px] self-center sm:grid-cols-2">
            {block.items?.map((item) => (
              <a key={item.label} href={item.url || '#'} className="flex items-center gap-[12px] text-link14 font-bold leading-[20px] tracking-[0px]">
                <CheckCircle2 size={16} strokeWidth={2} className="text-brand-accent" aria-hidden="true" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-brand-primary py-[48px] text-neutral-white md:py-[56px]">
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 px-5 lg:grid-cols-[1fr_1.1fr] 2xl:px-0">
        <div>
          <h2 className="text-h2 font-extrabold leading-[38px] tracking-[0px]">
            {block.heading}
          </h2>
          <div className="mt-10 h-20 w-44 rounded-full border border-neutral-white/10 bg-neutral-white/5" />
        </div>
        <div className={cn('grid gap-x-12 gap-y-5 sm:grid-cols-2')}>
          {block.items?.map((item) => (
            <a key={item.label} href={item.url || '#'} className="flex items-center gap-3 text-link12 font-semibold md:text-link14">
              <CheckCircle2 size={18} className="text-brand-accent" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
