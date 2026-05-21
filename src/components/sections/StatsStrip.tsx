import type { PageBlock } from '@/types/content'

type StatsBlock = Extract<PageBlock, { blockType: 'statsStrip' }>

export function StatsStrip({ block, isHomepage = false }: { block: StatsBlock; isHomepage?: boolean }) {
  if (isHomepage) {
    const itemPositions = ['lg:left-[140px]', 'lg:left-[578px]', 'lg:left-[1029px]', 'lg:left-[1520px]']

    return (
      <section className="bg-brand-primary text-neutral-white">
        <div className="mx-auto grid max-w-[1920px] grid-cols-2 gap-y-[20px] px-[24px] py-[24px] md:grid-cols-4 md:px-[40px] lg:relative lg:block lg:h-[146px] lg:px-[0px] lg:py-[0px]">
          {block.items?.map((item, index) => (
            <div
              key={`${item.value}-${item.label}`}
              className={`flex min-w-0 items-center gap-[10px] lg:absolute lg:top-[43px] lg:gap-[14px] ${itemPositions[index] || 'lg:left-[140px]'}`}
            >
              <strong className="shrink-0 text-[32px] font-[800] leading-[38px] tracking-[0px] md:text-[38px] md:leading-[46px] lg:text-[50px] lg:leading-[60px]">{item.value}</strong>
              <span className="min-w-0 text-[13px] font-[700] leading-[18px] tracking-[0px] md:text-[16px] md:leading-[22px] lg:text-[25px] lg:leading-[30px]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-brand-primary text-neutral-white">
      <div className="mx-auto grid max-w-[1920px] grid-cols-2 divide-x divide-white/20 md:grid-cols-4">
        {block.items?.map((item) => (
          <div key={`${item.value}-${item.label}`} className="flex h-[78px] items-center justify-center gap-2 px-4">
            <strong className="text-h3 font-extrabold md:text-h2">{item.value}</strong>
            <span className="text-body12 md:text-body14">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
