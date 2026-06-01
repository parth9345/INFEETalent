import { submitCareerApplication } from '@/app/(frontend)/actions'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type CareerFormProps = {
  careerId?: string | number
  careerTitle?: string
  heading?: string
  className?: string
}

export function CareerForm({ careerId, careerTitle = 'Selected Position', heading = 'Apply Now', className }: CareerFormProps) {
  return (
    <form
      id="apply"
      action={submitCareerApplication}
      className={cn(
        'h-fit bg-[linear-gradient(113deg,#050948_0%,#121967_58%,#243C91_100%)] px-[31px] pb-[33px] pt-[42px] text-[#FFFFFF]',
        className,
      )}
    >
      <input type="hidden" name="careerId" value={careerId ? String(careerId) : ''} />
      <h2 className="heading-section mb-[34px] text-center text-[40px] font-[800] capitalize leading-[55px] tracking-[-1.2px] text-[#FFFFFF]">{heading}</h2>
      <div className="grid gap-[24px]">
        <Field required name="fullName" label="Full name" placeholder="Full Name*" />
        <div className="grid gap-[24px] sm:grid-cols-2">
          <Field required name="phone" label="Phone number" placeholder="Phone Number*" />
          <Field required type="email" name="email" label="Email address" placeholder="Email address*" />
        </div>
        <SelectField name="positionAppliedFor" label="Position applied for" defaultValue={careerTitle} options={[careerTitle]} />
        <SelectField name="experience" label="Experience" defaultValue="" options={['0-1 Years', '1+ Years', '2+ Years', '3+ Years', '5+ Years']} placeholder="Experience*" />
        <div className="grid gap-[24px] sm:grid-cols-2">
          <Field name="currentSalary" label="Current salary" placeholder="Current Salary in LPA*" />
          <Field name="expectedSalary" label="Expected salary" placeholder="Expected Salary in LPA*" />
        </div>
        <SelectField name="noticePeriod" label="Notice period" defaultValue="" options={['Immediate', '15 Days', '30 Days', '60 Days', '90 Days']} placeholder="Notice Period*" />
        <label className="flex h-[60px] cursor-pointer items-center justify-between bg-[#FFFFFF]/[0.08] pl-[24px] text-[16px] font-[400] leading-[28px] text-[#FFFFFF] transition hover:bg-[#FFFFFF]/[0.12]">
          <span>Upload CV*</span>
          <span className="flex h-full w-[135px] items-center justify-center bg-[#FFFFFF]/[0.08] text-[14px] font-[400] leading-[20px] text-[#FFFFFF]">
            Choose File
          </span>
          <input required type="file" name="resume" accept=".pdf,.doc,.docx" className="sr-only" />
        </label>
        <Button type="submit" className="h-[50px] w-full border-[0px] bg-[#FCA62B] px-[0px] text-[12px] font-[800] leading-[16px] tracking-[0.48px] text-[#262164] hover:bg-[#FCA62B]/88">
          Submit
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  placeholder,
  required,
  type = 'text',
}: {
  label: string
  name: string
  placeholder: string
  required?: boolean
  type?: string
}) {
  return (
    <input
      required={required}
      type={type}
      name={name}
      aria-label={label}
      placeholder={placeholder}
      className="h-[60px] bg-[#FFFFFF]/[0.08] px-[24px] text-[16px] font-[400] leading-[28px] text-[#FFFFFF] outline-none transition placeholder:text-[#FFFFFF] focus:bg-[#FFFFFF]/[0.12]"
    />
  )
}

function SelectField({
  defaultValue,
  label,
  name,
  options,
  placeholder,
}: {
  defaultValue: string
  label: string
  name: string
  options: string[]
  placeholder?: string
}) {
  return (
    <select
      name={name}
      aria-label={label}
      defaultValue={defaultValue}
      className="h-[60px] bg-[#FFFFFF]/[0.08] px-[24px] text-[16px] font-[400] leading-[28px] text-[#FFFFFF] outline-none transition focus:bg-[#FFFFFF]/[0.12]"
    >
      {placeholder ? (
        <option value="" disabled className="text-[#151515]">
          {placeholder}
        </option>
      ) : null}
      {options.map((option) => (
        <option key={option} value={option} className="text-[#151515]">
          {option}
        </option>
      ))}
    </select>
  )
}
