import type { Access, CollectionConfig } from 'payload'

import { authenticated } from '@/payload/access'

const authenticatedOrFirstUser: Access = async ({ req }) => {
  if (req.user) {
    return true
  }

  const users = await req.payload.find({
    collection: 'users',
    limit: 0,
    pagination: false,
  })

  return users.totalDocs === 0
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  access: {
    create: authenticatedOrFirstUser,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      required: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
    },
  ],
}
