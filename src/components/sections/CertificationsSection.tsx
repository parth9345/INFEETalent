import Image from 'next/image'
import { BadgeCheck } from 'lucide-react'

import { DotLottieAnimation } from '@/components/ui/DotLottieAnimation'
import { figmaAssets } from '@/lib/assets'
import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type CertificationsBlock = Extract<PageBlock, { blockType: 'certifications' }>

export function CertificationsSection({
  block,
  isHomepage = false,
  isAboutPage = false,
  className,
}: {
  block: CertificationsBlock
  isHomepage?: boolean
  isAboutPage?: boolean
  className?: string
}) {
  const shouldAnimate = typeof className === 'string' && className.includes('home-certifications-section')

  if (isHomepage) {
    return (
      <section className={cn(isAboutPage ? 'relative h-auto min-h-[542px] overflow-hidden bg-[#050946] py-[64px] text-[#FFFFFF] md:py-[80px] xl:py-[120px]' : 'relative h-auto min-h-[542px] overflow-hidden bg-[#050946] py-[80px] text-[#FFFFFF] lg:h-[542px] lg:py-[120px]', className)}>
        <Image
          src={figmaAssets.certificationsBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className={cn(isAboutPage ? 'relative mx-auto grid max-w-[1500px] gap-[48px] px-[24px] xl:grid-cols-[minmax(0,572px)_minmax(0,726px)] xl:justify-between xl:gap-[48px] 2xl:gap-[202px] 2xl:px-[0px]' : 'relative mx-auto grid max-w-[1500px] gap-[60px] px-[24px] lg:grid-cols-[572px_726px] lg:gap-[202px] lg:px-[0px]', shouldAnimate && 'anim-stagger-parent')}>
          <div className={cn('min-w-0', shouldAnimate && 'anim-fade-right anim-stagger-item')}>
            <h2 className={isAboutPage ? 'heading-section text-[36px] font-[800] leading-[46px] tracking-[0px] text-[#FFFFFF] md:text-[44px] md:leading-[58px] xl:text-[50px] xl:leading-[66px] xl:tracking-[-1.5px]' : 'heading-section text-[50px] font-[800] leading-[66px] tracking-[-1.5px] text-[#FFFFFF]'}>{block.heading}</h2>
            <div className={isAboutPage ? 'relative mt-[48px] h-[300px] w-[300px] md:mt-[72px] xl:mt-[102px]' : 'relative mt-[20px] h-[300px] w-[300px]'} aria-hidden="true">
              <DotLottieAnimation className="h-[300px] w-[300px]" />
            </div>
          </div>
          <div className={cn(isAboutPage ? 'grid gap-y-[24px] self-start pt-[0px] sm:grid-cols-2 sm:gap-x-[36px] sm:gap-y-[40px] xl:gap-x-[72px] xl:gap-y-[48px] xl:pt-[22px]' : 'grid self-start pt-[22px] sm:grid-cols-2 sm:gap-x-[36px] sm:gap-y-[48px] lg:gap-x-[72px] lg:gap-y-[48px]', shouldAnimate && 'anim-fade-left anim-stagger-item anim-stagger-parent')}>
            {block.items?.map((item) => (
              <a key={item.label} href={item.url || '#'} className={cn(isAboutPage ? 'group flex min-h-[34px] items-center gap-[18px] text-[18px] font-[600] leading-[28px] tracking-[0px] text-[#FFFFFF] transition duration-300 hover:translate-x-[4px] hover:text-[#FCA62B] md:text-[20px] md:leading-[32px] xl:text-[22px] xl:leading-[34px] xl:tracking-[-0.03em]' : 'group flex min-h-[34px] items-center gap-[18px] text-[22px] font-[600] leading-[34px] tracking-[-0.03em] text-[#FFFFFF] transition duration-300 hover:translate-x-[4px] hover:text-[#FCA62B]', shouldAnimate && 'anim-fade-up anim-stagger-item')}>
                <BadgeCheck size={34} strokeWidth={1.8} className="shrink-0 text-[#FFFFFF] transition duration-300 group-hover:text-[#FCA62B]" aria-hidden="true" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('relative overflow-hidden bg-brand-primary py-[48px] text-neutral-white md:py-[56px]', className)}>
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 px-5 lg:grid-cols-[1fr_1.1fr] 2xl:px-0">
        <div>
          <h2 className="heading-section text-h2 font-extrabold leading-[38px] tracking-[0px]">
            {block.heading}
          </h2>
          <div className="mt-10 h-20 w-44 rounded-full border border-neutral-white/10 bg-neutral-white/5" />
        </div>
        <div className={cn('grid gap-x-12 gap-y-5 sm:grid-cols-2')}>
          {block.items?.map((item) => (
            <a key={item.label} href={item.url || '#'} className="flex items-center gap-3 text-link12 font-semibold md:text-link14">
              <BadgeCheck size={18} className="text-brand-accent" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
