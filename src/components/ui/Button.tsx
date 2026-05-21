import Link from 'next/link'
import type { Route } from 'next'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'lg' | 'md' | 'sm'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-[2px] border-brand-accent bg-brand-accent text-neutral-black hover:border-brand-accent/85 hover:bg-brand-accent/85',
  secondary: 'border-[2px] border-brand-primary bg-transparent text-brand-primary hover:bg-brand-background',
}

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'h-[51px] px-[25px] text-button16 leading-[20px]',
  md: 'h-[50px] px-[24px] text-button14 leading-[18px]',
  sm: 'h-[40px] px-[18px] text-button12 leading-[16px]',
}

export const buttonClasses = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) =>
  cn(
    'inline-flex shrink-0 items-center justify-center gap-[8px] rounded-[0px] font-[700] uppercase tracking-[0.8px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

type ButtonBaseProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: never
    newTab?: never
  }

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> & {
    href: string
    newTab?: boolean | null
    disabled?: boolean
  }

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

const ButtonContent = ({ children, leftIcon, rightIcon }: Pick<ButtonBaseProps, 'children' | 'leftIcon' | 'rightIcon'>) => (
  <>
    {leftIcon ? (
      <span className="inline-flex size-[18px] shrink-0 items-center justify-center" aria-hidden="true">
        {leftIcon}
      </span>
    ) : null}
    <span>{children}</span>
    {rightIcon ? (
      <span className="inline-flex size-[18px] shrink-0 items-center justify-center" aria-hidden="true">
        {rightIcon}
      </span>
    ) : null}
  </>
)

export function Button(props: ButtonProps) {
  if ('href' in props && props.href) {
    const {
      href,
      newTab,
      disabled,
      children,
      className,
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      ...anchorProps
    } = props

    return (
      <Link
        href={href as Route}
        {...anchorProps}
        className={buttonClasses(variant, size, className)}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : anchorProps.tabIndex}
        target={newTab ? '_blank' : anchorProps.target}
        rel={newTab ? 'noopener noreferrer' : anchorProps.rel}
      >
        <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
          {children}
        </ButtonContent>
      </Link>
    )
  }

  const buttonInput = props as ButtonAsButtonProps
  const {
    type = 'button',
    children,
    className,
    variant = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    ...buttonProps
  } = buttonInput

  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...buttonProps}>
      <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </ButtonContent>
    </button>
  )
}
