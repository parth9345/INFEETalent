import Link from 'next/link'
import type { Route } from 'next'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

import { ContactSection } from '@/components/sections/ContactSection'
import { BlogVideoTile } from '@/components/sections/blogs/BlogVideoTile'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import type { BlogItem, MediaLike, PageBlock } from '@/types/content'

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
  const publishedDate = formatBlogDate(post.publishedAt)

  return (
    <>
      <article className="bg-[#FFF8EE] text-[#151515]">
        <section className="border-b border-[#CCCCCC] pb-[72px] pt-[28px] md:pb-[88px] md:pt-[34px] lg:pb-[120px] lg:pt-[40px] blog-detail-hero-section">
          <Container className="grid max-w-[1500px] gap-[38px] px-[24px] lg:grid-cols-[660px_718px] lg:items-start lg:gap-[122px] lg:px-[0px]">
            <div className="lg:flex lg:min-h-[451px] lg:flex-col">
              <nav aria-label="Breadcrumb" className="text-[11px] font-[800] uppercase leading-[16px] tracking-[4px] text-[#555555]">
                <Link href="/" className="transition hover:text-[#2C368D]">Home</Link>
                <span className="px-[8px]" aria-hidden="true">/</span>
                <Link href="/blogs" className="transition hover:text-[#2C368D]">Blogs</Link>
                <span className="px-[8px]" aria-hidden="true">/</span>
                <span className="inline-block max-w-[352px] truncate align-bottom">{post.title}</span>
              </nav>
              <h1 className="heading-section mt-[24px] max-w-[660px] text-[40px] font-[800] leading-[48px] tracking-[0px] text-[#151515] md:text-[50px] md:leading-[60px] lg:text-[64px] lg:leading-[72px]">
                <TitleHighlight title={post.title} />
              </h1>
              <p className="mt-[16px] max-w-[610px] text-[16px] font-[400] leading-[28px] tracking-[0px] text-[#555555] lg:hidden">
                {post.excerpt}
              </p>
              <BlogMeta
                category={category}
                publishedAt={post.publishedAt}
                publishedDate={publishedDate}
              />
            </div>
            <div className="relative h-[320px] overflow-hidden md:h-[451px] lg:h-[451px] lg:w-[718px]">
              <OptimizedImage
                media={post.featuredImage}
                fallbackSrc={figmaAssets.aboutOfficeSide}
                altFallback={post.title}
                priority
                sizes="(min-width: 1024px) 718px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        </section>

        <section className="bg-[#FFF8EE] py-[86px] text-[#151515] md:py-[104px] lg:py-[120px] blog-detail-content-section">
          <Container className="grid max-w-[1500px] gap-[52px] px-[24px] lg:grid-cols-[896px_542px] lg:gap-[62px] lg:px-[0px]">
            <div>
              <BlogRichText
                value={post.content}
                fallback={[post.excerpt]}
                post={post}
              />
            </div>
            <aside className="lg:sticky lg:top-[80px] lg:self-start">
              <div className="min-h-[480px] bg-[linear-gradient(180deg,#1E2788_0%,#1A247E_100%)] px-[40px] pb-[40px] pt-[48px] text-[#FFFFFF]">
                <h2 className="heading-section max-w-[442px] text-[44px] font-[800] leading-[56px] tracking-[0px]">
                  Want To Scale Your Sourcing Team? Let&apos;s Build Your Offshore Strategy.
                </h2>
                <p className="mt-[30px] max-w-[442px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#FFFFFF]/80">
                  Talk with INFE Talent about a recruitment delivery model built around your market, roles, and operating rhythm.
                </p>
                <Button href="/contact" size="sm" className="mt-[36px] h-[56px] w-full border-[0px] bg-[#FCA62B] text-[12px] leading-[16px] tracking-[0.8px] text-[#151515] hover:bg-[#FCA62B]/90">
                  Book A Consultation
                </Button>
              </div>
            </aside>
          </Container>
        </section>
      </article>

      <RelatedBlogsSection posts={relatedPosts} />
      <ContactSection block={detailContactBlock} isHomepage className="blog-detail-cta-section" />
    </>
  )
}

