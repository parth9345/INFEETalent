export const siteConfig = {
  name: 'INFE Talent',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  defaultTitle: 'INFE Talent | Offshore Recruitment Solutions',
  defaultDescription:
    'INFE Talent delivers end-to-end offshore recruitment solutions for staffing firms across the USA, UK, and APAC.',
  contactEmail: 'info@infetalent.com',
  phones: {
    uk: '+44 203 878 3559',
    us: '+1 614 266 3317',
    aus: '+61 740 620 017',
  },
} as const
