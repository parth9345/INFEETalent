import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { Button, type ButtonSize, type ButtonVariant } from './Button'

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  children?: ReactNode
  label?: string | null
  newTab?: boolean | null
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function ButtonLink({ href, children, className, label, newTab, variant = 'primary', size = 'md', disabled, leftIcon, rightIcon, ...props }: ButtonLinkProps) {
  const content = children || label

  if (!content) {
    return null
  }

  return (
    <Button
      href={href}
      className={className}
      variant={variant}
      size={size}
      newTab={newTab}
      disabled={disabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      {...props}
    >
      {content}
    </Button>
  )
}
