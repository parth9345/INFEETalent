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

export function IndustriesSection({
  block,
  isHomepage = false,
  isAboutPage = false,
  className,
}: {
  block: IndustriesBlock
  isHomepage?: boolean
  isAboutPage?: boolean
  className?: string
}) {
  const midpoint = Math.ceil((block.items?.length || 0) / 2)
  const columns = [block.items?.slice(0, midpoint) || [], block.items?.slice(midpoint) || []]
  const featureLayout = isHomepage || isAboutPage

  return (
    <section className={cn(isAboutPage ? 'bg-[#fff8ee] py-[64px] md:py-[80px] xl:py-[120px]' : isHomepage ? 'bg-[#fff8ee] py-[80px] lg:py-[120px]' : 'bg-brand-background py-[48px] md:py-[64px]', className)}>
      <div
        className={cn(
          'mx-auto grid px-5 2xl:px-0',
          isAboutPage
            ? 'max-w-[1500px] gap-[40px] px-[24px] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-[48px] xl:px-[24px] 2xl:px-[0px]'
            : isHomepage
              ? 'max-w-[1500px] gap-[56px] px-[10px] lg:grid-cols-[726px_726px] lg:gap-[48px] lg:px-[0px]'
              : 'max-w-[1500px] gap-10 lg:grid-cols-[1fr_1fr]',
        )}
      >
        <div className={cn('flex flex-col justify-between', isAboutPage ? 'min-h-0 xl:min-h-[550px]' : isHomepage ? 'min-h-[300px] lg:min-h-[550px]' : 'min-h-[360px]')}>
          {featureLayout ? (
            <div className="max-w-[599px]">
              {block.eyebrow ? <p className="eyebrow-title text-[12px] font-[800] uppercase leading-[16px] tracking-[8px] text-[#2C368D]">{block.eyebrow}</p> : null}
              <h2 className={cn('heading-section relative mt-[16px] max-w-[599px] font-[800] capitalize text-[#000000]', isAboutPage ? 'text-[36px] leading-[46px] tracking-[0px] md:text-[44px] md:leading-[58px] xl:text-[50px] xl:leading-[66px] xl:tracking-[-1.5px]' : 'text-[50px] leading-[66px] tracking-[-1.5px]')}>
                <span className="relative z-[1]">{block.heading}</span>
                <span className="absolute bottom-[4px] left-[165px] z-0 hidden h-[23px] w-[307px] bg-gradient-to-t from-[rgba(251,223,45,0.4)] from-[40%] to-[rgba(251,223,45,0)] to-[40%] md:block" aria-hidden="true" />
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
            {featureLayout && block.description ? <p className={isAboutPage ? 'max-w-[569px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555] md:text-[18px] md:leading-[28px]' : 'max-w-[569px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555]'}>{block.description}</p> : null}
          <div className={featureLayout ? 'mt-[32px] flex flex-wrap gap-[16px]' : 'mt-10 flex flex-wrap gap-4'}>
            {block.primaryAction?.url ? (
              <ButtonLink href={block.primaryAction.url} size={featureLayout ? 'md' : 'md'} className={featureLayout ? 'h-[50px] w-[160px] border-[0px] bg-[#FCA62B] px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.84px] text-[#262164] hover:bg-[#FCA62B]' : undefined}>
                {block.primaryAction.label || 'Get Started'}
              </ButtonLink>
            ) : null}
            {block.secondaryAction?.url ? (
              <ButtonLink href={block.secondaryAction.url} variant="secondary" size={featureLayout ? 'md' : 'md'} className={featureLayout ? 'h-[50px] w-[146px] border-[2px] border-[#262164] bg-[#FFFFFF] px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.84px] text-[#262164] hover:bg-[#EAEBF4]' : undefined}>
                {block.secondaryAction.label || 'Learn More'}
              </ButtonLink>
            ) : null}
          </div>
          </div>
        </div>
        <div className={featureLayout ? 'grid border-l border-t border-[#CCCCCC] sm:grid-cols-2' : 'grid border-l border-t border-neutral-border sm:grid-cols-2'}>
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
                      isAboutPage
                        ? 'min-h-[76px] gap-[18px] border-[#CCCCCC] px-[16px] text-[#262164] duration-300 hover:bg-[#ffffff] xl:h-[110px] xl:px-[32px] 2xl:pl-[40px]'
                        : isHomepage
                          ? 'h-[60px] gap-[25px] border-[#CCCCCC]  pl-[10px] pr-[10px] text-[#262164] duration-300 hover:bg-[#ffffff] lg:h-[110px] lg:pl-[40px] lg:pr-[32px]'
                          : 'h-[82px] gap-4 border-neutral-border bg-neutral-white/40 px-7 text-brand-primary hover:bg-neutral-white',
                    )}
                  >
                    <Icon size={featureLayout ? 28 : 19} strokeWidth={featureLayout ? 2 : 2} className={featureLayout ? 'shrink-0 transition duration-300 group-hover:scale-[1.08]' : undefined} aria-hidden="true" />
                    <span className={isAboutPage ? 'text-[16px] font-[700] leading-[24px] tracking-[0px] text-[#262164] md:text-[18px] xl:text-[22px] xl:leading-[30px] 2xl:text-[24px] 2xl:leading-[34px] 2xl:tracking-[-0.72px]' : isHomepage ? 'text-[17px] font-[700] leading-[34px] tracking-[-0.72px] text-[#262164] lg:text-[24px]' : 'text-body14 font-bold text-neutral-dark md:text-body16'}>{industry.label}</span>
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
