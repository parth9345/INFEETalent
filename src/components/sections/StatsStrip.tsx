import {
  Building2,
  Globe,
  MapPin,
  Star,
  Users,
  Zap,
  ShieldCheck,
  Briefcase,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'

import type { PageBlock } from '@/types/content'

type StatsBlock = Extract<PageBlock, { blockType: 'statsStrip' }>

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Users,
  Building2,
  MapPin,
  Star,
  Zap,
  ShieldCheck,
  Briefcase,
  BarChart3,
}

const getIcon = (name?: string): LucideIcon => {
  if (!name) return Globe
  return iconMap[name] || Globe
}

export function StatsStrip({ block, isHomepage = false }: { block: StatsBlock; isHomepage?: boolean }) {
  if (block.layout === 'cards') {
    return <StatsCards block={block} />
  }

  if (isHomepage) {
    const itemPositions = ['2xl:left-[140px]', '2xl:left-[578px]', '2xl:left-[1029px]', '2xl:left-[1520px]']

    return (
      <section className="bg-[linear-gradient(90deg,#050947_0%,#162072_60%,#213791_100%)] text-neutral-white">
        <div className="mx-auto grid max-w-[1920px] grid-cols-2 gap-y-[20px] px-[24px] py-[24px] md:grid-cols-4 md:px-[40px] 2xl:relative 2xl:block 2xl:h-[146px] 2xl:px-[0px] 2xl:py-[0px]">
          {block.items?.map((item, index) => (
            <div
              key={`${item.value}-${item.label}`}
              className={`flex flex-col md:flex-row min-w-0 items-center gap-[10px] md:justify-center 2xl:absolute 2xl:top-[43px] 2xl:justify-start 2xl:gap-[14px] ${itemPositions[index] || '2xl:left-[140px]'}`}
            >
              <strong className="shrink-0 text-[32px] font-[800] leading-[38px] tracking-[0px] md:text-[38px] md:leading-[46px] 2xl:text-[50px] 2xl:leading-[60px]">{item.value}</strong>
              <span className="min-w-0 text-[13px] font-[700] leading-[18px] tracking-[0px] md:text-[16px] md:leading-[22px] 2xl:text-[25px] 2xl:leading-[30px]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-brand-primary text-neutral-white">
      <div className="mx-auto grid max-w-[1920px] grid-cols-2 divide-x divide-white/20 md:grid-cols-4">
        {block.items?.map((item) => (
          <div key={`${item.value}-${item.label}`} className="flex h-[78px] items-center justify-center gap-2 px-4">
            <strong className="text-h3 font-extrabold md:text-h2">{item.value}</strong>
            <span className="text-body12 md:text-body14">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatsCards({ block }: { block: StatsBlock }) {
  return (
    <section className="bg-[#EAEBF4] py-[64px] lg:py-[80px]">
      <div className="mx-auto max-w-[1500px] px-[24px] lg:px-[0px]">
        {block.heading ? (
          <div className="mb-[48px]">
            <h2 className="heading-section text-[32px] font-[800] leading-[42px] tracking-[-0.75px] text-[#000000] md:text-[40px] md:leading-[52px] lg:text-[50px] lg:leading-[66px]">
              {block.heading}
            </h2>
            {block.description ? (
              <p className="mt-[16px] max-w-[600px] text-[18px] font-[400] leading-[28px] text-[#555555]">
                {block.description}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="grid gap-0 border-l border-t border-[#CCCCCC] sm:grid-cols-2 lg:grid-cols-5">
          {block.items?.map((item, index) => {
            const Icon = getIcon(item.icon)
            return (
              <div
                key={`${item.value}-${index}`}
                className="group flex flex-col items-center border-b border-r border-[#CCCCCC] px-[24px] pb-[32px] pt-[40px] text-center transition duration-300 hover:bg-[#FFFFFF]"
              >
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#2C368D]/10">
                  <Icon size={32} className="text-[#2C368D] transition duration-300 group-hover:scale-[1.08]" aria-hidden="true" />
                </div>
                <p className="mt-[20px] text-[40px] font-[800] leading-[48px] tracking-[-1px] text-[#000000] lg:text-[44px]">
                  {item.value}
                </p>
                <p className="mt-[8px] max-w-[140px] text-[14px] font-[400] leading-[20px] tracking-[0px] text-[#555555]">
                  {item.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
