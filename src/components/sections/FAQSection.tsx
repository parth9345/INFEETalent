import { Container } from '@/components/ui/Container'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getFAQs } from '@/lib/payload-queries'
import { sectionClasses, sectionId } from '@/lib/sections'
import { relationItems } from '@/lib/utils'
import type { FAQItem, PageBlock } from '@/types/content'

type FAQBlock = Extract<PageBlock, { blockType: 'faq' }>

export async function FAQSection({ block }: { block: FAQBlock }) {
  const selectedItems = relationItems<FAQItem>(block.items)
  const faqs = selectedItems.length ? selectedItems : await getFAQs(12)

  return (
    <section id={sectionId(block.settings)} className={sectionClasses(block.settings, { defaultBackground: 'cream' })}>
      <Container size="narrow">
        <SectionHeader eyebrow={block.eyebrow} title={block.heading} description={block.description} align="center" className="mb-12" />
        {faqs.length ? <FAQAccordion items={faqs} defaultOpenFirst={block.defaultOpenFirst !== false} /> : null}
      </Container>
    </section>
  )
}
