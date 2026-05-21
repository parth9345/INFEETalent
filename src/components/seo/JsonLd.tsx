import type { JsonLdObject } from '@/lib/seo'

type JsonLdProps = {
  data?: (JsonLdObject | null | undefined)[] | JsonLdObject | null
}

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data.filter(Boolean) : data

  if (!payload || (Array.isArray(payload) && payload.length === 0)) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, '\\u003c') }}
    />
  )
}
