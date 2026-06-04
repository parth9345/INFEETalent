import { ContactForm } from '@/components/forms/ContactForm'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { siteConfig } from '@/lib/site'
import { sectionClasses, sectionId } from '@/lib/sections'
import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type ContactBlock = Extract<PageBlock, { blockType: 'contact' }>

export function ContactSection({
  block,
  isHomepage = false,
  isAboutPage = false,
}: {
  block: ContactBlock
  isHomepage?: boolean
  isAboutPage?: boolean
}) {
  const contactMethods = block.contactMethods?.length
    ? block.contactMethods
    : [
        { label: 'UK', value: siteConfig.phones.uk, url: `tel:${siteConfig.phones.uk}` },
        { label: 'US', value: siteConfig.phones.us, url: `tel:${siteConfig.phones.us}` },
        { label: 'AUS', value: siteConfig.phones.aus, url: `tel:${siteConfig.phones.aus}` },
      ]

  const featureLayout = isHomepage || isAboutPage

  return (
    <section id={sectionId(block.settings, 'contact')} className={isAboutPage ? 'border-t border-[#CCCCCC] py-[64px] md:py-[80px] xl:py-[120px]' : isHomepage ? 'border-t border-[#CCCCCC]  py-[80px] lg:py-[120px]' : sectionClasses(block.settings, { defaultBackground: 'cream', className: 'border-t border-neutral-border' })}>
      <Container
        className={cn(
          'grid',
          isAboutPage
            ? 'max-w-[1500px] gap-[40px] px-[24px] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-[48px] xl:px-[24px] 2xl:px-[0px]'
            : isHomepage
              ? 'max-w-[1500px] gap-[56px] px-[10px] lg:grid-cols-[726px_726px] lg:gap-[48px] lg:px-[0px]'
              : 'gap-10 lg:grid-cols-[1fr_520px]',
        )}
      >
        <div className={cn('min-w-0 flex flex-col justify-between', isAboutPage ? 'min-h-0 xl:min-h-[657px]' : isHomepage && 'min-h-[425px] lg:min-h-[657px]')}>
          {featureLayout ? (
            <div className="max-w-[645px]">
              {block.eyebrow ? <p className="eyebrow-title text-[12px] font-[800] uppercase leading-[16px] tracking-[8px] text-[#2C368D]">{block.eyebrow}</p> : null}
              <h2 className={cn('heading-section relative mt-[16px] max-w-[645px] font-[800] capitalize text-[#000000]', isAboutPage ? 'text-[36px] leading-[46px] tracking-[0px] md:text-[44px] md:leading-[58px] xl:text-[50px] xl:leading-[66px] xl:tracking-[-1.5px]' : 'text-[50px] leading-[66px] tracking-[-1.5px]')}>
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
            {featureLayout && block.description ? <p className={isAboutPage ? 'max-w-[569px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555] md:text-[18px] md:leading-[28px]' : 'max-w-[569px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555]'}>{block.description}</p> : null}
          <div className={isAboutPage ? 'mt-[40px] space-y-[16px] text-[16px] font-[400] leading-[24px] tracking-[0px] text-[#151515] md:mt-[48px] md:text-[18px] md:leading-[25px]' : isHomepage ? 'mt-[48px] space-y-[16px] text-[18px] font-[400] leading-[25px] tracking-[0px] text-[#151515]' : 'mt-10 space-y-2 text-body14 text-neutral-dark md:text-body16'}>
            {contactMethods.map((method) => (
              <p key={`${method.label}-${method.value}`} className={isAboutPage ? 'break-words' : undefined}>
                <strong className={featureLayout ? 'text-[#262164]' : 'text-brand-primary'}>{method.label}:</strong>{' '}
                {method.url ? (
                  <a href={method.url} className={featureLayout ? 'hover:text-[#262164]' : 'hover:text-brand-primary'}>
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
        <ContactForm heading={block.formHeading} description={block.formDescription} sourceOptions={block.sourceOptions} variant={isAboutPage ? 'about' : isHomepage ? 'home' : 'default'} />
      </Container>
    </section>
  )
}
