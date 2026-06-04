import { submitContact } from '@/app/(frontend)/actions'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type ContactFormProps = {
  heading?: string
  description?: string
  sourceOptions?: { label: string }[]
  className?: string
  variant?: 'default' | 'home' | 'about'
}

const defaultSourceOptions = [{ label: 'Website' }, { label: 'LinkedIn' }, { label: 'Referral' }, { label: 'Event' }]

export function ContactForm({ heading = 'Get in touch today!', description, sourceOptions, className, variant = 'default' }: ContactFormProps) {
  const options = sourceOptions?.length ? sourceOptions : defaultSourceOptions
  const isHome = variant === 'home'
  const isAbout = variant === 'about'
  const isFeature = isHome || isAbout

  return (
    <form action={submitContact} className={cn('bg-brand-primary text-neutral-white', isAbout ? 'bg-[linear-gradient(113deg,#050948_0%,#121967_58%,#243C91_100%)] p-[20px] md:p-[32px] xl:p-[40px]' : isHome ? 'min-h-[657px] bg-[linear-gradient(113deg,#050948_0%,#121967_58%,#243C91_100%)] p-[20px] lg:p-[40px]' : 'p-5 md:p-7', className)}>
      <h2 className={isAbout ? 'heading-section text-center text-[32px] font-[800] capitalize leading-[42px] tracking-[0px] text-[#FFFFFF] md:text-[36px] md:leading-[48px] xl:text-[40px] xl:leading-[55px] xl:tracking-[-1.2px]' : isHome ? 'heading-section text-center text-[40px] font-[800] capitalize leading-[55px] tracking-[-1.2px] text-[#FFFFFF]' : 'heading-section text-center text-h3 font-extrabold capitalize md:text-h2'}>{heading}</h2>
      {description ? <p className={isFeature ? 'mx-auto mt-[12px] max-w-xl text-center text-body14 leading-[22px] text-neutral-white/75' : 'mx-auto mt-3 max-w-xl text-center text-body12 leading-[18px] text-neutral-white/75 md:text-body14 md:leading-[22px]'}>{description}</p> : null}
      <div className={isAbout ? 'mt-[24px] grid gap-[20px] md:grid-cols-2 md:gap-x-[32px] md:gap-y-[24px]' : isHome ? 'mt-[24px] grid gap-[24px] md:grid-cols-2 md:gap-x-[32px]' : 'mt-6 grid gap-4 md:grid-cols-2'}>
        <Field name="fullName" label="Full name" placeholder="Full Name*" variant={variant} />
        <Field type="email" name="email" label="Email address" placeholder="Email address*" variant={variant} />
        <Field name="company" label="Company name" placeholder="Company name*" variant={variant} />
        <Field name="phone" label="Phone number" placeholder="Phone Number*" variant={variant} />
      </div>
      <select
        name="source"
        className={isFeature ? 'mt-[24px] h-[60px] w-full bg-[#FFFFFF]/[0.08] px-[24px] text-[16px] font-[400] leading-[28px] text-[#FFFFFF] outline-none transition placeholder:text-[#FFFFFF] focus:bg-[#FFFFFF]/[0.12]' : 'mt-4 h-11 w-full bg-neutral-white/10 px-4 text-body14 text-neutral-white outline-none transition placeholder:text-neutral-white/80 focus:bg-neutral-white/15'}
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
        rows={isFeature ? 6 : 5}
        className={isFeature ? 'mt-[24px] h-[172px] w-full resize-none bg-[#FFFFFF]/[0.08] px-[24px] py-[16px] text-[16px] font-[400] leading-[28px] text-[#FFFFFF] outline-none transition placeholder:text-[#FFFFFF] focus:bg-[#FFFFFF]/[0.12]' : 'mt-4 w-full resize-none bg-neutral-white/10 px-4 py-3 text-body14 text-neutral-white outline-none transition placeholder:text-neutral-white/80 focus:bg-neutral-white/15'}
      />
      <Button type="submit" size={isFeature ? 'md' : 'md'} className={isFeature ? 'mt-[24px] h-[50px] w-full border-[0px] bg-[#FCA62B] px-[0px] text-[14px] font-[700] leading-[24px] tracking-[0.84px] text-[#262164] hover:bg-[#FCA62B]' : 'mt-4 w-full'}>
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
  variant?: 'default' | 'home' | 'about'
}) {
  const isFeature = variant === 'home' || variant === 'about'

  return (
    <input
      required
      type={type}
      name={name}
      aria-label={label}
      placeholder={placeholder}
      className={isFeature ? 'h-[60px] bg-[#FFFFFF]/[0.08] px-[24px] text-[16px] font-[400] leading-[28px] text-[#FFFFFF] outline-none transition placeholder:text-[#FFFFFF] focus:bg-[#FFFFFF]/[0.12]' : 'h-11 bg-neutral-white/10 px-4 text-body14 text-neutral-white outline-none transition placeholder:text-neutral-white/80 focus:bg-neutral-white/15'}
    />
  )
}
