import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { sectionId } from '@/lib/sections'
import type { PageBlock } from '@/types/content'

type HeroBlock = Extract<PageBlock, { blockType: 'hero' }>
type BridgeStat = NonNullable<HeroBlock['stats']>[number]

const avatarImages = [
  figmaAssets.avatarOne,
  figmaAssets.profileCard,
  figmaAssets.teamOffice,
  figmaAssets.aboutOfficeSide,
]

export function AboutBridgeSection({ block }: { block: HeroBlock }) {
  const primaryStat = block.stats?.[0] || { value: '3000+', label: 'Professionals Joined' }
  const secondaryStat = block.stats?.[1] || { value: '20+', label: 'Years of Experience' }

  return (
    <section
      id={sectionId(block.settings)}
      className="relative overflow-hidden bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[72px] text-[#FFFFFF] lg:h-[814px] lg:py-[0px]"
    >
      <Container className="grid max-w-[1500px] gap-[48px] px-[24px] lg:grid-cols-[690px_650px] lg:gap-[142px] lg:px-[0px] lg:pt-[125px]">
        <BridgeVisual block={block} primaryStat={primaryStat} secondaryStat={secondaryStat} />
        <div className="min-w-0 lg:pt-[113px]">
          <h2 className="heading-section max-w-[650px] text-[40px] font-[800] leading-[52px] tracking-[0px] text-[#FFFFFF] md:text-[50px] md:leading-[66px]">
            <HeadingHighlight heading={block.heading} highlight={block.highlight} />
          </h2>
          {block.description ? (
            <div className="mt-[20px] max-w-[650px] space-y-[25px]">
              {block.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#FFFFFF]/85 md:text-[18px] md:leading-[30px]">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

function BridgeVisual({
  block,
  primaryStat,
  secondaryStat,
}: {
  block: HeroBlock
  primaryStat: BridgeStat
  secondaryStat: BridgeStat
}) {
  return (
    <div className="grid max-w-[690px] gap-[24px] md:grid-cols-[430px_236px]">
      <div className="grid gap-[24px]">
        <div className="relative flex h-[160px] w-full max-w-[430px] flex-col justify-center border border-[#FFFFFF]/10 bg-[#FFFFFF]/[0.04] px-[34px]">
          <p className="text-[42px] font-[800] leading-[50px] tracking-[0px] text-[#FFFFFF] md:text-[50px] md:leading-[60px]">
            {primaryStat.value}
          </p>
          <p className="mt-[1px] text-[16px] font-[700] leading-[24px] tracking-[0px] text-[#FFFFFF] md:text-[18px]">
            {primaryStat.label}
          </p>
          <div className="absolute right-[30px] top-[55px] hidden -space-x-[10px] sm:flex">
            {avatarImages.map((avatar) => (
              <span key={avatar} className="relative size-[54px] overflow-hidden rounded-full border-[4px] border-[#FFFFFF] bg-[#EAEBF4]">
                <OptimizedImage src={avatar} alt="" sizes="54px" className="object-cover" />
              </span>
            ))}
          </div>
        </div>
        <div className="relative h-[300px] w-full max-w-[430px] overflow-hidden md:h-[381px] md:w-[430px]">
          <OptimizedImage
            media={block.featureCard?.image}
            fallbackSrc={figmaAssets.teamOffice}
            altFallback="Recruitment team conversation"
            sizes="(min-width: 1024px) 430px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="grid gap-[24px] md:w-[236px]">
        <div className="relative h-[300px] w-full max-w-[430px] overflow-hidden md:h-[378px] md:w-[236px]">
          <OptimizedImage
            media={block.media}
            fallbackSrc={figmaAssets.heroInterview}
            altFallback="Recruitment professional"
            priority
            sizes="(min-width: 1024px) 236px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex h-[164px] w-full max-w-[430px] flex-col bg-[#FCA62B] px-[32px] pt-[42px] text-[#000000] md:w-[236px]">
          <p className="text-[42px] font-[800] leading-[50px] tracking-[0px] md:text-[50px] md:leading-[60px]">
            {secondaryStat.value}
          </p>
          <p className="mt-[5px] text-[16px] font-[700] leading-[24px] tracking-[0px] md:text-[18px]">
            {secondaryStat.label}
          </p>
        </div>
      </div>
    </div>
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
        <span className="absolute bottom-[3px] left-[0px] h-[9px] w-full bg-[#FCA62B]/45" aria-hidden="true" />
      </span>
      {after}
    </>
  )
}
