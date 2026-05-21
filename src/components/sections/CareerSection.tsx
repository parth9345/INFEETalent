import { CareerList } from './CareerList'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getCareers } from '@/lib/payload-queries'
import { sectionClasses, sectionId } from '@/lib/sections'
import { relationItems } from '@/lib/utils'
import type { CareerItem, PageBlock } from '@/types/content'

type CareerBlock = Extract<PageBlock, { blockType: 'career' }>

export async function CareerSection({ block }: { block: CareerBlock }) {
  const selectedCareers = relationItems<CareerItem>(block.careers)
  const careers = selectedCareers.length ? selectedCareers : await getCareers(12)

  return (
    <section id={sectionId(block.settings)} className={sectionClasses(block.settings, { defaultBackground: 'cream' })}>
      <Container>
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeader eyebrow={block.eyebrow} title={block.heading} description={block.description} />
          {block.action?.url ? (
            <ButtonLink href={block.action.url} newTab={block.action.newTab} variant="secondary">
              {block.action.label || 'View All Roles'}
            </ButtonLink>
          ) : null}
        </div>
        <CareerList careers={careers} showFilters={block.showFilters !== false} emptyState={block.emptyState} />
      </Container>
    </section>
  )
}
