import { BadgeCheck } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type CertificationsBlock = Extract<PageBlock, { blockType: 'certifications' }>

export function CertificationsSection({ block, isHomepage = false }: { block: CertificationsBlock; isHomepage?: boolean }) {
  if (isHomepage) {
    return (
      <section className="relative h-auto min-h-[542px] overflow-hidden bg-[#050946] py-[80px] text-[#FFFFFF] lg:h-[542px] lg:py-[120px]">
        <div className="absolute inset-0 bg-[linear-gradient(108deg,#050946_0%,#121967_56%,#243C91_100%)]" />
        <div className="pointer-events-none absolute right-[-172px] top-[52px] h-[650px] w-[650px] rounded-full border border-[#FFFFFF]/20 opacity-[0.65]" />
        <div className="pointer-events-none absolute right-[-142px] top-[72px] h-[610px] w-[610px] rounded-full border border-[#FFFFFF]/20 opacity-[0.55]" />
        <div className="pointer-events-none absolute right-[-112px] top-[92px] h-[570px] w-[570px] rounded-full border border-[#FFFFFF]/20 opacity-[0.45]" />
        <div className="pointer-events-none absolute right-[180px] top-[382px] h-[620px] w-[620px] rounded-full border border-[#FFFFFF]/20 opacity-[0.45]" />
        <div className="pointer-events-none absolute right-[210px] top-[402px] h-[580px] w-[580px] rounded-full border border-[#FFFFFF]/20 opacity-[0.38]" />
        <div className="relative mx-auto grid max-w-[1500px] gap-[60px] px-[24px] lg:grid-cols-[572px_726px] lg:gap-[202px] lg:px-[0px]">
          <div className="min-w-0">
            <h2 className="text-[50px] font-[800] leading-[66px] tracking-[-1.5px] text-[#FFFFFF]">{block.heading}</h2>
            <div className="relative mt-[102px] h-[134px] w-[250px] opacity-[0.12]" aria-hidden="true">
              <div className="absolute left-[28px] top-[3px] h-[128px] w-[128px] rounded-full border-[18px] border-[#FFFFFF]" />
              <div className="absolute left-[98px] top-[3px] h-[128px] w-[128px] rounded-full border-[18px] border-[#FFFFFF]" />
              <div className="absolute left-[0px] top-[50px] size-[52px] rounded-full bg-[#FFFFFF]" />
              <div className="absolute right-[0px] top-[50px] size-[52px] rounded-full bg-[#FFFFFF]" />
            </div>
          </div>
          <div className="grid self-start pt-[22px] sm:grid-cols-2 sm:gap-x-[36px] sm:gap-y-[48px] lg:gap-x-[72px] lg:gap-y-[48px]">
            {block.items?.map((item) => (
              <a key={item.label} href={item.url || '#'} className="group flex min-h-[34px] items-center gap-[18px] text-[24px] font-[700] leading-[34px] tracking-[-0.72px] text-[#FFFFFF] transition duration-300 hover:translate-x-[4px] hover:text-[#FCA62B]">
                <BadgeCheck size={34} strokeWidth={1.8} className="shrink-0 text-[#FFFFFF] transition duration-300 group-hover:text-[#FCA62B]" aria-hidden="true" />
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
              <BadgeCheck size={18} className="text-brand-accent" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
