'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

import { OptimizedImage } from '@/components/ui/OptimizedImage'
import type { BlogItem } from '@/types/content'

type BlogGridClientProps = {
  pageSize: number
  posts: BlogItem[]
}

export function BlogGridClient({ pageSize, posts }: BlogGridClientProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const visiblePosts = posts.slice(0, visibleCount)
  const canLoadMore = visibleCount < posts.length

  return (
    <>
      <div className="blogs-card-grid mt-[64px] grid gap-y-[32px] md:grid-cols-2 md:gap-x-[30px] lg:grid-cols-[480px_480px_480px]">
        {visiblePosts.map((post) => (
          <BlogGridCard key={post.slug || post.title} post={post} />
        ))}
      </div>
      <button
        type="button"
        className="blogs-load-more mx-auto mt-[64px] flex h-[50px] min-w-[138px] items-center justify-center border border-[#2C368D] bg-transparent px-[18px] text-[13px] font-[800] uppercase leading-[16px] tracking-[0px] text-[#2C368D] transition enabled:hover:border-[#2C368D] enabled:hover:bg-[#2C368D] enabled:hover:text-[#FFFFFF] disabled:cursor-not-allowed disabled:opacity-55"
        disabled={!canLoadMore}
        onClick={() => setVisibleCount((count) => Math.min(count + pageSize, posts.length))}
      >
        {canLoadMore ? 'Load More' : 'All Loaded'}
      </button>
    </>
  )
}

function BlogGridCard({ post }: { post: BlogItem }) {
  const href = post.slug ? `/blogs/${post.slug}` : '/blogs'

  return (
    <article className="blog-card blog-grid-card group h-[652px] overflow-hidden border border-[#CCCCCC] transition duration-300 hover:bg-[#FCA62B]">
      <Link href={href as Route} className="block" aria-label={`Read more about ${post.title}`}>
        <div className="blog-card-image relative h-[280px] overflow-hidden">
          <OptimizedImage
            media={post.featuredImage}
            altFallback={post.title}
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="blog-card-content flex h-[372px] flex-col px-[48px] pb-[40px] pt-[54px]">
        <div className="blog-card-meta flex flex-wrap items-center gap-x-[12px] gap-y-[6px]">
          {post.category ? (
            <span className="text-[12px] font-[800] uppercase leading-[18px] tracking-[1.2px] text-[#2C368D]">
              {post.category}
            </span>
          ) : null}
          {post.publishedAt ? (
            <time className="text-[14px] font-[400] leading-[22px] tracking-[0px] text-[#555555]" dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
          ) : null}
          {post.readTime ? (
            <span className="text-[14px] font-[400] leading-[22px] tracking-[0px] text-[#555555]">
              {post.readTime}
            </span>
          ) : null}
        </div>
        <h3 className="blog-card-title mt-[24px] line-clamp-2 text-[24px] font-[800] leading-[34px] tracking-[0px] text-[#000000]">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="blog-card-excerpt mt-[20px] line-clamp-2 text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#555555]">
            {post.excerpt}
          </p>
        ) : null}
        <Link
          href={href as Route}
          className="blog-card-link mt-auto inline-flex items-center gap-[10px] text-[14px] font-[800] uppercase leading-[24px] tracking-[0.84px] text-[#2C368D] transition hover:text-[#FFFFFF]"
          aria-label={`Read more about ${post.title}`}
        >
          Read More <ArrowRight size={22} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date))
}
