import type { CollectionConfig } from 'payload'

import { blocks } from '@/blocks'
import { seoFields } from '@/globals/seo'
import { slugField } from '@/globals/slug'
import { authenticated, publishedOrAuthenticated } from '@/payload/access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    create: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'layout',
      type: 'blocks',
      blocks,
      required: true,
    },
    ...seoFields(),
  ],
}
