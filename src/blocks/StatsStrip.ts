import type { Block } from 'payload'

export const StatsStripBlock: Block = {
  slug: 'statsStrip',
  labels: {
    singular: 'Stats Strip',
    plural: 'Stats Strips',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'strip',
      options: [
        { label: 'Blue strip bar (homepage)', value: 'strip' },
        { label: 'Cards grid with icons', value: 'cards' },
      ],
      admin: {
        description: 'Strip renders as a compact blue bar. Cards renders as a cream section with icon cards.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Section heading shown above the cards. Only used in cards layout.',
        condition: (data) => data.layout === 'cards',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description below the heading. Only used in cards layout.',
        condition: (data) => data.layout === 'cards',
      },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      required: true,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name e.g. Globe, Users, Building2, MapPin, Star, ShieldCheck.',
          },
        },
      ],
    },
  ],
}
