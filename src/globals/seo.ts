import type { Field } from 'payload'

export const seoFields = (): Field[] => [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO',
    fields: [
      {
        name: 'metaTitle',
        type: 'text',
        maxLength: 70,
        admin: {
          description: 'Recommended length: 50-60 characters.',
        },
      },
      {
        name: 'metaDescription',
        type: 'textarea',
        maxLength: 170,
        admin: {
          description: 'Recommended length: 140-160 characters.',
        },
      },
      {
        name: 'keywords',
        type: 'array',
        fields: [
          {
            name: 'keyword',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        name: 'openGraphImage',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'canonicalUrl',
        type: 'text',
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  },
]
