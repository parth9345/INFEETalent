import { Quote, Star } from 'lucide-react'

import { VideoTestimonialTile } from '@/components/sections/VideoTestimonialTile'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { cn } from '@/lib/utils'
import type { TestimonialItem } from '@/types/content'

type TestimonialCardProps = {
  item: TestimonialItem
  showRating?: boolean
  tone?: 'light' | 'dark'
  className?: string
  variant?: 'default' | 'home' | 'review'
}

export function TestimonialCard({ item, showRating = false, tone = 'dark', className, variant = 'default' }: TestimonialCardProps) {
  const hasAvatar = Boolean(item.avatar)
  const isHome = variant === 'home'
  const isReview = variant === 'review'
  const isVideo = item.testimonialType === 'video'
  const media = item.videoThumbnail || item.avatar

  if (isReview) {
    return (
      <article
        className={cn(
          'testimonial-review-card group border border-[#CCCCCC] bg-[#FFF8EE] text-[#151515] transition duration-300 hover:border-[#2C368D]',
          isVideo ? 'overflow-hidden' : 'p-[34px]',
          className,
        )}
      >
        {isVideo ? (
          <VideoTestimonialTile
            media={media}
            fallbackSrc={figmaAssets.testimonialVideo}
            alt={`${item.name} testimonial`}
            videoSrc={item.videoUrl || undefined}
            className="h-[354px] min-h-[354px] [border-width:0px]"
          />
        ) : (
          <Quote className="rotate-180 text-[#FCA62B]" size={31} strokeWidth={2.2} aria-hidden="true" />
        )}
        {isVideo ? null : (
          <div>
            {showRating && item.rating ? (
              <span className="mt-[18px] flex items-center gap-[4px]" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: Math.min(5, Math.max(1, item.rating)) }).map((_, index) => (
                  <Star key={index} className="fill-[#FCA62B] text-[#FCA62B]" size={14} aria-hidden="true" />
                ))}
              </span>
            ) : null}
            <p className="mt-[25px] text-[16px] font-[600] leading-[26px] tracking-[0px] text-[#151515]">{item.quote}</p>
            <p className="mt-[28px] border-t border-[#CCCCCC] pt-[24px] text-[14px] font-[400] leading-[22px] tracking-[0px] text-[#151515]">
              <strong className="font-[800]">{item.name}</strong>
              {item.role ? `, ${item.role}` : ''}
              {item.company ? <span className="text-[#555555]">, {item.company}</span> : null}
            </p>
          </div>
        )}
      </article>
    )
  }

  return (
    <article
      className={cn(
        isHome ? 'min-h-[248px] border p-[28px]' : 'min-h-[230px] border p-6 md:p-7',
        tone === 'dark' ? 'border-neutral-white/10 bg-neutral-white/[0.05] text-neutral-white backdrop-blur' : 'border-neutral-border bg-neutral-white text-neutral-dark',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {hasAvatar ? (
          <span className="relative size-14 overflow-hidden rounded-full">
            <OptimizedImage media={item.avatar} altFallback={item.name} sizes="56px" className="object-cover" />
          </span>
        ) : (
          <Quote className={tone === 'dark' ? 'text-brand-accent' : 'text-brand-primary'} size={isHome ? 24 : 26} aria-hidden="true" />
        )}
        {showRating && item.rating ? (
          <span className="flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
            {Array.from({ length: Math.min(5, Math.max(1, item.rating)) }).map((_, index) => (
              <Star key={index} className="fill-brand-accent text-brand-accent" size={16} aria-hidden="true" />
            ))}
          </span>
        ) : null}
      </div>
      <p className={cn(isHome ? 'mt-[24px] text-body14 leading-[22px] tracking-[0px]' : 'mt-6 text-body12 leading-[18px] md:text-body14 md:leading-[22px]', tone === 'dark' ? 'text-neutral-white/85' : 'text-neutral-muted')}>{item.quote}</p>
      <p className={cn(isHome ? 'mt-[24px] border-t pt-[20px] text-body14 font-bold leading-[22px] tracking-[0px]' : 'mt-6 border-t pt-5 text-body12 font-semibold md:text-body14', tone === 'dark' ? 'border-neutral-white/10 text-neutral-white' : 'border-neutral-border text-neutral-black')}>
        {item.name}
        {item.role ? `, ${item.role}` : ''}
        {item.company ? <span className={tone === 'dark' ? 'text-neutral-white/70' : 'text-neutral-muted'}> / {item.company}</span> : null}
      </p>
    </article>
  )
}
