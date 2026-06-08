import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import type { ReactNode } from 'react'

import { FloatingActions } from '@/components/layout/FloatingActions'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { JsonLd } from '@/components/seo/JsonLd'
import { ViewportAnimationObserver } from '@/components/ViewportAnimationObserver'
import { getSiteSettings } from '@/lib/payload-queries'
import { organizationSchema, websiteSchema } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import '@/styles/globals.css'
import '@/styles/custom-animations.css'
import '@/styles/custom-responsive.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
}

type FrontendLayoutProps = {
  children: ReactNode
}

export default async function FrontendLayout({ children }: FrontendLayoutProps) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-brand-accent focus:px-4 focus:py-3 focus:font-bold focus:text-brand-primary">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingActions />
        <ViewportAnimationObserver />
        <JsonLd data={[organizationSchema(settings), websiteSchema(settings)]} />
      </body>
    </html>
  )
}
