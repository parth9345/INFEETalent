import Link from 'next/link'
import type { Route } from 'next'

import { HeaderShell } from './HeaderShell'
import { MobileNav } from './MobileNav'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { getNavigation, getSiteSettings } from '@/lib/payload-queries'
import { siteConfig } from '@/lib/site'

export async function Navbar() {
  const [navigation, settings] = await Promise.all([getNavigation(), getSiteSettings()])
  const email = settings?.contact?.email || siteConfig.contactEmail
  const ukPhone = settings?.contact?.ukPhone || siteConfig.phones.uk
  const usPhone = settings?.contact?.usPhone || siteConfig.phones.us

  return (
    <HeaderShell>
      <div className="bg-brand-primary">
        <Container className="flex h-6 items-center justify-between text-header12 font-semibold text-neutral-white/85">
          <div className="flex min-w-0 items-center gap-4">
            <a href={`tel:${ukPhone.replace(/\s/g, '')}`} className="truncate transition hover:text-neutral-white">
              UK: {ukPhone}
            </a>
            <span className="hidden h-3 w-px bg-neutral-white/25 sm:block" aria-hidden="true" />
            <a href={`tel:${usPhone.replace(/\s/g, '')}`} className="hidden truncate transition hover:text-neutral-white sm:inline">
              US: {usPhone}
            </a>
          </div>
          <a href={`mailto:${email}`} className="hidden truncate transition hover:text-neutral-white md:inline">
            {email}
          </a>
        </Container>
      </div>
      <Container as="nav" className="relative flex h-[58px] items-center justify-between bg-neutral-white">
        <Link href="/" className="relative h-[34px] w-[74px] shrink-0" aria-label="INFE Talent home">
          <OptimizedImage
            media={settings?.logo}
            fallbackSrc={figmaAssets.logo}
            altFallback={settings?.brandName || siteConfig.name}
            sizes="74px"
            className="object-contain object-left"
          />
        </Link>
        <div className="hidden items-center gap-7 text-header12 font-bold text-neutral-dark lg:flex xl:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.url}
              href={(item.url || '/') as Route}
              className="relative py-5 transition hover:text-brand-primary after:absolute after:bottom-3 after:left-0 after:h-0.5 after:w-0 after:bg-brand-accent after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <ButtonLink href="/contact" size="sm" className="hidden min-w-[112px] px-5 md:inline-flex">
          Get Started
        </ButtonLink>
        <MobileNav navigation={navigation} />
      </Container>
    </HeaderShell>
  )
}
