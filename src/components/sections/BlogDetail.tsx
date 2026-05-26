import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { BlogCard } from '@/components/cards/BlogCard'
import { ContactSection } from '@/components/sections/ContactSection'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { RichText } from '@/components/ui/RichText'
import type { BlogItem, PageBlock } from '@/types/content'

const detailContactBlock: Extract<PageBlock, { blockType: 'contact' }> = {
  blockType: 'contact',
  eyebrow: 'GET IN TOUCH',
  heading: "Let's Design Your Offshore Recruitment Engine.",
  description:
    'Tell us about your hiring goals. We will come back within one business day with a tailored model and a clear path to scale.',
  formHeading: 'Get In Touch Today!',
  contactMethods: [
    { label: 'UK', value: '+44 203 878 3559', url: 'tel:+442038783559' },
    { label: 'US', value: '+1 614 266 3317', url: 'tel:+16142663317' },
    { label: 'AUS', value: '+61 740 620 017', url: 'tel:+61740620017' },
  ],
}

export function BlogDetail({ post, relatedPosts = [] }: { post: BlogItem; relatedPosts?: BlogItem[] }) {
  const category = post.category || 'Insights'
  const author = post.authorName || 'INFE Talent Team'
  const publishedDate = formatBlogDate(post.publishedAt)

  return (
    <>
      <article className="bg-[#FFF8EE] text-[#151515]">
        <section className="border-b border-[#CCCCCC] pb-[72px] pt-[58px] lg:pb-[92px] lg:pt-[78px]">
          <Container className="grid max-w-[1500px] gap-[48px] px-[24px] lg:grid-cols-[690px_560px] lg:items-center lg:gap-[150px] lg:px-[0px]">
            <div>
              <nav aria-label="Breadcrumb" className="text-[11px] font-[800] uppercase leading-[16px] tracking-[2.2px] text-[#555555]">
                <Link href="/" className="transition hover:text-[#2C368D]">Home</Link>
                <span className="px-[7px]" aria-hidden="true">/</span>
                <Link href="/blogs" className="transition hover:text-[#2C368D]">Blogs</Link>
                <span className="px-[7px]" aria-hidden="true">/</span>
                <span>{category}</span>
              </nav>
              <h1 className="mt-[18px] max-w-[690px] text-[42px] font-[800] leading-[52px] tracking-[0px] text-[#151515] md:text-[56px] md:leading-[68px]">
                <TitleHighlight title={post.title} />
              </h1>
              <p className="mt-[26px] max-w-[610px] text-[17px] font-[400] leading-[30px] tracking-[0px] text-[#555555]">
                {post.excerpt}
              </p>
              <BlogMeta
                author={author}
                category={category}
                publishedAt={post.publishedAt}
                publishedDate={publishedDate}
                readTime={post.readTime}
              />
            </div>
            {post.featuredImage ? (
              <div className="relative h-[320px] overflow-hidden md:h-[430px] lg:h-[430px]">
                <OptimizedImage
                  media={post.featuredImage}
                  altFallback={post.title}
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </Container>
        </section>

        <section className="py-[70px] lg:py-[92px]">
          <Container className="grid max-w-[1500px] gap-[48px] px-[24px] lg:grid-cols-[820px_430px] lg:gap-[120px] lg:px-[0px]">
            <div>
              <RichText
                value={post.content}
                fallback={[post.excerpt]}
                className="space-y-[24px] text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#555555] md:text-[17px] md:leading-[30px]"
              />
              <AuthorBox post={post} author={author} />
            </div>
            <aside className="lg:sticky lg:top-[150px] lg:self-start">
              <div className="bg-[linear-gradient(135deg,#050948_0%,#172181_100%)] p-[32px] text-[#FFFFFF]">
                <p className="text-[11px] font-[800] uppercase leading-[16px] tracking-[2.8px] text-[#FCA62B]">Need recruitment support?</p>
                <h2 className="mt-[14px] text-[28px] font-[800] leading-[36px] tracking-[0px]">
                  Want To Scale Your Sourcing Team? Let&apos;s Build Your Offshore Strategy.
                </h2>
                <p className="mt-[18px] text-[14px] font-[400] leading-[24px] tracking-[0px] text-[#FFFFFF]/72">
                  Talk with INFE Talent about a recruitment delivery model built around your market, roles, and operating rhythm.
                </p>
                <Button href="/contact" size="sm" className="mt-[26px] h-[42px] w-full border-[0px] bg-[#FCA62B] text-[#151515] hover:bg-[#FCA62B]">
                  Book A Consultation
                </Button>
              </div>
            </aside>
          </Container>
        </section>
      </article>

      <RelatedBlogsSection posts={relatedPosts} />
      <ContactSection block={detailContactBlock} isHomepage />
    </>
  )
}

function BlogMeta({
  author,
  category,
  publishedAt,
  publishedDate,
  readTime,
}: {
  author: string
  category: string
  publishedAt?: string
  publishedDate: string
  readTime?: string
}) {
  return (
    <div className="mt-[42px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] text-[13px] font-[600] leading-[20px] tracking-[0px] text-[#555555]">
      <span className="rounded-[999px] bg-[#FFFFFF] px-[14px] py-[7px] text-[#2C368D]">{category}</span>
      <span>{author}</span>
      {publishedDate ? (
        <>
          <span aria-hidden="true">/</span>
          <time dateTime={publishedAt}>{publishedDate}</time>
        </>
      ) : null}
      {readTime ? (
        <>
          <span aria-hidden="true">/</span>
          <span>{readTime}</span>
        </>
      ) : null}
    </div>
  )
}

function AuthorBox({ author, post }: { author: string; post: BlogItem }) {
  return (
    <div className="mt-[54px] border border-[#CCCCCC] bg-[#FFFFFF] p-[28px] md:flex md:items-center md:gap-[22px]">
      {post.authorImage ? (
        <div className="relative mb-[18px] size-[78px] shrink-0 overflow-hidden rounded-full md:mb-[0px]">
          <OptimizedImage
            media={post.authorImage}
            altFallback={author}
            sizes="78px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mb-[18px] flex size-[78px] shrink-0 items-center justify-center rounded-full bg-[#EAEBF4] text-[24px] font-[800] text-[#2C368D] md:mb-[0px]">
          {author.slice(0, 1)}
        </div>
      )}
      <div>
        <p className="text-[11px] font-[800] uppercase leading-[16px] tracking-[2.2px] text-[#555555]">Written By</p>
        <h2 className="mt-[6px] text-[22px] font-[800] leading-[30px] text-[#151515]">{author}</h2>
        <p className="mt-[8px] text-[14px] font-[400] leading-[24px] text-[#555555]">
          Insights from the INFE Talent team on recruitment delivery, hiring operations, and offshore team performance.
        </p>
      </div>
    </div>
  )
}

function RelatedBlogsSection({ posts }: { posts: BlogItem[] }) {
  if (!posts.length) {
    return null
  }

  return (
    <section className="bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[78px] text-[#FFFFFF] lg:py-[96px]">
      <Container className="max-w-[1500px] px-[24px] lg:px-[0px]">
        <div className="flex flex-wrap items-end justify-between gap-[24px]">
          <div>
            <p className="text-[11px] font-[800] uppercase leading-[16px] tracking-[2.8px] text-[#FCA62B]">Related Blogs</p>
            <h2 className="mt-[14px] text-[36px] font-[800] leading-[44px] tracking-[0px] md:text-[46px] md:leading-[58px]">Featured Post</h2>
          </div>
          <Link href="/blogs" className="inline-flex items-center gap-[10px] text-[12px] font-[800] uppercase leading-[18px] tracking-[0.8px] text-[#FFFFFF]" aria-label="View all blogs">
            View All <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-[42px] grid gap-[16px] md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug || post.title} post={post} variant="compact" showImage className="min-h-[420px]" />
          ))}
        </div>
      </Container>
    </section>
  )
}

function TitleHighlight({ title }: { title: string }) {
  const words = title.split(' ')
  const highlight = words.length > 5 ? words.slice(-2).join(' ') : words.slice(-1).join(' ')

  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>
  }

  const [before, after] = title.split(highlight)

  return (
    <>
      {before}
      <span className="box-decoration-clone bg-[#FFE029]" style={{ WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>
        {highlight}
      </span>
      {after}
    </>
  )
}

function formatBlogDate(date?: string) {
  if (!date) {
    return ''
  }

  return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date))
}
