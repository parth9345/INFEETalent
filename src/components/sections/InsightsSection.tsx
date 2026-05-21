import { BlogCard } from '@/components/cards/BlogCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getBlogs } from '@/lib/payload-queries'
import { sectionClasses, sectionId } from '@/lib/sections'
import { relationItems } from '@/lib/utils'
import type { BlogItem, PageBlock } from '@/types/content'

type BlogListingBlock = Extract<PageBlock, { blockType: 'blogListing' }>

export async function InsightsSection({ block, isHomepage = false }: { block: BlogListingBlock; isHomepage?: boolean }) {
  const limit = block.limit || 3
  const selectedPosts = relationItems<BlogItem>(block.posts)
  const items = selectedPosts.length ? selectedPosts : await getBlogs(limit)
  const posts = items.slice(0, limit)

  return (
    <section id={sectionId(block.settings)} className={isHomepage ? 'bg-brand-background py-[72px]' : sectionClasses(block.settings, { defaultBackground: 'cream' })}>
      <Container className={isHomepage ? 'max-w-[1152px] px-[24px] lg:px-[0px]' : undefined}>
        <div className={isHomepage ? 'mb-[42px] grid gap-[28px] lg:grid-cols-[460px_1fr]' : 'mb-10 grid gap-8 lg:grid-cols-2'}>
          <SectionHeader
            eyebrow={block.eyebrow}
            title={block.heading}
            className={isHomepage ? 'space-y-[0px]' : undefined}
            headingClassName={isHomepage ? 'text-h2 leading-[38px] tracking-[0px] md:text-h2' : undefined}
          />
          {block.description ? <p className={isHomepage ? 'max-w-[540px] text-body14 leading-[22px] tracking-[0px] text-neutral-muted' : 'max-w-2xl text-body14 leading-[22px] text-neutral-muted md:text-body16 md:leading-[26px]'}>{block.description}</p> : null}
        </div>
        <div className={isHomepage ? 'grid gap-[28px] md:grid-cols-3' : 'grid gap-7 md:grid-cols-3'}>
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug || post.title}
              post={post}
              imagePosition={index === 1 ? 'bottom' : 'top'}
              showImage={block.showFeaturedImages !== false}
              showExcerpt={block.showExcerpts !== false}
              variant={isHomepage ? 'home' : 'default'}
            />
          ))}
        </div>
        {block.action?.url ? (
          <div className="mt-10">
            <ButtonLink href={block.action.url} newTab={block.action.newTab} variant="secondary">
              {block.action.label || 'View Insights'}
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
