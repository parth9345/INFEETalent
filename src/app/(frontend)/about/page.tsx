import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CMSPage } from '@/components/pages/CMSPage'
import { getPageBySlug } from '@/lib/payload-queries'
import { buildMetadata } from '@/lib/seo'
import type { PageBlock, PageContent } from '@/types/content'

export const revalidate = 60

const aboutAdvantageBlock: Extract<PageBlock, { blockType: 'advantage' }> = {
  id: 'about-advantage-static',
  blockType: 'advantage',
  heading: 'The INFE Talent Advantage',
  highlight: 'Advantage',
  description:
    'Lorem ipsum dolor sit amet consectetur. Sit habitant interdum dolor scelerisque viverra sed adipiscing. Feugiat viverra libero faucibus platea adipiscing id imperdiet diam.',
  items: [
    {
      icon: 'Headset',
      title: '24/7 Global Operations',
      description: 'Uninterrupted service delivery across time zones to accelerate your hiring cycle.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Strict Compliance',
      description: 'Fully GDPR, HIPAA, and ISO compliant, ensuring absolute data security for US and UK markets.',
    },
    {
      icon: 'Users',
      title: 'Scalable Dedicated Teams',
      description: 'Interview, select, and scale your own dedicated offshore recruiters and sourcers.',
    },
    {
      icon: 'Briefcase',
      title: 'Industry Expertise',
      description: 'Specialized domain knowledge across Healthcare, IT, Engineering, Finance, and Manufacturing.',
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about')

  if (!page) {
    notFound()
  }

  return buildMetadata(page, '/about')
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')

  if (!page) {
    notFound()
  }

  return <CMSPage page={withAboutAdvantage(page)} slug="about" />
}

function withAboutAdvantage(page: PageContent): PageContent {
  const layout = page.layout || []
  const advantageBlock =
    layout.find((block): block is Extract<PageBlock, { blockType: 'advantage' }> => block.blockType === 'advantage' && !block.settings?.hideBlock) ||
    aboutAdvantageBlock
  const layoutWithoutAdvantage = layout.filter((block) => block.blockType !== 'advantage')

  const awardsIndex = layoutWithoutAdvantage.findIndex((block) => block.blockType === 'awards')
  const testimonialsIndex = layoutWithoutAdvantage.findIndex((block) => block.blockType === 'testimonials')
  const contactIndex = layoutWithoutAdvantage.findIndex((block) => block.blockType === 'contact')
  const insertIndex =
    awardsIndex >= 0
      ? awardsIndex + 1
      : testimonialsIndex >= 0
        ? testimonialsIndex + 1
        : contactIndex >= 0
          ? contactIndex
          : layoutWithoutAdvantage.length

  return {
    ...page,
    layout: [...layoutWithoutAdvantage.slice(0, insertIndex), advantageBlock, ...layoutWithoutAdvantage.slice(insertIndex)],
  }
}
