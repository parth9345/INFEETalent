import Image from 'next/image'
import { BadgeCheck } from 'lucide-react'

import { figmaAssets } from '@/lib/assets'
import { cn } from '@/lib/utils'
import type { PageBlock } from '@/types/content'

type CertificationsBlock = Extract<PageBlock, { blockType: 'certifications' }>

export function CertificationsSection({ block, isHomepage = false }: { block: CertificationsBlock; isHomepage?: boolean }) {
  if (isHomepage) {
    return (
      <section className="relative h-auto min-h-[542px] overflow-hidden bg-[#050946] py-[80px] text-[#FFFFFF] lg:h-[542px] lg:py-[120px]">
        <Image
          src={figmaAssets.certificationsBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="relative mx-auto grid max-w-[1500px] gap-[60px] px-[24px] lg:grid-cols-[572px_726px] lg:gap-[202px] lg:px-[0px]">
          <div className="min-w-0">
            <h2 className="heading-section text-[50px] font-[800] leading-[66px] tracking-[-1.5px] text-[#FFFFFF]">{block.heading}</h2>
            <div className="relative mt-[102px] h-[133.97px] w-[250px]" aria-hidden="true">
              <Image
                src={figmaAssets.certificationsLeftGif}
                alt=""
                width={250}
                height={134}
                sizes="250px"
                className="h-[133.97px] w-[250px] object-contain [image-rendering:-webkit-optimize-contrast]"
                unoptimized
              />
            </div>
          </div>
          <div className="grid self-start pt-[22px] sm:grid-cols-2 sm:gap-x-[36px] sm:gap-y-[48px] lg:gap-x-[72px] lg:gap-y-[48px]">
            {block.items?.map((item) => (
              <a key={item.label} href={item.url || '#'} className="group flex min-h-[34px] items-center gap-[18px] text-[22px] font-[600] leading-[34px] tracking-[-0.03em] text-[#FFFFFF] transition duration-300 hover:translate-x-[4px] hover:text-[#FCA62B]">
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
    <section className="relative overflow-hidden bg-brand-primary py-[48px] text-neutral-white md:py-[56px]">
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
