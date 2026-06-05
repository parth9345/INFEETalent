import type { Metadata } from 'next'

import { PageStructuredData } from '@/components/seo/PageStructuredData'
import { ContactSection } from '@/components/sections/ContactSection'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { getPageBySlug } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import type { PageBlock, PageContent } from '@/types/content'

export const revalidate = 60

const contactBlockFallback: Extract<PageBlock, { blockType: 'contact' }> = {
  blockType: 'contact',
  eyebrow: 'HOME / CONTACT US',
  heading: "Let's Design Your Offshore Recruitment Engine.",
  description:
    'Tell us about your hiring goals - we will come back within one business day with a tailored model and a clear path to scale.',
  formHeading: 'Get In Touch Today!',
  contactMethods: [
    { label: 'UK', value: siteConfig.phones.uk, url: `tel:${siteConfig.phones.uk}` },
    { label: 'US', value: siteConfig.phones.us, url: `tel:${siteConfig.phones.us}` },
    { label: 'AUS', value: siteConfig.phones.aus, url: `tel:${siteConfig.phones.aus}` },
  ],
}

const fallbackContactPage: PageContent = {
  title: 'Contact',
  slug: 'contact',
  seo: {
    metaTitle: 'Contact INFE Talent',
    metaDescription:
      'Contact INFE Talent to discuss offshore recruitment support, sourcing teams, and scalable staffing delivery models.',
  },
  layout: [contactBlockFallback],
}

const globalLocations = [
  {
    country: 'UK',
    address: ['Old Church House, Sandy Lane,', 'Crawley Down West Sussex,', 'RH104HS, UK'],
    phone: siteConfig.phones.uk,
    email: siteConfig.contactEmail,
  },
  {
    country: 'US',
    address: ['919 North Market Street,', 'Suite 950 Wilmington,', 'Delaware 19801'],
    phone: siteConfig.phones.us,
    email: siteConfig.contactEmail,
  },
  {
    country: 'Australia',
    address: ['PO Box 287,', 'Claremont WA 6910,', 'Australia'],
    phone: siteConfig.phones.aus,
    email: siteConfig.contactEmail,
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getPageBySlug('contact')) || fallbackContactPage

  return buildMetadata(page, '/contact')
}

export default async function ContactPage() {
  const page = (await getPageBySlug('contact')) || fallbackContactPage
  const contactBlock = getContactBlock(page)

  return (
    <div className="page-contact">
      <ContactSection block={contactBlock} isHomepage className="contact-hero-section contact-form-section" />
      <GlobalPresenceSection />
      <JoinTeamSection />
      <PageStructuredData page={page} path="/contact" />
    </div>
  )
}

