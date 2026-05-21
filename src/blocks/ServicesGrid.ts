import type { Block } from 'payload'

import { linkFields } from '@/globals/link'
import { sectionIntroFields, sectionSettingsField } from './shared'

export const ServicesGridBlock: Block = {
  slug: 'servicesGrid',
  labels: {
    singular: 'Services Grid',
    plural: 'Services Grids',
  },
  fields: [
    ...sectionIntroFields(),
    {
      name: 'selectionMode',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Use selected services', value: 'manual' },
        { label: 'Show latest published services', value: 'latest' },
      ],
      admin: {
        description: 'Latest mode is useful for evergreen service landing pages.',
      },
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Select services to feature. Leave empty when using latest mode.',
      },
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: 'Two columns', value: '2' },
        { label: 'Three columns', value: '3' },
      ],
    },
    {
      name: 'showIcons',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show service icons',
    },
    linkFields('action', 'Footer action'),
    sectionSettingsField({ defaultBackground: 'cream', defaultSpacing: 'standard' }),
  ],
}
