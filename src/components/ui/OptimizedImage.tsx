import Image, { type ImageProps } from 'next/image'

import { resolveMediaAlt, resolveMediaUrl } from '@/lib/utils'
import type { MediaLike } from '@/types/content'

type OptimizedImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  media?: MediaLike
  src?: ImageProps['src']
  alt?: string
  altFallback?: string
  fallbackSrc?: string
  preferredSizes?: string[]
}

export function OptimizedImage({
  media,
  src,
  alt,
  altFallback = '',
  fallbackSrc = '',
  fill = true,
  preferredSizes = ['hero', 'card'],
  sizes = '100vw',
  ...props
}: OptimizedImageProps) {
  const resolvedSrc = src || resolveMediaUrl(media, fallbackSrc, preferredSizes)

  if (!resolvedSrc) {
    return null
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt ?? resolveMediaAlt(media, altFallback)}
      fill={fill}
      sizes={sizes}
      {...props}
    />
  )
}
