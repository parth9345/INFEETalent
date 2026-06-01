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
import { sectionId } from '@/lib/sections'
import type { PageBlock } from '@/types/content'

type AdvantageBlock = Extract<PageBlock, { blockType: 'advantage' }>

const cardPositions = [
  'lg:col-start-1 lg:row-start-1',
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-1 lg:row-start-2',
  'lg:col-start-3 lg:row-start-2',
]

export function AdvantageSection({ block }: { block: AdvantageBlock }) {
  return (
    <section
      id={sectionId(block.settings)}
      className="relative overflow-hidden bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[72px] text-[#FFFFFF] lg:h-[1040px] lg:py-[0px]"
    >
      <Container className="max-w-[1500px] px-[24px] lg:px-[0px] lg:pt-[126px]">
        <div className="grid gap-[36px] lg:grid-cols-[500px_572px] lg:gap-[428px]">
          <h2 className="heading-section max-w-[500px] break-words text-[40px] font-[800] leading-[52px] tracking-[0px] text-[#FFFFFF] md:text-[50px] md:leading-[66px]">
            <HeadingHighlight heading={block.heading} highlight={block.highlight} />
          </h2>
          {block.description ? (
            <p className="max-w-[572px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#FFFFFF] md:text-[20px] md:leading-[30px]">
              {block.description}
            </p>
          ) : null}
        </div>

        <div className="relative mt-[44px] grid grid-cols-1 border-l border-t border-[#FFFFFF]/55 sm:grid-cols-2 lg:mt-[34px] lg:h-[631px] lg:grid-cols-[500px_500px_500px] lg:grid-rows-[315px_316px]">
          <div className="relative hidden border-b border-r border-[#FFFFFF]/55 lg:col-start-2 lg:row-span-2 lg:block">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[134px] w-[250px] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
              aria-hidden="true"
            >
              <div className="absolute left-[28px] top-[3px] h-[128px] w-[128px] rounded-full border-[18px] border-[#FFFFFF]" />
              <div className="absolute left-[98px] top-[3px] h-[128px] w-[128px] rounded-full border-[18px] border-[#FFFFFF]" />
              <div className="absolute left-[0px] top-[50px] h-[52px] w-[52px] rounded-full bg-[#FFFFFF]" />
              <div className="absolute right-[0px] top-[50px] h-[52px] w-[52px] rounded-full bg-[#FFFFFF]" />
            </div>
          </div>

          {block.items?.slice(0, 4).map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className={`group flex min-h-[300px] flex-col border-b border-r border-[#FFFFFF]/55 px-[40px] pb-[38px] pt-[52px] transition duration-300 hover:bg-[#FFFFFF]/[0.04] lg:min-h-0 lg:pb-[0px] lg:pt-[52px] ${cardPositions[index] || ''}`}
            >
              <div className="h-[76px] w-[90px] text-[#FFFFFF] transition duration-300 group-hover:scale-[1.05]">
                <AdvantageIcon name={item.icon} />
              </div>
              <h3 className="mt-[42px] text-[22px] font-[800] leading-[28px] tracking-[0px] text-[#FFFFFF] md:text-[24px] md:leading-[30px] lg:mt-[45px]">
                {item.title}
              </h3>
              <p className="mt-[18px] max-w-[430px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#FFFFFF] md:text-[20px] md:leading-[30px]">
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
      <span className="relative inline">
        <span className="relative z-[1]">{highlight}</span>
        <span className="absolute bottom-[4px] left-[0px] h-[10px] w-full bg-[#8C8D62]" aria-hidden="true" />
      </span>
      {after}
    </>
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
    <span className="relative block h-[82px] w-[88px]" aria-hidden="true">
      <FileText className="absolute right-[0px] top-[0px] h-[80px] w-[60px]" strokeWidth={1.8} />
      <ShieldCheck className="absolute bottom-[0px] left-[0px] h-[48px] w-[48px]" strokeWidth={1.8} />
      <FileCheck2 className="absolute right-[8px] top-[8px] h-[48px] w-[48px] opacity-0" strokeWidth={1.8} />
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
    <span className="relative block h-[82px] w-[92px]" aria-hidden="true">
      <HandCoins className="absolute bottom-[0px] left-[0px] h-[62px] w-[92px]" strokeWidth={1.8} />
      <Cog className="absolute right-[16px] top-[0px] h-[42px] w-[42px]" strokeWidth={1.8} />
    </span>
  )
}
