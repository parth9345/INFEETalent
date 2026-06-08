import * as Icons from 'lucide-react'
import { createElement, type ComponentType } from 'react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { figmaAssets } from '@/lib/assets'
import { cn } from '@/lib/utils'
import type { ServiceItem } from '@/types/content'

type IconComponent = ComponentType<{ size?: number; strokeWidth?: number; className?: string; 'aria-hidden'?: boolean }>

const iconFor = (name?: string): IconComponent => {
  const icon = name && (Icons as unknown as Record<string, IconComponent>)[name]

  return icon || Icons.CircleDot
}

type ServiceCardProps = {
  service: ServiceItem
  showIcon?: boolean
  showAction?: boolean
  className?: string
  variant?: 'default' | 'home'
}

export function ServiceCard({ service, showIcon = true, showAction = false, className, variant = 'default' }: ServiceCardProps) {
  const Icon = iconFor(service.icon)

  if (variant === 'home') {
    return (
      <article className={cn('group relative min-h-[200px] lg:min-h-[300px] overflow-hidden border-b border-r border-[#CCCCCC] bg-[#fff8ee] px-[15px] py-[15px] transition duration-300 hover:bg-[#151515] active:bg-[#151515] md:px-[48px] md:py-[56px] lg:h-[373px] lg:px-[60px] lg:pb-[60px] lg:pt-[67px]', className)}>
        <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <OptimizedImage
            src={figmaAssets.insights[2]}
            altFallback={service.title}
            sizes="(min-width: 1024px) 500px, 100vw"
            className="object-cover grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-[#000000] opacity-0 transition duration-300 group-hover:opacity-[0.58]" />
        <div className="relative z-[1]">
          {showIcon ? createElement(Icon, { className: 'mb-[24px] text-brand-primary transition duration-300 group-hover:text-[#FFFFFF]', size: 28, strokeWidth: 1.75, 'aria-hidden': true }) : null}
          <h3 className="break-words text-[18px] lg:text-[30px] font-[800] leading-[28px] lg:leading-[38px] tracking-[-0.9px] text-[#000000] transition duration-300 group-hover:text-[#FFFFFF]">{service.title}</h3>
          <p className="mt-[16px] max-w-[360px] break-words text-[18px] font-[400] leading-[28px] tracking-[0px] text-[#555555] transition duration-300 group-hover:text-[rgba(255,255,255,0.9)]">{service.summary}</p>
        </div>
      </article>
    )
  }

  return (
    <article className={cn('flex min-h-[170px] flex-col border-b border-r border-neutral-border bg-brand-background p-6 transition duration-300 hover:bg-neutral-white md:p-7', className)}>
      {showIcon ? createElement(Icon, { className: 'mb-6 text-brand-primary', size: 24, strokeWidth: 1.8, 'aria-hidden': true }) : null}
      <h3 className="break-words text-h6 font-extrabold text-neutral-dark md:text-h5">{service.title}</h3>
      <p className="mt-3 break-words text-body12 leading-[18px] text-neutral-muted md:text-body14 md:leading-[22px]">{service.summary}</p>
      {showAction && service.slug ? (
        <ButtonLink href={`/services/${service.slug}`} size="sm" className="mt-6 w-fit">
          Read More
        </ButtonLink>
      ) : null}
    </article>
  )
}
