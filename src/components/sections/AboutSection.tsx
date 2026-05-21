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

export function AboutSection({ block, isHomepage = false }: { block: ContentImageBlock; isHomepage?: boolean }) {
  const imageFirst = block.imagePosition !== 'right'

  return (
    <section id={sectionId(block.settings, 'about')} className={isHomepage ? 'bg-[#000000]' : sectionClasses(block.settings, { defaultBackground: 'soft' })}>
      <Container
        className={cn(
          isHomepage
            ? 'grid max-w-[1500px] gap-[48px] px-[24px] py-[72px] md:grid-cols-[700px_1fr] md:gap-[72px] md:py-[96px] lg:grid-cols-[700px_630px] lg:gap-[132px] lg:px-[0px] lg:pb-[120px] lg:pt-[120px]'
            : 'grid items-center gap-10 lg:grid-cols-[520px_1fr]',
          !imageFirst && (isHomepage ? 'md:grid-cols-[1fr_430px]' : 'lg:grid-cols-[1fr_520px]'),
        )}
      >
        <MediaPair block={block} isHomepage={isHomepage} className={!imageFirst ? 'lg:order-2' : undefined} />
        <div className={cn('min-w-0 p-0 md:p-8', isHomepage && 'bg-[#000000] md:p-[0px] lg:pt-[178px]')}>
          {isHomepage ? <div className="h-[10px] w-full max-w-[472px] bg-[#FFE029]" /> : <DefaultAboutHeader block={block} />}
          <div className={isHomepage ? 'mt-[23px]' : 'mt-6'}>
            <RichText value={block.body} fallback={block.bodyText} className={isHomepage ? 'max-w-[630px] space-y-[18px] text-[18px] font-[600] leading-[28px] tracking-[0px] text-[#555555] md:text-[18px]' : undefined} />
          </div>
          {block.action?.url ? (
            <ButtonLink
              href={block.action.url}
              newTab={block.action.newTab}
              size={isHomepage ? 'lg' : 'md'}
              className={isHomepage ? 'mt-[25px] h-[51px] min-w-[155px] border-[0px] bg-[#FCA62B] px-[25px] text-[15px] font-[700] leading-[18px] tracking-[0.9px] text-[#000000] hover:bg-[#FCA62B]' : 'mt-10'}
            >
              {block.action.label || 'Learn More'}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

function DefaultAboutHeader({ block }: { block: ContentImageBlock }) {
  return <SectionHeader eyebrow={block.eyebrow} title={block.heading} />
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
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className={cn(isHomepage ? 'relative h-[420px] md:h-[574px]' : 'grid grid-cols-2 gap-4', className)}>
      <div className={isHomepage ? 'absolute left-[0px] top-[0px] h-[420px] w-[250px] overflow-hidden rounded-[0px] md:h-[574px] md:w-[340px]' : 'relative h-[390px] overflow-hidden'}>
        <OptimizedImage
          media={block.media}
          fallbackSrc={figmaAssets.aboutOfficeTall}
          altFallback="Business people in office"
          sizes={isHomepage ? '(min-width: 768px) 340px, 255px' : '340px'}
          className="object-cover"
        />
      </div>
      <div className={isHomepage ? 'absolute left-[132px] top-[42px] h-[330px] w-[230px] overflow-hidden rounded-[0px] md:left-[360px] md:top-[56px] md:h-[462px] md:w-[340px]' : 'relative mt-11 h-[315px] overflow-hidden'}>
        <OptimizedImage
          media={block.mediaSecondary}
          fallbackSrc={figmaAssets.aboutOfficeSide}
          altFallback="Recruitment professional"
          sizes={isHomepage ? '(min-width: 768px) 340px, 255px' : '340px'}
          className="object-cover"
        />
      </div>
    </div>
  )
}
