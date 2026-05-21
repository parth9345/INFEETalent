import type { CollectionConfig } from 'payload'

import { seoFields } from '@/globals/seo'
import { slugField } from '@/globals/slug'
import { authenticated, publishedOrAuthenticated } from '@/payload/access'

export const Careers: CollectionConfig = {
  slug: 'careers',
  labels: {
    singular: 'Career',
    plural: 'Careers',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'employmentType', 'slug'],
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
      name: 'department',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'employmentType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Full-time',
          value: 'full-time',
        },
        {
          label: 'Part-time',
          value: 'part-time',
        },
        {
          label: 'Contract',
          value: 'contract',
        },
        {
          label: 'Internship',
          value: 'internship',
        },
      ],
    },
    {
      name: 'experience',
      type: 'text',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'jobDetails',
      type: 'array',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
      ],
    },
    ...seoFields(),
  ],
}
