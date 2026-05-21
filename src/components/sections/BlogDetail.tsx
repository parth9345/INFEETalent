import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { RichText } from '@/components/ui/RichText'
import type { BlogItem } from '@/types/content'

export function BlogDetail({ post }: { post: BlogItem }) {
  return (
    <article className="bg-brand-background">
      <Container size="narrow" className="py-20">
        <p className="text-body12 font-extrabold uppercase tracking-[3px] text-brand-primary">Blogs</p>
        <h1 className="mt-4 text-h1 font-extrabold leading-[44px] text-neutral-dark">{post.title}</h1>
        {post.publishedAt ? (
          <time className="mt-6 block text-body14 text-neutral-muted" dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(post.publishedAt))}
          </time>
        ) : null}
        {post.featuredImage ? (
          <div className="relative mt-12 h-[520px] overflow-hidden">
            <OptimizedImage
              media={post.featuredImage}
              altFallback={post.title}
              sizes="(min-width: 1024px) 1040px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="mt-12 border border-neutral-border bg-neutral-white p-8 md:p-10">
          <RichText value={post.content} fallback={[post.excerpt]} />
        </div>
      </Container>
    </article>
  )
}
