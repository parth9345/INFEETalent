import type { Block } from 'payload'

import { linkFields } from '@/globals/link'
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
      name: 'joinTeam',
      type: 'group',
      label: 'Contact page join team section',
      admin: {
        description: 'Editable content for the blue "Looking To Join Our Global Team?" section on the Contact page.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show section',
          defaultValue: true,
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Looking To Join Our Global Team?',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            "We are always searching for ambitious, globally-minded professionals to join our state-of-the-art delivery centers. If you are passionate about talent acquisition and want to build a rewarding career with an industry leader, let's grow together.",
          admin: {
            rows: 3,
          },
        },
        linkFields('action', 'Action button'),
        {
          name: 'yearsStat',
          type: 'group',
          label: 'Years stat',
          fields: [
            {
              name: 'value',
              type: 'text',
              defaultValue: '20+',
            },
            {
              name: 'label',
              type: 'text',
              defaultValue: 'Years of Experience',
            },
          ],
        },
        {
          name: 'professionalsStat',
          type: 'group',
          label: 'Professionals stat',
          fields: [
            {
              name: 'value',
              type: 'text',
              defaultValue: '3000+',
            },
            {
              name: 'label',
              type: 'text',
              defaultValue: 'Professionals Joined',
            },
          ],
        },
        {
          name: 'images',
          type: 'group',
          label: 'Collage images',
          fields: [
            {
              name: 'portraitImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Left portrait image',
            },
            {
              name: 'interviewImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Middle interview image',
            },
            {
              name: 'advisorImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Right advisor image',
            },
          ],
        },
        {
          name: 'avatars',
          type: 'group',
          label: 'Professional avatar images',
          fields: [
            {
              name: 'avatarOne',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'avatarTwo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'avatarThree',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'avatarFour',
              type: 'upload',
              relationTo: 'media',
            },
          ],
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
