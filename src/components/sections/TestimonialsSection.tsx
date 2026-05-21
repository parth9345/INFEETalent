import { TestimonialCard } from '@/components/cards/TestimonialCard'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { figmaAssets } from '@/lib/assets'
import { getTestimonials } from '@/lib/payload-queries'
import { sectionClasses, sectionId } from '@/lib/sections'
import { relationItems } from '@/lib/utils'
import type { PageBlock, TestimonialItem } from '@/types/content'

type TestimonialsBlock = Extract<PageBlock, { blockType: 'testimonials' }>

export async function TestimonialsSection({ block, isHomepage = false }: { block: TestimonialsBlock; isHomepage?: boolean }) {
  const selectedItems = relationItems<TestimonialItem>(block.items)
  const testimonials = selectedItems.length ? selectedItems : await getTestimonials(4)
  const gridOnly = block.display === 'grid'

  return (
    <section id={sectionId(block.settings)} className={isHomepage ? 'bg-brand-primary py-[72px] text-neutral-white' : sectionClasses(block.settings, { defaultBackground: 'blue' })}>
      <Container className={isHomepage ? 'grid max-w-[1152px] gap-[56px] px-[24px] lg:grid-cols-[430px_1fr] lg:gap-[78px] lg:px-[0px]' : gridOnly ? 'space-y-10' : 'grid gap-10 lg:grid-cols-[0.8fr_1fr]'}>
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
    </section>
  )
}
