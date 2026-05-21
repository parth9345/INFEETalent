import { ContactForm } from '@/components/forms/ContactForm'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { siteConfig } from '@/lib/site'
import { sectionClasses, sectionId } from '@/lib/sections'
import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type ContactBlock = Extract<PageBlock, { blockType: 'contact' }>

export function ContactSection({ block, isHomepage = false }: { block: ContactBlock; isHomepage?: boolean }) {
  const contactMethods = block.contactMethods?.length
    ? block.contactMethods
    : [
        { label: 'UK', value: siteConfig.phones.uk, url: `tel:${siteConfig.phones.uk}` },
        { label: 'US', value: siteConfig.phones.us, url: `tel:${siteConfig.phones.us}` },
        { label: 'AUS', value: siteConfig.phones.aus, url: `tel:${siteConfig.phones.aus}` },
      ]

  return (
    <section id={sectionId(block.settings, 'contact')} className={isHomepage ? 'border-t border-neutral-border bg-brand-background py-[70px]' : sectionClasses(block.settings, { defaultBackground: 'cream', className: 'border-t border-neutral-border' })}>
      <Container className={cn('grid', isHomepage ? 'max-w-[1152px] gap-[54px] px-[24px] lg:grid-cols-[584px_1fr] lg:gap-[98px] lg:px-[0px]' : 'gap-10 lg:grid-cols-[1fr_520px]')}>
        <div className="min-w-0 flex flex-col justify-between">
          <SectionHeader
            eyebrow={block.eyebrow}
            title={block.heading}
            description={block.description}
            className={isHomepage ? 'space-y-[14px]' : undefined}
            eyebrowClassName={isHomepage ? 'text-body12 leading-[18px] tracking-[3px]' : undefined}
            headingClassName={isHomepage ? 'max-w-[584px] text-h2 leading-[38px] tracking-[0px] md:text-h2' : undefined}
            descriptionClassName={isHomepage ? 'max-w-[560px] text-body14 leading-[22px] tracking-[0px] md:text-body14' : undefined}
          />
          <div className={isHomepage ? 'mt-[120px] space-y-[8px] text-body14 leading-[22px] tracking-[0px] text-neutral-dark' : 'mt-10 space-y-2 text-body14 text-neutral-dark md:text-body16'}>
            {contactMethods.map((method) => (
              <p key={`${method.label}-${method.value}`}>
                <strong className="text-brand-primary">{method.label}:</strong>{' '}
                {method.url ? (
                  <a href={method.url} className="hover:text-brand-primary">
                    {method.value}
                  </a>
                ) : (
                  method.value
                )}
              </p>
            ))}
          </div>
        </div>
        <ContactForm heading={block.formHeading} description={block.formDescription} sourceOptions={block.sourceOptions} variant={isHomepage ? 'home' : 'default'} />
      </Container>
    </section>
  )
}
