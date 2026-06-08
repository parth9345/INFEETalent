import { AboutSection } from './AboutSection'
import { AboutAdvantageSection } from './about/AboutAdvantageSection'
import { AboutBridgeSection } from './about/AboutBridgeSection'
import { AboutHeroIntroSection } from './about/AboutHeroIntroSection'
import { AboutPeopleSection } from './about/AboutPeopleSection'
import { AboutStatsSection } from './about/AboutStatsSection'
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
  const isAbout = variant === 'about'
  const isAboutStyle = variant === 'home' || variant === 'about'

  return (
    <>
      {blocks.map((block, index) => {
        if (block.settings?.hideBlock) {
          return null
        }

        const key = block.id || `${block.blockType}-${index}`
        const className = getSectionClassName(block, variant)

        switch (block.blockType) {
          case 'hero':
            if (variant === 'about' && block.variant === 'textOnly') {
              return <AboutHeroIntroSection key={key} block={block} className={className} />
            }

            if (variant === 'about' && block.variant === 'darkSplit') {
              return <AboutBridgeSection key={key} block={block} className={className} />
            }

            return <HeroSection key={key} block={block} className={className} />
          case 'statsStrip':
            if (variant === 'about' && block.layout === 'cards') {
              return <AboutStatsSection key={key} block={block} className={className} />
            }

            return <StatsStrip key={key} block={block} isHomepage={isHome} className={className} />
          case 'contentImage':
            if (variant === 'about' && block.settings?.background === 'blue') {
              return <AboutPeopleSection key={key} block={block} className={className} />
            }

            return <AboutSection key={key} block={block} isHomepage={isHome} className={className} />
          case 'servicesGrid':
            return <ServicesGridSection key={key} block={block} isHomepage={isHome} className={className} />
          case 'awards':
            return <AwardsSection key={key} block={block} isHomepage={isAboutStyle} isAboutPage={isAbout} className={className} />
          case 'certifications':
            return <CertificationsSection key={key} block={block} isHomepage={isAboutStyle} isAboutPage={isAbout} className={className} />
          case 'industries':
            return <IndustriesSection key={key} block={block} isHomepage={isAboutStyle} isAboutPage={isAbout} className={className} />
          case 'testimonials':
            return <TestimonialsSection key={key} block={block} isHomepage={isAboutStyle} isAboutPage={isAbout} className={className} />
          case 'cta':
            return <CTASection key={key} block={block} />
          case 'blogListing':
            return <InsightsSection key={key} block={block} isHomepage={isHome} className={className} />
          case 'team':
            return <TeamSection key={key} block={block} />
          case 'faq':
            return <FAQSection key={key} block={block} />
          case 'contact':
            return <ContactSection key={key} block={block} isHomepage={isAboutStyle} isAboutPage={isAbout} className={className} />
          case 'career':
            return <CareerSection key={key} block={block} />
          case 'advantage':
            if (variant === 'about') {
              return <AboutAdvantageSection key={key} block={block} className={className} />
            }

            return <AdvantageSection key={key} block={block} className={className} />
          default:
            return null
        }
      })}
    </>
  )
}

function getSectionClassName(block: PageBlock, variant: BlocksRendererProps['variant']) {
  if (variant === 'home') {
    switch (block.blockType) {
      case 'hero':
        return 'home-hero-section anim-fade-in anim-stagger-parent'
      case 'statsStrip':
        return 'home-impact-stats-section anim-fade-up anim-stagger-parent'
      case 'contentImage':
        return 'home-about-section anim-fade-up anim-stagger-parent'
      case 'servicesGrid':
        return 'home-services-section anim-fade-up anim-stagger-parent'
      case 'industries':
        return 'home-industries-section anim-fade-up anim-stagger-parent'
      case 'testimonials':
        return 'home-testimonials-section anim-fade-in anim-stagger-parent'
      case 'awards':
        return 'home-awards-section anim-fade-up anim-stagger-parent'
      case 'advantage':
        return 'home-advantage-section anim-fade-up anim-stagger-parent'
      case 'contact':
        return 'home-contact-section anim-fade-up anim-stagger-parent'
      case 'certifications':
        return 'home-certifications-section anim-fade-up anim-stagger-parent'
      case 'blogListing':
        return 'home-insights-section anim-fade-up anim-stagger-parent'
      default:
        return undefined
    }
  }

  if (variant === 'about') {
    switch (block.blockType) {
      case 'hero':
        return block.variant === 'darkSplit' ? 'about-bridge-section' : 'about-hero-section'
      case 'statsStrip':
        return 'about-impact-stats-section anim-full-section anim-fade-down'
      case 'contentImage':
        return block.settings?.background === 'blue' ? 'about-people-section' : undefined
      case 'industries':
        return 'about-recruitment-verticals-section'
      case 'testimonials':
        return 'about-testimonials-section anim-full-section anim-fade-up'
      case 'awards':
        return 'about-awards-section anim-full-section anim-fade-up'
      case 'advantage':
        return 'about-advantage-section anim-full-section anim-fade-up'
      case 'contact':
        return 'about-contact-section'
      case 'certifications':
        return 'about-certifications-section anim-full-section anim-fade-up'
      default:
        return undefined
    }
  }

  return undefined
}
