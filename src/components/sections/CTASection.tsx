import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { sectionClasses, sectionId } from '@/lib/sections'
import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type CTABlock = Extract<PageBlock, { blockType: 'cta' }>

export function CTASection({ block }: { block: CTABlock }) {
  const isDark = block.variant === 'darkGradient'
  const centered = block.alignment === 'center'

  return (
    <section id={sectionId(block.settings)} className={sectionClasses(block.settings, { defaultBackground: 'cream' })}>
      <Container>
        <div
          className={cn(
            'grid gap-10 border border-neutral-border p-8 md:p-12',
            block.media && 'lg:grid-cols-[1fr_420px]',
            centered && !block.media && 'place-items-center text-center',
            isDark && 'border-transparent bg-brand-primary text-neutral-white',
            block.variant === 'light' && 'bg-neutral-white',
            block.variant === 'bordered' && 'bg-brand-background',
          )}
        >
          <div className={centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'}>
            <SectionHeader
              eyebrow={block.eyebrow}
              title={block.heading}
              description={block.description}
              tone={isDark ? 'dark' : 'light'}
              align={centered ? 'center' : 'left'}
            />
            <div className={cn('mt-8 flex flex-wrap gap-4', centered && 'justify-center')}>
              {block.primaryAction?.url ? (
                <ButtonLink href={block.primaryAction.url} newTab={block.primaryAction.newTab} variant="primary">
                  {block.primaryAction.label || 'Get Started'}
                </ButtonLink>
              ) : null}
              {block.secondaryAction?.url ? (
                <ButtonLink
                  href={block.secondaryAction.url}
                  newTab={block.secondaryAction.newTab}
                  variant="secondary"
                  className={isDark ? 'border-neutral-white text-neutral-white hover:bg-neutral-white hover:text-brand-primary' : undefined}
                >
                  {block.secondaryAction.label || 'Learn More'}
                </ButtonLink>
              ) : null}
            </div>
          </div>
          {block.media ? (
            <div className="relative min-h-[300px] overflow-hidden">
              <OptimizedImage media={block.media} altFallback={block.heading} sizes="420px" className="object-cover" />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
