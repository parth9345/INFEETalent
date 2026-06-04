import { Quote } from 'lucide-react'

import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { VideoTestimonialTile } from '@/components/sections/VideoTestimonialTile'
import { figmaAssets } from '@/lib/assets'
import { getTestimonials } from '@/lib/payload-queries'
import { sectionClasses, sectionId } from '@/lib/sections'
import { relationItems } from '@/lib/utils'
import type { PageBlock, TestimonialItem } from '@/types/content'

type TestimonialsBlock = Extract<PageBlock, { blockType: 'testimonials' }>

export async function TestimonialsSection({
  block,
  isHomepage = false,
  isAboutPage = false,
}: {
  block: TestimonialsBlock
  isHomepage?: boolean
  isAboutPage?: boolean
}) {
  const selectedItems = relationItems<TestimonialItem>(block.items)
  const testimonials = selectedItems.length ? selectedItems : await getTestimonials(4)
  const gridOnly = block.display === 'grid'

  return (
    <section id={sectionId(block.settings)} className={isHomepage ? 'bg-[#080D4D] text-[#FFFFFF]' : sectionClasses(block.settings, { defaultBackground: 'blue' })}>
      {isHomepage ? <HomeVoices block={block} testimonials={testimonials} isAboutPage={isAboutPage} /> : null}
      {!isHomepage ? (
      <Container className={gridOnly ? 'space-y-10' : 'grid gap-10 lg:grid-cols-[0.8fr_1fr]'}>
        <div>
          <SectionHeader
            eyebrow={block.eyebrow}
            title={block.heading}
            description={block.description}
            tone="dark"
            className={isHomepage ? 'space-y-[14px]' : undefined}
            eyebrowClassName={isHomepage ? 'text-body12 leading-[18px] tracking-[3px]' : undefined}
            headingClassName={isHomepage ? 'max-w-[430px] text-h2 leading-[38px] tracking-[0px] md:text-h2' : undefined}
            descriptionClassName={isHomepage ? 'max-w-[420px] text-body14 leading-[22px] tracking-[0px] md:text-body14' : undefined}
          />
        </div>
        <div className={isHomepage ? 'grid gap-0 overflow-hidden border border-neutral-white/10 md:grid-cols-2' : 'grid gap-0 overflow-hidden border border-neutral-white/10 md:grid-cols-2'}>
          {gridOnly ? null : (
            <div className={isHomepage ? 'relative h-[248px] min-h-[248px]' : 'relative min-h-[230px]'}>
              <OptimizedImage
                media={block.featuredMedia}
                fallbackSrc={figmaAssets.testimonialVideo}
                altFallback="INFE Talent partner story"
                sizes={isHomepage ? '(min-width: 1024px) 322px, 100vw' : '420px'}
                className="object-cover"
              />
            </div>
          )}
          {testimonials.map((item, index) => (
            <TestimonialCard key={`${item.company}-${index}`} item={item} showRating={block.showRatings} variant={isHomepage ? 'home' : 'default'} />
          ))}
        </div>
      </Container>
      ) : null}
    </section>
  )
}

