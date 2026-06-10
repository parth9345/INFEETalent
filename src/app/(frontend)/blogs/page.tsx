import type { Metadata } from 'next'
import Link from 'next/link'
import type { Route } from 'next'
import { ArrowRight, Search } from 'lucide-react'

import { ContactSection } from '@/components/sections/ContactSection'
import { BlogGridClient } from '@/components/sections/blogs/BlogGridClient'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { getBlogs, getFeaturedBlogs, getPageBySlug } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'
import type { BlogItem, PageBlock, PageContent } from '@/types/content'

export const revalidate = 60

type BlogsPageProps = {
  searchParams?: Promise<{
    category?: string | string[]
    query?: string | string[]
  }>
}

const BLOGS_PER_PAGE = 9
const fallbackBlogPage: PageContent = {
  title: 'Blogs',
  slug: 'blogs',
  seo: {
    metaTitle: 'Recruitment Blogs | INFE Talent',
    metaDescription:
      'Read INFE Talent blogs covering recruitment management, offshore strategy, executive search, HR consulting, hiring trends, and career growth.',
  },
  layout: [
    {
      blockType: 'hero',
      eyebrow: 'Home / Blogs',
      heading: 'Insights For The Modern Recruitment Leader',
      highlight: 'Modern Recruitment Leader',
      description:
        'Practical ideas for staffing leaders, HR teams, and growing businesses building better recruitment engines.',
    },
    {
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
    },
  ],
}

const fallbackCategories = ['Offshore Strategy', 'Market Trends', 'Compliance & Security', 'Case Studies']

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getPageBySlug('blogs')) || fallbackBlogPage

  return buildMetadata(page, '/blogs')
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const params = await searchParams
  const activeCategory = resolveParam(params?.category)
  const query = resolveParam(params?.query)
  const [page, latestPosts, featuredPosts] = await Promise.all([
    getPageBySlug('blogs'),
    getBlogs(100),
    getFeaturedBlogs(5),
  ])
  const pageContent = page || fallbackBlogPage
  const hero = getHeroBlock(pageContent)
  const contactBlock = getContactBlock(pageContent)
  const categories = getCategories(latestPosts)
  const filteredPosts = filterBlogs(latestPosts, { category: activeCategory, query })
  const featuredLead = featuredPosts[0] || latestPosts[0]
  const featuredGridPosts = getFeaturedGridPosts(featuredLead, featuredPosts, latestPosts)

  return (
    <div className="page-blogs">
      <BlogHero
        hero={hero}
        categories={categories}
        activeCategory={activeCategory}
        query={query}
      />
      <FeaturedBlogsSection lead={featuredLead} posts={featuredGridPosts} />
      <BlogGridSection
        posts={filteredPosts}
        categories={categories}
        activeCategory={activeCategory}
        query={query}
      />
      <ContactSection block={contactBlock} isHomepage className="blogs-cta-section" />
    </div>
  )
}

function BlogHero({
  activeCategory,
  categories,
  hero,
  query,
}: {
  activeCategory?: string
  categories: string[]
  hero: Extract<PageBlock, { blockType: 'hero' }>
  query?: string
}) {
  const heroCategories = getHeroCategories(categories)

  return (
    <section className="bg-[#FFF8EE] py-[38px] text-[#151515] lg:h-[324px] lg:overflow-hidden lg:py-[0px] blogs-hero-section anim-full-section anim-fade-down">
      <Container className="blogs-hero-layout grid max-w-[1500px] gap-[30px] px-[24px] lg:grid-cols-[690px_520px] lg:gap-[210px] lg:px-[0px] lg:pt-[43px]">
        <div className="blogs-hero-copy">
          <p className="eyebrow-title text-[13px] font-[600] uppercase leading-[16px] tracking-[6px] text-[#555555]">
            {hero.eyebrow || 'Home / Blogs'}
          </p>
          <h1 className="heading-section mt-[15px] max-w-[680px] text-[36px] font-[800] leading-[46px] tracking-[0px] text-[#000000] md:text-[48px] md:leading-[66px]">
            <HighlightedHeading heading={hero.heading} highlight={hero.highlight} />
          </h1>
          {hero.description ? (
            <p className="blogs-hero-description mt-[18px] max-w-[620px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555]">
              {hero.description}
            </p>
          ) : null}
        </div>
        <div className="blogs-hero-categories flex max-w-[520px] flex-wrap gap-x-[13px] gap-y-[13px] pt-[0px] lg:pt-[14px]">
          <CategoryChip href={buildBlogsHref(undefined, query)} active={!activeCategory} variant="hero">
            All Posts
          </CategoryChip>
          {heroCategories.map((category) => (
            <CategoryChip
              key={category}
              href={buildBlogsHref(category, query)}
              active={category.toLowerCase() === activeCategory?.toLowerCase()}
              variant="hero"
            >
              {category}
            </CategoryChip>
          ))}
        </div>
      </Container>
    </section>
  )
}

