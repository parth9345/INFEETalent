import type { Block } from 'payload'

import { linkFields } from '@/globals/link'
import { sectionSettingsField } from './shared'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'split',
      options: [
        { label: 'Split content and image', value: 'split' },
        { label: 'Centered content', value: 'centered' },
        { label: 'Text-only split (no image)', value: 'textOnly' },
        { label: 'Dark split with image collage', value: 'darkSplit' },
      ],
      admin: {
        description: 'Choose the hero composition. Split matches the primary Figma homepage layout.',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description: 'Small label shown above the main heading.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main H1 for the page. Use one clear, keyword-aware headline.',
      },
    },
    {
      name: 'highlight',
      type: 'text',
      admin: {
        description: 'Optional emphasized phrase displayed with the heading.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Concise supporting copy for the hero.',
        rows: 3,
      },
    },
    linkFields('primaryAction', 'Primary action'),
    linkFields('secondaryAction', 'Secondary action'),
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Right (default)', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
      admin: {
        description: 'Controls whether the image collage appears on the left or right. Only used by darkSplit variant.',
        condition: (data) => data.variant === 'darkSplit',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Primary hero image. Use descriptive alt text on the media item for SEO and accessibility.',
      },
    },
    {
      name: 'careerCollage',
      type: 'group',
      label: 'Career page collage images',
      admin: {
        description: 'Optional images used by the Careers listing page hero collage.',
      },
      fields: [
        {
          name: 'imageOne',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Left collage image on the Careers listing page.',
          },
        },
        {
          name: 'imageTwo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Middle collage image on the Careers listing page.',
          },
        },
        {
          name: 'imageThree',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Right collage image on the Careers listing page.',
          },
        },
      ],
    },
    {
      name: 'badgeLabel',
      type: 'text',
      defaultValue: 'Consultation Session',
      admin: {
        description: 'Small floating label used on the split hero visual.',
      },
    },
    {
      name: 'featureCard',
      type: 'group',
      label: 'Feature card',
      admin: {
        description: 'Optional floating profile card used on the split hero visual.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Nicky Williams',
        },
        {
          name: 'role',
          type: 'text',
          defaultValue: 'Full Stack Developer',
        },
        {
          name: 'primaryLabel',
          type: 'text',
          defaultValue: 'Online Session',
        },
        {
          name: 'primaryValue',
          type: 'text',
          defaultValue: '$3,000',
        },
        {
          name: 'secondaryLabel',
          type: 'text',
          defaultValue: 'Full Month',
        },
        {
          name: 'secondaryValue',
          type: 'text',
          defaultValue: '$60,000',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      admin: {
        description: 'Optional hero proof points. The first item is highlighted in the visual card.',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    sectionSettingsField({ defaultBackground: 'cream', defaultSpacing: 'standard' }),
  ],
}
