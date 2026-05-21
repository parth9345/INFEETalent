import type { Access } from 'payload'

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const publicRead: Access = () => true

export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
