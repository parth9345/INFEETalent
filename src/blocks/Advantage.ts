import type { Block } from 'payload'

export const AdvantageBlock: Block = {
  slug: 'advantage',
  labels: {
    singular: 'Advantage Section',
    plural: 'Advantage Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description: 'Small uppercase label shown above the heading.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main section heading.',
      },
    },
    {
      name: 'highlight',
      type: 'text',
      admin: {
        description: 'Optional word or phrase within the heading to emphasize with a gradient underline.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional summary paragraph shown below the heading.',
        rows: 3,
      },
    },
    {
      name: 'items',
      type: 'array',
      maxRows: 8,
      admin: {
        description: 'Advantage cards. Each card has an icon, title, and description.',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name e.g. Globe, ShieldCheck, Users, Briefcase, Zap, Target.',
          },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}
