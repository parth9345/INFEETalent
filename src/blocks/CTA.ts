import type { Block } from 'payload'

import { linkFields } from '@/globals/link'
import { sectionIntroFields, sectionSettingsField } from './shared'

export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA',
    plural: 'CTA Blocks',
  },
  fields: [
    ...sectionIntroFields(),
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'darkGradient',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Dark gradient',
          value: 'darkGradient',
        },
        {
          label: 'Bordered',
          value: 'bordered',
        },
      ],
      admin: {
        description: 'Dark gradient matches the primary contact CTA style from Figma.',
      },
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional supporting image for campaign CTAs.',
      },
    },
    linkFields('primaryAction', 'Primary action'),
    linkFields('secondaryAction', 'Secondary action'),
    sectionSettingsField({ defaultBackground: 'cream', defaultSpacing: 'standard' }),
  ],
}
