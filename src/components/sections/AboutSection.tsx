import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { RichText } from '@/components/ui/RichText'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { figmaAssets } from '@/lib/assets'
import { sectionClasses, sectionId } from '@/lib/sections'
import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type ContentImageBlock = Extract<PageBlock, { blockType: 'contentImage' }>

export function AboutSection({ block, isHomepage = false, className }: { block: ContentImageBlock; isHomepage?: boolean; className?: string }) {
  const imageFirst = block.imagePosition !== 'right'
  const isDark = !isHomepage && block.settings?.background === 'blue'

  if (isHomepage) {
    return <HomepageAbout block={block} imageFirst={imageFirst} className={className} />
  }

  if (isDark) {
    return <DarkAbout block={block} imageFirst={imageFirst} className={className} />
  }

  return <DefaultAbout block={block} imageFirst={imageFirst} className={className} />
}

function HomepageAbout({ block, imageFirst, className }: { block: ContentImageBlock; imageFirst: boolean; className?: string }) {
  return (
    <section id={sectionId(block.settings, 'about')} className={cn('lg:min-h-[785px]', className)}>
      <Container
        className={cn(
          'grid max-w-[1500px] gap-[20px] px-[10px] pb-[10px] pt-[10px] md:grid-cols-[700px_1fr] md:gap-[72px] md:pb-[96px] md:pt-[96px] lg:grid-cols-[700px_630px] lg:gap-[132px] lg:px-[0px] lg:pb-[91px] lg:pt-[120px]',
          !imageFirst && 'md:grid-cols-[1fr_430px]',
        )}
      >
        <MediaPair block={block} isHomepage className={!imageFirst ? 'lg:order-2' : undefined} />
        <div className="min-w-0 md:p-[0px] lg:pt-[90px]">
          <h2 className="heading-section mb-[0px] max-w-[550px] text-[42px] font-[800] leading-[52px] tracking-[0px] text-[#000000] md:text-[48px] md:leading-[58px]">
            <HomepageAboutHeading heading={block.heading} highlight={block.highlight} />
          </h2>
          <div className="h-[10px] w-full max-w-[472px] bg-[#fdeea1]" />
          <div className="mt-[23px]">
            <RichText value={block.body} fallback={block.bodyText} className="max-w-[630px] space-y-[18px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555] md:text-[18px]" />
          </div>
          {block.action?.url ? (
            <ButtonLink
              href={block.action.url}
              newTab={block.action.newTab}
              size="lg"
              className="mt-[25px] h-[51px] min-w-[155px] rounded-[0px] border-[0px] bg-[#FCA62B] px-[25px] text-[15px] font-[700] leading-[18px] tracking-[0.9px] text-[#000D6B] hover:bg-[#E8951F]"
            >
              {block.action.label || 'Learn More'}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

function DarkAbout({ block, imageFirst, className }: { block: ContentImageBlock; imageFirst: boolean; className?: string }) {
  return (
    <section id={sectionId(block.settings, 'about')} className={cn('relative overflow-hidden bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[72px] text-[#FFFFFF] lg:py-[96px]', className)}>
      <Container
        className={cn(
          'grid max-w-[1500px] items-center gap-[48px] px-[24px] lg:grid-cols-2 lg:gap-[72px] lg:px-[0px]',
        )}
      >
        {imageFirst ? (
          <DarkImageCol block={block} />
        ) : null}
        <div className={cn('min-w-0', imageFirst ? '' : 'lg:order-1')}>
          {block.eyebrow ? (
            <p className="eyebrow-title text-[12px] font-[800] uppercase leading-[16px] tracking-[6px] text-[#FCA62B]">
              {block.eyebrow}
            </p>
          ) : null}
          <h2 className="heading-section mt-[16px] break-words text-[32px] font-[800] leading-[42px] tracking-[-0.5px] text-[#FFFFFF] md:text-[40px] md:leading-[52px] lg:text-[50px] lg:leading-[66px]">
            <HeadingHighlight heading={block.heading} highlight={block.highlight} />
          </h2>
          <div className="mt-[28px]">
            <RichText
              value={block.body}
              fallback={block.bodyText}
              className="space-y-[18px] text-[16px] font-[400] leading-[28px] tracking-[0px] text-[rgba(255,255,255,0.82)] md:text-[18px] md:leading-[30px]"
            />
          </div>
          {(block.primaryAction?.url || block.secondaryAction?.url || block.action?.url) ? (
            <div className="mt-[40px] flex flex-wrap gap-[16px]">
              {block.primaryAction?.url ? (
                <ButtonLink href={block.primaryAction.url} newTab={block.primaryAction.newTab} size="md" className="h-[50px] w-[160px] border-[0px] bg-[#FCA62B] px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.8px] text-[#000000] hover:bg-[#FCA62B]">
                  {block.primaryAction.label || 'Get Started'}
                </ButtonLink>
              ) : null}
              {block.secondaryAction?.url ? (
                <ButtonLink href={block.secondaryAction.url} variant="secondary" newTab={block.secondaryAction.newTab} size="md" className="h-[50px] w-[160px] border-[2px] border-[#FFFFFF]/60 bg-transparent px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.8px] text-[#FFFFFF] hover:bg-[#FFFFFF]/10">
                  {block.secondaryAction.label || 'Learn More'}
                </ButtonLink>
              ) : null}
              {!block.primaryAction?.url && !block.secondaryAction?.url && block.action?.url ? (
                <ButtonLink href={block.action.url} newTab={block.action.newTab} size="md" className="h-[50px] w-[160px] border-[0px] bg-[#FCA62B] px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.8px] text-[#000000] hover:bg-[#FCA62B]">
                  {block.action.label || 'Learn More'}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
        {!imageFirst ? (
          <DarkImageCol block={block} />
        ) : null}
      </Container>
    </section>
  )
}

function DarkImageCol({ block }: { block: ContentImageBlock }) {
  return (
    <div className="relative min-h-[360px] overflow-hidden lg:min-h-[500px]">
      <OptimizedImage
        media={block.media}
        fallbackSrc={figmaAssets.aboutOfficeTall}
        altFallback="Recruitment team in office"
        sizes="(min-width: 1024px) 650px, 100vw"
        className="object-cover"
      />
      {block.overlayCard?.name ? (
        <div className="absolute bottom-[24px] left-[24px] z-[10] flex items-center gap-[14px] bg-[#FFFFFF] px-[20px] py-[16px] shadow-[0_24px_55px_rgba(0,0,0,0.22)]">
          <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#EAEBF4] text-[18px] font-[800] text-[#2C368D]">
            {block.overlayCard.name.charAt(0)}
          </div>
          <div>
            <p className="text-[14px] font-[700] leading-[18px] text-[#000000]">{block.overlayCard.name}</p>
            {block.overlayCard.role ? (
              <p className="text-[12px] font-[400] leading-[16px] text-[#555555]">{block.overlayCard.role}</p>
            ) : null}
            {block.overlayCard.company ? (
              <p className="text-[11px] font-[600] leading-[14px] text-[#FCA62B]">{block.overlayCard.company}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function DefaultAbout({ block, imageFirst, className }: { block: ContentImageBlock; imageFirst: boolean; className?: string }) {
  return (
    <section id={sectionId(block.settings, 'about')} className={cn(sectionClasses(block.settings, { defaultBackground: 'soft' }), className)}>
      <Container
        className={cn(
          'grid items-center gap-10 lg:grid-cols-[520px_1fr]',
          !imageFirst && 'lg:grid-cols-[1fr_520px]',
        )}
      >
        <MediaPair block={block} className={!imageFirst ? 'lg:order-2' : undefined} />
        <div className="min-w-0 p-0 md:p-8">
          <SectionHeader eyebrow={block.eyebrow} title={block.heading} />
          <div className="mt-6">
            <RichText value={block.body} fallback={block.bodyText} />
          </div>
          {block.action?.url ? (
            <ButtonLink href={block.action.url} newTab={block.action.newTab} size="md" className="mt-10">
              {block.action.label || 'Learn More'}
            </ButtonLink>
          ) : null}
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
          className="absolute bottom-[0px] left-[0px] z-0 h-[14px] w-full bg-gradient-to-t from-[rgba(251,223,45,0.45)] from-[40%] to-[rgba(251,223,45,0)] to-[40%]"
          aria-hidden="true"
        />
      </span>
      {after}
    </>
  )
}

function HomepageAboutHeading({ heading, highlight }: { heading: string; highlight?: string | null }) {
  const lineBreakText = ', We '

  if (heading.includes(lineBreakText)) {
    const [before, after] = heading.split(lineBreakText)

    return (
      <>
        <HeadingHighlight heading={`${before},`} highlight={highlight} />
        <br />
        <HeadingHighlight heading={`We ${after}`} highlight={highlight} />
      </>
    )
  }

  return <HeadingHighlight heading={heading} highlight={highlight} />
}

function MediaPair({ block, isHomepage = false, className }: { block: ContentImageBlock; isHomepage?: boolean; className?: string }) {
  if (block.layout === 'split') {
    return (
      <div className={cn(isHomepage ? 'relative h-[350px] overflow-hidden' : 'relative h-[390px] overflow-hidden', className)}>
        <OptimizedImage
          media={block.media}
          fallbackSrc={figmaAssets.aboutOfficeTall}
          altFallback="Business people in office"
          sizes="(min-width: 1024px) 700px, 100vw"
          preferredSizes={isHomepage ? [] : undefined}
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className={cn(isHomepage ? 'relative h-[420px] md:h-[574px]' : 'grid grid-cols-2 gap-4', className)}>
      <div className={isHomepage ? 'absolute left-[0px] top-[0px] h-[420px] w-[300px] overflow-hidden rounded-[0px] md:h-[574px] md:w-[340px]' : 'relative h-[390px] overflow-hidden'}>
        <OptimizedImage
          media={block.media}
          fallbackSrc={figmaAssets.aboutOfficeTall}
          altFallback="Business people in office"
          sizes={isHomepage ? '(min-width: 768px) 340px, 255px' : '340px'}
          preferredSizes={isHomepage ? [] : undefined}
          className="object-cover"
        />
      </div>
      <div className={isHomepage ? 'hidden md:block absolute left-[132px] top-[42px] h-[333px] w-[230px] overflow-hidden rounded-[0px] md:left-[360px] md:top-[56px] md:h-[493px] md:w-[340px]' : 'relative mt-11 h-[315px] overflow-hidden'}>
        <OptimizedImage
          media={block.mediaSecondary}
          fallbackSrc={figmaAssets.aboutOfficeSide}
          altFallback="Recruitment professional"
          sizes={isHomepage ? '(min-width: 768px) 340px, 255px' : '340px'}
          preferredSizes={isHomepage ? [] : undefined}
          className="object-cover"
        />
      </div>
    </div>
  )
}
