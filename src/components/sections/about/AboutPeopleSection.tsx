import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { RichText } from '@/components/ui/RichText'
import { figmaAssets } from '@/lib/assets'
import { sectionId } from '@/lib/sections'
import type { PageBlock } from '@/types/content'

type ContentImageBlock = Extract<PageBlock, { blockType: 'contentImage' }>
type PeopleStat = NonNullable<ContentImageBlock['stats']>[number]

const avatarImages = [
  figmaAssets.avatarOne,
  figmaAssets.profileCard,
  figmaAssets.teamOffice,
  figmaAssets.aboutOfficeSide,
]

export function AboutPeopleSection({ block }: { block: ContentImageBlock }) {
  const primaryStat = block.stats?.[0]
  const profileStats = block.stats?.slice(1, 3) || []

  return (
    <section
      id={sectionId(block.settings, 'about')}
      className="relative overflow-hidden bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[72px] text-[#FFFFFF] lg:h-[814px] lg:py-[0px]"
    >
      <Container className="grid max-w-[1500px] gap-[48px] px-[24px] lg:grid-cols-[700px_740px] lg:gap-[60px] lg:px-[0px] lg:pt-[137px]">
        <div className="min-w-0 lg:pt-[146px]">
          <h2 className="heading-section max-w-[560px] text-[40px] font-[800] leading-[52px] tracking-[0px] text-[#FFFFFF] md:text-[50px] md:leading-[66px]">
            <PeopleHeading heading={block.heading} highlight={block.highlight} />
          </h2>
          <div className="mt-[22px] max-w-[704px]">
            <RichText
              value={block.body}
              fallback={block.bodyText}
              className="space-y-[0px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#FFFFFF]/90 md:text-[18px] md:leading-[30px]"
            />
          </div>
        </div>

        <PeopleVisual block={block} primaryStat={primaryStat} profileStats={profileStats} />
      </Container>
    </section>
  )
}

function PeopleVisual({
  block,
  primaryStat,
  profileStats,
}: {
  block: ContentImageBlock
  primaryStat?: PeopleStat
  profileStats: PeopleStat[]
}) {
  return (
    <div className="relative h-[600px] min-w-0 lg:h-[552px] lg:w-[790px]">
      <div className="absolute left-[22px] top-[120px] h-[300px] w-[calc(100%-44px)] overflow-hidden sm:h-[360px] lg:left-[130px] lg:top-[29px] lg:h-[449px] lg:w-[610px]">
        <OptimizedImage
          media={block.media}
          fallbackSrc={figmaAssets.heroInterview}
          altFallback="Recruitment partnership meeting"
          sizes="(min-width: 1024px) 610px, 100vw"
          className="object-cover"
        />
      </div>

      {primaryStat ? (
        <div className="absolute left-[0px] top-[0px] z-[3] h-[152px] w-[174px] bg-[#111A70]/92 px-[20px] pt-[23px] shadow-[0_24px_55px_rgba(0,0,0,0.22)] lg:left-[90px]">
          <p className="text-[30px] font-[800] leading-[36px] tracking-[0px] text-[#FFFFFF]">
            {primaryStat.value}
          </p>
          <p className="mt-[3px] text-[14px] font-[400] leading-[20px] tracking-[0px] text-[#FFFFFF]">
            {primaryStat.label}
          </p>
          <div className="mt-[13px] flex -space-x-[8px]">
            {avatarImages.map((avatar) => (
              <span key={avatar} className="relative h-[36px] w-[36px] overflow-hidden rounded-full border-[2px] border-[#FFFFFF] bg-[#EAEBF4]">
                <OptimizedImage src={avatar} alt="" sizes="36px" className="object-cover" />
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {block.primaryAction?.url ? (
        <ButtonLink
          href={block.primaryAction.url}
          newTab={block.primaryAction.newTab}
          className="absolute bottom-[48px] left-[0px] z-[4] h-[50px] w-[204px] rounded-[0px] border-[0px] bg-[#FCA62B] px-[0px] text-[18px] font-[700] leading-[22px] tracking-[0px] text-[#000D6B] hover:bg-[#E8951F] lg:bottom-auto lg:left-[50px] lg:top-[442px]"
        >
          {block.primaryAction.label}
        </ButtonLink>
      ) : null}

      {block.overlayCard?.name ? (
        <div className="absolute bottom-[0px] right-[0px] z-[5] h-[282px] w-[204px] bg-[#FFF8EE] text-[#151515] shadow-[0_26px_48px_rgba(0,0,0,0.28)] lg:left-[586px] lg:right-auto lg:top-[270px]">
          <div className="relative h-[151px] w-full overflow-hidden">
            <OptimizedImage
              media={block.mediaSecondary}
              fallbackSrc={figmaAssets.heroInterview}
              altFallback={block.overlayCard.name}
              sizes="204px"
              className="object-cover"
            />
          </div>
          <div className="px-[18px] pt-[22px]">
            <p className="text-[16px] font-[800] leading-[20px] tracking-[0px] text-[#151515]">
              {block.overlayCard.name}
            </p>
            {block.overlayCard.role ? (
              <p className="mt-[5px] text-[9px] font-[400] leading-[12px] tracking-[0px] text-[#555555]">
                {block.overlayCard.role}
              </p>
            ) : null}
            {profileStats.length ? (
              <div className="mt-[16px] border-t border-[#D8D0C8] pt-[10px]">
                {profileStats.map((stat) => (
                  <div key={`${stat.label}-${stat.value}`} className="flex items-center justify-between text-[8px] font-[700] leading-[12px] tracking-[0px] text-[#151515]">
                    <span>{stat.label}</span>
                    <span className="text-[#000D6B]">{stat.value}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function PeopleHeading({ heading, highlight }: { heading: string; highlight?: string | null }) {
  const text = heading.includes(', ') ? heading.replace(', ', ',\n') : heading
  const parts = text.split(/(PEOPLE|POSSIBLE!?|\n)/g)

  if (parts.length === 1 && (!highlight || !heading.includes(highlight))) {
    return <>{heading}</>
  }

  return (
    <>
      {parts.map((part, index) => {
        if (part === '\n') {
          return <br key={index} />
        }

        if (part === 'PEOPLE' || part === 'POSSIBLE' || part === 'POSSIBLE!') {
          return (
            <span key={index} className="relative inline-block">
              <span className="relative z-[1]">{part}</span>
              <span className="absolute bottom-[4px] left-[0px] h-[7px] w-full bg-[#8C8D62]" aria-hidden="true" />
            </span>
          )
        }

        return part
      })}
    </>
  )
}
