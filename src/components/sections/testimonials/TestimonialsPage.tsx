import { Quote } from 'lucide-react'

import { ContactSection } from '@/components/sections/ContactSection'
import { VideoTestimonialTile } from '@/components/sections/VideoTestimonialTile'
import { TestimonialsReviewGrid } from '@/components/sections/testimonials/TestimonialsReviewGrid'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import type { MediaLike, PageBlock, PageContent, TestimonialItem } from '@/types/content'

type HeroBlock = Extract<PageBlock, { blockType: 'hero' }>
type StatsBlock = Extract<PageBlock, { blockType: 'statsStrip' }>
type ContactBlock = Extract<PageBlock, { blockType: 'contact' }>

type TestimonialsPageProps = {
  page: PageContent
  testimonials: TestimonialItem[]
}

export function TestimonialsPage({ page, testimonials }: TestimonialsPageProps) {
  const hero = page.layout?.find((block): block is HeroBlock => block.blockType === 'hero')
  const stats = page.layout?.find((block): block is StatsBlock => block.blockType === 'statsStrip')
  const contact = page.layout?.find((block): block is ContactBlock => block.blockType === 'contact')
  const sortedTestimonials = sortTestimonials(testimonials)
  const featuredTestimonials = sortedTestimonials.filter((item) => item.featured).slice(0, 5)
  const featuredItems = featuredTestimonials.length ? featuredTestimonials : sortedTestimonials.slice(0, 5)

  return (
    <div className="page-testimonials">
      <TestimonialsHero hero={hero} testimonials={sortedTestimonials} />
      {featuredItems.length ? <FeaturedTestimonials testimonials={featuredItems} /> : null}
      <ClientReviews testimonials={sortedTestimonials} />
      {stats ? <TestimonialsStats block={stats} /> : null}
      {contact ? <ContactSection block={contact} isHomepage className="testimonials-cta-section" /> : null}
    </div>
  )
}

function TestimonialsHero({ hero, testimonials }: { hero?: HeroBlock; testimonials: TestimonialItem[] }) {
  const heading = hero?.heading || 'Trusted By 3000+ Global Staffing Leaders'
  const highlight = hero?.highlight || '3000+ Global Staffing'
  const quoteItem = testimonials.find((item) => !isVideoTestimonial(item)) || testimonials[0]
  const videoItems = testimonials.filter(isVideoTestimonial)
  const firstVideo = videoItems[0] || testimonials[0]
  const secondVideo = videoItems[1] || testimonials[1] || testimonials[0]

  return (
    <section className="bg-[#FFF8EE] pb-[106px] pt-[94px] text-[#151515] lg:pb-[126px] lg:pt-[96px] testimonials-hero-section">
      <Container className="testimonials-hero-layout grid max-w-[1500px] gap-[56px] px-[24px] lg:grid-cols-[620px_710px] lg:gap-[170px] lg:px-[0px]">
        <div className="testimonials-hero-copy flex min-h-[590px] flex-col justify-between">
          <div>
            {hero?.eyebrow ? (
              <p className="eyebrow-title text-[12px] font-[800] uppercase leading-[16px] tracking-[6px] text-[#151515]">
                {hero.eyebrow}
              </p>
            ) : null}
            <h1 className="heading-section mt-[43px] max-w-[620px] text-[44px] font-[800] leading-[56px] tracking-[0px] text-[#000000] md:text-[60px] md:leading-[74px]">
              <HighlightInline heading={heading} highlight={highlight} />
            </h1>
          </div>
          {hero?.description ? (
            <p className="max-w-[610px] text-[18px] font-[400] leading-[30px] tracking-[0px] text-[#555555]">
              {hero.description}
            </p>
          ) : null}
        </div>

        {testimonials.length ? (
          <div className="testimonials-hero-card-grid grid gap-[20px] md:grid-cols-2 lg:h-[598px]">
            <VideoPreviewCard item={firstVideo} media={resolveVideoMedia(firstVideo)} fallbackSrc={figmaAssets.aboutOfficeTall} className="h-[294px] testimonial-video-card testimonial-hero-card testimonial-hero-video-primary" />
            {quoteItem ? <HeroQuoteCard item={quoteItem} className="h-[294px] testimonial-quote-card testimonial-hero-card" /> : null}
            <HeroProofCard />
            <VideoPreviewCard item={secondVideo} media={resolveVideoMedia(secondVideo)} fallbackSrc={figmaAssets.profileCard} className="h-[294px] testimonial-video-card testimonial-hero-card testimonial-hero-video-secondary" />
          </div>
        ) : null}
      </Container>
    </section>
  )
}

function FeaturedTestimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  const first = testimonials[0]
  const second = testimonials[1] || testimonials[0]
  const third = testimonials[2] || testimonials[1] || testimonials[0]
  const fourth = testimonials[3] || testimonials[0]
  const fifth = testimonials[4] || testimonials[1] || testimonials[0]

  return (
    <section className="bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[96px] text-[#FFFFFF] lg:py-[112px] testimonials-featured-section testimonials-video-section">
      <Container className="max-w-[1500px] px-[24px] lg:px-[0px]">
        <div className="testimonials-featured-header">
          <p className="text-[12px] font-[800] uppercase leading-[16px] tracking-[6px] text-[#FCA62B]">Voices</p>
          <h2 className="heading-section relative mt-[24px] max-w-[670px] text-[44px] font-[800] leading-[56px] tracking-[0px] text-[#FFFFFF] md:text-[50px] md:leading-[66px]">
            <span className="relative z-[1]">Featured Testimonials</span>
            <span className="absolute bottom-[3px] left-[308px] z-0 hidden h-[16px] w-[220px] bg-[rgba(251,223,45,0.45)] md:block" aria-hidden="true" />
          </h2>
        </div>

        <div className="testimonials-featured-grid mt-[70px] grid gap-[24px]">
          <div className="testimonials-featured-row testimonials-featured-row-top grid gap-[24px] lg:grid-cols-[605px_521px_326px]">
            <VideoPreviewCard item={first} media={resolveVideoMedia(first)} fallbackSrc={figmaAssets.testimonialVideo} className="h-[439px] border border-[#FFFFFF]/10 testimonial-video-card testimonial-featured-card" dark />
            <FeaturedQuoteCard item={first} className="h-[439px] testimonial-quote-card testimonial-featured-card" wide />
            <VideoPreviewCard item={second} media={resolveVideoMedia(second)} fallbackSrc={figmaAssets.profileCard} className="h-[439px] border border-[#FFFFFF]/10 testimonial-video-card testimonial-featured-card" dark />
          </div>
          <div className="testimonials-featured-row testimonials-featured-row-bottom grid gap-[24px] lg:grid-cols-[423px_605px_423px]">
            <FeaturedQuoteCard item={third} className="h-[439px] testimonial-quote-card testimonial-featured-card" />
            <VideoPreviewCard item={fourth} media={resolveVideoMedia(fourth)} fallbackSrc={figmaAssets.aboutOfficeTall} className="h-[439px] border border-[#FFFFFF]/10 testimonial-video-card testimonial-featured-card" dark />
            <FeaturedQuoteCard item={fifth} className="h-[439px] testimonial-quote-card testimonial-featured-card" />
          </div>
        </div>
      </Container>
    </section>
  )
}

function ClientReviews({ testimonials }: { testimonials: TestimonialItem[] }) {
  return (
    <section id="client-reviews" className=" py-[88px] text-[#151515] lg:pb-[92px] lg:pt-[128px] testimonials-grid-section testimonials-clients-section">
      <Container className="max-w-[1500px] px-[24px] lg:px-[0px]">
        <h2 className="heading-section mx-auto max-w-[760px] text-center text-[38px] font-[800] leading-[48px] tracking-[0px] text-[#000000] md:text-[50px] md:leading-[66px]">
          Client Success Stories & Reviews
        </h2>
        <div className="mx-auto mt-[24px] h-[8px] w-[384px] max-w-[72vw] bg-[#FFE029]" aria-hidden="true" />

        {testimonials.length ? (
          <TestimonialsReviewGrid testimonials={testimonials} />
        ) : (
          <p className="mx-auto mt-[48px] max-w-[520px] text-center text-[18px] leading-[30px] text-[#FFFFFF]/70">
            No testimonials are published yet.
          </p>
        )}
      </Container>
    </section>
  )
}

