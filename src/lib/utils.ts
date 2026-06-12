import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { getSiteUrl } from '@/lib/site'
import type { MediaLike } from '@/types/content'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const absoluteUrl = (path = '/') =>
  new URL(path, getSiteUrl()).toString()

export const resolveMediaUrl = (media: MediaLike, fallback = '', preferredSizes: string[] = ['hero', 'card']): string => {
  if (typeof media === 'string') {
    return normalizeLocalMediaUrl(media)
  }

  if (media && typeof media === 'object') {
    const sizedUrl = preferredSizes.map((size) => media.sizes?.[size]?.url).find(Boolean)

    return normalizeLocalMediaUrl(sizedUrl || media.url || fallback)
  }

  return fallback
}

export const resolveMediaAlt = (media: MediaLike, fallback = ''): string => {
  if (media && typeof media === 'object' && 'alt' in media) {
    return media.alt || fallback
  }

  return fallback
}

export const relationItems = <T>(items?: (T | string | number | null | undefined)[]): T[] =>
  (items || []).filter((item): item is T => Boolean(item) && typeof item === 'object')

const normalizeLocalMediaUrl = (url: string) => {
  if (!url) {
    return url
  }

  const directMediaUrl = toDirectMediaUrl(url)

  if (directMediaUrl) {
    return directMediaUrl
  }

  try {
    const parsedUrl = new URL(url)
    const configuredUrl = new URL(getSiteUrl())
    const isLocalPayloadMedia = ['localhost', '127.0.0.1'].includes(parsedUrl.hostname) && parsedUrl.pathname.startsWith('/api/media/')

    if (parsedUrl.origin === configuredUrl.origin || isLocalPayloadMedia) {
      return `${parsedUrl.pathname}${parsedUrl.search}`
    }
  } catch {
    return url
  }

  return url
}

const toDirectMediaUrl = (url: string) => {
  const mediaPrefix = '/api/media/file/'

  try {
    const parsedUrl = url.startsWith('http') ? new URL(url) : new URL(url, getSiteUrl())
    const mediaPrefixIndex = parsedUrl.pathname.indexOf(mediaPrefix)

    if (mediaPrefixIndex === -1) {
      return undefined
    }

    const encodedFilename = parsedUrl.pathname.slice(mediaPrefixIndex + mediaPrefix.length)
    const filename = decodeURIComponent(encodedFilename)

    return `/media/${filename}`
  } catch {
    const mediaPrefixIndex = url.indexOf(mediaPrefix)

    if (mediaPrefixIndex === -1) {
      return undefined
    }

    const encodedFilename = url.slice(mediaPrefixIndex + mediaPrefix.length).split('?')[0]

    return `/media/${decodeURIComponent(encodedFilename)}`
  }
}
