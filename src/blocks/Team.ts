import type { Block } from 'payload'

import { sectionIntroFields, sectionSettingsField } from './shared'

export const TeamBlock: Block = {
  slug: 'team',
  labels: {
    singular: 'Team',
    plural: 'Team Blocks',
  },
  fields: [
    ...sectionIntroFields(),
    {
      name: 'selectionMode',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Use selected team members', value: 'manual' },
        { label: 'Show ordered team members', value: 'latest' },
      ],
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      admin: {
        description: 'Select team members to feature. Leave empty to show ordered team members.',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Editorial row', value: 'editorial' },
      ],
    },
    {
      name: 'showBio',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show short bios',
    },
    sectionSettingsField({ defaultBackground: 'cream', defaultSpacing: 'standard' }),
  ],
}