function FeaturedBlogsSection({ lead, posts }: { lead?: BlogItem; posts: BlogItem[] }) {
  if (!lead) {
    return null
  }

  const textPosts = posts.slice(0, 2)
  const imagePost = posts[2]

  return (
    <section className="bg-[linear-gradient(108deg,#040946_0%,#121967_56%,#243C91_100%)] py-[72px] text-[#FFFFFF] lg:min-h-[1080px] lg:pb-[89px] lg:pt-[103px] blogs-featured-section">
      <Container className="blogs-featured-container max-w-[1500px] px-[24px] lg:px-[0px]">
        <p className="blogs-featured-eyebrow text-[13px] font-[800] uppercase leading-[16px] tracking-[6px] text-[#FCA62B]">Featured Blogs</p>
        <h2 className="blogs-featured-title heading-section mt-[31px] text-[42px] font-[800] leading-[52px] tracking-[0px] md:text-[48px] md:leading-[58px]">
          Featured{' '}
          <span className="relative inline-block">
            <span className="relative z-[1]">Post</span>
            <span className="absolute bottom-[5px] left-[0px] h-[9px] w-[115px] bg-[#6D6335]" aria-hidden="true" />
          </span>
        </h2>
        <div className="blogs-featured-layout mt-[50px] grid gap-[24px] lg:grid-cols-[556px_920px]">
          <FeaturedLeadCard post={lead} className="anim-left-part anim-fade-left" />
          <div className="blogs-featured-side-grid grid gap-[24px] lg:grid-rows-[355px_354px] anim-right-part anim-fade-right">
            <div className="blogs-featured-text-row grid gap-[24px] md:grid-cols-2 lg:grid-cols-[448px_448px]">
              {textPosts[0] ? <FeaturedTextCard post={textPosts[0]} /> : null}
              {textPosts[1] ? <FeaturedTextCard post={textPosts[1]} /> : null}
            </div>
            <div className="blogs-featured-mixed-row grid gap-[24px] md:grid-cols-2 lg:grid-cols-[460px_460px] lg:gap-[0px]">
              {imagePost ? <FeaturedSplitImageCard post={imagePost} /> : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function FeaturedLeadCard({ className, post }: { className?: string; post: BlogItem }) {
  const href = post.slug ? `/blogs/${post.slug}` : '/blogs'

  return (
    <article className={`blog-featured-lead-card group overflow-hidden border border-[#303877] bg-[linear-gradient(135deg,#171F63_0%,#26308A_100%)] lg:row-span-2 lg:h-[733px] ${className || ''}`}>
      <Link href={href as Route} className="block" aria-label={`Read more about ${post.title}`}>
        <div className="blog-featured-lead-image relative h-[260px] overflow-hidden md:h-[360px] lg:h-[417px]">
          <OptimizedImage
            media={post.featuredImage}
            altFallback={post.title}
            sizes="(min-width: 1024px) 556px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="blog-featured-lead-content flex min-h-[316px] flex-col px-[32px] pb-[36px] pt-[38px]">
        <FeaturedDate date={post.publishedAt} />
        <h3 className="mt-[28px] line-clamp-2 text-[28px] font-[800] leading-[38px] tracking-[0px] text-[#FFFFFF]">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-[24px] line-clamp-2 text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#FFFFFF]/85">
            {post.excerpt}
          </p>
        ) : null}
        <FeaturedReadMore href={href} title={post.title} />
      </div>
    </article>
  )
}

function FeaturedTextCard({ post }: { post: BlogItem }) {
  const href = post.slug ? `/blogs/${post.slug}` : '/blogs'

  return (
    <article className="blog-featured-text-card group flex min-h-[354px] flex-col border border-[#303877]
     bg-[linear-gradient(135deg,#171F63_0%,#26308A_100%)] px-[32px] pb-[36px] pt-[38px] transition duration-300 hover:border-[#FCA62B] lg:h-full">
      <FeaturedDate date={post.publishedAt} />
      <h3 className="mt-[15px] line-clamp-3 text-[28px] font-[800] leading-[38px] tracking-[0px] text-[#FFFFFF]">
        {post.title}
      </h3>
      {post.excerpt ? (
        <p className="mt-[24px] line-clamp-2 text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#FFFFFF]/85">
          {post.excerpt}
        </p>
      ) : null}
      <FeaturedReadMore href={href} title={post.title} />
    </article>
  )
}

function FeaturedSplitImageCard({ post }: { post: BlogItem }) {
  const href = post.slug ? `/blogs/${post.slug}` : '/blogs'

  return (
    <article className="blog-featured-split-card group grid min-h-[354px] gap-[24px] md:col-span-2 md:grid-cols-2 lg:col-span-2">
      <div className="blog-featured-split-content flex min-h-[354px] flex-col border border-[#303877] bg-[linear-gradient(135deg,#171F63_0%,#26308A_100%)] px-[32px] pb-[36px] pt-[38px] transition duration-300 group-hover:border-[#FCA62B]">
        <FeaturedDate date={post.publishedAt} />
        <h3 className="mt-[28px] line-clamp-3 text-[28px] font-[800] leading-[38px] tracking-[0px] text-[#FFFFFF]">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-[24px] line-clamp-2 text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#FFFFFF]/85">
            {post.excerpt}
          </p>
        ) : null}
        <FeaturedReadMore href={href} title={post.title} />
      </div>
      <Link href={href as Route} className="blog-featured-split-image relative block h-[280px] overflow-hidden md:h-[354px] lg:h-[354px]" aria-label={`Read more about ${post.title}`}>
        <OptimizedImage
          media={post.featuredImage}
          altFallback={post.title}
          sizes="(min-width: 1024px) 460px, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
    </article>
  )
}

function FeaturedDate({ date }: { date?: string }) {
  if (!date) {
    return null
  }

  return (
    <time className="text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#FFFFFF]" dateTime={date}>
      {formatFeaturedDate(date)}
    </time>
  )
}

function FeaturedReadMore({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href as Route}
      className="blog-featured-read-more mt-auto inline-flex items-center gap-[14px] pt-[26px] text-[14px] font-[800] uppercase leading-[24px] tracking-[0.84px] text-[#FFFFFF] transition duration-300 hover:text-[#FCA62B]"
      aria-label={`Read more about ${title}`}
    >
      Read More <ArrowRight size={22} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  )
}

