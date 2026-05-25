import Link from 'next/link'
import type { Route } from 'next'
import { ChevronDown, Mail } from 'lucide-react'

import { HeaderShell } from './HeaderShell'
import { MobileNav } from './MobileNav'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { getNavigation, getSiteSettings } from '@/lib/payload-queries'
import { siteConfig } from '@/lib/site'
import type { FooterSocialLink, Link as NavLink } from '@/types/content'

type ActiveHeaderCTA = {
  enabled?: boolean
  label: string
  newTab?: boolean
  url: string
  variant?: 'primary' | 'secondary'
}

export async function Navbar() {
  const [navigation, settings] = await Promise.all([getNavigation(), getSiteSettings()])
  const header = settings?.header
  const footerContact = settings?.footer?.contact
  const email = footerContact?.email || settings?.contact?.email || siteConfig.contactEmail
  const ukPhone = footerContact?.ukPhone || footerContact?.phone || settings?.contact?.ukPhone || siteConfig.phones.uk
  const usPhone = footerContact?.usPhone || settings?.contact?.usPhone || siteConfig.phones.us
  const ausPhone = footerContact?.ausPhone || settings?.contact?.ausPhone || siteConfig.phones.aus
  const footerSocialLinks = normalizeFooterSocialLinks(settings?.footer?.socialLinks)
  const legacySocialLinks = normalizeLegacySocialLinks(settings?.socialLinks)
  const socialLinks = footerSocialLinks.length ? footerSocialLinks : legacySocialLinks
  const headerCta = resolveHeaderCTA(header?.cta)
  const logoMedia = header?.logo || settings?.logo
  const logoAlt = header?.logoAlt || settings?.brandName || siteConfig.name
  const stickyEnabled = header?.stickyEnabled ?? true

  return (
    <HeaderShell stickyEnabled={stickyEnabled}>
      <div className="hidden h-[50px] bg-[#070C4C] text-[#FFFFFF] transition-[margin,opacity] duration-300 group-data-[scrolled=true]/header:mt-[-50px] group-data-[scrolled=true]/header:opacity-0 2xl:block">
        <Container className="flex h-[50px] max-w-[1790px] items-center justify-between px-[24px] text-[16px] leading-[20px] tracking-[0px] 2xl:px-[0px]">
          <HeaderContactGroup label="Client Inquiry:" ukPhone={ukPhone} usPhone={usPhone} ausPhone={ausPhone} email={email} />
          <HeaderContactGroup label="Job Seekers :" ukPhone={ukPhone} usPhone={usPhone} ausPhone={ausPhone} email={email} />
        </Container>
      </div>
      <Container as="nav" className="relative flex h-[84px] max-w-[1800px] items-center justify-between bg-[#FFF8EE] px-[24px] md:h-[96px] lg:h-[113px] 2xl:px-[0px]">
        <Link href="/" className="relative h-[58px] w-[84px] shrink-0 md:h-[64px] md:w-[92px] lg:h-[73px] lg:w-[104px]" aria-label="INFE Talent home">
          <OptimizedImage
            media={logoMedia}
            fallbackSrc={figmaAssets.logo}
            altFallback={logoAlt}
            sizes="(min-width: 1024px) 104px, 84px"
            className="object-contain object-left"
          />
        </Link>
        <div className="hidden items-center gap-[30px] text-[16px] font-[500] leading-[20px] tracking-[0px] text-[#151515] lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.url}
              href={(item.url || '/') as Route}
              target={item.newTab ? '_blank' : undefined}
              rel={item.newTab ? 'noopener noreferrer' : undefined}
              className="relative inline-flex h-[20px] items-center gap-[6px] whitespace-nowrap transition hover:text-[#262164] after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-0 after:bg-[#FCA62B] after:transition-all hover:after:w-full"
            >
              {item.label}
              {hasDropdownIndicator(item) ? <ChevronDown size={14} strokeWidth={2} aria-hidden="true" /> : null}
            </Link>
          ))}
          {socialLinks.length ? (
            <div className="flex items-center gap-[24px] pl-[8px] text-[20px] font-[800] leading-[20px] text-[#262164]">
              {socialLinks.map((item) => (
                <a
                  key={`${item.label}-${item.url}`}
                  href={item.url || '#'}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  className="inline-flex h-[20px] min-w-[16px] items-center justify-center transition hover:text-[#FCA62B]"
                  aria-label={item.label}
                >
                  {socialGlyph(item.label)}
                </a>
              ))}
            </div>
          ) : null}
          {headerCta ? (
            <Button
              href={headerCta.url}
              newTab={headerCta.newTab}
              variant={headerCta.variant || 'primary'}
              size="sm"
              className="h-[42px] px-[18px]"
            >
              {headerCta.label}
            </Button>
          ) : null}
        </div>
        <MobileNav navigation={navigation} cta={headerCta} socialLinks={socialLinks} />
      </Container>
    </HeaderShell>
  )
}

function normalizeFooterSocialLinks(items?: FooterSocialLink[]): NavLink[] {
  return (items || [])
    .filter((item) => item.url)
    .map((item) => ({
      label: item.platformName || item.label || item.iconName || 'Social link',
      url: item.url,
      newTab: item.newTab,
    }))
}

function normalizeLegacySocialLinks(items?: NavLink[]): NavLink[] {
  return (items || []).filter((item) => item.url)
}

function resolveHeaderCTA(cta?: {
  enabled?: boolean
  label?: string
  newTab?: boolean
  url?: string
  variant?: 'primary' | 'secondary'
}): ActiveHeaderCTA | undefined {
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

function HeaderContactGroup({
  label,
  ukPhone,
  usPhone,
  ausPhone,
  email,
}: {
  label: string
  ukPhone: string
  usPhone: string
  ausPhone: string
  email: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-[12px]">
      <Mail size={20} strokeWidth={2.25} aria-hidden="true" />
      <span className="font-[700]">{label}</span>
      <a href={`tel:${ukPhone.replace(/\s/g, '')}`} className="font-[400] transition hover:text-[#FCA62B]">
        {ukPhone}
      </a>
      <span className="text-[#FFFFFF]/70" aria-hidden="true">|</span>
      <a href={`tel:${usPhone.replace(/\s/g, '')}`} className="font-[400] transition hover:text-[#FCA62B]">
        {usPhone}
      </a>
      <span className="text-[#FFFFFF]/70" aria-hidden="true">|</span>
      <a href={`tel:${ausPhone.replace(/\s/g, '')}`} className="font-[400] transition hover:text-[#FCA62B]">
        {ausPhone}
      </a>
      <a href={`mailto:${email}`} className="font-[700] transition hover:text-[#FCA62B]">
        {email}
      </a>
    </div>
  )
}

function hasDropdownIndicator(item: NavLink) {
  const label = item.label?.toLowerCase() || ''
  const url = item.url?.toLowerCase() || ''

  return label.includes('service') || label.includes('insight') || label.includes('blog') || url.includes('/services') || url.includes('/blogs')
}

function socialGlyph(label?: string) {
  const normalized = label?.toLowerCase() || ''

  if (normalized.includes('instagram')) {
    return (
      <span className="relative block size-[18px] rounded-[5px] border-[2px] border-current">
        <span className="absolute left-[4px] top-[4px] size-[6px] rounded-full border-[2px] border-current" />
        <span className="absolute right-[3px] top-[3px] size-[3px] rounded-full bg-current" />
      </span>
    )
  }

  if (normalized.includes('linkedin')) {
    return 'in'
  }

  if (normalized.includes('facebook')) {
    return 'f'
  }

  return label?.slice(0, 1).toLowerCase() || ''
}
