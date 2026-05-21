import type { GlobalConfig } from 'payload'

import { authenticated } from '@/payload/access'

import { seoFields } from '@/globals/seo'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'INFE Talent',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'primaryNavigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'footerNavigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'footerPartners',
      type: 'array',
      label: 'Footer partner / certification logos',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 INFE Talent. All rights reserved.',
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'officeAddress', type: 'textarea' },
        { name: 'ukPhone', type: 'text' },
        { name: 'usPhone', type: 'text' },
        { name: 'ausPhone', type: 'text' },
        { name: 'email', type: 'email' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    ...seoFields(),
  ],
}
