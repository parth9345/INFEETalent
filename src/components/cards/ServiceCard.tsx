import * as Icons from 'lucide-react'
import { createElement, type ComponentType } from 'react'

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
  className?: string
  variant?: 'default' | 'home'
}

export function ServiceCard({ service, showIcon = true, className, variant = 'default' }: ServiceCardProps) {
  const Icon = iconFor(service.icon)

  if (variant === 'home') {
    return (
      <article className={cn('min-h-[176px] border-b border-r border-neutral-border bg-brand-background px-[28px] pb-[25px] pt-[28px] transition duration-300 hover:bg-neutral-white', className)}>
        {showIcon ? createElement(Icon, { className: 'mb-[24px] text-brand-primary', size: 22, strokeWidth: 1.75, 'aria-hidden': true }) : null}
        <h3 className="break-words text-h5 font-extrabold leading-[26px] tracking-[0px] text-neutral-dark">{service.title}</h3>
        <p className="mt-[13px] break-words text-body14 leading-[22px] tracking-[0px] text-neutral-muted">{service.summary}</p>
      </article>
    )
  }

  return (
    <article className={cn('min-h-[170px] border-b border-r border-neutral-border bg-brand-background p-6 transition duration-300 hover:bg-neutral-white md:p-7', className)}>
      {showIcon ? createElement(Icon, { className: 'mb-6 text-brand-primary', size: 24, strokeWidth: 1.8, 'aria-hidden': true }) : null}
      <h3 className="break-words text-h6 font-extrabold text-neutral-dark md:text-h5">{service.title}</h3>
      <p className="mt-3 break-words text-body12 leading-[18px] text-neutral-muted md:text-body14 md:leading-[22px]">{service.summary}</p>
    </article>
  )
}
