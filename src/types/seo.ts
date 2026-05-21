export type SEOFields = {
  metaTitle?: string | null
  metaDescription?: string | null
  keywords?: { keyword?: string | null }[] | null
  openGraphImage?: unknown
  canonicalUrl?: string | null
  noIndex?: boolean | null
}
