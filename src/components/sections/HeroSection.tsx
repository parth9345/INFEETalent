import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { sectionClasses, sectionId } from '@/lib/sections'
import type { PageBlock } from '@/types/content'

type HeroBlock = Extract<PageBlock, { blockType: 'hero' }>

export function HeroSection({ block }: { block: HeroBlock }) {
  const centered = block.variant === 'centered'

  return (
    <section id={sectionId(block.settings)} className={centered ? sectionClasses(block.settings, { defaultBackground: 'cream', includeSpacing: false }) : 'bg-brand-background'}>
      <Container className={centered ? 'grid min-h-[430px] place-items-center py-14 text-center' : 'grid max-w-[1500px] overflow-visible px-[24px] pb-[72px] pt-[64px] md:pb-[80px] md:pt-[72px] lg:grid-cols-[650px_710px] lg:gap-[140px] lg:px-[0px] lg:pb-[80px] lg:pt-[48px]'}>
        <div className={centered ? 'mx-auto min-w-0 max-w-4xl' : 'min-w-0 max-w-[650px]'}>
          {centered && block.eyebrow ? (
            <p className="mb-4 text-body12 font-extrabold uppercase leading-[18px] tracking-[3px] text-brand-primary">{block.eyebrow}</p>
          ) : null}
          <h1 className={centered ? 'break-words text-h1 font-extrabold leading-[44px] tracking-[0px] text-neutral-dark' : 'max-w-[650px] break-words text-h1 font-[800] leading-[44px] tracking-[0px] text-neutral-black'}>
            {centered ? (
              <>
                {block.heading}
                {block.highlight ? <span className="block text-brand-primary">{block.highlight}</span> : null}
              </>
            ) : (
              <SplitHeroHeading heading={block.heading} highlight={block.highlight} />
            )}
          </h1>
          {block.description ? <p className={centered ? 'mt-6 max-w-[455px] text-body16 leading-[26px] text-neutral-muted' : 'mt-[92px] max-w-[533px] text-body16 font-[400] leading-[26px] tracking-[0px] text-neutral-muted md:mt-[150px] md:text-body18 md:leading-[30px] lg:mt-[211px]'}>{block.description}</p> : null}
          <div className={centered ? 'mt-8 flex flex-wrap justify-center gap-4' : 'mt-[29px] flex flex-wrap gap-[16px]'}>
            {block.primaryAction?.url ? (
              <ButtonLink href={block.primaryAction.url} newTab={block.primaryAction.newTab} size="md" className="w-[160px] px-[0px]">
                {block.primaryAction.label || 'Get Started'}
              </ButtonLink>
            ) : null}
            {block.secondaryAction?.url ? (
              <ButtonLink href={block.secondaryAction.url} variant="secondary" newTab={block.secondaryAction.newTab} size="md" className="w-[146px] px-[0px]">
                {block.secondaryAction.label || 'Learn More'}
              </ButtonLink>
            ) : null}
          </div>
        </div>
        {centered ? null : <HeroVisual block={block} />}
      </Container>
    </section>
  )
}

function SplitHeroHeading({ heading, highlight }: { heading: string; highlight?: string | null }) {
  const fallbackHighlight = 'Recruitment Solutions,'
  const highlightText = highlight && heading.includes(highlight) ? highlight : fallbackHighlight

  if (!heading.includes(highlightText)) {
    return (
      <>
        {heading}
        {highlight ? <span className="bg-brand-accent/25 px-[0px] decoration-clone box-decoration-clone">{highlight}</span> : null}
      </>
    )
  }

  const [before, after] = heading.split(highlightText)

  return (
    <>
      {before}
      <span className="bg-brand-accent/25 px-[0px] decoration-clone box-decoration-clone">{highlightText}</span>
      {after}
    </>
  )
}

