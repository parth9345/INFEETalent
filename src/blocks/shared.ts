import type { Field } from 'payload'

export const sectionIntroFields = ({
  headingLabel = 'Heading',
  includeDescription = true,
}: {
  headingLabel?: string
  includeDescription?: boolean
} = {}): Field[] => [
  {
    name: 'eyebrow',
    type: 'text',
    admin: {
      description: 'Optional short label shown above the heading.',
    },
  },
  {
    name: 'heading',
    type: 'text',
    label: headingLabel,
    required: true,
    admin: {
      description: 'Primary section heading. Keep it specific and search-friendly.',
    },
  },
  ...(includeDescription
    ? [
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Optional summary copy shown near the heading.',
            rows: 3,
          },
        } satisfies Field,
      ]
    : []),
]

export const sectionSettingsField = ({
  defaultBackground = 'cream',
  defaultSpacing = 'standard',
}: {
  defaultBackground?: 'cream' | 'soft' | 'white' | 'blue' | 'dark'
  defaultSpacing?: 'compact' | 'standard' | 'spacious'
} = {}): Field => ({
  name: 'settings',
  type: 'group',
  label: 'Display settings',
  admin: {
    description: 'Shared controls for editors. These do not change the main content.',
  },
  fields: [
    {
      name: 'adminTitle',
      type: 'text',
      label: 'Internal label',
      admin: {
        description: 'Shown only in Payload to help content teams identify this block.',
      },
    },
    {
      name: 'anchorId',
      type: 'text',
      label: 'Section anchor ID',
      admin: {
        description: 'Optional URL anchor such as contact or services. Use lowercase letters, numbers, and hyphens.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: defaultBackground,
      options: [
        { label: 'Cream', value: 'cream' },
        { label: 'Soft cream', value: 'soft' },
        { label: 'White', value: 'white' },
        { label: 'Blue', value: 'blue' },
        { label: 'Dark blue', value: 'dark' },
      ],
    },
    {
      name: 'spacing',
      type: 'select',
      defaultValue: defaultSpacing,
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Standard', value: 'standard' },
        { label: 'Spacious', value: 'spacious' },
      ],
    },
    {
      name: 'hideBlock',
      type: 'checkbox',
      label: 'Hide this block on the website',
      defaultValue: false,
    },
  ],
})
