import { DashboardLayout } from '@/components/DashboardLayout'
import { ArticleForm } from '@/components/ArticleForm'

export default function EditArticlePage({ params }: { params: { slug: string } }) {
  return (
    <DashboardLayout>
      <ArticleForm articleSlug={params.slug} />
    </DashboardLayout>
  )
}

