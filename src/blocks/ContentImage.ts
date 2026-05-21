import type { Block } from 'payload'

import { linkFields } from '@/globals/link'
import { sectionIntroFields, sectionSettingsField } from './shared'

export const ContentImageBlock: Block = {
  slug: 'contentImage',
  labels: {
    singular: 'Content / Image',
    plural: 'Content / Image Blocks',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'overlap',
      options: [
        { label: 'Overlapping image pair', value: 'overlap' },
        { label: 'Single image split', value: 'split' },
      ],
      admin: {
        description: 'Choose how the media should be composed beside the content.',
      },
    },
    ...sectionIntroFields({ includeDescription: false }),
    {
      name: 'body',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main body copy. Use short paragraphs and clear subtopics for scannability.',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Primary image. Add descriptive alt text on the media item.',
      },
    },
    {
      name: 'mediaSecondary',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional supporting image used by split image sections.',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      admin: {
        description: 'Controls whether the image group appears before or after the text on desktop.',
      },
    },
    linkFields('action', 'Action'),
    sectionSettingsField({ defaultBackground: 'soft', defaultSpacing: 'standard' }),
  ],
}
