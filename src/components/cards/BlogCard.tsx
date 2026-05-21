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
    <div className={isHome ? 'relative h-[178px] overflow-hidden' : 'relative h-[205px] overflow-hidden'}>
      <OptimizedImage
        media={post.featuredImage}
        altFallback={post.title}
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  ) : null

  return (
    <article className={cn('group border border-neutral-border bg-brand-background', className)}>
      {imagePosition === 'top' ? image : null}
      <div className={isHome ? 'space-y-[12px] p-[24px]' : 'space-y-3 p-5 md:p-6'}>
        {post.publishedAt ? (
          <time className={isHome ? 'text-body12 leading-[18px] tracking-[0px] text-neutral-muted' : 'text-body12 text-neutral-muted'} dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(post.publishedAt))}
          </time>
        ) : null}
        <h3 className={isHome ? 'text-h4 font-extrabold leading-[28px] tracking-[0px] text-neutral-dark' : 'text-h5 font-extrabold leading-[26px] text-neutral-dark md:text-h4 md:leading-[28px]'}>{post.title}</h3>
        {showExcerpt ? <p className={isHome ? 'line-clamp-3 text-body14 leading-[22px] tracking-[0px] text-neutral-muted' : 'line-clamp-3 text-body12 leading-[18px] text-neutral-muted md:text-body14 md:leading-[22px]'}>{post.excerpt}</p> : null}
        <Link
          href={href as Route}
          className={isHome ? 'inline-flex items-center gap-[8px] text-link14 font-extrabold uppercase leading-[20px] tracking-[1px] text-brand-primary' : 'inline-flex items-center gap-2 text-link14 font-extrabold uppercase tracking-[0.8px] text-brand-primary'}
          aria-label={`Read more about ${post.title}`}
        >
          Read More <ArrowRight size={isHome ? 16 : 18} aria-hidden="true" />
        </Link>
      </div>
      {imagePosition === 'bottom' ? image : null}
    </article>
  )
}
