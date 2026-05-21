import type { Field, FieldHook } from 'payload'

import { formatSlug } from '@/lib/slug'

const formatSlugHook =
  (sourceField: string): FieldHook =>
  ({ value, siblingData }) => {
    if (typeof value === 'string' && value.length > 0) {
      return formatSlug(value)
    }

    const sourceValue = siblingData?.[sourceField]

    if (typeof sourceValue === 'string') {
      return formatSlug(sourceValue)
    }

    return value
  }

export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [formatSlugHook(sourceField)],
  },
})
