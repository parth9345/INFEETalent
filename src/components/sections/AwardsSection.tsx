import Image from 'next/image'

import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'
import { resolveMediaAlt, resolveMediaUrl } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type AwardsBlock = Extract<PageBlock, { blockType: 'awards' }>

export function AwardsSection({ block, isHomepage = false }: { block: AwardsBlock; isHomepage?: boolean }) {
  return (
    <section className={isHomepage ? 'bg-brand-background py-[70px]' : 'bg-brand-background py-[48px] md:py-[64px]'}>
      <div className={cn('mx-auto px-5 2xl:px-0', isHomepage ? 'max-w-[1152px] px-[24px] lg:px-[0px]' : 'max-w-[1500px]')}>
        <SectionHeading
          title={block.heading}
          description={block.description}
          className={isHomepage ? 'mb-[36px] space-y-[13px]' : 'mb-10'}
          headingClassName={isHomepage ? 'text-h2 leading-[38px] tracking-[0px] md:text-h2' : undefined}
          descriptionClassName={isHomepage ? 'text-body14 leading-[22px] tracking-[0px] md:text-body14' : undefined}
        />
        <div className="grid gap-0 border-l border-t border-neutral-border sm:grid-cols-2 lg:grid-cols-5">
          {block.items?.map((award) => (
            <article key={award.title} className={cn('flex flex-col items-center border-b border-r border-neutral-border text-center', isHomepage ? 'min-h-[226px] px-[22px] py-[26px]' : 'min-h-[250px] px-5 py-7')}>
              <div className={isHomepage ? 'relative size-[88px]' : 'relative size-[112px]'}>
                <Image src={resolveMediaUrl(award.image)} alt={resolveMediaAlt(award.image, award.title)} fill sizes={isHomepage ? '88px' : '112px'} className="object-contain" />
              </div>
              <p className={isHomepage ? 'mt-[20px] text-body12 leading-[18px] tracking-[0px] text-neutral-muted' : 'mt-6 text-body12 leading-[18px] text-neutral-muted md:text-body14 md:leading-[22px]'}>{award.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
