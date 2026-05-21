import type { Block } from 'payload'

import { sectionIntroFields, sectionSettingsField } from './shared'

export const FAQBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ Blocks',
  },
  fields: [
    ...sectionIntroFields(),
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Optional category label used by editors to group FAQ sections.',
      },
    },
    {
      name: 'defaultOpenFirst',
      type: 'checkbox',
      defaultValue: true,
      label: 'Open the first question by default',
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      admin: {
        description: 'Select FAQs in the order they should appear. Leave empty to show published FAQs.',
      },
    },
    sectionSettingsField({ defaultBackground: 'cream', defaultSpacing: 'standard' }),
  ],
}
