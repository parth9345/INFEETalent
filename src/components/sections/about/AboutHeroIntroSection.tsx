import { Container } from '@/components/ui/Container'
import { sectionId } from '@/lib/sections'
import type { PageBlock } from '@/types/content'

type HeroBlock = Extract<PageBlock, { blockType: 'hero' }>

export function AboutHeroIntroSection({ block }: { block: HeroBlock }) {
  return (
    <section id={sectionId(block.settings)} className="bg-[#FFF8EE] lg:min-h-[292px]">
      <Container className="grid max-w-[1500px] gap-[32px] px-[24px] pb-[52px] pt-[48px] md:gap-[40px] md:pb-[56px] md:pt-[50px] lg:grid-cols-[724px_570px] lg:gap-[206px] lg:px-[0px]">
        <div className="min-w-0">
          <h1 className="max-w-[724px] break-words text-[40px] font-[800] leading-[50px] tracking-[0px] text-[#000000] md:text-[50px] md:leading-[66px]">
            <AboutIntroHeading heading={block.heading} highlight={block.highlight} />
          </h1>
        </div>
        {block.description ? (
          <p className="max-w-[570px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555] md:text-[18px] md:leading-[30px] lg:pt-[43px]">
            <AboutIntroDescription text={block.description} />
          </p>
        ) : null}
      </Container>
    </section>
  )
}

function AboutIntroHeading({ heading, highlight }: { heading: string; highlight?: string | null }) {
  if (!highlight || !heading.includes(highlight)) {
    return <>{heading}</>
  }

  const idx = heading.indexOf(highlight)
  const before = heading.slice(0, idx).trimEnd()
  const after = heading.slice(idx + highlight.length)

  return (
    <>
      {before}
      <br />
      <span className="relative inline-block">
        <span className="relative z-[1]">{highlight}</span>
        <span className="absolute bottom-[5px] left-[0px] z-0 h-[52px] w-full bg-[#FFF2A8]" aria-hidden="true" />
      </span>
      {after}
    </>
  )
}

function AboutIntroDescription({ text }: { text: string }) {
  const emphasized = ['20 years', 'INFE Talent']
  const pattern = new RegExp(`(${emphasized.map(escapeRegExp).join('|')})`, 'g')

  return (
    <>
      {text.split(pattern).map((part, index) =>
        emphasized.includes(part) ? (
          <strong key={`${part}-${index}`} className="font-[700] text-[#555555]">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
