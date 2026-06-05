import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/seo/JsonLd'
import { BlogDetail } from '@/components/sections/BlogDetail'
import { getBlogBySlug, getRelatedBlogs } from '@/lib/payload-queries'
import { blogPostingSchema, breadcrumbSchema, buildMetadata } from '@/lib/seo'
import type { PageContent } from '@/types/content'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
}

const legacyBlogSlugs: Record<string, string> = {
  'soft-skills-career-growth': 'soft-skills-that-improve-career-growth',
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await resolveBlogPost(slug)

  if (!post) {
    notFound()
  }

  const canonicalSlug = post.slug || slug

  return buildMetadata({ title: post.title, slug: canonicalSlug, seo: post.seo } as PageContent, `/blogs/${canonicalSlug}`, {
    description: post.excerpt,
    image: post.featuredImage,
    imageAlt: post.title,
    modifiedTime: post.updatedAt,
    publishedTime: post.publishedAt,
    type: 'article',
  })
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await resolveBlogPost(slug)

  if (!post) {
    notFound()
  }

  const canonicalSlug = post.slug || slug
  const relatedPosts = await getRelatedBlogs(canonicalSlug, post.category, 4)

  return (
    <div className="page-blog-detail">
      <BlogDetail post={post} relatedPosts={relatedPosts} />
      <JsonLd
        data={[
          blogPostingSchema(post, `/blogs/${canonicalSlug}`),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: '/blogs' },
            { name: post.title, path: `/blogs/${canonicalSlug}` },
          ]),
        ]}
      />
    </div>
  )
}

async function resolveBlogPost(slug: string) {
  const post = await getBlogBySlug(slug)

  if (post) {
    return post
  }

  const legacySlug = legacyBlogSlugs[slug]

  return legacySlug ? getBlogBySlug(legacySlug) : null
}
