import {
  Briefcase,
  Globe,
  MapPin,
  ShieldCheck,
  Star,
  Target,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import { Container } from '@/components/ui/Container'
import type { PageBlock } from '@/types/content'

type AdvantageBlock = Extract<PageBlock, { blockType: 'advantage' }>

const iconMap: Record<string, LucideIcon> = {
  Globe,
  ShieldCheck,
  Users,
  Briefcase,
  MapPin,
  Star,
  Zap,
  Target,
}

const getIcon = (name?: string): LucideIcon => {
  if (!name) return Globe
  return iconMap[name] || Globe
}

export function AdvantageSection({ block }: { block: AdvantageBlock }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[72px] text-[#FFFFFF] lg:py-[96px]">
      <Container className="max-w-[1500px] px-[24px] lg:px-[0px]">
        {/* Header row: heading left, description right */}
        <div className="grid gap-[48px] lg:grid-cols-2 lg:items-start lg:gap-[80px]">
          <div>
            {block.eyebrow ? (
              <p className="mb-[16px] text-[12px] font-[800] uppercase leading-[16px] tracking-[6px] text-[#FCA62B]">
                {block.eyebrow}
              </p>
            ) : null}
            <h2 className="break-words text-[32px] font-[800] leading-[42px] tracking-[-0.75px] text-[#FFFFFF] md:text-[40px] md:leading-[52px] lg:text-[44px] lg:leading-[56px]">
              <HeadingHighlight heading={block.heading} highlight={block.highlight} />
            </h2>
          </div>
          {block.description ? (
            <p className="text-[16px] font-[400] leading-[28px] tracking-[0px] text-[rgba(255,255,255,0.72)] lg:text-[18px] lg:leading-[30px]">
              {block.description}
            </p>
          ) : null}
        </div>

        {/* 2×2 card grid — full container width */}
        <div className="relative mt-[56px] grid grid-cols-1 border-l border-t border-[#FFFFFF]/10 sm:grid-cols-2 lg:mt-[72px]">
          {/* INFE logo watermark centered in card grid */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
            aria-hidden="true"
          >
            <div className="relative h-[134px] w-[250px]">
              <div className="absolute left-[28px] top-[3px] h-[128px] w-[128px] rounded-full border-[18px] border-[#FFFFFF]" />
              <div className="absolute left-[98px] top-[3px] h-[128px] w-[128px] rounded-full border-[18px] border-[#FFFFFF]" />
              <div className="absolute left-[0px] top-[50px] size-[52px] rounded-full bg-[#FFFFFF]" />
              <div className="absolute right-[0px] top-[50px] size-[52px] rounded-full bg-[#FFFFFF]" />
            </div>
          </div>

          {block.items?.map((item, index) => {
            const Icon = getIcon(item.icon)
            return (
              <article
                key={`${item.title}-${index}`}
                className="group flex flex-col border-b border-r border-[#FFFFFF]/10 px-[40px] py-[48px] transition duration-300 hover:bg-[#FFFFFF]/[0.04]"
              >
                <Icon
                  size={48}
                  strokeWidth={1.5}
                  className="text-[#FFFFFF] transition duration-300 group-hover:scale-[1.06]"
                  aria-hidden="true"
                />
                <h3 className="mt-[24px] text-[17px] font-[700] leading-[26px] tracking-[-0.2px] text-[#FFFFFF] md:text-[18px]">
                  {item.title}
                </h3>
                <p className="mt-[12px] text-[14px] font-[400] leading-[22px] tracking-[0px] text-[rgba(255,255,255,0.72)] md:text-[15px] md:leading-[24px]">
                  {item.description}
                </p>
              </article>
            )
          })}
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
        <span
          className="absolute bottom-[-5px] left-[0px] h-[3px] w-full bg-[#FCA62B]"
          aria-hidden="true"
        />
      </span>
      {after}
    </>
  )
}
