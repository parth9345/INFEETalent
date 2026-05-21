import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ContainerProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  size?: 'narrow' | 'default' | 'wide' | 'full'
  as?: 'div' | 'nav' | 'section'
}

const sizeClass = {
  narrow: 'max-w-[1000px]',
  default: 'max-w-[1200px]',
  wide: 'max-w-[1500px]',
  full: 'max-w-[1920px]',
} as const

export function Container({ children, className, size = 'wide', as: Component = 'div', ...props }: ContainerProps) {
  return (
    <Component className={cn('mx-auto w-full px-5 2xl:px-0', sizeClass[size], className)} {...props}>
      {children}
    </Component>
  )
}
