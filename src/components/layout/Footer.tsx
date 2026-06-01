import Link from 'next/link'
import type { Route } from 'next'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { getFooterNavigation, getSiteSettings } from '@/lib/payload-queries'
import { siteConfig } from '@/lib/site'
import type { FooterSocialLink, Link as FooterNavLink, MediaLike } from '@/types/content'

type ActiveFooterCTA = {
  enabled?: boolean
  label: string
  newTab?: boolean
  url: string
  variant?: 'primary' | 'secondary'
}

type FooterPartnerLogo = {
  image: NonNullable<MediaLike>
  label?: string
  newTab?: boolean
  url?: string
}

const defaultPartnerLabels = [
  'GDPR Approved',
  'ISO 27001:2022',
  'ISO 27701',
  'ISO 9001:2015',
  'TUV SUD ISO 14001',
  'Cyber Essentials',
  'HIPAA Compliant',
  'AICPA SOC 2',
]

export async function Footer() {
  const [navigation, settings] = await Promise.all([getFooterNavigation(), getSiteSettings()])
  const footer = settings?.footer
  const footerColumns = footer?.navigationColumns?.some((column) => column.links?.length)
    ? footer.navigationColumns.filter((column) => column.links?.length)
    : [{ title: 'Quick Links', links: navigation }]
  const socialLinks = normalizeFooterSocialLinks(footer?.socialLinks, settings?.socialLinks)
  const contact = {
    officeAddress: footer?.contact?.address || settings?.contact?.officeAddress || '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    ukPhone: footer?.contact?.ukPhone || footer?.contact?.phone || settings?.contact?.ukPhone || siteConfig.phones.uk,
    usPhone: footer?.contact?.usPhone || settings?.contact?.usPhone || siteConfig.phones.us,
    ausPhone: footer?.contact?.ausPhone || settings?.contact?.ausPhone || siteConfig.phones.aus,
    email: footer?.contact?.email || settings?.contact?.email || siteConfig.contactEmail,
  }
  const footerCta = resolveFooterCTA(footer?.cta)
  const copyright = footer?.copyright || settings?.copyright || `Copyright 2026 ${settings?.brandName || siteConfig.name}. All rights reserved.`
  const cmsPartnerLogos = (settings?.footerPartners || []).flatMap((partner, index) => {
    if (!partner.image) {
      return []
    }

    return [
      {
        ...partner,
        image: partner.image,
        label: partner.label || defaultPartnerLabels[index] || `Partner certification ${index + 1}`,
      },
    ]
  })
  const partnerLogos: FooterPartnerLogo[] = cmsPartnerLogos.length
    ? cmsPartnerLogos
    : figmaAssets.partners.map((image, index) => ({
        image,
        label: defaultPartnerLabels[index] || `Partner certification ${index + 1}`,
      }))

  return (
    <footer className="border-t border-[#CCCCCC]">
      <div className="flex min-h-[252px] items-center justify-center border-b border-[#CCCCCC] px-[24px] py-[64px]">
        <div className="grid w-full max-w-[1500px] grid-cols-2 items-center justify-items-center gap-x-[24px] gap-y-[28px] sm:grid-cols-3 md:flex md:flex-wrap md:justify-center md:gap-[40px] lg:gap-[72.097px]">
          {partnerLogos.map((partner, index) => (
            <FooterPartnerLogoItem key={`${partner.label || 'partner'}-${index}`} partner={partner} index={index} />
          ))}
        </div>
      </div>
      <div className="grid border-b border-[#CCCCCC] lg:min-h-[424px] lg:grid-cols-2">
        <div className="border-[#CCCCCC] px-[24px] py-[48px] lg:border-r lg:py-[60px] lg:pl-[max(24px,calc((100vw-1500px)/2))] lg:pr-[80px]">
          {footer?.description ? (
            <div className="mb-[42px] max-w-[520px]">
              <p className="text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555]">
                {footer.description}
              </p>
            </div>
          ) : null}
          <div className={footerColumns.length > 1 ? 'grid gap-[40px] md:grid-cols-2' : ''}>
            {footerColumns.map((column, columnIndex) => (
              <div key={`${column.title || 'Footer column'}-${columnIndex}`}>
                <h2 className="text-[25px] font-[800] capitalize leading-[34px] tracking-[-0.75px] text-[#000000]">{column.title || 'Quick Links'}</h2>
                <div className="mt-[32px] grid grid-flow-row gap-y-[16px] md:grid-flow-col md:grid-rows-3 md:gap-x-[16px]">
                  {column.links?.map((item) => <FooterLink key={`${item.label}-${item.url}`} item={item} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="border-b border-[#CCCCCC] px-[24px] py-[48px] lg:min-h-[214px] lg:p-[60px]">
            <h2 className="text-[25px] font-[800] capitalize leading-[34px] tracking-[-0.75px] text-[#000000]">Corporate Office</h2>
            <p className="mt-[32px] max-w-[720px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555]">{contact.officeAddress}</p>
          </div>
          <div className="px-[24px] py-[48px] lg:min-h-[210px] lg:p-[60px]">
            <h2 className="text-[25px] font-[800] capitalize leading-[34px] tracking-[-0.75px] text-[#000000]">Contact Info</h2>
            <div className="mt-[32px] flex flex-wrap gap-x-[36px] gap-y-[16px] text-[18px] font-[400] leading-[25px] tracking-[0px] text-[#151515]">
              <p className="whitespace-nowrap">
                <strong className="text-[#262164]">UK:</strong> {contact.ukPhone}
              </p>
              <p className="whitespace-nowrap">
                <strong className="text-[#262164]">US:</strong> {contact.usPhone}
              </p>
              <p className="whitespace-nowrap">
                <strong className="text-[#262164]">AUS:</strong> {contact.ausPhone}
              </p>
              <p className="whitespace-nowrap font-[800] text-[#262164]">{contact.email}</p>
            </div>
            {socialLinks.length ? (
              <div className="mt-[24px] flex flex-wrap items-center gap-[18px] text-[16px] font-[700] leading-[20px] text-[#262164]">
                {socialLinks.map((item) => (
                  <a
                    key={`${item.platformName || item.label}-${item.url}`}
                    href={item.url}
                    target={item.newTab ? '_blank' : undefined}
                    rel={item.newTab ? 'noopener noreferrer' : undefined}
                    aria-label={item.platformName || item.label}
                    className="inline-flex min-h-[32px] items-center transition hover:text-[#FCA62B]"
                  >
                    {item.platformName || item.label || item.iconName}
                  </a>
                ))}
              </div>
            ) : null}
            {footerCta ? (
              <Button
                href={footerCta.url}
                newTab={footerCta.newTab}
                variant={footerCta.variant || 'primary'}
                size="md"
                className="mt-[28px]"
              >
                {footerCta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <Container className="flex h-[60px] max-w-[1500px] items-center px-[24px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555] lg:px-[0px]">
        <p>{copyright}</p>
      </Container>
    </footer>
  )
}

function FooterPartnerLogoItem({ index, partner }: { index: number; partner: FooterPartnerLogo }) {
  const label = partner.label || defaultPartnerLabels[index] || `Partner certification ${index + 1}`
  const content = (
    <span className="relative block h-[92px] w-[92px] lg:h-[124.415px] lg:w-[124.415px]">
      <OptimizedImage
        media={partner.image}
        altFallback={label}
        sizes="(min-width: 1024px) 124px, 92px"
        className="object-contain"
        unoptimized={isSvgMedia(partner.image)}
      />
    </span>
  )

  if (!partner.url) {
    return (
      <div className="flex h-[92px] w-[92px] items-center justify-center lg:h-[124.415px] lg:w-[124.415px]">
        {content}
      </div>
    )
  }

  return (
    <a
      href={partner.url}
      target={partner.newTab ? '_blank' : undefined}
      rel={partner.newTab ? 'noopener noreferrer' : undefined}
      className="flex h-[92px] w-[92px] items-center justify-center opacity-80 transition duration-300 hover:opacity-100 lg:h-[124.415px] lg:w-[124.415px]"
      aria-label={label}
    >
      {content}
    </a>
  )
}

function FooterLink({ item }: { item: FooterNavLink }) {
  const href = item.url || '/'
  const className = 'flex h-[44px] w-full items-center text-[16px] font-[500] leading-[28px] tracking-[0px] text-[#151515] transition hover:text-[#2C368D] sm:w-[300px]'

  if (isInternalHref(href)) {
    return (
      <Link
        href={href as Route}
        target={item.newTab ? '_blank' : undefined}
        rel={item.newTab ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target={item.newTab ? '_blank' : undefined}
      rel={item.newTab ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {item.label}
    </a>
  )
}

function isInternalHref(href: string) {
  return href.startsWith('/') || href.startsWith('#')
}

function normalizeFooterSocialLinks(footerLinks?: FooterSocialLink[], legacyLinks?: FooterNavLink[]): FooterSocialLink[] {
  const links = footerLinks?.length
    ? footerLinks
    : legacyLinks?.map((link) => ({
        platformName: link.label,
        label: link.label,
        url: link.url,
        newTab: link.newTab,
      }))

  return (links || []).filter((link): link is FooterSocialLink & { url: string } => Boolean(link.url))
}

function resolveFooterCTA(cta?: {
  enabled?: boolean
  label?: string
  newTab?: boolean
  url?: string
  variant?: 'primary' | 'secondary'
}): ActiveFooterCTA | undefined {
  if (!cta?.enabled || !cta.label || !cta.url) {
    return undefined
  }

  return {
    enabled: cta.enabled,
    label: cta.label,
    newTab: cta.newTab,
    url: cta.url,
    variant: cta.variant,
  }
}

function isSvgMedia(media: FooterPartnerLogo['image']) {
  if (typeof media === 'string') {
    return media.toLowerCase().split('?')[0]?.endsWith('.svg') || false
  }

  if (media && typeof media === 'object') {
    return media.mimeType === 'image/svg+xml' || media.url?.toLowerCase().split('?')[0]?.endsWith('.svg') || false
  }

  return false
}
