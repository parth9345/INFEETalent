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
      name: 'highlight',
      type: 'text',
      admin: {
        description: 'Optional word or phrase within the heading to emphasize with a gradient underline.',
      },
    },
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
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description: 'Controls whether the image group appears before or after the text on desktop.',
      },
    },
    linkFields('action', 'Action'),
    linkFields('primaryAction', 'Primary action (dark variant)'),
    linkFields('secondaryAction', 'Secondary action (dark variant)'),
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      admin: {
        description: 'Optional stats shown as overlay badges on the image in the dark background variant.',
      },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'overlayCard',
      type: 'group',
      label: 'Image overlay card',
      admin: {
        description: 'Optional profile card displayed on the image in the dark background variant.',
      },
      fields: [
        { name: 'name', type: 'text' },
        { name: 'role', type: 'text' },
        { name: 'company', type: 'text' },
      ],
    },
    sectionSettingsField({ defaultBackground: 'soft', defaultSpacing: 'standard' }),
  ],
}
