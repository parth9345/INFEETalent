import { submitCareerApplication } from '@/app/(frontend)/actions'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type CareerFormProps = {
  careerId?: string | number
  heading?: string
  className?: string
}

export function CareerForm({ careerId, heading = 'Apply Now', className }: CareerFormProps) {
  return (
    <form id="apply" action={submitCareerApplication} className={cn('h-fit bg-neutral-white p-8 shadow-sm', className)}>
      <input type="hidden" name="careerId" value={careerId ? String(careerId) : ''} />
      <h2 className="mb-8 text-center text-h2 font-extrabold capitalize text-neutral-dark">{heading}</h2>
      <div className="grid gap-6">
        <input required name="fullName" aria-label="Full name" placeholder="Full Name*" className="h-[60px] border border-neutral-border px-6 text-body16" />
        <div className="grid gap-6 sm:grid-cols-2">
          <input required type="email" name="email" aria-label="Email" placeholder="Email*" className="h-[60px] border border-neutral-border px-6 text-body16" />
          <input required name="phone" aria-label="Phone" placeholder="Phone*" className="h-[60px] border border-neutral-border px-6 text-body16" />
        </div>
        <input name="currentLocation" aria-label="Current location" placeholder="Current Location" className="h-[60px] border border-neutral-border px-6 text-body16" />
        <input name="experience" aria-label="Experience" placeholder="Experience" className="h-[60px] border border-neutral-border px-6 text-body16" />
        <input name="portfolioUrl" aria-label="LinkedIn or portfolio URL" placeholder="LinkedIn / Portfolio URL" className="h-[60px] border border-neutral-border px-6 text-body16" />
        <label className="flex min-h-[60px] flex-col gap-2 border border-neutral-border px-6 py-4 text-body16 text-neutral-muted sm:flex-row sm:items-center sm:justify-between">
          Upload CV*
          <input required type="file" name="resume" accept=".pdf,.doc,.docx" className="text-body14" />
        </label>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}
