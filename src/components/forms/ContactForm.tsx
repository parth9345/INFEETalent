import { submitContact } from '@/app/(frontend)/actions'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type ContactFormProps = {
  heading?: string
  description?: string
  sourceOptions?: { label: string }[]
  className?: string
  variant?: 'default' | 'home'
}

const defaultSourceOptions = [{ label: 'Website' }, { label: 'LinkedIn' }, { label: 'Referral' }, { label: 'Event' }]

export function ContactForm({ heading = 'Get in touch today!', description, sourceOptions, className, variant = 'default' }: ContactFormProps) {
  const options = sourceOptions?.length ? sourceOptions : defaultSourceOptions
  const isHome = variant === 'home'

  return (
    <form action={submitContact} className={cn('bg-brand-primary text-neutral-white', isHome ? 'p-[28px]' : 'p-5 md:p-7', className)}>
      <h2 className={isHome ? 'text-center text-h2 font-extrabold capitalize leading-[38px] tracking-[0px]' : 'text-center text-h3 font-extrabold capitalize md:text-h2'}>{heading}</h2>
      {description ? <p className={isHome ? 'mx-auto mt-[12px] max-w-xl text-center text-body14 leading-[22px] text-neutral-white/75' : 'mx-auto mt-3 max-w-xl text-center text-body12 leading-[18px] text-neutral-white/75 md:text-body14 md:leading-[22px]'}>{description}</p> : null}
      <div className={isHome ? 'mt-[28px] grid gap-[14px] md:grid-cols-2' : 'mt-6 grid gap-4 md:grid-cols-2'}>
        <Field name="fullName" label="Full name" placeholder="Full Name*" variant={variant} />
        <Field type="email" name="email" label="Email address" placeholder="Email address*" variant={variant} />
        <Field name="company" label="Company name" placeholder="Company name*" variant={variant} />
        <Field name="phone" label="Phone number" placeholder="Phone Number*" variant={variant} />
      </div>
      <select
        name="source"
        className={isHome ? 'mt-[14px] h-[42px] w-full bg-neutral-white/10 px-[16px] text-body14 leading-[22px] text-neutral-white outline-none transition placeholder:text-neutral-white/80 focus:bg-neutral-white/15' : 'mt-4 h-11 w-full bg-neutral-white/10 px-4 text-body14 text-neutral-white outline-none transition placeholder:text-neutral-white/80 focus:bg-neutral-white/15'}
        defaultValue=""
        aria-label="Communication channel"
      >
        <option value="" disabled className="text-neutral-dark">
          Which communication channel brought you here?
        </option>
        {options.map((option) => (
          <option key={option.label} className="text-neutral-dark">
            {option.label}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        aria-label="Message"
        placeholder="Message"
        rows={isHome ? 6 : 5}
        className={isHome ? 'mt-[14px] h-[128px] w-full resize-none bg-neutral-white/10 px-[16px] py-[14px] text-body14 leading-[22px] text-neutral-white outline-none transition placeholder:text-neutral-white/80 focus:bg-neutral-white/15' : 'mt-4 w-full resize-none bg-neutral-white/10 px-4 py-3 text-body14 text-neutral-white outline-none transition placeholder:text-neutral-white/80 focus:bg-neutral-white/15'}
      />
      <Button type="submit" size={isHome ? 'sm' : 'md'} className={isHome ? 'mt-[14px] w-full' : 'mt-4 w-full'}>
        Submit
      </Button>
    </form>
  )
}

function Field({
  name,
  label,
  placeholder,
  type = 'text',
  variant = 'default',
}: {
  name: string
  label: string
  placeholder: string
  type?: string
  variant?: 'default' | 'home'
}) {
  const isHome = variant === 'home'

  return (
    <input
      required
      type={type}
      name={name}
      aria-label={label}
      placeholder={placeholder}
      className={isHome ? 'h-[42px] bg-neutral-white/10 px-[16px] text-body14 leading-[22px] text-neutral-white outline-none transition placeholder:text-neutral-white/80 focus:bg-neutral-white/15' : 'h-11 bg-neutral-white/10 px-4 text-body14 text-neutral-white outline-none transition placeholder:text-neutral-white/80 focus:bg-neutral-white/15'}
    />
  )
}
