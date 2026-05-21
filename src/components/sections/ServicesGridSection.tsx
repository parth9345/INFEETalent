import { ServiceCard } from '@/components/cards/ServiceCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getServices } from '@/lib/payload-queries'
import { sectionClasses, sectionId } from '@/lib/sections'
import { cn, relationItems } from '@/lib/utils'
import type { PageBlock, ServiceItem } from '@/types/content'

type ServicesBlock = Extract<PageBlock, { blockType: 'servicesGrid' }>

export async function ServicesGridSection({ block, isHomepage = false }: { block: ServicesBlock; isHomepage?: boolean }) {
  const selectedItems = relationItems<ServiceItem>(block.services)
  const items = selectedItems.length ? selectedItems : await getServices(9)
  const gridClass = block.columns === '2' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <section id={sectionId(block.settings)} className={isHomepage ? 'bg-brand-background py-[76px]' : sectionClasses(block.settings, { defaultBackground: 'cream' })}>
      <Container className={isHomepage ? 'max-w-[1152px] px-[24px] lg:px-[0px]' : undefined}>
        <SectionHeader
          eyebrow={block.eyebrow}
          title={block.heading}
          description={block.description}
          className={isHomepage ? 'mb-[42px] max-w-[690px] space-y-[14px]' : 'mb-10 max-w-3xl'}
          headingClassName={isHomepage ? 'max-w-[690px] text-h2 leading-[38px] tracking-[0px] md:text-h2' : undefined}
          descriptionClassName={isHomepage ? 'max-w-[690px] text-body14 leading-[22px] tracking-[0px] md:text-body14' : undefined}
        />
        {items.length ? (
          <div className={cn('grid border-l border-t border-neutral-border', gridClass)}>
            {items.map((service) => (
              <ServiceCard key={service.slug || service.title} service={service} showIcon={block.showIcons !== false} variant={isHomepage ? 'home' : 'default'} />
            ))}
          </div>
        ) : null}
        {block.action?.url ? (
          <div className={isHomepage ? 'mt-[36px]' : 'mt-10'}>
            <ButtonLink href={block.action.url} newTab={block.action.newTab} variant="secondary">
              {block.action.label || 'View Services'}
            </ButtonLink>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
