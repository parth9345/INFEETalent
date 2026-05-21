import type { Block } from 'payload'

export const CertificationsBlock: Block = {
  slug: 'certifications',
  labels: {
    singular: 'Certifications',
    plural: 'Certifications Blocks',
  },
  fields: [
    { name: 'heading', type: 'text', required: true },
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
