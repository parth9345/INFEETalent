import type { GlobalConfig } from 'payload'

import { seoFields } from '@/globals/seo'
import { authenticated } from '@/payload/access'

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
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'brandName',
              type: 'text',
              defaultValue: 'INFE Talent',
              required: true,
              admin: {
                description: 'Used as the site name in SEO fallbacks and image alt text.',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Legacy/shared logo fallback. Prefer the Header and Footer logo fields below.',
              },
            },
          ],
        },
        {
          label: 'Header',
          fields: [
            {
              name: 'header',
              type: 'group',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Logo shown in the website header.',
                  },
                },
                {
                  name: 'logoAlt',
                  type: 'text',
                  label: 'Logo alt text',
                  admin: {
                    description: 'Accessible text for the header logo. Example: INFE Talent.',
                  },
                },
                {
                  name: 'navigation',
                  type: 'array',
                  label: 'Header navigation links',
                  admin: {
                    description: 'Primary navigation shown in the desktop and mobile header.',
                  },
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                    {
                      name: 'newTab',
                      type: 'checkbox',
                      label: 'Open in new tab',
                      defaultValue: false,
                    },
                  ],
                },
                {
                  name: 'cta',
                  type: 'group',
                  label: 'Header CTA button',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: false,
                      label: 'Show CTA button',
                    },
                    { name: 'label', type: 'text' },
                    { name: 'url', type: 'text' },
                    {
                      name: 'variant',
                      type: 'select',
                      defaultValue: 'primary',
                      options: [
                        { label: 'Primary', value: 'primary' },
                        { label: 'Secondary', value: 'secondary' },
                      ],
                    },
                    {
                      name: 'newTab',
                      type: 'checkbox',
                      label: 'Open in new tab',
                      defaultValue: false,
                    },
                  ],
                },
                {
                  name: 'stickyEnabled',
                  type: 'checkbox',
                  label: 'Enable sticky header',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footer',
              type: 'group',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Optional footer logo if the footer layout uses a logo.',
                  },
                },
                {
                  name: 'logoAlt',
                  type: 'text',
                  label: 'Footer logo alt text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'Optional footer brand description.',
                    rows: 3,
                  },
                },
                {
                  name: 'navigationColumns',
                  type: 'array',
                  label: 'Footer navigation columns',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        { name: 'label', type: 'text', required: true },
                        { name: 'url', type: 'text', required: true },
                        {
                          name: 'newTab',
                          type: 'checkbox',
                          label: 'Open in new tab',
                          defaultValue: false,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'contact',
                  type: 'group',
                  label: 'Footer contact information',
                  fields: [
                    { name: 'email', type: 'email' },
                    { name: 'phone', type: 'text' },
                    { name: 'address', type: 'textarea' },
                    { name: 'ukPhone', type: 'text', label: 'UK phone' },
                    { name: 'usPhone', type: 'text', label: 'US phone' },
                    { name: 'ausPhone', type: 'text', label: 'AUS phone' },
                  ],
                },
                {
                  name: 'socialLinks',
                  type: 'array',
                  fields: [
                    { name: 'platformName', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                    {
                      name: 'iconName',
                      type: 'text',
                      admin: {
                        description: 'Optional icon key, e.g. linkedin, facebook, instagram.',
                      },
                    },
                    {
                      name: 'newTab',
                      type: 'checkbox',
                      label: 'Open in new tab',
                      defaultValue: true,
                    },
                  ],
                },
                {
                  name: 'cta',
                  type: 'group',
                  label: 'Footer CTA',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: false,
                      label: 'Show footer CTA',
                    },
                    { name: 'label', type: 'text' },
                    { name: 'url', type: 'text' },
                    {
                      name: 'variant',
                      type: 'select',
                      defaultValue: 'primary',
                      options: [
                        { label: 'Primary', value: 'primary' },
                        { label: 'Secondary', value: 'secondary' },
                      ],
                    },
                    {
                      name: 'newTab',
                      type: 'checkbox',
                      label: 'Open in new tab',
                      defaultValue: false,
                    },
                  ],
                },
                {
                  name: 'copyright',
                  type: 'text',
                  defaultValue: 'Copyright 2026 INFE Talent. All rights reserved.',
                },
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
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Legacy Fallbacks',
          fields: [
            {
              name: 'primaryNavigation',
              type: 'array',
              admin: {
                description: 'Legacy fallback. Header navigation uses Header > Header navigation links first.',
              },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'footerNavigation',
              type: 'array',
              admin: {
                description: 'Legacy fallback. Footer uses Footer > Footer navigation columns first.',
              },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab',
                  defaultValue: false,
                },
              ],
            },
            {
              name: 'copyright',
              type: 'text',
              defaultValue: 'Copyright 2026 INFE Talent. All rights reserved.',
              admin: {
                description: 'Legacy fallback. Footer copyright uses Footer > Copyright first.',
              },
            },
            {
              name: 'contact',
              type: 'group',
              admin: {
                description: 'Legacy fallback. Footer contact uses Footer > Contact first.',
              },
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
              admin: {
                description: 'Legacy/shared social links. Header icons use these if footer social links are empty.',
              },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
      ],
    },
    ...seoFields(),
  ],
}
