import type { Block } from 'payload'

import { linkFields } from '@/globals/link'
import { sectionIntroFields, sectionSettingsField } from './shared'

export const BlogListingBlock: Block = {
  slug: 'blogListing',
  labels: {
    singular: 'Blog Listing',
    plural: 'Blog Listings',
  },
  fields: [
    ...sectionIntroFields(),
    {
      name: 'selectionMode',
      type: 'select',
      defaultValue: 'latest',
      options: [
        { label: 'Latest published posts', value: 'latest' },
        { label: 'Use selected posts', value: 'manual' },
      ],
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'blogs',
      hasMany: true,
      admin: {
        description: 'Select posts manually, or leave empty to show latest published posts.',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: {
        description: 'Maximum number of posts to render.',
      },
    },
    {
      name: 'showFeaturedImages',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show featured images',
    },
    {
      name: 'showExcerpts',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show excerpts',
    },
    linkFields('action', 'Footer action'),
    sectionSettingsField({ defaultBackground: 'cream', defaultSpacing: 'standard' }),
  ],
}
