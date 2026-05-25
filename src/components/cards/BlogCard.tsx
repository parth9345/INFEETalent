import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRight } from 'lucide-react'

import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { cn } from '@/lib/utils'
import type { BlogItem } from '@/types/content'

type BlogCardProps = {
  post: BlogItem
  showImage?: boolean
  showExcerpt?: boolean
  imagePosition?: 'top' | 'bottom'
  className?: string
  variant?: 'default' | 'home'
}

export function BlogCard({
  post,
  showImage = true,
  showExcerpt = true,
  imagePosition = 'top',
  className,
  variant = 'default',
}: BlogCardProps) {
  const href = `/blogs/${post.slug || ''}`
  const isHome = variant === 'home'
  const image = showImage ? (
    <div className={isHome ? 'relative h-[279px] overflow-hidden' : 'relative h-[205px] overflow-hidden'}>
      <OptimizedImage
        media={post.featuredImage}
        altFallback={post.title}
        sizes={isHome ? '(min-width: 1024px) 479px, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  ) : null
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(post.publishedAt))
    : null

  return (
    <article className={cn('group border border-[#CCCCCC] bg-[#FFF8EE] tracking-[0.84px] transition hover:bg-[#FCA62B]', isHome && 'lg:h-[652px]', className)}>
      {imagePosition === 'top' ? image : null}
      <div className={isHome ? 'flex h-[373px] flex-col items-start p-[48px]' : 'space-y-3 p-5 md:p-6'}>
        {post.publishedAt ? (
          <time className={isHome ? 'text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#555555]' : 'text-body12 text-neutral-muted'} dateTime={post.publishedAt}>
            {isHome ? formattedDate : new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(post.publishedAt))}
          </time>
        ) : null}
        <h3 className={isHome ? 'mt-[16px] line-clamp-3 max-w-[382px] text-[28px] font-[800] capitalize leading-[38px] tracking-[-0.84px] text-[#000000]' : 'text-h5 font-extrabold leading-[26px] text-neutral-dark md:text-h4 md:leading-[28px]'}>{post.title}</h3>
        {showExcerpt ? <p className={isHome ? 'mt-[16px] line-clamp-2 max-w-[382px] text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#555555]' : 'line-clamp-3 text-body12 leading-[18px] text-neutral-muted md:text-body14 md:leading-[22px]'}>{post.excerpt}</p> : null}
        <Link
          href={href as Route}
          className={isHome ? 'mt-[24px] inline-flex items-center gap-[10px] text-[14px] font-[800] uppercase leading-[24px] tracking-[0.84px] text-[#262164] ' : 'inline-flex items-center gap-2 text-link14 font-extrabold uppercase tracking-[0.8px] text-brand-primary'}
          aria-label={`Read more about ${post.title}`}
        >
          Read More <ArrowRight size={isHome ? 22 : 18} strokeWidth={isHome ? 1.8 : 2} aria-hidden="true" />
        </Link>
      </div>
      {imagePosition === 'bottom' ? image : null}
    </article>
  )
}
