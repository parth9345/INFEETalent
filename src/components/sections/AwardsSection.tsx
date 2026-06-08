import Image from 'next/image'

import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'
import { resolveMediaAlt, resolveMediaUrl } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type AwardsBlock = Extract<PageBlock, { blockType: 'awards' }>

export function AwardsSection({
  block,
  isHomepage = false,
  isAboutPage = false,
  className,
}: {
  block: AwardsBlock
  isHomepage?: boolean
  isAboutPage?: boolean
  className?: string
}) {
  const featureLayout = isHomepage || isAboutPage
  const shouldAnimate = typeof className === 'string' && className.includes('home-awards-section')

  return (
    <section className={cn(isAboutPage ? 'bg-[#fff8ee] py-[64px] md:py-[80px] xl:py-[120px]' : isHomepage ? 'bg-[#fff8ee] py-[10px] lg:py-[120px]' : 'bg-[#FFF8EE] py-[48px] md:py-[64px]', className)}>
      <div className={cn('mx-auto px-5 2xl:px-0', isAboutPage ? 'max-w-[1500px] px-[24px] 2xl:px-[0px]' : isHomepage ? 'max-w-[1500px] px-[24px] lg:px-[0px]' : 'max-w-[1500px]')}>
        {featureLayout ? (
          <AwardsHomeHeader title={block.heading} description={block.description} isAboutPage={isAboutPage} className={shouldAnimate ? 'anim-fade-up anim-stagger-item' : undefined} />
        ) : (
          <SectionHeading title={block.heading} description={block.description} className="mb-10" />
        )}
        <div className={cn('grid gap-0 border-l border-t border-[#CCCCCC] sm:grid-cols-2 lg:grid-cols-5', shouldAnimate && 'anim-fade-up anim-stagger-item anim-stagger-parent')}>
          {block.items?.map((award) => (
            <article key={award.title} className={cn('group flex flex-col items-center border-b border-r  border-[#CCCCCC] text-center transition duration-300', isAboutPage ? 'min-h-[300px] bg-[#FFF8EE] px-[20px] pb-[28px] pt-[24px] hover:bg-[#F2F2F2] md:min-h-[320px] xl:h-[384.5px] xl:px-[24px] xl:pb-[31px]' : isHomepage ? 'min-h-[320px] bg-[#FFF8EE] px-[24px] pb-[31px] pt-[24px] hover:bg-[#F2F2F2] lg:h-[384.5px]' : 'min-h-[250px] px-5 py-7', shouldAnimate && 'anim-scale-in anim-stagger-item')}>
              <div className={isAboutPage ? 'relative h-[120px] w-[min(214.75px,100%)] overflow-hidden xl:h-[220.5px]' : isHomepage ? 'relative h-[120px] w-[214.75px] overflow-hidden lg:h-[220.5px]' : 'relative size-[112px]'}>
                <Image src={resolveMediaUrl(award.image)} alt={resolveMediaAlt(award.image, award.title)} fill sizes={featureLayout ? '215px' : '112px'} className="object-contain transition duration-300 group-hover:scale-[1.04]" />
              </div>
              <p className={isAboutPage ? 'mt-[15px] max-w-[252px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555] transition duration-300 group-hover:text-[#151515] md:text-[18px] md:leading-[28px] xl:mt-[32px]' : isHomepage ? 'mt-[15px] max-w-[252px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555] transition duration-300 group-hover:text-[#151515] lg:mt-[32px]' : 'mt-6 text-body12 leading-[18px] text-neutral-muted md:text-body14 md:leading-[22px]'}>{award.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AwardsHomeHeader({ title, description, isAboutPage = false, className }: { title?: string; description?: string; isAboutPage?: boolean; className?: string }) {
  const words = title?.trim().split(/\s+/) || []
  const lastWord = words.pop()
  const leadingWords = words.join(' ')

  return (
    <div className={cn(isAboutPage ? 'mb-[28px] max-w-[595px] md:mb-[36px]' : 'mb-[20px] max-w-[595px]', className)}>
      {title ? (
        <h2 className={isAboutPage ? 'heading-section text-[36px] font-[800] leading-[46px] tracking-[0px] text-[#000000] md:text-[44px] md:leading-[58px] xl:text-[50px] xl:leading-[66px] xl:tracking-[-1.5px]' : 'heading-section text-[50px] font-[800] leading-[66px] tracking-[-1.5px] text-[#000000]'}>
          {leadingWords ? `${leadingWords} ` : null}
          <span className="relative inline-block">
            <span className="relative z-[1]">{lastWord}</span>
            <span className="absolute bottom-[0px] left-[0px] z-0 h-[23px] w-full bg-gradient-to-t from-[rgba(251,223,45,0.4)] from-[40%] to-[rgba(251,223,45,0)] to-[40%]" aria-hidden="true" />
          </span>
        </h2>
      ) : null}
      {description ? <p className={isAboutPage ? 'mt-[16px] max-w-[595px] text-[16px] font-[400] leading-[26px] tracking-[0px] text-[#555555] md:text-[18px] md:leading-[28px]' : 'mt-[16px] max-w-[595px] text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555]'}>{description}</p> : null}
    </div>
  )
}
