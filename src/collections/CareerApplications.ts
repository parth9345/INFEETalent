import type { CollectionConfig } from 'payload'

import { authenticated } from '@/payload/access'

export const CareerApplications: CollectionConfig = {
  slug: 'career-applications',
  labels: {
    singular: 'Career Application',
    plural: 'Career Applications',
  },
  admin: {
    group: 'Forms',
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'career', 'createdAt'],
  },
  access: {
    create: () => true,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'career',
      type: 'relationship',
      relationTo: 'careers',
    },
    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'currentLocation', type: 'text' },
    { name: 'experience', type: 'text' },
    { name: 'portfolioUrl', type: 'text' },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
