'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getPayload } from '@/payload/getPayload'

const requiredString = (formData: FormData, key: string) => {
  const value = formData.get(key)

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${key} is required`)
  }

  return value.trim()
}

const optionalString = (formData: FormData, key: string) => {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return undefined
  }

  const trimmed = value.trim()

  return trimmed.length ? trimmed : undefined
}

export async function submitContact(formData: FormData) {
  const payload = await getPayload()

  await payload.create({
    collection: 'contact-submissions',
    data: {
      fullName: requiredString(formData, 'fullName'),
      email: requiredString(formData, 'email'),
      company: requiredString(formData, 'company'),
      phone: requiredString(formData, 'phone'),
      source: formData.get('source')?.toString().trim(),
      message: formData.get('message')?.toString().trim(),
      status: 'new',
    },
  })

  revalidatePath('/')
  redirect('/thank-you')
}

export async function submitCareerApplication(formData: FormData) {
  const payload = await getPayload()
  const careerId = formData.get('careerId')?.toString()
  const resume = formData.get('resume')
  let resumeId: number | undefined

  if (resume instanceof File && resume.size > 0) {
    const buffer = Buffer.from(await resume.arrayBuffer())
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: resume.name,
      },
      file: {
        data: buffer,
        mimetype: resume.type || 'application/octet-stream',
        name: resume.name,
        size: resume.size,
      },
    })
    resumeId = media.id
  }

  await payload.create({
    collection: 'career-applications',
    data: {
      career: careerId ? Number(careerId) : undefined,
      fullName: requiredString(formData, 'fullName'),
      email: requiredString(formData, 'email'),
      phone: requiredString(formData, 'phone'),
      positionAppliedFor: optionalString(formData, 'positionAppliedFor'),
      experience: optionalString(formData, 'experience'),
      currentSalary: optionalString(formData, 'currentSalary'),
      expectedSalary: optionalString(formData, 'expectedSalary'),
      noticePeriod: optionalString(formData, 'noticePeriod'),
      currentLocation: optionalString(formData, 'currentLocation'),
      portfolioUrl: optionalString(formData, 'portfolioUrl'),
      resume: resumeId,
      status: 'new',
    },
  })

  revalidatePath('/careers')
  redirect('/thank-you')
}
