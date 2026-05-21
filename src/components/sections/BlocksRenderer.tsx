import { AboutSection } from './AboutSection'
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
  variant?: 'default' | 'home'
}

export function BlocksRenderer({ blocks, variant = 'default' }: BlocksRendererProps) {
  if (!blocks?.length) {
    return null
  }

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
            return <StatsStrip key={key} block={block} isHomepage={variant === 'home'} />
          case 'contentImage':
            return <AboutSection key={key} block={block} isHomepage={variant === 'home'} />
          case 'servicesGrid':
            return <ServicesGridSection key={key} block={block} isHomepage={variant === 'home'} />
          case 'awards':
            return <AwardsSection key={key} block={block} isHomepage={variant === 'home'} />
          case 'certifications':
            return <CertificationsSection key={key} block={block} isHomepage={variant === 'home'} />
          case 'industries':
            return <IndustriesSection key={key} block={block} isHomepage={variant === 'home'} />
          case 'testimonials':
            return <TestimonialsSection key={key} block={block} isHomepage={variant === 'home'} />
          case 'cta':
            return <CTASection key={key} block={block} />
          case 'blogListing':
            return <InsightsSection key={key} block={block} isHomepage={variant === 'home'} />
          case 'team':
            return <TeamSection key={key} block={block} />
          case 'faq':
            return <FAQSection key={key} block={block} />
          case 'contact':
            return <ContactSection key={key} block={block} isHomepage={variant === 'home'} />
          case 'career':
            return <CareerSection key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