function BlogMeta({
  category,
  publishedAt,
  publishedDate,
}: {
  category: string
  publishedAt?: string
  publishedDate: string
}) {
  return (
    <div className="mt-[38px] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] text-[16px] font-[500] leading-[24px] tracking-[0px] text-[#555555] lg:mt-auto blog-detail-author-section">
      <span className="inline-flex h-[36px] items-center rounded-[999px] border border-[#CCCCCC] px-[16px] text-[16px] font-[500] leading-[24px] tracking-[0px] text-[#555555]">
        {category}
      </span>
      {publishedDate ? (
        <time dateTime={publishedAt}>{publishedDate}</time>
      ) : null}
    </div>
  )
}

function RelatedBlogsSection({ posts }: { posts: BlogItem[] }) {
  if (!posts.length) {
    return null
  }

  const lead = posts[0]
  const textPosts = posts.slice(1, 3)
  const imagePost = posts[3] || posts[2] || posts[1] || lead

  return (
    <div className="page-blogs blog-detail-featured-scope">
      <section className="bg-[linear-gradient(108deg,#040946_0%,#121967_56%,#223891_100%)] py-[72px] text-[#FFFFFF] lg:min-h-[1080px] lg:pb-[89px] lg:pt-[103px] blogs-featured-section blog-detail-related-section">
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
            <FeaturedLeadCard post={lead} />
            <div className="blogs-featured-side-grid grid gap-[24px] lg:grid-rows-[355px_354px]">
              <div className="blogs-featured-text-row grid gap-[24px] md:grid-cols-2 lg:grid-cols-[448px_448px]">
                {textPosts[0] ? <FeaturedTextCard post={textPosts[0]} /> : null}
                {textPosts[1] ? <FeaturedTextCard post={textPosts[1]} /> : null}
              </div>
              <div className="blogs-featured-mixed-row grid gap-[24px] md:grid-cols-2 lg:grid-cols-[460px_460px] lg:gap-[0px]">
                <FeaturedSplitImageCard post={imagePost} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

function FeaturedLeadCard({ post }: { post: BlogItem }) {
  const href = post.slug ? `/blogs/${post.slug}` : '/blogs'

  return (
    <article className="blog-featured-lead-card group overflow-hidden border border-[#303877] bg-[linear-gradient(135deg,#171F63_0%,#26308A_100%)] lg:row-span-2 lg:h-[733px]">
      <Link href={href as Route} className="block" aria-label={`Read more about ${post.title}`}>
        <div className="blog-featured-lead-image relative h-[260px] overflow-hidden md:h-[360px] lg:h-[417px]">
          <OptimizedImage
            media={post.featuredImage}
            fallbackSrc={figmaAssets.insights[0]}
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
    <article className="blog-featured-text-card group flex min-h-[354px] flex-col border border-[#303877] bg-[linear-gradient(135deg,#171F63_0%,#26308A_100%)] px-[32px] pb-[36px] pt-[38px] transition duration-300 lg:h-full">
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
    </article>
  )
}

function FeaturedSplitImageCard({ post }: { post: BlogItem }) {
  const href = post.slug ? `/blogs/${post.slug}` : '/blogs'

  return (
    <article className="blog-featured-split-card group grid min-h-[354px] gap-[24px] md:col-span-2 md:grid-cols-2 lg:col-span-2">
      <div className="blog-featured-split-content flex min-h-[354px] flex-col border border-[#303877] bg-[linear-gradient(135deg,#171F63_0%,#26308A_100%)] px-[32px] pb-[36px] pt-[38px] transition duration-300">
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
          fallbackSrc={figmaAssets.aboutOfficeSide}
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
      {formatBlogDate(date)}
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

type BlogRichTextNode = {
  type?: string
  tag?: string
  text?: string
  format?: number
  listType?: 'bullet' | 'number' | string
  children?: BlogRichTextNode[]
  value?: unknown
  alt?: string
  thumbnail?: MediaLike
  videoUrl?: string
  fields?: {
    url?: string
    videoUrl?: string
    newTab?: boolean
    doc?: {
      value?: {
        slug?: string
      }
    }
  }
}

function BlogRichText({ value, fallback, post }: { value?: unknown; fallback?: string[]; post: BlogItem }) {
  const nodes = richTextNodes(value)
  const contentNodes = hasStructuredContent(nodes) ? nodes : structuredFallbackNodes(nodes, fallback || [], post)

  return (
    <div className="max-w-[896px] text-[18px] font-[400] leading-[30px] tracking-[0px] text-[#555555]">
      {contentNodes.map((node, index) => renderRichNode(node, index))}
    </div>
  )
}

function renderRichNode(node: BlogRichTextNode, index: number): ReactNode {
  switch (node.type) {
    case 'heading':
      return renderHeading(node, index)
    case 'paragraph':
      return renderParagraph(node, index)
    case 'upload':
      return renderUpload(node, index)
    case 'video':
    case 'embed':
      return renderVideo(node, index)
    case 'list':
      return renderList(node, index)
    case 'quote':
      return (
        <blockquote key={index} className="my-[42px] border-l-[4px] border-[#FCA62B] bg-[#FFFFFF] px-[28px] py-[24px] text-[24px] font-[700] leading-[34px] text-[#151515]">
          {renderInlineChildren(node)}
        </blockquote>
      )
    default:
      if (node.text) {
        return renderText(node, index)
      }

      return node.children?.map((child, childIndex) => renderRichNode(child, childIndex)) || null
  }
}

function renderHeading(node: BlogRichTextNode, index: number) {
  const tag = node.tag === 'h3' || node.tag === 'h4' ? node.tag : 'h2'
  const children = renderInlineChildren(node)

  if (tag === 'h4') {
    return (
      <h4 key={index} className="mb-[14px] mt-[40px] text-[24px] font-[800] leading-[32px] tracking-[0px] text-[#151515]">
        {children}
      </h4>
    )
  }

  if (tag === 'h3') {
    return (
      <h3 key={index} className="mb-[16px] mt-[44px] text-[30px] font-[800] leading-[38px] tracking-[0px] text-[#151515]">
        {children}
      </h3>
    )
  }

  return (
    <h2 key={index} className="mb-[22px] mt-[0px] pt-[40px] first:pt-[0px] text-[40px] font-[800] leading-[48px] tracking-[0px] text-[#151515]">
      {children}
    </h2>
  )
}

function renderParagraph(node: BlogRichTextNode, index: number) {
  if (!collectRichText(node).trim()) {
    return null
  }

  return (
    <p key={index} className="mb-[20px] max-w-[896px] text-[18px] font-[400] leading-[30px] tracking-[0px] text-[#555555]">
      {renderInlineChildren(node)}
    </p>
  )
}

function renderUpload(node: BlogRichTextNode, index: number) {
  if (!node.value) {
    return null
  }

  return (
    <div key={index} className="relative my-[52px] h-[320px] overflow-hidden md:h-[460px] lg:h-[522px]">
      <OptimizedImage
        media={node.value as BlogItem['featuredImage']}
        src={typeof node.value === 'string' ? node.value : undefined}
        altFallback={node.alt || 'Blog image'}
        sizes="(min-width: 1024px) 896px, 100vw"
        className="object-cover"
      />
    </div>
  )
}

function renderVideo(node: BlogRichTextNode, index: number) {
  const videoUrl = node.videoUrl || node.fields?.videoUrl || node.fields?.url || 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

  return (
    <BlogVideoTile
      key={index}
      media={node.thumbnail || (node.value as MediaLike)}
      thumbnailSrc={typeof node.value === 'string' ? node.value : undefined}
      fallbackSrc={figmaAssets.testimonialVideo}
      alt={node.alt || 'Blog video'}
      videoSrc={videoUrl}
      className="my-[52px] h-[320px] md:h-[460px] lg:h-[522px]"
    />
  )
}

function renderList(node: BlogRichTextNode, index: number) {
  const ordered = node.listType === 'number'
  const children = node.children || []
  const ListTag = ordered ? 'ol' : 'ul'

  return (
    <ListTag key={index} className="mb-[24px] mt-[24px] space-y-[10px] pl-[24px] text-[18px] font-[400] leading-[30px] text-[#555555] marker:text-[#FCA62B]">
      {children.map((child, childIndex) => (
        <li key={childIndex} className={ordered ? 'list-decimal' : 'list-disc'}>
          {renderInlineChildren(child)}
        </li>
      ))}
    </ListTag>
  )
}

function renderInlineChildren(node: BlogRichTextNode): ReactNode {
  return node.children?.map((child, index) => {
    if (child.type === 'link') {
      const href = child.fields?.url || (child.fields?.doc?.value?.slug ? `/${child.fields.doc.value.slug}` : '')

      if (!href) {
        return renderInlineChildren(child)
      }

      return (
        <a
          key={index}
          href={href}
          target={child.fields?.newTab ? '_blank' : undefined}
          rel={child.fields?.newTab ? 'noopener noreferrer' : undefined}
          className="font-[700] text-[#2C368D] underline decoration-[#FCA62B] decoration-[2px] underline-offset-[4px] transition hover:text-[#FCA62B]"
        >
          {renderInlineChildren(child)}
        </a>
      )
    }

    if (child.text) {
      return renderText(child, index)
    }

    return renderInlineChildren(child)
  })
}

function renderText(node: BlogRichTextNode, key: number): ReactNode {
  const format = node.format || 0
  let content: ReactNode = node.text || ''

  if (format & 16) {
    content = <code className="bg-[#EAEBF4] px-[5px] py-[2px] text-[13px] text-[#151515]">{content}</code>
  }

  if (format & 8) {
    content = <span className="underline underline-offset-[3px]">{content}</span>
  }

  if (format & 2) {
    content = <em>{content}</em>
  }

  if (format & 1) {
    content = <strong className="font-[800] text-[#151515]">{content}</strong>
  }

  return <span key={key}>{content}</span>
}

function richTextNodes(value: unknown): BlogRichTextNode[] {
  if (!value || typeof value !== 'object') {
    return typeof value === 'string' ? [{ type: 'paragraph', children: [{ type: 'text', text: value }] }] : []
  }

  const root = value as { root?: { children?: BlogRichTextNode[] } }

  return root.root?.children || []
}

function hasStructuredContent(nodes: BlogRichTextNode[]) {
  return nodes.some((node) => ['heading', 'upload', 'video', 'embed', 'quote', 'list'].includes(node.type || ''))
}

function structuredFallbackNodes(nodes: BlogRichTextNode[], fallback: string[], post: BlogItem): BlogRichTextNode[] {
  const paragraphs = nodes.length
    ? nodes
    : fallback.map((paragraph) => ({
        type: 'paragraph',
        children: [{ type: 'text', text: paragraph }],
      }))

  const firstParagraphs = paragraphs.slice(0, 2)
  const remainingParagraphs = paragraphs.slice(2)

  return [
    headingNode(post.title),
    ...firstParagraphs,
    imageNode(figmaAssets.aboutOfficeSide, 'Recruitment consultation meeting'),
    ...remainingParagraphs.slice(0, 2),
    videoNode(figmaAssets.testimonialVideo, 'Recruitment strategy video'),
    ...remainingParagraphs.slice(2),
    imageNode(post.featuredImage || figmaAssets.insights[0], post.title),
  ]
}

function headingNode(text: string): BlogRichTextNode {
  return {
    type: 'heading',
    tag: 'h2',
    children: [{ type: 'text', text }],
  }
}

function imageNode(value: MediaLike, alt: string): BlogRichTextNode {
  return {
    type: 'upload',
    value,
    alt,
  }
}

function videoNode(thumbnail: MediaLike, alt: string): BlogRichTextNode {
  return {
    type: 'video',
    thumbnail,
    alt,
  }
}

function collectRichText(node: BlogRichTextNode): string {
  if (node.text) {
    return node.text
  }

  return node.children?.map(collectRichText).join(' ') || ''
}

function TitleHighlight({ title }: { title: string }) {
  const words = title.split(' ')
  const highlightCount = words.length >= 8 ? 3 : words.length > 5 ? 2 : 1
  const highlight = words.slice(-highlightCount).join(' ')

  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>
  }

  const [before, after] = title.split(highlight)

  return (
    <>
      {before}
      <span className="box-decoration-clone bg-[#FFF0A6] px-[3px]" style={{ WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>
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
