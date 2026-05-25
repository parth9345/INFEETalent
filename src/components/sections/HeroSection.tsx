import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { sectionClasses, sectionId } from '@/lib/sections'
import type { PageBlock } from '@/types/content'

type HeroBlock = Extract<PageBlock, { blockType: 'hero' }>

export function HeroSection({ block }: { block: HeroBlock }) {
  if (block.variant === 'textOnly') {
    return <TextOnlyHero block={block} />
  }

  if (block.variant === 'darkSplit') {
    return <DarkSplitHero block={block} />
  }

  const centered = block.variant === 'centered'
  const splitVisual = centered ? null : <SplitHeroVisual block={block} />

  return (
    <section id={sectionId(block.settings)} className={centered ? sectionClasses(block.settings, { defaultBackground: 'cream', includeSpacing: false }) : 'bg-[#FFF8EE] lg:min-h-[783px]'}>
      <Container className={centered ? 'grid min-h-[430px] place-items-center py-14 text-center' : 'grid max-w-[1500px] overflow-visible px-[24px] pb-[72px] pt-[56px] md:pb-[84px] md:pt-[64px] lg:grid-cols-[650px_710px] lg:gap-[140px] lg:px-[0px] lg:pb-[0px] lg:pt-[48px]'}>
        <div className={centered ? 'mx-auto min-w-0 max-w-4xl' : 'min-w-0 max-w-[650px]'}>
          {centered && block.eyebrow ? (
            <p className="mb-4 text-body12 font-extrabold uppercase leading-[18px] tracking-[3px] text-brand-primary">{block.eyebrow}</p>
          ) : null}
          <h1 className={centered ? 'break-words text-h1 font-extrabold leading-[44px] tracking-[0px] text-neutral-dark' : 'max-w-[650px] break-words text-[40px] font-[800] leading-[50px] tracking-[0px] text-[#000000] md:text-[44px] md:leading-[58px] lg:text-[50px] lg:leading-[66px]'}>
            {centered ? (
              <>
                {block.heading}
                {block.highlight ? <span className="block text-brand-primary">{block.highlight}</span> : null}
              </>
            ) : (
              <SplitHeroHeading heading={block.heading} highlight={block.highlight} />
            )}
          </h1>
          {block.description ? <p className={centered ? 'mt-6 max-w-[455px] text-body16 leading-[26px] text-neutral-muted' : 'mt-[92px] max-w-[533px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555] md:mt-[150px] md:text-[18px] md:leading-[30px] lg:mt-[211px]'}>{block.description}</p> : null}
          <div className={centered ? 'mt-8 flex flex-wrap justify-center gap-4' : 'mt-[29px] flex flex-wrap gap-[16px]'}>
            {block.primaryAction?.url ? (
              <ButtonLink href={block.primaryAction.url} newTab={block.primaryAction.newTab} size="md" className="h-[50px] w-[160px] border-[0px] bg-[#FCA62B] px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.8px] text-[#000000] hover:bg-[#FCA62B]">
                {block.primaryAction.label || 'Get Started'}
              </ButtonLink>
            ) : null}
            {block.secondaryAction?.url ? (
              <ButtonLink href={block.secondaryAction.url} variant="secondary" newTab={block.secondaryAction.newTab} size="md" className="h-[50px] w-[146px] border-[2px] border-[#262164] bg-[#FFF8EE] px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.8px] text-[#262164] hover:bg-[#FFF8EE]">
                {block.secondaryAction.label || 'Learn More'}
              </ButtonLink>
            ) : null}
          </div>
        </div>
        {splitVisual}
      </Container>
    </section>
  )
}

