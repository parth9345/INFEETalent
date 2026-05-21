import type { Block } from 'payload'

import { sectionIntroFields, sectionSettingsField } from './shared'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials Blocks',
  },
  fields: [
    ...sectionIntroFields(),
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: {
        description: 'Select testimonials to feature. Leave empty to use featured testimonials.',
      },
    },
    {
      name: 'display',
      type: 'select',
      defaultValue: 'featured',
      options: [
        {
          label: 'Featured media grid',
          value: 'featured',
        },
        {
          label: 'Grid',
          value: 'grid',
        },
      ],
    },
    {
      name: 'featuredMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional image shown in the featured media grid layout.',
      },
    },
    {
      name: 'showRatings',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show ratings when available',
    },
    sectionSettingsField({ defaultBackground: 'blue', defaultSpacing: 'standard' }),
  ],
}
