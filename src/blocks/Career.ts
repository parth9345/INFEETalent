import type { Block } from 'payload'

import { linkFields } from '@/globals/link'
import { sectionIntroFields, sectionSettingsField } from './shared'

export const CareerBlock: Block = {
  slug: 'career',
  labels: {
    singular: 'Career',
    plural: 'Career Blocks',
  },
  fields: [
    ...sectionIntroFields(),
    {
      name: 'selectionMode',
      type: 'select',
      defaultValue: 'latest',
      options: [
        { label: 'Latest published roles', value: 'latest' },
        { label: 'Use selected roles', value: 'manual' },
      ],
    },
    {
      name: 'careers',
      type: 'relationship',
      relationTo: 'careers',
      hasMany: true,
      admin: {
        description: 'Select roles manually, or leave empty to show latest published roles.',
      },
    },
    {
      name: 'showFilters',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show department and location filters',
    },
    {
      name: 'emptyState',
      type: 'textarea',
      defaultValue: 'We do not have open roles right now, but we are always interested in meeting talented people.',
      admin: {
        description: 'Message shown when there are no careers to display.',
        rows: 2,
      },
    },
    linkFields('action', 'Footer action'),
    sectionSettingsField({ defaultBackground: 'cream', defaultSpacing: 'standard' }),
  ],
}