function HomeVoices({
  block,
  testimonials,
  isAboutPage = false,
}: {
  block: TestimonialsBlock
  testimonials: TestimonialItem[]
  isAboutPage?: boolean
}) {
  const first = testimonials[0]
  const second = testimonials[1] || testimonials[0]
  const third = testimonials[2] || testimonials[1] || testimonials[0]

  return (
    <div className={isAboutPage ? 'relative overflow-hidden bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[64px] md:py-[80px] xl:py-[96px]' : 'relative overflow-hidden bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[80px] lg:min-h-[1322px] lg:py-[96px]'}>
      <Container className={isAboutPage ? 'relative max-w-[1500px] px-[24px] 2xl:px-[0px]' : 'relative max-w-[1500px] px-[24px] lg:px-[0px]'}>
        <div className="max-w-[672px]">
          {block.eyebrow ? <p className="eyebrow-title text-[12px] font-[800] uppercase leading-[16px] tracking-[6px] text-[#FCA62B]">{block.eyebrow}</p> : null}
          <h2 className={isAboutPage ? 'heading-section relative mt-[24px] max-w-[672px] text-[36px] font-[800] capitalize leading-[46px] tracking-[0px] text-[#FFFFFF] md:text-[44px] md:leading-[58px] xl:text-[50px] xl:leading-[66px] xl:tracking-[-1.5px]' : 'heading-section relative mt-[24px] max-w-[672px] text-[50px] font-[800] capitalize leading-[66px] tracking-[-1.5px] text-[#FFFFFF]'}>
            <span className="relative z-[1]">{block.heading}</span>
            <span className="absolute bottom-[4px] left-[316px] z-0 hidden h-[23px] w-[125px] bg-gradient-to-t from-[rgba(251,223,45,0.45)] from-[40%] to-[rgba(251,223,45,0)] to-[40%] md:block" aria-hidden="true" />
          </h2>
        </div>

        <div className={isAboutPage ? 'mt-[48px] grid gap-[24px] md:mt-[56px] xl:mt-[70px]' : 'mt-[70px] grid gap-[24px] lg:mt-[70px]'}>
          <div className={isAboutPage ? 'grid gap-[24px] md:grid-cols-2 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.75fr)]' : 'grid gap-[24px] lg:grid-cols-[605px_521px_326px]'}>
            <VideoTestimonialTile media={block.featuredMedia || first?.avatar} fallbackSrc={figmaAssets.testimonialVideo} alt={first?.name || 'Partner testimonial video'} className={isAboutPage ? 'md:h-[360px] xl:h-[439px]' : 'lg:h-[439px]'} />
            {first ? <VoiceQuoteCard item={first} className={isAboutPage ? 'md:h-[360px] xl:h-[439px]' : 'lg:h-[439px]'} wide isAboutPage={isAboutPage} /> : null}
            <VideoTestimonialTile media={second?.avatar} fallbackSrc={figmaAssets.avatarOne} alt={second?.name || 'Partner testimonial video'} className={isAboutPage ? 'md:h-[360px] xl:h-[439px]' : 'lg:h-[439px]'} />
          </div>
          <div className={isAboutPage ? 'grid gap-[24px] md:grid-cols-2 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)]' : 'grid gap-[24px] lg:grid-cols-[423.5px_605px_423.5px]'}>
            {second ? <VoiceQuoteCard item={second} className={isAboutPage ? 'md:h-[360px] xl:h-[438.75px]' : 'lg:h-[438.75px]'} isAboutPage={isAboutPage} /> : null}
            <VideoTestimonialTile media={third?.avatar || block.featuredMedia} fallbackSrc={figmaAssets.aboutOfficeSide} alt={third?.name || 'Partner testimonial video'} className={isAboutPage ? 'md:h-[360px] xl:h-[438.75px]' : 'lg:h-[438.75px]'} />
            {third ? <VoiceQuoteCard item={third} className={isAboutPage ? 'md:h-[360px] xl:h-[438.75px]' : 'lg:h-[438.75px]'} isAboutPage={isAboutPage} /> : null}
          </div>
        </div>
      </Container>
    </div>
  )
}

function VoiceQuoteCard({
  item,
  className,
  wide = false,
  isAboutPage = false,
}: {
  item: TestimonialItem
  className?: string
  wide?: boolean
  isAboutPage?: boolean
}) {
  return (
    <article className={`group flex ${isAboutPage ? 'min-h-[320px] p-[24px] md:min-h-[360px] md:p-[30px] xl:p-[33px]' : 'min-h-[360px] p-[33px]'} flex-col border border-[#FFFFFF]/10 bg-[#FFFFFF]/[0.05] text-[#FFFFFF] backdrop-blur-[4px] transition duration-300 hover:bg-[#FFFFFF]/[0.08] ${className || ''}`}>
      <Quote size={28} className="rotate-180 text-[#FCA62B]" aria-hidden="true" />
      <p className={`mt-[24px] ${isAboutPage ? 'text-[15px] leading-[25px] md:text-[16px] md:leading-[26px]' : 'text-[16px] leading-[26px]'} font-[400] tracking-[0px] text-[rgba(255,255,255,0.9)] ${wide ? 'max-w-[455px]' : 'max-w-[357.5px]'}`}>{item.quote}</p>
      <div className="mt-auto border-t border-[#FFFFFF]/10 pt-[29px]">
        <p className="text-[16px] font-[400] leading-[22px] tracking-[0px] text-[#FFFFFF]">
          {item.role || item.name}
          {item.company ? `, ${item.company}` : null}
        </p>
      </div>
    </article>
  )
}
