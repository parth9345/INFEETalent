import { permanentRedirect } from 'next/navigation'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function LegacyInsightDetailPage({ params }: PageProps) {
  const { slug } = await params

  permanentRedirect(`/blogs/${slug}`)
}
