import type { CollectionConfig } from 'payload'

import { seoFields } from '@/globals/seo'
import { slugField } from '@/globals/slug'
import { authenticated, publishedOrAuthenticated } from '@/payload/access'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog',
    plural: 'Blogs',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'featured', 'slug'],
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'Offshore Strategy',
      admin: {
        description: 'Used for blog filters, cards, and detail metadata.',
        position: 'sidebar',
      },
    },
    {
      name: 'authorName',
      type: 'text',
      defaultValue: 'INFE Talent Team',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'authorImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional author portrait shown on blog detail pages.',
        position: 'sidebar',
      },
    },
    {
      name: 'readTime',
      type: 'text',
      admin: {
        description: 'Example: 5 min read.',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Featured posts are prioritized in the /blogs featured section.',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    ...seoFields(),
  ],
}
