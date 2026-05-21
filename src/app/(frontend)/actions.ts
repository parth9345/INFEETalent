'use server'

import { revalidatePath } from 'next/cache'

import { getPayload } from '@/payload/getPayload'

const requiredString = (formData: FormData, key: string) => {
  const value = formData.get(key)

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${key} is required`)
  }

  return value.trim()
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
      currentLocation: formData.get('currentLocation')?.toString().trim(),
      experience: formData.get('experience')?.toString().trim(),
      portfolioUrl: formData.get('portfolioUrl')?.toString().trim(),
      resume: resumeId,
      status: 'new',
    },
  })

  revalidatePath('/careers')
}
