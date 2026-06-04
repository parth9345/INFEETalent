import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  eyebrow?: string
  title?: string
  heading?: string
  description?: string
  className?: string
  eyebrowClassName?: string
  headingClassName?: string
  descriptionClassName?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  headingLevel?: 'h1' | 'h2' | 'h3'
}

const headingClasses = {
  h1: 'text-h1 leading-[44px]',
  h2: 'text-h2 leading-[38px]',
  h3: 'text-h3 leading-[32px]',
} as const

export function SectionHeader({
  eyebrow,
  title,
  heading,
  description,
  className,
  eyebrowClassName,
  headingClassName,
  descriptionClassName,
  align = 'left',
  tone = 'light',
  headingLevel = 'h2',
}: SectionHeaderProps) {
  const displayTitle = title || heading
  const HeadingTag = headingLevel

  if (!displayTitle) {
    return null
  }

  return (
    <div className={cn('min-w-0 space-y-3', align === 'center' && 'mx-auto max-w-3xl text-center', className)}>
      {eyebrow ? (
        <p className={cn('eyebrow-title text-body12 font-extrabold uppercase leading-[18px] tracking-[3px]', tone === 'dark' ? 'text-brand-accent' : 'text-brand-primary', eyebrowClassName)}>
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag
        className={cn(
          'heading-section max-w-3xl break-words font-extrabold tracking-[0px]',
          headingClasses[headingLevel],
          tone === 'dark' ? 'text-neutral-white' : 'text-neutral-dark',
          align === 'center' && 'mx-auto',
          headingClassName,
        )}
      >
        {displayTitle}
      </HeadingTag>
      {description ? (
        <p className={cn('max-w-3xl text-body14 leading-[22px] md:text-body16 md:leading-[26px]', tone === 'dark' ? 'text-neutral-white/75' : 'text-neutral-muted', align === 'center' && 'mx-auto', descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
