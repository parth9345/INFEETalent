import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  Cpu,
  GraduationCap,
  HeartPulse,
  Hotel,
  MapPin,
  Scale,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from 'lucide-react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type IndustriesBlock = Extract<PageBlock, { blockType: 'industries' }>

const industryIcons: Record<string, LucideIcon> = {
  education: GraduationCap,
  engineering: Building2,
  finance: Banknote,
  healthcare: HeartPulse,
  hospitality: Hotel,
  legal: Scale,
  logistics: Truck,
  manufacturing: Building2,
  professional: BriefcaseBusiness,
  'professional services': BriefcaseBusiness,
  retail: ShoppingBag,
  technology: Cpu,
  'it & digital': Cpu,
}

const getIndustryIcon = (label: string) => {
  const normalized = label.trim().toLowerCase()
  return industryIcons[normalized] || MapPin
}

export function IndustriesSection({ block, isHomepage = false }: { block: IndustriesBlock; isHomepage?: boolean }) {
  const midpoint = Math.ceil((block.items?.length || 0) / 2)
  const columns = [block.items?.slice(0, midpoint) || [], block.items?.slice(midpoint) || []]

  return (
    <section className={isHomepage ? 'bg-[#fff8ee] py-[80px] lg:py-[120px]' : 'bg-brand-background py-[48px] md:py-[64px]'}>
      <div className={cn('mx-auto grid px-5 2xl:px-0', isHomepage ? 'max-w-[1500px] gap-[56px] px-[24px] lg:grid-cols-[726px_726px] lg:gap-[48px] lg:px-[0px]' : 'max-w-[1500px] gap-10 lg:grid-cols-[1fr_1fr]')}>
        <div className={cn('flex flex-col justify-between', isHomepage ? 'min-h-[550px]' : 'min-h-[360px]')}>
          {isHomepage ? (
            <div className="max-w-[599px]">
              {block.eyebrow ? <p className="text-[12px] font-[800] uppercase leading-[16px] tracking-[8px] text-[#2C368D]">{block.eyebrow}</p> : null}
              <h2 className="relative mt-[16px] max-w-[599px] text-[50px] font-[800] capitalize leading-[66px] tracking-[-1.5px] text-[#000000]">
                <span className="relative z-[1]">{block.heading}</span>
                <span className="absolute bottom-[4px] left-[165px] z-0 h-[23px] w-[307px] bg-gradient-to-t from-[rgba(251,223,45,0.4)] from-[40%] to-[rgba(251,223,45,0)] to-[40%]" aria-hidden="true" />
              </h2>
            </div>
          ) : (
            <SectionHeading
              eyebrow={block.eyebrow}
              title={block.heading}
              description={block.description}
            />
          )}
          <div>
            {isHomepage && block.description ? <p className="max-w-[569px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555]">{block.description}</p> : null}
          <div className={isHomepage ? 'mt-[32px] flex flex-wrap gap-[16px]' : 'mt-10 flex flex-wrap gap-4'}>
            {block.primaryAction?.url ? (
              <ButtonLink href={block.primaryAction.url} size={isHomepage ? 'md' : 'md'} className={isHomepage ? 'h-[50px] w-[160px] border-[0px] bg-[#FCA62B] px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.84px] text-[#262164] hover:bg-[#FCA62B]' : undefined}>
                {block.primaryAction.label || 'Get Started'}
              </ButtonLink>
            ) : null}
            {block.secondaryAction?.url ? (
              <ButtonLink href={block.secondaryAction.url} variant="secondary" size={isHomepage ? 'md' : 'md'} className={isHomepage ? 'h-[50px] w-[146px] border-[2px] border-[#262164] bg-[#FFFFFF] px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.84px] text-[#262164] hover:bg-[#EAEBF4]' : undefined}>
                {block.secondaryAction.label || 'Learn More'}
              </ButtonLink>
            ) : null}
          </div>
          </div>
        </div>
        <div className={isHomepage ? 'grid border-l border-t border-[#CCCCCC] sm:grid-cols-2' : 'grid border-l border-t border-neutral-border sm:grid-cols-2'}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((industry) => {
                const Icon = getIndustryIcon(industry.label)

                return (
                  <a
                    key={industry.label}
                    href={industry.url || '#'}
                    className={cn(
                      'group flex items-center border-b border-r transition',
                      isHomepage ? 'h-[110px] gap-[25px] border-[#CCCCCC]  pl-[40px] pr-[32px] text-[#262164] duration-300 hover:bg-[#ffffff]' : 'h-[82px] gap-4 border-neutral-border bg-neutral-white/40 px-7 text-brand-primary hover:bg-neutral-white',
                    )}
                  >
                    <Icon size={isHomepage ? 28 : 19} strokeWidth={isHomepage ? 2 : 2} className={isHomepage ? 'shrink-0 transition duration-300 group-hover:scale-[1.08]' : undefined} aria-hidden="true" />
                    <span className={isHomepage ? 'text-[24px] font-[700] leading-[34px] tracking-[-0.72px] text-[#262164]' : 'text-body14 font-bold text-neutral-dark md:text-body16'}>{industry.label}</span>
                  </a>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
