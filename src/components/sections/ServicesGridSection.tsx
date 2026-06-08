import { ServiceCard } from '@/components/cards/ServiceCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getServices } from '@/lib/payload-queries'
import { sectionClasses, sectionId } from '@/lib/sections'
import { cn, relationItems } from '@/lib/utils'
import type { PageBlock, ServiceItem } from '@/types/content'

type ServicesBlock = Extract<PageBlock, { blockType: 'servicesGrid' }>

export async function ServicesGridSection({ block, isHomepage = false, className }: { block: ServicesBlock; isHomepage?: boolean; className?: string }) {
  const selectedItems = relationItems<ServiceItem>(block.services)
  const targetCount = isHomepage ? 9 : undefined
  const items = await resolveServicesGridItems({
    selectedItems,
    selectionMode: block.selectionMode,
    targetCount,
  })
  const gridClass = isHomepage ? 'md:grid-cols-2 lg:grid-cols-3' : block.columns === '2' ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <section id={sectionId(block.settings)} className={cn(isHomepage ? 'bg-[#fff8ee] py-[10px] border-y border-[#CCCCCC] lg:py-[120px]' : sectionClasses(block.settings, { defaultBackground: 'cream' }), className)}>
      <Container className={isHomepage ? 'max-w-[1500px] px-[10px] lg:px-[0px]' : undefined}>
        {isHomepage ? (
          <div className="mb-[20px] lg:mb-[64px] w-full max-w-[764px] anim-fade-up anim-stagger-item">
            <h2 className="heading-section relative max-w-[575px] text-[50px] font-[800] capitalize leading-[66px] tracking-[-1.5px] text-[#000000]">
              <span className="relative z-[1]">{block.heading}</span>
              <span className="absolute bottom-[0px] left-[0px] z-0 h-[23px] w-full bg-gradient-to-t from-[rgba(251,223,45,0.4)] from-[40%] to-[rgba(251,223,45,0)] to-[40%]" aria-hidden="true" />
            </h2>
            {block.description ? <p className="mt-[16px] max-w-[764px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555]">{block.description}</p> : null}
          </div>
        ) : (
          <SectionHeader
            eyebrow={block.eyebrow}
            title={block.heading}
            description={block.description}
            className="mb-10 max-w-3xl"
          />
        )}
        {items.length ? (
          <div className={cn('grid border-l border-t border-[#CCCCCC]', gridClass, isHomepage && 'anim-fade-up anim-stagger-item anim-stagger-parent')}>
            {items.map((service) => (
              <ServiceCard
                key={service.slug || service.title}
                service={service}
                showIcon={isHomepage ? false : block.showIcons !== false}
                variant={isHomepage ? 'home' : 'default'}
                className={isHomepage ? 'anim-fade-up anim-stagger-item' : undefined}
              />
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

async function resolveServicesGridItems({
  selectedItems,
  selectionMode,
  targetCount,
}: {
  selectedItems: ServiceItem[]
  selectionMode?: 'manual' | 'latest'
  targetCount?: number
}) {
  if (selectionMode === 'latest' || selectedItems.length === 0) {
    return getServices(targetCount || 9)
  }

  if (!targetCount || selectedItems.length >= targetCount) {
    return selectedItems
  }

  const latestItems = await getServices(targetCount)
  const selectedKeys = new Set(selectedItems.map(serviceKey))
  const fillItems = latestItems.filter((service) => !selectedKeys.has(serviceKey(service)))

  return [...selectedItems, ...fillItems].slice(0, targetCount)
}

function serviceKey(service: ServiceItem) {
  return service.slug || String(service.id || service.title)
}
