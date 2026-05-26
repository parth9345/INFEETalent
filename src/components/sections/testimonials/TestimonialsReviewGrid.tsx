'use client'

import { useMemo, useState } from 'react'

import { TestimonialCard } from '@/components/cards/TestimonialCard'
import type { TestimonialItem } from '@/types/content'

type TestimonialsReviewGridProps = {
  initialCount?: number
  increment?: number
  testimonials: TestimonialItem[]
}

export function TestimonialsReviewGrid({
  initialCount = 6,
  increment = 6,
  testimonials,
}: TestimonialsReviewGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const reviewItems = useMemo(() => buildReviewPattern(testimonials), [testimonials])
  const visibleItems = reviewItems.slice(0, visibleCount)
  const desktopColumns = distributeColumns(visibleItems, 3)
  const tabletColumns = distributeColumns(visibleItems, 2)
  const canLoadMore = visibleCount < reviewItems.length

  return (
    <>
      <div className="mt-[64px] grid gap-[24px] md:hidden">
        {visibleItems.map((item, index) => (
          <ReviewCardSlot key={`${item.name}-${index}`} item={item} />
        ))}
      </div>

      <div className="mt-[64px] hidden gap-[24px] md:grid md:grid-cols-2 xl:hidden">
        {tabletColumns.map((column, columnIndex) => (
          <div key={`tablet-column-${columnIndex}`} className="grid content-start gap-[24px]">
            {column.map((item, index) => (
              <ReviewCardSlot key={`${item.name}-${columnIndex}-${index}`} item={item} />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-[64px] hidden gap-[24px] xl:grid xl:grid-cols-3">
        {desktopColumns.map((column, columnIndex) => (
          <div key={`desktop-column-${columnIndex}`} className="grid content-start gap-[24px]">
            {column.map((item, index) => (
              <ReviewCardSlot key={`${item.name}-${columnIndex}-${index}`} item={item} />
            ))}
          </div>
        ))}
      </div>

      {canLoadMore ? (
        <div className="mt-[64px] flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + increment, reviewItems.length))}
            className="inline-flex h-[50px] w-[140px] items-center justify-center border-[2px] border-[#2C368D] bg-transparent text-[14px] font-[800] uppercase leading-[18px] tracking-[0.8px] text-[#2C368D] transition duration-300 hover:border-[#FCA62B] hover:text-[#FCA62B] focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-offset-[4px] focus-visible:outline-[#FCA62B]"
          >
            Load More
          </button>
        </div>
      ) : null}
    </>
  )
}

function ReviewCardSlot({ item }: { item: TestimonialItem }) {
  return <TestimonialCard item={item} showRating={false} tone="light" variant="review" />
}

function buildReviewPattern(items: TestimonialItem[]) {
  const textItems = items.filter((item) => !isVideoTestimonial(item))
  const videoItems = items.filter(isVideoTestimonial)
  const used = new Set<TestimonialItem>()
  const orderedItems: TestimonialItem[] = []
  const slots: ('text' | 'video')[] = [
    'text',
    'video',
    'text',
    'video',
    'text',
    'text',
    'text',
    'text',
    'text',
    'video',
    'text',
    'video',
    'text',
    'text',
    'text',
  ]

  const takeItem = (preferred: 'text' | 'video') => {
    const preferredPool = preferred === 'video' ? videoItems : textItems
    const fallbackPool = preferred === 'video' ? textItems : videoItems
    const preferredItem = preferredPool.find((item) => !used.has(item))
    const fallbackItem = fallbackPool.find((item) => !used.has(item))
    const item = preferredItem || fallbackItem

    if (item) {
      used.add(item)
    }

    return item
  }

  while (used.size < items.length) {
    const previousSize = used.size

    slots.forEach((slot) => {
      const item = takeItem(slot)

      if (item) {
        orderedItems.push(item)
      }
    })

    if (used.size === previousSize) {
      break
    }
  }

  return orderedItems
}

function distributeColumns(items: TestimonialItem[], columnCount: number) {
  const columns = Array.from({ length: columnCount }, () => [] as TestimonialItem[])

  items.forEach((item, index) => {
    columns[index % columnCount]?.push(item)
  })

  return columns
}

function isVideoTestimonial(item: TestimonialItem) {
  return item.testimonialType === 'video'
}
