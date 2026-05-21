import type { Block } from 'payload'

import { linkFields } from '@/globals/link'

export const IndustriesBlock: Block = {
  slug: 'industries',
  labels: {
    singular: 'Industries',
    plural: 'Industries Blocks',
  },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    linkFields('primaryAction', 'Primary action'),
    linkFields('secondaryAction', 'Secondary action'),
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
