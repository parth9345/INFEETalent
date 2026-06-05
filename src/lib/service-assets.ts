import type { MediaLike, ServiceItem } from '@/types/content'

const serviceImageByKey: Record<string, string> = {
  'database-management': '/media/Image (1).jpg',
  'market-mapping': '/media/Image (2).jpg',
  'lead-generation': '/media/Image (3).jpg',
  sourcing: '/media/Image (4).jpg',
  'credential-and-compliance-management': '/media/Image (5).jpg',
  'credential-compliance-management': '/media/Image (5).jpg',
  'staffing-solutions': '/media/Image (5).jpg',
  'onboarding-and-consultant-care': '/media/Image (6).jpg',
  'onboarding-consultant-care': '/media/Image (6).jpg',
  'payroll-management': '/media/Image (6).jpg',
  'full-cycle-recruitment': '/media/Image (7).jpg',
  'administrative-support': '/media/Image (8).jpg',
  'corporate-training': '/media/Image (8).jpg',
  'executive-search': '/media/Image (9).jpg',
  'executive-search-and-leadership-hiring': '/media/Image (9).jpg',
  'executive-search-leadership-hiring': '/media/Image (9).jpg',
}

export function getServicePresentationImage(service: ServiceItem): MediaLike {
  return serviceImageByKey[getServiceAssetKey(service)] || service.featuredImage
}

function getServiceAssetKey(service: ServiceItem) {
  return String(service.slug || service.title)
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
