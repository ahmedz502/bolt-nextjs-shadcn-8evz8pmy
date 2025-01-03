import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Article } from '@/types/article'

async function getArticles(): Promise<Article[]> {
  // In a real application, you would fetch articles from your API
  // For now, we'll return mock data
  return [
    {
      id: '1',
      title: 'Understanding the Power of Next.js',
      excerpt: 'Discover the key features and benefits of using Next.js for your web development projects.',
      author: {
        id: 'author1',
        name: 'Jane Doe',
        bio: 'Experienced web developer and tech writer',
        avatarUrl: '/placeholder.svg?height=400&width=400',
      },
      createdAt: '2023-06-01',
      updatedAt: '2023-06-05',
      tags: ['Next.js', 'React', 'Web Development'],
      slug: 'understanding-the-power-of-nextjs',
      featuredImage: '/placeholder.svg?height=400&width=600',
    },
    {
      id: '2',
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and start building your first component.',
      author: {
        id: 'author2',
        name: 'John Smith',
        bio: 'Frontend developer and React enthusiast',
        avatarUrl: '/placeholder.svg?height=400&width=400',
      },
      createdAt: '2023-05-15',
      updatedAt: '2023-05-20',
      tags: ['React', 'JavaScript', 'Frontend'],
      slug: 'getting-started-with-react',
      featuredImage: '/placeholder.svg?height=400&width=600',
    },
    {
      id: '3',
      title: 'Advanced Next.js Techniques',
      excerpt: 'Explore advanced features and optimizations in Next.js applications.',
      author: {
        id: 'author1',
        name: 'Jane Doe',
        bio: 'Experienced web developer and tech writer',
        avatarUrl: '/placeholder.svg?height=400&width=400',
      },
      createdAt: '2023-06-10',
      updatedAt: '2023-06-12',
      tags: ['Next.js', 'Performance', 'Advanced'],
      slug: 'advanced-nextjs-techniques',
      featuredImage: '/placeholder.svg?height=400&width=600',
    },
  ]
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="flex flex-col">
            <CardHeader className="p-0">
              <Image
                src={article.featuredImage}
                alt={article.title}
                width={600}
                height={400}
                className="rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="mb-2">
                <Link href={`/articles/${article.slug}`} className="hover:underline">
                  {article.title}
                </Link>
              </CardTitle>
              <p className="text-sm text-gray-500 mb-2">By {article.author.name}</p>
              <p className="text-sm mb-4">{article.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-sm text-gray-500">
              Published on {new Date(article.createdAt).toLocaleDateString()}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