function TestimonialsStats({ block }: { block: StatsBlock }) {
  return (
    <section className="bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] text-[#FFFFFF] testimonials-stats-section">
      <div className="mx-auto grid max-w-[1920px] grid-cols-2 gap-y-[20px] px-[24px] py-[24px] md:grid-cols-4 md:px-[40px] lg:h-[146px] lg:px-[0px] lg:py-[0px]">
        {block.items?.slice(0, 4).map((item) => (
          <div key={`${item.value}-${item.label}`} className="flex items-center justify-center gap-[12px] lg:h-[146px]">
            <strong className="text-[36px] font-[800] leading-[44px] tracking-[0px] md:text-[50px] md:leading-[60px]">
              {item.value}
            </strong>
            <span className="text-[14px] font-[700] leading-[20px] tracking-[0px] md:text-[20px] md:leading-[28px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function VideoPreviewCard({
  className,
  fallbackSrc,
  item,
  media,
}: {
  className?: string
  dark?: boolean
  fallbackSrc: string
  item?: TestimonialItem
  media?: MediaLike
}) {
  return (
    <VideoTestimonialTile
      media={media}
      fallbackSrc={fallbackSrc}
      alt={item?.name || 'INFE Talent testimonial'}
      videoSrc={item?.videoUrl || undefined}
      className={`testimonial-video-preview ${className || ''}`}
    />
  )
}

function HeroQuoteCard({ item, className }: { className?: string; item: TestimonialItem }) {
  return (
    <article className={`flex flex-col bg-[linear-gradient(135deg,#060D4E_0%,#2C368D_100%)] p-[36px] text-[#FFFFFF] ${className || ''}`}>
      <Quote size={31} className="rotate-180 text-[#FCA62B]" aria-hidden="true" />
      <p className="mt-[28px] max-w-[250px] text-[20px] font-[400] leading-[32px] tracking-[0px] text-[#FFFFFF]">
        {item.quote}
      </p>
      <p className="mt-auto border-t border-[#FFFFFF]/10 pt-[31px] text-[16px] font-[400] leading-[24px] tracking-[0px] text-[#FFFFFF]/70">
        {item.role || item.name}
        {item.company ? `, ${item.company}` : null}
      </p>
    </article>
  )
}

function HeroProofCard() {
  return (
    <article className="testimonial-proof-card testimonial-hero-card flex h-[294px] flex-col justify-center bg-[#FCA62B] px-[36px] text-[#000D6B]">
      <h2 className="heading-section text-[34px] font-[800] leading-[42px] tracking-[0px] text-[#000D6B]">Trusted By 3000+</h2>
      <p className="mt-[3px] text-[18px] font-[500] leading-[26px] tracking-[0px] text-[#000D6B]">Global Staffing Leaders</p>
      <div className="mt-[29px] flex -space-x-[8px]">
        {[figmaAssets.avatarOne, figmaAssets.profileCard, figmaAssets.teamOffice].map((avatar) => (
          <span key={avatar} className="relative size-[48px] overflow-hidden rounded-full border-[3px] border-[#FFFFFF]">
            <OptimizedImage src={avatar} alt="" sizes="48px" className="object-cover" />
          </span>
        ))}
      </div>
    </article>
  )
}

function FeaturedQuoteCard({ item, className, wide = false }: { className?: string; item: TestimonialItem; wide?: boolean }) {
  return (
    <article className={`flex min-h-[360px] flex-col border border-[#FFFFFF]/10 bg-[#FFFFFF]/[0.05] p-[33px] text-[#FFFFFF] backdrop-blur-[4px] transition duration-300 hover:bg-[#FFFFFF]/[0.08] ${className || ''}`}>
      <Quote size={28} className="rotate-180 text-[#FCA62B]" aria-hidden="true" />
      <p className={`mt-[24px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[rgba(255,255,255,0.9)] ${wide ? 'max-w-[455px]' : 'max-w-[357px]'}`}>{item.quote}</p>
      <div className="mt-auto border-t border-[#FFFFFF]/10 pt-[29px]">
        <p className="text-[16px] font-[400] leading-[22px] tracking-[0px] text-[#FFFFFF]">
          {item.role || item.name}
          {item.company ? `, ${item.company}` : null}
        </p>
      </div>
    </article>
  )
}

function HighlightInline({ heading, highlight }: { heading: string; highlight?: string | null }) {
  if (!highlight || !heading.includes(highlight)) {
    return <>{heading}</>
  }

  const index = heading.indexOf(highlight)
  const before = heading.slice(0, index)
  const after = heading.slice(index + highlight.length)

  return (
    <>
      {before}
      <span className="box-decoration-clone bg-[#FFF2A8] text-[#000000]" style={{ WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>
        {highlight}
      </span>
      {after}
    </>
  )
}

function isVideoTestimonial(item: TestimonialItem) {
  return item.testimonialType === 'video'
}

function resolveVideoMedia(item?: TestimonialItem): MediaLike {
  if (!item) {
    return undefined
  }

  return item.videoThumbnail || item.avatar
}

function sortTestimonials(items: TestimonialItem[]) {
  return [...items].sort((a, b) => {
    const aOrder = typeof a.sortOrder === 'number' ? a.sortOrder : 999
    const bOrder = typeof b.sortOrder === 'number' ? b.sortOrder : 999

    if (aOrder !== bOrder) {
      return aOrder - bOrder
    }

    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1
    }

    return String(a.name).localeCompare(String(b.name))
  })
}
