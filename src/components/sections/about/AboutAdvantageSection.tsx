import {
  Cog,
  FileCheck2,
  FileText,
  HandCoins,
  Headset,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { DotLottieAnimation } from '@/components/ui/DotLottieAnimation'
import { sectionId } from '@/lib/sections'
import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type AdvantageBlock = Extract<PageBlock, { blockType: 'advantage' }>

const cardPositions = [
  'xl:col-start-1 xl:row-start-1',
  'xl:col-start-3 xl:row-start-1',
  'xl:col-start-1 xl:row-start-2',
  'xl:col-start-3 xl:row-start-2',
]

export function AboutAdvantageSection({ block, className }: { block: AdvantageBlock; className?: string }) {
  return (
    <section
      id={sectionId(block.settings)}
      className={cn('relative overflow-hidden bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[72px] text-[#FFFFFF] xl:h-[1040px] xl:py-[0px]', className)}
    >
      <Container className="max-w-[1500px] px-[24px] xl:px-[24px] xl:pt-[126px] 2xl:px-[0px]">
        <div className="grid gap-[36px] xl:grid-cols-[minmax(0,500px)_minmax(0,572px)] xl:justify-between xl:gap-[48px]">
          <h2 className="heading-section max-w-[500px] break-words text-[40px] font-[800] leading-[52px] tracking-[0px] text-[#FFFFFF] md:text-[50px] md:leading-[66px]">
            <HeadingHighlight heading={block.heading} highlight={block.highlight} />
          </h2>
          {block.description ? (
            <p className="max-w-[572px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#FFFFFF] md:text-[20px] md:leading-[30px]">
              {block.description}
            </p>
          ) : null}
        </div>

        <div className="relative mt-[44px] grid grid-cols-1 border-l border-t border-[#FFFFFF]/55 sm:grid-cols-2 xl:mt-[34px] xl:h-[631px] xl:grid-cols-3 xl:grid-rows-[315px_316px]">
          <div className="relative hidden border-b border-r border-[#FFFFFF]/55 xl:col-start-2 xl:row-span-2 xl:block">
            <CenterGraphic />
          </div>

          {block.items?.slice(0, 4).map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className={`group flex min-h-[280px] flex-col border-b border-r border-[#FFFFFF]/55 px-[24px] pb-[32px] pt-[42px] transition duration-300 hover:bg-[#FFFFFF]/[0.04] md:min-h-[300px] md:px-[40px] md:pt-[52px] xl:min-h-0 xl:pb-[0px] xl:pt-[52px] ${cardPositions[index] || ''}`}
            >
              <div className="h-[76px] w-[92px] text-[#FFFFFF] transition duration-300 group-hover:scale-[1.05]">
                <AdvantageIcon name={item.icon} />
              </div>
              <h3 className="mt-[32px] text-[22px] font-[800] leading-[28px] tracking-[0px] text-[#FFFFFF] md:text-[24px] md:leading-[30px] xl:mt-[45px]">
                {item.title}
              </h3>
              <p className="mt-[18px] max-w-[400px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#FFFFFF] md:text-[17px] md:leading-[28px]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

function HeadingHighlight({ heading, highlight }: { heading: string; highlight?: string | null }) {
  if (!highlight || !heading.includes(highlight)) {
    return <>{heading}</>
  }

  const idx = heading.indexOf(highlight)
  const before = heading.slice(0, idx)
  const after = heading.slice(idx + highlight.length)

  return (
    <>
      {before}
      <span className="relative inline-block">
        <span className="relative z-[1]">{highlight}</span>
        <span className="absolute bottom-[4px] left-[0px] h-[9px] w-full bg-[#8C8D62]" aria-hidden="true" />
      </span>
      {after}
    </>
  )
}

function CenterGraphic() {
  return (
    <DotLottieAnimation className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2" />
  )
}

function AdvantageIcon({ name }: { name?: string }) {
  if (name === 'ShieldCheck' || name === 'FileCheck2') {
    return <ComplianceIcon />
  }

  if (name === 'Users') {
    return <TeamIcon />
  }

  if (name === 'Briefcase' || name === 'HandCoins') {
    return <IndustryIcon />
  }

  return <Headset className="h-[76px] w-[76px]" strokeWidth={1.8} aria-hidden="true" />
}

function ComplianceIcon() {
  return (
    <span className="relative block h-[76px] w-[84px]" aria-hidden="true">
      <FileText className="absolute right-[0px] top-[0px] h-[70px] w-[54px]" strokeWidth={1.8} />
      <ShieldCheck className="absolute bottom-[0px] left-[0px] h-[46px] w-[46px]" strokeWidth={1.8} />
      <FileCheck2 className="absolute right-[8px] top-[8px] h-[46px] w-[46px] opacity-0" strokeWidth={1.8} />
    </span>
  )
}

function TeamIcon() {
  return (
    <span className="relative block h-[76px] w-[90px]" aria-hidden="true">
      <TrendingUp className="absolute left-[16px] top-[0px] h-[26px] w-[46px]" strokeWidth={1.8} />
      <UsersRound className="absolute bottom-[0px] left-[0px] h-[58px] w-[88px]" strokeWidth={1.8} />
    </span>
  )
}

function IndustryIcon() {
  return (
    <span className="relative block h-[76px] w-[90px]" aria-hidden="true">
      <HandCoins className="absolute bottom-[0px] left-[0px] h-[60px] w-[90px]" strokeWidth={1.8} />
      <Cog className="absolute right-[14px] top-[0px] h-[40px] w-[40px]" strokeWidth={1.8} />
    </span>
  )
}