function BlogGridSection({
  activeCategory,
  categories,
  posts,
  query,
}: {
  activeCategory?: string
  categories: string[]
  posts: BlogItem[]
  query?: string
}) {
  const gridCategories = getHeroCategories(categories)

  return (
    <section className=" py-[72px] lg:pb-[120px] lg:pt-[126px] blogs-grid-section blogs-categories-section anim-full-section anim-fade-up">
      <Container className="blogs-grid-container max-w-[1500px] px-[24px] lg:px-[0px]">
        <form action="/blogs" className="blogs-search-form w-full anim-full-section anim-fade-down">
          <label htmlFor="blog-search" className="blogs-filter-label text-[13px] font-[800] uppercase leading-[16px] tracking-[0px] text-[#2C368D]">
            Search
          </label>
          <div className="blogs-search-field relative mt-[18px]">
            <Search className="pointer-events-none absolute left-[31px] top-1/2 -translate-y-1/2 text-[#151515]" size={22} strokeWidth={2.25} aria-hidden="true" />
            <input
              id="blog-search"
              name="query"
              defaultValue={query}
              placeholder="Search by topic or blog post"
              className="blogs-search-input h-[62px] w-full border border-[#CCCCCC] pl-[76px] pr-[24px] text-[14px] font-[400] leading-[22px] tracking-[0px] text-[#151515] outline-none transition placeholder:text-[#151515] focus:border-[#2C368D]"
            />
            {activeCategory ? <input type="hidden" name="category" value={activeCategory} /> : null}
          </div>
        </form>
        <div className="blogs-category-filter mt-[38px] anim-full-section anim-fade-down">
          <p className="blogs-filter-label text-[13px] font-[800] uppercase leading-[16px] tracking-[0px] text-[#2C368D]">Categories</p>
          <div className="blogs-category-list mt-[19px] flex flex-wrap gap-[14px]">
            <CategoryChip href={buildBlogsHref(undefined, query)} active={!activeCategory} variant="gridDark">
              All Posts
            </CategoryChip>
            {gridCategories.map((category) => (
              <CategoryChip
                key={category}
                href={buildBlogsHref(category, query)} 
                active={category.toLowerCase() === activeCategory?.toLowerCase()}
                variant="gridDark"
              >
                {category}
              </CategoryChip>
            ))}
          </div>
        </div>
        {posts.length ? (
          <BlogGridClient key={`${activeCategory || 'all'}-${query || ''}`} posts={posts} pageSize={BLOGS_PER_PAGE} />
        ) : (
          <div className="blogs-empty-state mt-[64px] border border-[#CCCCCC] px-[48px] py-[40px]">
            <h2 className="text-[24px] font-[800] leading-[32px] tracking-[0px] text-[#000000]">No blogs found</h2>
            <p className="mt-[10px] max-w-[620px] text-[15px] font-[400] leading-[26px] tracking-[0px] text-[#555555]">
              Try another search or category. New recruitment insights will appear here as they are published in Payload.
            </p>
            <Link href="/blogs" className="mt-[22px] inline-flex h-[50px] w-[138px] items-center justify-center border border-[#2C368D] text-[13px] font-[800] uppercase leading-[16px] tracking-[0px] text-[#2C368D] transition hover:border-[#FFFFFF] hover:text-[#FFFFFF]">
              View All Posts
            </Link>
          </div>
        )}
      </Container>
    </section>
  )
}

