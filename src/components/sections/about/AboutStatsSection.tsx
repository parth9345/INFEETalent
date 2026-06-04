import {
  BadgeCheck,
  Building2,
  Cog,
  Globe2,
  HandCoins,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { sectionId } from '@/lib/sections'
import type { PageBlock } from '@/types/content'

type StatsBlock = Extract<PageBlock, { blockType: 'statsStrip' }>

export function AboutStatsSection({ block }: { block: StatsBlock }) {
  return (
    <section id={sectionId(block.settings)} className="overflow-hidden bg-[#FFF8EE] py-[72px] xl:h-[704px] xl:py-[0px]">
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
                <p className="mt-[28px] text-[38px] font-[800] leading-[46px] tracking-[0px] text-[#151515] md:text-[44px] md:leading-[54px] xl:mt-[60px] xl:text-[50px] xl:leading-[60px]">
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
  if (name === 'Users') {
    return <UsersTrendIcon />
  }

  if (name === 'Building2') {
    return <BuildingCogIcon />
  }

  if (name === 'Star') {
    return <HandBadgeIcon />
  }

  return <GlobeShieldIcon />
}

function GlobeShieldIcon() {
  return (
    <span className="relative block h-[58px] w-[70px] lg:h-[72px] lg:w-[82px]" aria-hidden="true">
      <Globe2 className="absolute left-[0px] top-[0px] h-[50px] w-[50px] lg:h-[62px] lg:w-[62px]" strokeWidth={1.7} />
      <ShieldCheck className="absolute bottom-[0px] right-[0px] h-[27px] w-[27px] lg:h-[34px] lg:w-[34px]" strokeWidth={1.7} />
    </span>
  )
}

function UsersTrendIcon() {
  return (
    <span className="relative block h-[58px] w-[76px] lg:h-[72px] lg:w-[88px]" aria-hidden="true">
      <TrendingUp className="absolute left-[22px] top-[0px] h-[24px] w-[36px] lg:left-[27px] lg:h-[30px] lg:w-[44px]" strokeWidth={1.7} />
      <UsersRound className="absolute bottom-[0px] left-[0px] h-[46px] w-[76px] lg:h-[56px] lg:w-[88px]" strokeWidth={1.7} />
    </span>
  )
}

function BuildingCogIcon() {
  return (
    <span className="relative block h-[58px] w-[70px] lg:h-[72px] lg:w-[84px]" aria-hidden="true">
      <Building2 className="absolute bottom-[0px] left-[0px] h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]" strokeWidth={1.7} />
      <Cog className="absolute right-[0px] top-[0px] h-[29px] w-[29px] lg:h-[36px] lg:w-[36px]" strokeWidth={1.7} />
    </span>
  )
}

function HandBadgeIcon() {
  return (
    <span className="relative block h-[58px] w-[76px] lg:h-[72px] lg:w-[90px]" aria-hidden="true">
      <HandCoins className="absolute bottom-[0px] left-[0px] h-[52px] w-[76px] lg:h-[64px] lg:w-[90px]" strokeWidth={1.7} />
      <BadgeCheck className="absolute right-[9px] top-[0px] h-[28px] w-[28px] lg:right-[11px] lg:h-[34px] lg:w-[34px]" strokeWidth={1.7} />
    </span>
  )
}
