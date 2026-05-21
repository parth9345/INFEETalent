import Link from 'next/link'
import type { Route } from 'next'

import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { getFooterNavigation, getSiteSettings } from '@/lib/payload-queries'
import { siteConfig } from '@/lib/site'

export async function Footer() {
  const [navigation, settings] = await Promise.all([getFooterNavigation(), getSiteSettings()])
  const contact = {
    officeAddress: settings?.contact?.officeAddress || '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    ukPhone: settings?.contact?.ukPhone || siteConfig.phones.uk,
    usPhone: settings?.contact?.usPhone || siteConfig.phones.us,
    ausPhone: settings?.contact?.ausPhone || siteConfig.phones.aus,
    email: settings?.contact?.email || siteConfig.contactEmail,
  }
  const partnerLogos = settings?.footerPartners?.length
    ? settings.footerPartners
    : figmaAssets.partners.map((image, index) => ({ image, label: `Partner certification ${index + 1}`, url: undefined }))

  return (
    <footer className="border-t border-neutral-border bg-neutral-white">
      <Container className="grid grid-cols-4 gap-6 border-b border-neutral-border py-7 sm:grid-cols-8">
        {partnerLogos.map((partner, index) => (
          <a
            key={`${partner.label || 'partner'}-${index}`}
            href={partner.url || undefined}
            className="relative mx-auto size-12 opacity-80 md:size-14"
            aria-label={partner.label}
          >
            <OptimizedImage
              media={partner.image}
              altFallback={partner.label || `Partner certification ${index + 1}`}
              sizes="56px"
              className="object-contain"
            />
          </a>
        ))}
      </Container>
      <div className="grid border-b border-neutral-border lg:grid-cols-2">
        <div className="border-neutral-border px-5 py-9 lg:border-r lg:pl-[max(1.25rem,calc((100vw-1500px)/2))] lg:pr-12">
          <h2 className="text-h4 font-extrabold text-neutral-dark">Quick Links</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {navigation.map((item) => (
              <Link key={item.url} href={item.url as Route} className="text-footer14 font-medium text-neutral-dark hover:text-brand-primary">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="border-b border-neutral-border px-5 py-9 lg:px-12">
            <h2 className="text-h4 font-extrabold text-neutral-dark">Corporate Office</h2>
            <p className="mt-6 max-w-2xl text-body14 leading-[22px] text-neutral-muted md:text-body16 md:leading-[26px]">{contact.officeAddress}</p>
          </div>
          <div className="px-5 py-9 lg:px-12">
            <h2 className="text-h4 font-extrabold text-neutral-dark">Contact Info</h2>
            <div className="mt-6 grid gap-3 text-footer14 sm:grid-cols-2 xl:grid-cols-4">
              <p>
                <strong className="text-brand-primary">UK:</strong> {contact.ukPhone}
              </p>
              <p>
                <strong className="text-brand-primary">US:</strong> {contact.usPhone}
              </p>
              <p>
                <strong className="text-brand-primary">AUS:</strong> {contact.ausPhone}
              </p>
              <p className="font-bold text-brand-primary">{contact.email}</p>
            </div>
          </div>
        </div>
      </div>
      <Container className="flex h-14 items-center text-footer12 text-neutral-muted md:text-footer14">
        <p>{settings?.copyright || `Copyright 2026 ${settings?.brandName || siteConfig.name}. All rights reserved.`}</p>
      </Container>
    </footer>
  )
}
