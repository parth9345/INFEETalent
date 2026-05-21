import type { Block } from 'payload'

import { sectionIntroFields, sectionSettingsField } from './shared'

export const ContactBlock: Block = {
  slug: 'contact',
  labels: {
    singular: 'Contact',
    plural: 'Contact Blocks',
  },
  fields: [
    ...sectionIntroFields(),
    {
      name: 'formHeading',
      type: 'text',
      defaultValue: 'Get in touch today!',
      admin: {
        description: 'Heading shown above the contact form.',
      },
    },
    {
      name: 'formDescription',
      type: 'textarea',
      admin: {
        description: 'Optional helper copy shown inside the form.',
        rows: 2,
      },
    },
    {
      name: 'sourceOptions',
      type: 'array',
      label: 'Source dropdown options',
      admin: {
        description: 'Options shown in the "How did you hear about us?" dropdown.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [{ label: 'Website' }, { label: 'LinkedIn' }, { label: 'Referral' }, { label: 'Event' }],
    },
    {
      name: 'contactMethods',
      type: 'array',
      label: 'Contact details',
      admin: {
        description: 'Optional contact details shown beside the form.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Optional link, for example tel: or mailto:.',
          },
        },
      ],
    },
    {
      name: 'recipients',
      type: 'array',
      admin: {
        description: 'Internal notification recipients for future email workflows.',
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    sectionSettingsField({ defaultBackground: 'cream', defaultSpacing: 'standard' }),
  ],
}
