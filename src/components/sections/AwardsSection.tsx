import Image from 'next/image'

import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'
import { resolveMediaAlt, resolveMediaUrl } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type AwardsBlock = Extract<PageBlock, { blockType: 'awards' }>

export function AwardsSection({ block, isHomepage = false }: { block: AwardsBlock; isHomepage?: boolean }) {
  return (
    <section className={isHomepage ? 'bg-[#fff8ee] py-[80px] lg:py-[120px]' : 'bg-[#FFF8EE] py-[48px] md:py-[64px]'}>
      <div className={cn('mx-auto px-5 2xl:px-0', isHomepage ? 'max-w-[1500px] px-[24px] lg:px-[0px]' : 'max-w-[1500px]')}>
        {isHomepage ? (
          <AwardsHomeHeader title={block.heading} description={block.description} />
        ) : (
          <SectionHeading title={block.heading} description={block.description} className="mb-10" />
        )}
        <div className="grid gap-0 border-l border-t border-[#CCCCCC] sm:grid-cols-2 lg:grid-cols-5">
          {block.items?.map((award) => (
            <article key={award.title} className={cn('group flex flex-col items-center border-b border-r  border-[#CCCCCC] text-center transition duration-300', isHomepage ? 'min-h-[320px] bg-[#FFF8EE] px-[24px] pb-[31px] pt-[24px] hover:bg-[#F2F2F2] lg:h-[384.5px]' : 'min-h-[250px] px-5 py-7')}>
              <div className={isHomepage ? 'relative h-[220.5px] w-[214.75px] overflow-hidden' : 'relative size-[112px]'}>
                <Image src={resolveMediaUrl(award.image)} alt={resolveMediaAlt(award.image, award.title)} fill sizes={isHomepage ? '215px' : '112px'} className="object-contain transition duration-300 group-hover:scale-[1.04]" />
              </div>
              <p className={isHomepage ? 'mt-[32px] max-w-[252px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555] transition duration-300 group-hover:text-[#151515]' : 'mt-6 text-body12 leading-[18px] text-neutral-muted md:text-body14 md:leading-[22px]'}>{award.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AwardsHomeHeader({ title, description }: { title?: string; description?: string }) {
  const words = title?.trim().split(/\s+/) || []
  const lastWord = words.pop()
  const leadingWords = words.join(' ')

  return (
    <div className="mb-[64px] max-w-[595px]">
      {title ? (
        <h2 className="text-[50px] font-[800] leading-[66px] tracking-[-1.5px] text-[#000000]">
          {leadingWords ? `${leadingWords} ` : null}
          <span className="relative inline-block">
            <span className="relative z-[1]">{lastWord}</span>
            <span className="absolute bottom-[0px] left-[0px] z-0 h-[23px] w-full bg-gradient-to-t from-[rgba(251,223,45,0.4)] from-[40%] to-[rgba(251,223,45,0)] to-[40%]" aria-hidden="true" />
          </span>
        </h2>
      ) : null}
      {description ? <p className="mt-[16px] max-w-[595px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555]">{description}</p> : null}
    </div>
  )
}
