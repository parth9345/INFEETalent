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
  variant?: 'default' | 'home' | 'featured' | 'compact'
}

export function BlogCard({
  post,
  showImage = true,
  showExcerpt = true,
  imagePosition = 'top',
  className,
  variant = 'default',
}: BlogCardProps) {
  const href = post.slug ? `/blogs/${post.slug}` : '/blogs'
  const isHome = variant === 'home'
  const isDark = variant === 'featured' || variant === 'compact'
  const category = post.category || 'Insights'
  const author = post.authorName || 'INFE Talent Team'
  const formattedDate = formatBlogDate(post.publishedAt)
  const image = showImage ? (
    <div
      className={cn(
        'relative overflow-hidden',
        isHome && 'h-[279px]',
        variant === 'featured' && 'h-[280px]',
        variant === 'compact' && 'h-[170px]',
        variant === 'default' && 'h-[238px]',
      )}
    >
      <OptimizedImage
        media={post.featuredImage}
        altFallback={post.title}
        sizes={isHome ? '(min-width: 1024px) 479px, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  ) : null

  if (isHome) {
    return (
      <article className={cn('group border border-[#CCCCCC] bg-[#FFF8EE] tracking-[0.84px] transition hover:bg-[#FCA62B]', 'lg:h-[652px]', className)}>
        {imagePosition === 'top' ? image : null}
        <div className="flex h-[330px] lg:h-[373px] flex-col items-start p-[15px] lg:p-[48px]">
          {post.publishedAt ? (
            <time className="text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#555555]" dateTime={post.publishedAt}>
              {formattedDate}
            </time>
          ) : null}
          <h3 className="mt-[16px] line-clamp-3 max-w-[382px] text-[28px] font-[800] capitalize leading-[38px] tracking-[-0.84px] text-[#000000]">{post.title}</h3>
          {showExcerpt ? <p className="mt-[16px] line-clamp-2 max-w-[382px] text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#555555]">{post.excerpt}</p> : null}
          <Link
            href={href as Route}
            className="mt-[24px] inline-flex items-center gap-[10px] text-[14px] font-[800] uppercase leading-[24px] tracking-[0.84px] text-[#262164]"
            aria-label={`Read more about ${post.title}`}
          >
            Read More <ArrowRight size={22} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
        {imagePosition === 'bottom' ? image : null}
      </article>
    )
  }

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden transition duration-300',
        isDark
          ? 'border border-[#26329A] bg-[#121A73] text-[#FFFFFF] hover:border-[#FCA62B]'
          : 'border border-[#CCCCCC] bg-[#FFF8EE] text-[#151515] hover:border-[#2C368D] hover:bg-[#FFFFFF]',
        className,
      )}
    >
      {imagePosition === 'top' ? image : null}
      <div className={cn('flex flex-1 flex-col', variant === 'compact' ? 'p-[26px]' : 'p-[28px] md:p-[32px]')}>
        <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[6px]">
          <span className={cn('text-[11px] font-[800] uppercase leading-[16px] tracking-[1.8px]', isDark ? 'text-[#FCA62B]' : 'text-[#2C368D]')}>
            {category}
          </span>
          {post.publishedAt ? (
            <time className={cn('text-[12px] font-[500] leading-[18px] tracking-[0px]', isDark ? 'text-[#FFFFFF]/65' : 'text-[#555555]')} dateTime={post.publishedAt}>
              {formattedDate}
            </time>
          ) : null}
        </div>
        <h3 className={cn('mt-[16px] line-clamp-3 font-[800] tracking-[0px]', variant === 'compact' ? 'text-[18px] leading-[24px]' : 'text-[22px] leading-[30px] md:text-[24px] md:leading-[32px]')}>
          {post.title}
        </h3>
        {showExcerpt ? (
          <p className={cn('mt-[16px] line-clamp-3 text-[14px] font-[400] leading-[24px] tracking-[0px]', isDark ? 'text-[#FFFFFF]/72' : 'text-[#555555]')}>
            {post.excerpt}
          </p>
        ) : null}
        <div className={cn('mt-[22px] flex flex-wrap items-center gap-x-[14px] gap-y-[6px] text-[12px] font-[600] leading-[18px]', isDark ? 'text-[#FFFFFF]/70' : 'text-[#555555]')}>
          <span>{author}</span>
          {post.readTime ? (
            <>
              <span aria-hidden="true">/</span>
              <span>{post.readTime}</span>
            </>
          ) : null}
        </div>
        <Link
          href={href as Route}
          className={cn('mt-auto inline-flex items-center gap-[10px] pt-[26px] text-[12px] font-[800] uppercase leading-[18px] tracking-[0.8px]', isDark ? 'text-[#FFFFFF]' : 'text-[#2C368D]')}
          aria-label={`Read more about ${post.title}`}
        >
          Read More <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
      {imagePosition === 'bottom' ? image : null}
    </article>
  )
}

function formatBlogDate(date?: string) {
  if (!date) {
    return ''
  }

  return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date))
}