function CategoryChip({
  active,
  children,
  href,
  variant = 'grid',
}: {
  active?: boolean
  children: string
  href: string
  variant?: 'grid' | 'gridDark' | 'hero'
}) {
  if (variant === 'hero') {
    return (
      <Link
        href={href as Route}
        scroll={false}
        className={`blog-category-chip blog-category-chip-hero inline-flex items-center justify-center whitespace-nowrap rounded-[29px] border border-[#CCCCCC] bg-[#FFF8EE] px-[24px] py-[16px] text-[18px] font-[700] leading-[24px] tracking-[0px] text-[#151515] transition duration-200 hover:border-[#2C368D] hover:text-[#2C368D] ${active ? 'border-[#CCCCCC]' : ''}`}
      >
        {children}
      </Link>
    )
  }

  if (variant === 'gridDark') {
    return (
      <Link
        href={href as Route}
        scroll={false}
        className={`blog-category-chip blog-category-chip-grid inline-flex items-center justify-center whitespace-nowrap rounded-[29px] border-[2px] px-[24px] py-[16px] text-[16px] font-[700] leading-[24px] tracking-[0px] transition duration-200 hover:bg-[#2c368d] hover:text-[#FFFFFF] ${
          active ? 'bg-[#2C368D] text-[#FFFFFF]' : 'bg-transparent text-[#000000]'
        }`}
        aria-label={`Filter blogs by ${children}`}
      >
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href as Route}
      scroll={false}
      className={
        active
          ? 'blog-category-chip inline-flex items-center rounded-[999px] bg-[#2C368D] px-[24px] py-[16px] text-[12px] font-[800] leading-[16px] tracking-[0px] text-[#FFFFFF]'
          : 'blog-category-chip inline-flex items-center rounded-[999px] bg-[#FFFFFF] px-[24px] py-[16px] text-[12px] font-[800] leading-[16px] tracking-[0px] text-[#151515] transition hover:bg-[#EAEBF4] hover:text-[#2C368D]'
      }
    >
      {children}
    </Link>
  )
}

