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
    <section id={sectionId(block.settings, 'contact')} className={isHomepage ? 'border-t border-[#CCCCCC]  py-[80px] lg:py-[120px]' : sectionClasses(block.settings, { defaultBackground: 'cream', className: 'border-t border-neutral-border' })}>
      <Container className={cn('grid', isHomepage ? 'max-w-[1500px] gap-[56px] px-[24px] lg:grid-cols-[726px_726px] lg:gap-[48px] lg:px-[0px]' : 'gap-10 lg:grid-cols-[1fr_520px]')}>
        <div className={cn('min-w-0 flex flex-col justify-between', isHomepage && 'min-h-[657px]')}>
          {isHomepage ? (
            <div className="max-w-[645px]">
              {block.eyebrow ? <p className="text-[12px] font-[800] uppercase leading-[16px] tracking-[8px] text-[#2C368D]">{block.eyebrow}</p> : null}
              <h2 className="heading-section relative mt-[16px] max-w-[645px] text-[50px] font-[800] capitalize leading-[66px] tracking-[-1.5px] text-[#000000]">
                <span className="relative z-[1]">{block.heading}</span>
                <span className="absolute bottom-[4px] left-[200px] z-0 hidden h-[23px] w-[307px] bg-gradient-to-t from-[rgba(251,223,45,0.4)] from-[40%] to-[rgba(251,223,45,0)] to-[40%] md:block" aria-hidden="true" />
              </h2>
            </div>
          ) : (
            <SectionHeader
              eyebrow={block.eyebrow}
              title={block.heading}
              description={block.description}
            />
          )}
          <div>
            {isHomepage && block.description ? <p className="max-w-[569px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555]">{block.description}</p> : null}
          <div className={isHomepage ? 'mt-[48px] space-y-[16px] text-[18px] font-[400] leading-[25px] tracking-[0px] text-[#151515]' : 'mt-10 space-y-2 text-body14 text-neutral-dark md:text-body16'}>
            {contactMethods.map((method) => (
              <p key={`${method.label}-${method.value}`}>
                <strong className={isHomepage ? 'text-[#262164]' : 'text-brand-primary'}>{method.label}:</strong>{' '}
                {method.url ? (
                  <a href={method.url} className={isHomepage ? 'hover:text-[#262164]' : 'hover:text-brand-primary'}>
                    {method.value}
                  </a>
                ) : (
                  method.value
                )}
              </p>
            ))}
          </div>
          </div>
        </div>
        <ContactForm heading={block.formHeading} description={block.formDescription} sourceOptions={block.sourceOptions} variant={isHomepage ? 'home' : 'default'} />
      </Container>
    </section>
  )
}
