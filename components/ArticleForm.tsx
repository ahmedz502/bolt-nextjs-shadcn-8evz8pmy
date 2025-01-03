'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export function ArticleForm({ articleSlug }: { articleSlug?: string }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [tags, setTags] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (articleSlug) {
      // Fetch article data if editing an existing article
      fetchArticleData(articleSlug)
    }
  }, [articleSlug])

  const fetchArticleData = async (slug: string) => {
    try {
      const response = await fetch(`/api/articles/${slug}`)
      if (response.ok) {
        const article = await response.json()
        setTitle(article.title)
        setContent(article.content)
        setExcerpt(article.excerpt)
        setTags(article.tags.join(', '))
        setFeaturedImage(article.featuredImage)
      }
    } catch (error) {
      console.error('Error fetching article:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/articles${articleSlug ? `/${articleSlug}` : ''}`, {
        method: articleSlug ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          authorId: 'author1', // In a real app, this would be the logged-in user's ID
          tags: tags.split(',').map(tag => tag.trim()),
          featuredImage,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save article')
      }

      const data = await response.json()
      toast({
        title: 'Success',
        description: `Article ${articleSlug ? 'updated' : 'created'} successfully`,
      })
      router.push(`/articles/${data.article.slug}`)
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${articleSlug ? 'update' : 'create'} article. Please try again.`,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{articleSlug ? 'Edit' : 'Create New'} Article</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              required
            />
          </div>
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="featuredImage">Featured Image URL</Label>
            <Input
              id="featuredImage"
              type="url"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (articleSlug ? 'Update' : 'Create') + ' Article'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