function GlobalPresenceSection() {
  return (
    <section className="border-t border-[#CCCCCC] bg-[#FFF8EE] py-[84px] text-[#151515] lg:pb-[120px] lg:pt-[132px] contact-info-section contact-map-section">
      <Container className="max-w-[1500px] px-[24px] lg:px-[0px]">
        <h2 className="heading-section relative inline-block text-[42px] font-[800] leading-[54px] tracking-[0px] text-[#000000] md:text-[50px] md:leading-[66px]">
          <span className="relative z-[1]">Our Global Presence</span>
          <span className="absolute bottom-[7px] left-[84px] hidden h-[18px] w-[373px] bg-[#FCE88B] md:block" aria-hidden="true" />
        </h2>

        <div className="mt-[62px] grid border border-[#CCCCCC] md:grid-cols-3 lg:min-h-[370px]">
          {globalLocations.map((location) => (
            <article key={location.country} className="border-b border-[#CCCCCC] px-[40px] py-[48px] md:border-b-[0px] md:border-r md:px-[60px] md:py-[68px] last:border-b-[0px] md:last:border-r-[0px]">
              <h3 className="text-[28px] font-[800] leading-[38px] tracking-[0px] text-[#151515]">{location.country}</h3>
              <div className="mt-[15px] space-y-[0px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555]">
                {location.address.map((line) => (
                  <p key={`${location.country}-${line}`}>{line}</p>
                ))}
              </div>
              <div className="mt-[49px] space-y-[22px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555]">
                <p>{location.phone}</p>
                <a href={`mailto:${location.email}`} className="inline-flex transition hover:text-[#2C368D]">
                  {location.email}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

function JoinTeamSection() {
  return (
    <section className="bg-[linear-gradient(108deg,#050948_0%,#121967_56%,#243C91_100%)] py-[84px] text-[#FFFFFF] lg:h-[812px] lg:py-[0px] contact-cta-section">
      <Container className="grid max-w-[1500px] items-center gap-[56px] px-[24px] lg:h-full lg:grid-cols-[692px_675px] lg:gap-[133px] lg:px-[0px]">
        <div className="grid gap-[24px] md:grid-cols-[236px_204px_204px] md:grid-rows-[188px_194px_154px] lg:h-[566px]">
          <div className="flex h-[188px] flex-col justify-center bg-[#FCA62B] px-[33px] text-[#000000]">
            <p className="text-[50px] font-[800] leading-[60px] tracking-[0px]">20+</p>
            <p className="mt-[4px] text-[16px] font-[800] leading-[24px] tracking-[0px]">Years of Experience</p>
          </div>
          <ImagePanel className="h-[260px] md:col-start-1 md:row-span-2 md:row-start-2 md:h-full" src={figmaAssets.avatarOne} alt="INFE Talent team member" />
          <ImagePanel className="h-[260px] md:col-start-2 md:row-span-2 md:row-start-1 md:h-full" src={figmaAssets.heroInterview} alt="Recruitment specialist meeting candidates" />
          <ImagePanel className="h-[260px] md:col-start-3 md:row-span-2 md:row-start-1 md:h-full" src={figmaAssets.aboutOfficeSide} alt="INFE Talent advisor" />
          <div className="flex min-h-[154px] items-center gap-[28px] bg-[#242E8F] px-[35px] md:col-span-2 md:col-start-2 md:row-start-3">
            <div>
              <p className="text-[50px] font-[800] leading-[60px] tracking-[0px]">3000+</p>
              <p className="mt-[3px] text-[16px] font-[700] leading-[24px] tracking-[0px]">Professionals Joined</p>
            </div>
            <div className="hidden -space-x-[10px] sm:flex">
              {[figmaAssets.avatarOne, figmaAssets.profileCard, figmaAssets.aboutOfficeSide, figmaAssets.heroInterview].map((image, index) => (
                <span key={`${image}-${index}`} className="relative block size-[48px] overflow-hidden rounded-full border-[3px] border-[#FFFFFF]">
                  <OptimizedImage src={image} altFallback="Professional profile" sizes="48px" className="object-cover" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[650px]">
          <h2 className="heading-section relative max-w-[620px] text-[42px] font-[800] leading-[54px] tracking-[0px] text-[#FFFFFF] md:text-[50px] md:leading-[66px]">
            <span className="relative z-[1]">Looking To Join Our Global Team?</span>
            <span className="absolute bottom-[10px] left-[0px] h-[13px] w-[306px] bg-[#A08E3E]" aria-hidden="true" />
          </h2>
          <p className="mt-[25px] max-w-[650px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#FFFFFF]/82">
            We are always searching for ambitious, globally-minded professionals to join our state-of-the-art delivery centers. If you are passionate about talent acquisition and want to build a rewarding career with an industry leader, let&apos;s grow together.
          </p>
          <Button href="/careers" className="mt-[38px] h-[50px] border-[0px] bg-[#FCA62B] px-[25px] text-[14px] font-[700] leading-[24px] tracking-[0.84px] text-[#262164] hover:bg-[#FCA62B]/90">
            Explore Career Opportunities
          </Button>
        </div>
      </Container>
    </section>
  )
}

function ImagePanel({ alt, className, src }: { alt: string; className?: string; src: string }) {
  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <OptimizedImage src={src} altFallback={alt} sizes="(min-width: 1024px) 236px, 100vw" className="object-cover" />
    </div>
  )
}

function getContactBlock(page: PageContent): Extract<PageBlock, { blockType: 'contact' }> {
  const block = page.layout?.find((item): item is Extract<PageBlock, { blockType: 'contact' }> => item.blockType === 'contact')
  const contactMethods = block?.contactMethods?.filter((method) => ['UK', 'US', 'AUS'].includes((method.label || '').toUpperCase()))

  return {
    ...contactBlockFallback,
    ...block,
    eyebrow: block?.eyebrow || contactBlockFallback.eyebrow,
    contactMethods: contactMethods?.length ? contactMethods : contactBlockFallback.contactMethods,
  }
}
