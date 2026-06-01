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
    <section id={sectionId(block.settings)} className={isHomepage ? 'bg-[#FFF8EE] py-[80px] lg:py-[120px]' : sectionClasses(block.settings, { defaultBackground: 'cream' })}>
      <Container className={isHomepage ? 'max-w-[1500px] px-[24px] lg:px-[0px]' : undefined}>
        <div className={isHomepage ? 'mb-[64px] grid gap-[32px] lg:grid-cols-[742px_742px] lg:gap-[16px]' : 'mb-10 grid gap-8 lg:grid-cols-2'}>
          {isHomepage ? (
            <h2 className="heading-section text-[50px] font-[800] leading-[66px] tracking-[-1.5px] text-[#000000]">{block.heading}</h2>
          ) : (
            <SectionHeader eyebrow={block.eyebrow} title={block.heading} />
          )}
          {block.description ? <p className={isHomepage ? 'max-w-[742px] pt-[5px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555]' : 'max-w-2xl text-body14 leading-[22px] text-neutral-muted md:text-body16 md:leading-[26px]'}>{block.description}</p> : null}
        </div>
        <div className={isHomepage ? 'grid gap-[32px] md:grid-cols-3' : 'grid gap-7 md:grid-cols-3'}>
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
