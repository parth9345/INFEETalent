import type { Field } from 'payload'

export const linkFields = (name: string, label: string): Field => ({
  name,
  type: 'group',
  label,
  admin: {
    description: 'Optional call-to-action link. Leave blank to hide this button.',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      admin: {
        description: 'Button text shown to visitors.',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        description: 'Use a relative path like /contact, an anchor like #contact, or a full URL.',
      },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in a new tab',
      defaultValue: false,
    },
  ],
})
