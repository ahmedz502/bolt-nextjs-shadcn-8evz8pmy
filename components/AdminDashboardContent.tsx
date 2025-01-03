'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { PlusCircle, Edit, Trash } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Article {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export function AdminDashboardContent() {
  const [articles, setArticles] = useState<Article[]>([])
  const { isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login')
      return
    }

    // Fetch articles (mock data for now)
    const mockArticles: Article[] = [
      {
        id: '1',
        title: 'Getting Started with Next.js',
        content: 'Next.js is a powerful React framework...',
        createdAt: '2023-05-01',
        updatedAt: '2023-05-02',
      },
      {
        id: '2',
        title: 'The Benefits of Server-Side Rendering',
        content: 'Server-side rendering (SSR) is a technique...',
        createdAt: '2023-05-03',
        updatedAt: '2023-05-03',
      },
    ]
    setArticles(mockArticles)
  }, [isAdmin, router])

  const handleDelete = async (id: string) => {
    // In a real application, you would call your API to delete the article
    setArticles(articles.filter(article => article.id !== id))
  }

  if (!isAdmin) {
    return null // or a loading spinner
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Article Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <Link href="/admin/articles/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> New Article
            </Button>
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.createdAt}</TableCell>
                <TableCell>{article.updatedAt}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/admin/articles/${article.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(article.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