function HighlightedHeading({ heading, highlight }: { heading: string; highlight?: string | null }) {
  if (!highlight || !heading.includes(highlight)) {
    return <>{heading}</>
  }

  const [before, after] = heading.split(highlight)

  return (
    <>
      {before}
      <span className="box-decoration-clone bg-[#FDEEA1] text-[#000000]" style={{ WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>
        {highlight}
      </span>
      {after}
    </>
  )
}

function filterBlogs(posts: BlogItem[], { category, query }: { category?: string; query?: string }) {
  const normalizedCategory = category?.trim().toLowerCase()
  const normalizedQuery = query?.trim().toLowerCase()

  return posts.filter((post) => {
    const categoryMatches = !normalizedCategory || post.category?.trim().toLowerCase() === normalizedCategory
    const queryMatches =
      !normalizedQuery ||
      [post.title, post.excerpt, post.category, post.authorName]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalizedQuery))

    return categoryMatches && queryMatches
  })
}

function getCategories(posts: BlogItem[]) {
  const categories = Array.from(new Set(posts.map((post) => post.category?.trim()).filter((category): category is string => Boolean(category))))

  return categories.length ? categories : fallbackCategories
}

function getHeroCategories(categories: string[]) {
  const uniqueCategories = Array.from(
    new Set(categories.map((category) => category.trim()).filter((category): category is string => Boolean(category)))
  )

  if (!uniqueCategories.length) {
    return fallbackCategories
  }

  const fallbackCategorySet = new Set(fallbackCategories.map((category) => category.toLowerCase()))
  const orderedFallbackCategories = fallbackCategories.filter((category) =>
    uniqueCategories.some((uniqueCategory) => uniqueCategory.toLowerCase() === category.toLowerCase())
  )
  const customCategories = uniqueCategories.filter(
    (category) => !fallbackCategorySet.has(category.toLowerCase()),
  )

  return [...orderedFallbackCategories, ...customCategories]
}

function getFeaturedGridPosts(lead: BlogItem | undefined, featuredPosts: BlogItem[], latestPosts: BlogItem[]) {
  const seen = new Set<string | number | undefined>([lead?.id || lead?.slug])
  const pool = [...featuredPosts.slice(1), ...latestPosts]

  return pool.filter((post) => {
    const key = post.id || post.slug

    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  }).slice(0, 4)
}

function formatFeaturedDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date))
}

function getHeroBlock(page: PageContent): Extract<PageBlock, { blockType: 'hero' }> {
  return (
    page.layout?.find((block): block is Extract<PageBlock, { blockType: 'hero' }> => block.blockType === 'hero') ||
    (fallbackBlogPage.layout?.[0] as Extract<PageBlock, { blockType: 'hero' }>)
  )
}

function getContactBlock(page: PageContent): Extract<PageBlock, { blockType: 'contact' }> {
  return (
    page.layout?.find((block): block is Extract<PageBlock, { blockType: 'contact' }> => block.blockType === 'contact') ||
    (fallbackBlogPage.layout?.[1] as Extract<PageBlock, { blockType: 'contact' }>)
  )
}

function buildBlogsHref(category?: string, query?: string) {
  const params = new URLSearchParams()

  if (category) {
    params.set('category', category)
  }

  if (query) {
    params.set('query', query)
  }

  const queryString = params.toString()

  return queryString ? `/blogs?${queryString}` : '/blogs'
}

function resolveParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}