function SplitHeroVisual({ block }: { block: HeroBlock }) {
  const primaryStat = block.stats?.[0]
  const secondaryStat = block.stats?.[1]
  const featureCard = block.featureCard
  const hasFeatureCard =
    Boolean(featureCard?.image) ||
    Boolean(featureCard?.name) ||
    Boolean(featureCard?.role) ||
    Boolean(featureCard?.primaryLabel && featureCard?.primaryValue) ||
    Boolean(featureCard?.secondaryLabel && featureCard?.secondaryValue)

  if (!block.media && !block.badgeLabel && !primaryStat && !secondaryStat && !hasFeatureCard) {
    return null
  }

  return (
    <div className="relative mt-[48px] min-h-[620px] min-w-0 md:min-h-[650px] lg:mt-[0px] lg:h-[621px] lg:min-h-[621px] lg:w-[756px]">
      {block.media ? (
        <div className="relative ml-auto h-[320px] w-full overflow-hidden md:h-[420px] lg:absolute lg:left-[100px] lg:top-[102px] lg:h-[450px] lg:w-[610px]">
          <OptimizedImage
            media={block.media}
            altFallback={block.heading}
            priority
            sizes="(min-width: 1024px) 610px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {block.badgeLabel ? (
        <div className="absolute right-[16px] top-[16px] flex h-[49px] w-[203px] items-center justify-center bg-[#FCA62B] px-[12px] text-[18px] font-[700] leading-[22px] tracking-[0px] text-[#000D6B] shadow-[0px_12px_28px_rgba(21,21,21,0.08)] lg:left-[536px] lg:top-[70px] lg:right-auto">
          {block.badgeLabel}
        </div>
      ) : null}

      {hasFeatureCard ? (
        <div className="absolute left-[0px] top-[248px] h-[279px] w-[204px] bg-[#FFF8EE] shadow-[0px_18px_36px_rgba(21,21,21,0.18)] md:top-[300px] lg:top-[64px]">
          <div className="relative h-[149px] w-[204px] overflow-hidden">
            <OptimizedImage
              media={featureCard?.image}
              fallbackSrc={figmaAssets.profileCard}
              altFallback={featureCard?.name || block.heading}
              sizes="204px"
              className="object-cover"
            />
          </div>
          {featureCard?.name || featureCard?.role ? (
            <div className="px-[20px] pt-[22px]">
              {featureCard.name ? <p className="text-[16px] font-[800] leading-[20px] tracking-[0px] text-[#000000]">{featureCard.name}</p> : null}
              {featureCard.role ? <p className="mt-[4px] text-[10px] font-[400] leading-[13px] tracking-[0px] text-[#555555]">{featureCard.role}</p> : null}
            </div>
          ) : null}
          {featureCard?.primaryLabel && featureCard.primaryValue ? (
            <div className="mx-[20px] mt-[14px] border-t border-[#CCCCCC] pt-[11px]">
              <div className="flex items-center justify-between gap-[12px]">
                <p className="text-[8px] font-[700] leading-[13px] tracking-[0px] text-[#000000]">{featureCard.primaryLabel}:</p>
                <p className="text-[8px] font-[700] leading-[13px] tracking-[0px] text-[#15106B]">{featureCard.primaryValue}</p>
              </div>
              {featureCard.secondaryLabel && featureCard.secondaryValue ? (
                <div className="mt-[7px] flex items-center justify-between gap-[12px]">
                  <p className="text-[8px] font-[700] leading-[13px] tracking-[0px] text-[#000000]">{featureCard.secondaryLabel}:</p>
                  <p className="text-[8px] font-[700] leading-[13px] tracking-[0px] text-[#15106B]">{featureCard.secondaryValue}</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {primaryStat || secondaryStat ? (
        <div className="absolute bottom-[0px] right-[0px] grid w-[174px] gap-[0px] shadow-[0px_18px_36px_rgba(21,21,21,0.24)] lg:left-[582px] lg:top-[470px] lg:right-auto lg:bottom-auto">
          {primaryStat ? <SplitHeroStatCard stat={primaryStat} tone="dark" showAvatars /> : null}
          {secondaryStat ? <SplitHeroStatCard stat={secondaryStat} tone="accent" /> : null}
        </div>
      ) : null}
    </div>
  )
}

function SplitHeroStatCard({ stat, tone, showAvatars = false }: { showAvatars?: boolean; stat: { value: string; label: string }; tone: 'accent' | 'dark' }) {
  const isAccent = tone === 'accent'

  return (
    <div className={isAccent ? 'flex h-[151px] flex-col bg-[#FCA62B] px-[20px] py-[24px] text-[#000000]' : 'flex h-[151px] flex-col bg-[#18207E] px-[20px] py-[24px] text-[#FFFFFF]'}>
      <p className="text-[28px] font-[800] leading-[34px] tracking-[0px]">{stat.value}</p>
      <p className={isAccent ? 'mt-[3px] text-[14px] font-[700] leading-[18px] tracking-[0px]' : 'mt-[3px] text-[14px] font-[400] leading-[18px] tracking-[0px] text-[#FFFFFF]'}>
        {stat.label}
      </p>
      {showAvatars ? (
        <div className="mt-[17px] flex -space-x-[6px]">
          {[figmaAssets.avatarOne, figmaAssets.profileCard, figmaAssets.teamOffice, figmaAssets.aboutOfficeSide].map((avatar) => (
            <span key={avatar} className="relative size-[32px] overflow-hidden rounded-[999px] border-[2px] border-[#FFFFFF]">
              <OptimizedImage src={avatar} alt="" sizes="32px" className="object-cover" />
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function TextOnlyHero({ block }: { block: HeroBlock }) {
  return (
    <section id={sectionId(block.settings)} className="bg-[#FFF8EE] py-[72px] md:py-[96px] lg:py-[120px]">
      <Container className="grid max-w-[1500px] gap-[48px] px-[24px] lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-[120px] lg:px-[0px]">
        <div>
          {block.eyebrow ? (
            <p className="mb-[16px] text-[12px] font-[800] uppercase leading-[16px] tracking-[6px] text-[#2C368D]">
              {block.eyebrow}
            </p>
          ) : null}
          <h1 className="break-words text-[38px] font-[800] leading-[48px] tracking-[-0.5px] text-[#151515] md:text-[50px] md:leading-[62px] lg:text-[60px] lg:leading-[74px]">
            <TextOnlyHighlight heading={block.heading} highlight={block.highlight} />
          </h1>
        </div>
        <div className="flex flex-col justify-center">
          {block.description ? (
            <p className="text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#555555] md:text-[18px] md:leading-[30px]">
              {block.description}
            </p>
          ) : null}
          {(block.primaryAction?.url || block.secondaryAction?.url) ? (
            <div className="mt-[32px] flex flex-wrap gap-[16px]">
              {block.primaryAction?.url ? (
                <ButtonLink href={block.primaryAction.url} newTab={block.primaryAction.newTab} size="md" className="h-[50px] w-[160px] border-[0px] bg-[#FCA62B] px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.8px] text-[#000000] hover:bg-[#FCA62B]">
                  {block.primaryAction.label || 'Get Started'}
                </ButtonLink>
              ) : null}
              {block.secondaryAction?.url ? (
                <ButtonLink href={block.secondaryAction.url} variant="secondary" newTab={block.secondaryAction.newTab} size="md" className="h-[50px] w-[146px] border-[2px] border-[#262164] bg-[#FFF8EE] px-[0px] text-[14px] font-[700] leading-[18px] tracking-[0.8px] text-[#262164]">
                  {block.secondaryAction.label || 'Learn More'}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

function DarkSplitHero({ block }: { block: HeroBlock }) {
  const imageOnLeft = block.imagePosition !== 'right'

  return (
    <section id={sectionId(block.settings)} className="relative overflow-hidden bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[64px] text-[#FFFFFF] lg:py-[80px]">
      <Container className="max-w-[1500px] px-[24px] lg:flex lg:items-center lg:gap-[72px] lg:px-[0px]">
        {imageOnLeft ? (
          <div className="mb-[48px] min-w-0 shrink-0 lg:mb-[0px] lg:w-[640px]">
            <DarkSplitVisual block={block} />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          {block.eyebrow ? (
            <p className="text-[12px] font-[800] uppercase leading-[16px] tracking-[6px] text-[#FCA62B]">
              {block.eyebrow}
            </p>
          ) : null}
          <h2 className={`${block.eyebrow ? 'mt-[16px]' : ''} max-w-[560px] break-words text-[32px] font-[800] leading-[42px] tracking-[-0.75px] text-[#FFFFFF] md:text-[40px] md:leading-[52px] lg:text-[52px] lg:leading-[66px]`}>
            <HeadingWithGradientHighlight heading={block.heading} highlight={block.highlight} />
          </h2>
          {block.description ? (
            <div className="mt-[28px] max-w-[520px] space-y-[20px]">
              {block.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-[15px] font-[400] leading-[26px] tracking-[0px] text-[rgba(255,255,255,0.78)] md:text-[16px] md:leading-[28px]">
                  {para}
                </p>
              ))}
            </div>
          ) : null}
          {(block.primaryAction?.url || block.secondaryAction?.url) ? (
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
            </div>
          ) : null}
        </div>
        {!imageOnLeft ? (
          <div className="mt-[48px] min-w-0 shrink-0 lg:mt-[0px] lg:w-[640px]">
            <DarkSplitVisual block={block} />
          </div>
        ) : null}
      </Container>
    </section>
  )
}

function DarkSplitVisual({ block }: { block: HeroBlock }) {
  const stat0 = block.stats?.[0]
  const stat1 = block.stats?.[1]

  return (
    <div className="flex h-[380px] gap-[12px] sm:h-[440px] lg:h-[480px]">
      {/* Left column: stats card + landscape photo */}
      <div className="flex w-[58%] flex-col gap-[12px]">
        {/* Stats card — dark navy */}
        <div className="flex flex-none flex-col justify-between bg-[#060D4E] p-[20px] lg:p-[28px]" style={{ height: '46%' }}>
          <div className="flex items-start justify-between gap-[12px]">
            <p className="text-[32px] font-[800] leading-[38px] tracking-[-0.5px] text-[#FFFFFF] lg:text-[40px] lg:leading-[48px]">
              {stat0?.value || '3000+'}
            </p>
            <div className="flex shrink-0 -space-x-[8px] pt-[4px]">
              {[figmaAssets.avatarOne, figmaAssets.teamOffice, figmaAssets.profileCard, figmaAssets.aboutOfficeSide].map((avatar) => (
                <span key={avatar} className="relative size-[28px] overflow-hidden rounded-full border-[2px] border-[#FFFFFF] lg:size-[32px]">
                  <OptimizedImage src={avatar} alt="" sizes="32px" className="object-cover" />
                </span>
              ))}
            </div>
          </div>
          <p className="text-[13px] font-[400] leading-[18px] text-[rgba(255,255,255,0.72)] lg:text-[15px] lg:leading-[20px]">
            {stat0?.label || 'Professionals Joined'}
          </p>
        </div>
        {/* Landscape photo */}
        <div className="relative flex-1 overflow-hidden">
          <OptimizedImage
            media={block.featureCard?.image}
            fallbackSrc={figmaAssets.teamOffice}
            altFallback="Team working together"
            sizes="(min-width: 1024px) 360px, 55vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Right column: portrait photo + yellow stats card */}
      <div className="flex flex-1 flex-col gap-[12px]">
        {/* Portrait photo */}
        <div className="relative flex-1 overflow-hidden">
          <OptimizedImage
            media={block.media}
            fallbackSrc={figmaAssets.heroInterview}
            altFallback="Recruitment professional"
            priority
            sizes="(min-width: 1024px) 260px, 42vw"
            className="object-cover"
          />
        </div>
        {/* Stats card — amber/yellow */}
        <div className="flex flex-none flex-col justify-between bg-[#FCA62B] p-[20px] lg:p-[28px]" style={{ height: '38%' }}>
          <p className="text-[32px] font-[800] leading-[38px] tracking-[-0.5px] text-[#000000] lg:text-[40px] lg:leading-[48px]">
            {stat1?.value || '20+'}
          </p>
          <p className="text-[13px] font-[700] leading-[18px] text-[#000000] lg:text-[15px] lg:leading-[20px]">
            {stat1?.label || 'Years of Experience'}
          </p>
        </div>
      </div>
    </div>
  )
}

function TextOnlyHighlight({ heading, highlight }: { heading: string; highlight?: string | null }) {
  if (!highlight || !heading.includes(highlight)) {
    return <>{heading}</>
  }

  const idx = heading.indexOf(highlight)
  const before = heading.slice(0, idx)
  const after = heading.slice(idx + highlight.length)

  return (
    <>
      {before}
      <span className="box-decoration-clone bg-[#FFE029] text-[#151515]" style={{ WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>
        {highlight}
      </span>
      {after}
    </>
  )
}

function HeadingWithGradientHighlight({ heading, highlight }: { heading: string; highlight?: string | null }) {
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

function SplitHeroHeading({ heading, highlight }: { heading: string; highlight?: string | null }) {
  const fallbackHighlight = 'Recruitment Solutions,'
  const highlightText = highlight && heading.includes(highlight) ? highlight : fallbackHighlight

  if (!heading.includes(highlightText)) {
    return (
      <>
        {heading}
        {highlight ? <span className="bg-[#FDEEA1] px-[0px] decoration-clone box-decoration-clone">{highlight}</span> : null}
      </>
    )
  }

  const [before, after] = heading.split(highlightText)

  return (
    <>
      {before}
      <span className="bg-[#FDEEA1] px-[0px] decoration-clone box-decoration-clone">{highlightText}</span>
      {after}
    </>
  )
}
