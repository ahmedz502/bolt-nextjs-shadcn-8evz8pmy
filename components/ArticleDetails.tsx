'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Article } from "@/types/article"

export function ArticleDetails({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${slug}`)
        if (!response.ok) {
          throw new Error('Failed to fetch article')
        }
        const data = await response.json()
        setArticle(data)
      } catch (err) {
        setError('Error fetching article details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  const handleEdit = () => {
    router.push(`/admin/articles/${slug}/edit`)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(`/api/articles/${slug}`, {
          method: 'DELETE',
        })
        if (!response.ok) {
          throw new Error('Failed to delete article')
        }
        router.push('/admin/dashboard')
      } catch (err) {
        setError('Error deleting article')
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!article) {
    return <div>Article not found</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <strong>Excerpt:</strong> {article.excerpt}
        </div>
        <div className="mb-4">
          <strong>Content:</strong>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
        <div className="mb-4">
          <strong>Author:</strong> {article.author.name}
        </div>
        <div className="mb-4">
          <strong>Tags:</strong> {article.tags.join(', ')}
        </div>
        <div className="mb-4">
          <strong>Created:</strong> {new Date(article.createdAt).toLocaleString()}
        </div>
        <div className="mb-4">
          <strong>Updated:</strong> {new Date(article.updatedAt).toLocaleString()}
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete} variant="destructive">Delete</Button>
        </div>
      </CardContent>
    </Card>
  )
}

