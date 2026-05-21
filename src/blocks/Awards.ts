import type { Block } from 'payload'

export const AwardsBlock: Block = {
  slug: 'awards',
  labels: {
    singular: 'Awards',
    plural: 'Awards Blocks',
  },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