function HeroVisual({ block }: { block: HeroBlock }) {
  const feature = block.featureCard

  return (
    <div className="relative mt-[52px] h-[405px] min-w-0 overflow-visible md:h-[520px] lg:mt-[0px] lg:h-[655px] lg:w-[756px]">
      <div className="absolute left-[40px] top-[96px] h-[240px] w-[330px] overflow-hidden rounded-[0px] bg-neutral-light md:left-[80px] md:top-[104px] md:h-[360px] md:w-[500px] lg:left-[100px] lg:top-[103px] lg:h-[449px] lg:w-[610px]">
        <OptimizedImage
          media={block.media}
          fallbackSrc={figmaAssets.heroInterview}
          altFallback="Recruitment consultation in office"
          priority
          sizes="(min-width: 1024px) 610px, (min-width: 768px) 500px, 330px"
          className="object-cover"
        />
      </div>
      <div className="absolute left-[0px] top-[40px] h-[198px] w-[144px] rounded-[0px] bg-brand-background shadow-[0px_24px_55px_rgba(0,0,0,0.18)] md:h-[240px] md:w-[176px] lg:top-[64px] lg:h-[279px] lg:w-[204px]">
        <div className="relative h-[104px] overflow-hidden rounded-[0px] md:h-[128px] lg:h-[149px]">
          <OptimizedImage
            media={feature?.image}
            fallbackSrc={figmaAssets.profileCard}
            altFallback={feature?.name || 'Candidate profile'}
            sizes="(min-width: 1024px) 204px, (min-width: 768px) 176px, 144px"
            className="object-cover"
          />
        </div>
        <div className="h-[94px] space-y-[6px] px-[14px] pb-[12px] pt-[12px] md:h-[112px] md:px-[17px] md:pt-[16px] lg:h-[130px] lg:px-[20px] lg:pt-[20px]">
          <div>
            <p className="text-body12 font-[800] leading-[15px] tracking-[0px] text-neutral-black md:text-body14 md:leading-[18px] lg:text-body14 lg:leading-[19px]">{feature?.name || 'Nicky Williams'}</p>
            <p className="mt-[4px] text-[8px] font-[400] leading-[11px] tracking-[0px] text-neutral-muted md:text-[9px] md:leading-[12px]">{feature?.role || 'Full Stack Developer'}</p>
          </div>
          <div className="h-[1px] bg-neutral-light" />
          <div className="space-y-[5px] text-[8px] font-[400] leading-[10px] tracking-[0px] text-neutral-black md:text-[9px] md:leading-[11px]">
            <p className="flex justify-between">
              <span>{feature?.primaryLabel || 'Online Session'}:</span>
              <strong className="font-[700] text-brand-primary">{feature?.primaryValue || '$3,000'}</strong>
            </p>
            <p className="flex justify-between">
              <span>{feature?.secondaryLabel || 'Full Month'}:</span>
              <strong className="font-[700] text-brand-primary">{feature?.secondaryValue || '$60,000'}</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute right-[0px] top-[56px] flex h-[36px] w-[140px] items-center justify-center rounded-[0px] bg-brand-accent px-[0px] text-body12 font-[700] leading-[14px] tracking-[0px] text-brand-primary shadow-[0px_10px_25px_rgba(0,0,0,0.12)] md:right-[0px] md:top-[66px] md:h-[42px] md:w-[174px] md:text-body14 md:leading-[18px] lg:left-[536px] lg:top-[70px] lg:h-[49px] lg:w-[203px] lg:text-body18 lg:leading-[22px]">
        {block.badgeLabel || 'Consultation Session'}
      </div>
      <div className="absolute bottom-[0px] right-[0px] h-[112px] w-[132px] rounded-[0px] bg-brand-primary px-[16px] pb-[16px] pt-[18px] text-neutral-white shadow-[0px_28px_45px_rgba(0,0,0,0.22)] md:h-[132px] md:w-[154px] md:px-[18px] md:pt-[22px] lg:left-[582px] lg:top-[470px] lg:h-[151px] lg:w-[174px] lg:px-[21px] lg:pb-[21px] lg:pt-[25px]">
        <p className="text-[24px] font-[800] leading-[28px] tracking-[0px] md:text-[26px] md:leading-[30px] lg:text-[28px] lg:leading-[32px]">{block.stats?.[0]?.value || '3000+'}</p>
        <p className="text-[10px] font-[400] leading-[13px] tracking-[0px] md:text-[12px] md:leading-[16px] lg:text-[14px] lg:leading-[18px]">{block.stats?.[0]?.label || 'Professionals Joined'}</p>
        <div className="mt-[12px] flex -space-x-[8px] md:-space-x-[10px] lg:mt-[15px] lg:-space-x-[9px]">
          {[figmaAssets.avatarOne, figmaAssets.teamOffice, figmaAssets.profileCard, figmaAssets.aboutOfficeSide].map(
            (avatar) => (
              <span key={avatar} className="relative size-[28px] overflow-hidden rounded-[999px] border-[2px] border-neutral-white md:size-[32px] lg:size-[38px]">
                <OptimizedImage src={avatar} alt="" sizes="38px" className="object-cover" />
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
