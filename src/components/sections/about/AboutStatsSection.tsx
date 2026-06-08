import Image from 'next/image'
import { HandCoins } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { sectionId } from '@/lib/sections'
import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type StatsBlock = Extract<PageBlock, { blockType: 'statsStrip' }>

const statIconSources: Record<string, string> = {
  Building2: '/figma/about-stats-building.png',
  Globe: '/figma/about-stats-globe-shield.png',
  People: '/figma/about-stats-users.png',
  Quality: '/figma/about-stats-globe-shield.png',
  Star: '/figma/about-stats-nps.png',
  Users: '/figma/about-stats-users.png',
}

export function AboutStatsSection({ block, className }: { block: StatsBlock; className?: string }) {
  return (
    <section id={sectionId(block.settings)} className={cn('overflow-hidden bg-[#FFF8EE] py-[72px] xl:h-[704px] xl:py-[0px]', className)}>
      <Container className="max-w-[1500px] px-[24px] xl:px-[24px] xl:pt-[136px] 2xl:px-[0px]">
        {block.heading ? (
          <h2 className="heading-section relative inline-block text-[40px] font-[800] leading-[52px] tracking-[0px] text-[#000000] md:text-[50px] md:leading-[66px]">
            <span className="relative z-[1]">{block.heading}</span>
            <span
              className="absolute bottom-[9px] left-[0px] h-[10px] w-full max-w-[322px] bg-[#FFE02D]"
              aria-hidden="true"
            />
          </h2>
        ) : null}

        <div className="mt-[58px] grid border-l border-t border-[#D8D0C8] sm:grid-cols-2 lg:grid-cols-3 xl:mt-[48px] xl:grid-cols-5">
          {block.items?.map((item, index) => {
            return (
              <div
                key={`${item.value}-${item.label}-${index}`}
                className="group flex min-h-[240px] flex-col items-center border-b border-r border-[#D8D0C8] px-[22px] pb-[24px] pt-[34px] text-center transition duration-300 hover:bg-[#FFFFFF] md:min-h-[260px] xl:h-[333px] xl:min-h-0 xl:px-[30px] xl:pt-[36px]"
              >
                <div className="flex h-[58px] w-[82px] items-center justify-center text-[#151515] transition duration-300 group-hover:scale-[1.05] group-hover:text-[#2C368D] lg:h-[72px] lg:w-[88px]">
                  <StatIcon name={item.icon} />
                </div>
                <p className="mt-[28px] text-[38px] font-[700] leading-[46px] tracking-[0px] text-[#151515] md:text-[44px] md:leading-[54px] xl:mt-[60px] xl:text-[50px] xl:leading-[60px]">
                  {item.value}
                </p>
                <p className="mt-[18px] max-w-[238px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555] md:text-[18px] md:leading-[30px] xl:mt-[34px]">
                  {item.label}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function StatIcon({ name }: { name?: string }) {
  if (name === 'HandCoins' || name === 'Hand') {
    return <HandCoins className="h-[58px] w-[82px] lg:h-[72px] lg:w-[88px]" strokeWidth={1.5} aria-hidden="true" />
  }

  const src = name ? statIconSources[name] : undefined

  return (
    <span className="relative block h-[58px] w-[82px] lg:h-[72px] lg:w-[88px]" aria-hidden="true">
      <Image
        src={src || statIconSources.Globe}
        alt=""
        fill
        sizes="(min-width: 1024px) 88px, 82px"
        className="object-contain"
      />
    </span>
  )
}
