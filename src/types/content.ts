export type Link = {
  label?: string
  url?: string
  newTab?: boolean
}

export type SiteCTA = Link & {
  enabled?: boolean
  variant?: 'primary' | 'secondary'
}

export type FooterSocialLink = {
  platformName?: string
  label?: string
  url?: string
  iconName?: string
  newTab?: boolean
}

export type SectionSettings = {
  adminTitle?: string
  anchorId?: string
  background?: 'cream' | 'soft' | 'white' | 'blue' | 'dark'
  spacing?: 'compact' | 'standard' | 'spacious'
  hideBlock?: boolean
}

export type MediaLike =
  | string
  | {
      alt?: string
      url?: string
      filename?: string
      mimeType?: string
      sizes?: Record<string, { url?: string }>
    }
  | number
  | null
  | undefined

export type MaybeRelation<T> = T | string | number | null | undefined

export type SEOFields = {
  metaTitle?: string
  metaDescription?: string
  keywords?: { keyword?: string }[]
  openGraphImage?: MediaLike
  canonicalUrl?: string
  noIndex?: boolean
}

export type ServiceItem = {
  id?: string | number
  title: string
  slug?: string
  summary: string
  icon?: string
  featuredImage?: MediaLike
  content?: unknown
  benefits?: { label: string }[]
  process?: { title: string; description?: string }[]
  relatedServices?: MaybeRelation<ServiceItem>[]
  cta?: Link
  seo?: SEOFields
  updatedAt?: string
}

export type BlogItem = {
  id?: string | number
  title: string
  slug?: string
  excerpt: string
  category?: string
  authorName?: string
  authorImage?: MediaLike
  readTime?: string
  featured?: boolean
  publishedAt?: string
  featuredImage?: MediaLike
  content?: unknown
  seo?: SEOFields
  updatedAt?: string
}

export type TestimonialItem = {
  id?: string | number
  name: string
  role?: string
  company: string
  quote: string
  avatar?: MediaLike
  rating?: number
  testimonialType?: 'text' | 'video'
  videoUrl?: string
  videoThumbnail?: MediaLike
  featured?: boolean
  sortOrder?: number
  seo?: SEOFields
  updatedAt?: string
}

export type CareerItem = {
  id?: string | number
  title: string
  slug?: string
  department?: string
  location: string
  employmentType?: string
  experience?: string
  summary: string
  jobDetails?: { heading: string; content: unknown }[]
  seo?: SEOFields
  updatedAt?: string
}

export type FAQItem = {
  id?: string | number
  question: string
  answer?: unknown
  category?: string
}

export type TeamMemberItem = {
  id?: string | number
  name: string
  slug?: string
  role: string
  bio?: unknown
  photo?: MediaLike
  order?: number
}

export type ContactMethodItem = {
  label: string
  value: string
  url?: string
}

export type SiteSettingsContent = {
  brandName?: string
  logo?: MediaLike
  header?: {
    logo?: MediaLike
    logoAlt?: string
    navigation?: Link[]
    cta?: SiteCTA
    stickyEnabled?: boolean
  }
  footer?: {
    logo?: MediaLike
    logoAlt?: string
    description?: string
    navigationColumns?: { title?: string; links?: Link[] }[]
    contact?: {
      email?: string
      phone?: string
      address?: string
      ukPhone?: string
      usPhone?: string
      ausPhone?: string
    }
    socialLinks?: FooterSocialLink[]
    cta?: SiteCTA
    copyright?: string
  }
  primaryNavigation?: Link[]
  footerNavigation?: Link[]
  footerPartners?: { image?: MediaLike; label?: string; newTab?: boolean; url?: string }[]
  copyright?: string
  contact?: {
    officeAddress?: string
    ukPhone?: string
    usPhone?: string
    ausPhone?: string
    email?: string
  }
  socialLinks?: Link[]
  seo?: SEOFields
}

type BlockBase<T extends string> = {
  id?: string
  blockName?: string
  blockType: T
  settings?: SectionSettings
}

