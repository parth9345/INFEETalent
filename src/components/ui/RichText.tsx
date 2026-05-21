import { lexicalText } from '@/lib/richText'
import { cn } from '@/lib/utils'

export function RichText({ value, fallback, className }: { value?: unknown; fallback?: string[]; className?: string }) {
  const paragraphs = lexicalText(value)
  const text = paragraphs.length ? paragraphs : fallback || []

  return (
    <div className={cn('space-y-[16px] text-body14 leading-[22px] text-neutral-muted md:text-body16 md:leading-[26px]', className)}>
      {text.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`}>{paragraph}</p>
      ))}
    </div>
  )
}
