import { cn } from './utils'
import type { SectionSettings } from '@/types/content'

const backgroundClass = {
  cream: 'bg-brand-background',
  soft: 'bg-neutral-section',
  white: 'bg-neutral-white',
  blue: 'bg-brand-primary text-neutral-white',
  dark: 'bg-neutral-black text-neutral-white',
} as const

const spacingClass = {
  compact: 'py-[36px] md:py-[48px]',
  standard: 'py-[48px] md:py-[64px]',
  spacious: 'py-[56px] md:py-[80px]',
} as const

export const sectionId = (settings?: SectionSettings, fallback?: string) => {
  const raw = settings?.anchorId || fallback

  return raw ? raw.toLowerCase().replace(/[^a-z0-9-]/g, '-') : undefined
}

export const sectionClasses = (
  settings?: SectionSettings,
  {
    defaultBackground = 'cream',
    className,
    includeSpacing = true,
  }: {
    defaultBackground?: keyof typeof backgroundClass
    className?: string
    includeSpacing?: boolean
  } = {},
) =>
  cn(
    backgroundClass[settings?.background || defaultBackground],
    includeSpacing && spacingClass[settings?.spacing || 'standard'],
    className,
  )
