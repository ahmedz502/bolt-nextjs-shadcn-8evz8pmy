import { DashboardLayout } from '@/components/DashboardLayout'
import { ArticleDetails } from '@/components/ArticleDetails'

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  return (
    <DashboardLayout>
      <ArticleDetails slug={params.slug} />
    </DashboardLayout>
  )
}

