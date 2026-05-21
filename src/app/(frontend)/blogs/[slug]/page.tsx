import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/seo/JsonLd'
import { BlogDetail } from '@/components/sections/BlogDetail'
import { getBlogBySlug } from '@/lib/payload-queries'
import { blogPostingSchema, breadcrumbSchema, buildMetadata } from '@/lib/seo'
import type { PageContent } from '@/types/content'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  return buildMetadata({ title: post.title, slug, seo: post.seo } as PageContent, `/blogs/${slug}`, {
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
  const post = await getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <BlogDetail post={post} />
      <JsonLd
        data={[
          blogPostingSchema(post, `/blogs/${slug}`),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: '/blogs' },
            { name: post.title, path: `/blogs/${slug}` },
          ]),
        ]}
      />
    </>
  )
}
