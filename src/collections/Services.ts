import type { CollectionConfig } from 'payload'

import { linkFields } from '@/globals/link'
import { seoFields } from '@/globals/seo'
import { slugField } from '@/globals/slug'
import { authenticated, publishedOrAuthenticated } from '@/payload/access'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  access: {
    create: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name used by the frontend renderer.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits / specialisations',
      admin: {
        description: 'Short bullet points shown on listing rows and service detail pages.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'process',
      type: 'array',
      label: 'Process / steps',
      admin: {
        description: 'Optional service delivery steps shown on service detail pages.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Optional related services. If left empty, the frontend will show other services.',
      },
    },
    linkFields('cta', 'Service CTA'),
    ...seoFields(),
  ],
}