export type PageBlock =
  | (BlockBase<'hero'> & {
      variant?: 'split' | 'centered' | 'textOnly' | 'darkSplit'
      eyebrow?: string
      heading: string
      highlight?: string
      description?: string
      primaryAction?: Link
      secondaryAction?: Link
      media?: MediaLike
      badgeLabel?: string
      imagePosition?: 'left' | 'right'
      featureCard?: {
        image?: MediaLike
        name?: string
        role?: string
        primaryLabel?: string
        primaryValue?: string
        secondaryLabel?: string
        secondaryValue?: string
      }
      stats?: { value: string; label: string }[]
    })
  | (BlockBase<'statsStrip'> & {
      layout?: 'strip' | 'cards'
      heading?: string
      description?: string
      items?: { value: string; label: string; icon?: string }[]
    })
  | (BlockBase<'contentImage'> & {
      layout?: 'overlap' | 'split'
      eyebrow?: string
      heading: string
      highlight?: string
      body?: unknown
      bodyText?: string[]
      media?: MediaLike
      mediaSecondary?: MediaLike
      imagePosition?: 'left' | 'right'
      action?: Link
      primaryAction?: Link
      secondaryAction?: Link
      stats?: { value: string; label: string }[]
      overlayCard?: { name?: string; role?: string; company?: string }
    })
  | (BlockBase<'servicesGrid'> & {
      eyebrow?: string
      heading: string
      description?: string
      selectionMode?: 'manual' | 'latest'
      services?: MaybeRelation<ServiceItem>[]
      columns?: '2' | '3'
      showIcons?: boolean
      action?: Link
    })
  | (BlockBase<'awards'> & {
      heading: string
      description?: string
      items?: { title: string; description: string; image?: MediaLike }[]
    })
  | (BlockBase<'certifications'> & {
      heading: string
      items?: { label: string; url?: string }[]
    })
  | (BlockBase<'industries'> & {
      eyebrow?: string
      heading: string
      description?: string
      primaryAction?: Link
      secondaryAction?: Link
      items?: { label: string; url?: string }[]
    })
  | (BlockBase<'testimonials'> & {
      eyebrow?: string
      heading: string
      description?: string
      items?: MaybeRelation<TestimonialItem>[]
      display?: 'featured' | 'grid'
      featuredMedia?: MediaLike
      showRatings?: boolean
    })
  | (BlockBase<'cta'> & {
      eyebrow?: string
      heading: string
      description?: string
      variant?: 'light' | 'darkGradient' | 'bordered'
      alignment?: 'left' | 'center'
      media?: MediaLike
      primaryAction?: Link
      secondaryAction?: Link
    })
  | (BlockBase<'blogListing'> & {
      eyebrow?: string
      heading: string
      description?: string
      selectionMode?: 'manual' | 'latest'
      posts?: MaybeRelation<BlogItem>[]
      limit?: number
      showFeaturedImages?: boolean
      showExcerpts?: boolean
      action?: Link
    })
  | (BlockBase<'team'> & {
      eyebrow?: string
      heading: string
      description?: string
      selectionMode?: 'manual' | 'latest'
      members?: MaybeRelation<TeamMemberItem>[]
      layout?: 'grid' | 'editorial'
      showBio?: boolean
    })
  | (BlockBase<'faq'> & {
      eyebrow?: string
      heading: string
      description?: string
      category?: string
      defaultOpenFirst?: boolean
      items?: MaybeRelation<FAQItem>[]
    })
  | (BlockBase<'contact'> & {
      eyebrow?: string
      heading: string
      description?: string
      formHeading?: string
      formDescription?: string
      sourceOptions?: { label: string }[]
      contactMethods?: ContactMethodItem[]
    })
  | (BlockBase<'career'> & {
      eyebrow?: string
      heading: string
      description?: string
      selectionMode?: 'manual' | 'latest'
      careers?: MaybeRelation<CareerItem>[]
      showFilters?: boolean
      emptyState?: string
      action?: Link
    })
  | (BlockBase<'advantage'> & {
      eyebrow?: string
      heading: string
      highlight?: string
      description?: string
      items?: { icon?: string; title: string; description: string }[]
    })

export type PageContent = {
  title: string
  slug: string
  seo?: SEOFields
  layout?: PageBlock[]
  updatedAt?: string
}
