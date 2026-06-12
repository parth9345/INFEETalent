const normalizeSiteUrl = (url?: string) => {
  if (!url) {
    return undefined
  }

  const trimmedUrl = url.trim().replace(/\/+$/, '')

  if (!trimmedUrl) {
    return undefined
  }

  return /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`
}

export const getSiteUrl = () =>
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SERVER_URL) ||
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  normalizeSiteUrl(process.env.VERCEL_URL) ||
  'http://localhost:3000'

export const siteConfig = {
  name: 'INFE Talent',
  url: getSiteUrl(),
  defaultTitle: 'INFE Talent | Offshore Recruitment Solutions',
  defaultDescription:
    'INFE Talent delivers end-to-end offshore recruitment solutions for staffing firms across the USA, UK, and APAC.',
  contactEmail: 'info@infetalent.com',
  jobsEmail: 'hr@infetalent.com',
  phones: {
    uk: '+44 203 878 3559',
    us: '+1 614 266 3317',
    aus: '+61 740 620 017',
  },
} as const
