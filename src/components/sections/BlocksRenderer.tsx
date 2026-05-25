import { AboutSection } from './AboutSection'
import { AdvantageSection } from './AdvantageSection'
import { AwardsSection } from './AwardsSection'
import { CertificationsSection } from './CertificationsSection'
import { CareerSection } from './CareerSection'
import { ContactSection } from './ContactSection'
import { CTASection } from './CTASection'
import { FAQSection } from './FAQSection'
import { HeroSection } from './HeroSection'
import { IndustriesSection } from './IndustriesSection'
import { InsightsSection } from './InsightsSection'
import { ServicesGridSection } from './ServicesGridSection'
import { StatsStrip } from './StatsStrip'
import { TeamSection } from './TeamSection'
import { TestimonialsSection } from './TestimonialsSection'
import type { PageBlock } from '@/types/content'

type BlocksRendererProps = {
  blocks?: PageBlock[]
  variant?: 'default' | 'home' | 'about'
}

export function BlocksRenderer({ blocks, variant = 'default' }: BlocksRendererProps) {
  if (!blocks?.length) {
    return null
  }

  const isHome = variant === 'home'
  const isAboutStyle = variant === 'home' || variant === 'about'

  return (
    <>
      {blocks.map((block, index) => {
        if (block.settings?.hideBlock) {
          return null
        }

        const key = block.id || `${block.blockType}-${index}`

        switch (block.blockType) {
          case 'hero':
            return <HeroSection key={key} block={block} />
          case 'statsStrip':
            return <StatsStrip key={key} block={block} isHomepage={isHome} />
          case 'contentImage':
            return <AboutSection key={key} block={block} isHomepage={isHome} />
          case 'servicesGrid':
            return <ServicesGridSection key={key} block={block} isHomepage={isHome} />
          case 'awards':
            return <AwardsSection key={key} block={block} isHomepage={isAboutStyle} />
          case 'certifications':
            return <CertificationsSection key={key} block={block} isHomepage={isAboutStyle} />
          case 'industries':
            return <IndustriesSection key={key} block={block} isHomepage={isAboutStyle} />
          case 'testimonials':
            return <TestimonialsSection key={key} block={block} isHomepage={isAboutStyle} />
          case 'cta':
            return <CTASection key={key} block={block} />
          case 'blogListing':
            return <InsightsSection key={key} block={block} isHomepage={isHome} />
          case 'team':
            return <TeamSection key={key} block={block} />
          case 'faq':
            return <FAQSection key={key} block={block} />
          case 'contact':
            return <ContactSection key={key} block={block} isHomepage={isAboutStyle} />
          case 'career':
            return <CareerSection key={key} block={block} />
          case 'advantage':
            return <AdvantageSection key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
