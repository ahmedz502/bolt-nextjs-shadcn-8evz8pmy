import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleAuthor } from "@/components/ArticleAuthor"
import { TableOfContents } from "@/components/TableOfContents"
import { RelatedArticles } from "@/components/RelatedArticles"
import { Article } from "@/types/article"

async function getArticle(slug: string): Promise<Article | null> {
  // In a real application, you would fetch the article from your API
  // For now, we'll return mock data
  const article: Article = {
    id: "1",
    title: "Understanding the Power of Next.js",
    content: `
      <h2 id="introduction">Introduction</h2>
      <p>Next.js is a powerful React framework that enables you to build server-side rendered and statically generated web applications. It provides a robust set of features out of the box, making it an excellent choice for developers looking to create performant and scalable web applications.</p>
      
      <h2 id="key-features">Key Features of Next.js</h2>
      <p>Next.js offers several key features that make it a popular choice among developers:</p>
      
      <h3 id="server-side-rendering">Server-Side Rendering (SSR)</h3>
      <p>One of the most significant features of Next.js is its built-in support for server-side rendering. SSR allows your pages to be rendered on the server, which can significantly improve the initial load time and SEO of your application.</p>
      
      <h3 id="static-site-generation">Static Site Generation (SSG)</h3>
      <p>Next.js also supports static site generation, allowing you to pre-render pages at build time. This can lead to extremely fast page loads and reduced server load, making it ideal for content-heavy websites.</p>
      
      <h2 id="conclusion">Conclusion</h2>
      <p>Next.js provides a robust framework for building modern web applications, offering a perfect balance between performance and developer experience. Whether you're building a small personal project or a large-scale application, Next.js has the tools and features to help you succeed.</p>
    `,
    excerpt: "Discover the key features and benefits of using Next.js for your web development projects.",
    author: {
      id: "author1",
      name: "Jane Doe",
      bio: "Experienced web developer and tech writer",
      avatarUrl: "/placeholder.svg?height=400&width=400",
    },
    createdAt: "2023-06-01",
    updatedAt: "2023-06-05",
    tags: ["Next.js", "React", "Web Development"],
    slug: "understanding-the-power-of-nextjs",
    featuredImage: "/placeholder.svg?height=600&width=1200",
  }

  return article.slug === slug ? article : null
}

async function getRelatedArticles(): Promise<Article[]> {
  // In a real application, you would fetch related articles from your API
  // For now, we'll return mock data
  return [
    {
      id: "2",
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and start building your first component.",
      slug: "getting-started-with-react",
      featuredImage: "/placeholder.svg?height=400&width=600",
    } as Article,
    {
      id: "3",
      title: "Advanced Next.js Techniques",
      excerpt: "Explore advanced features and optimizations in Next.js applications.",
      slug: "advanced-nextjs-techniques",
      featuredImage: "/placeholder.svg?height=400&width=600",
    } as Article,
  ]
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  const relatedArticles = await getRelatedArticles()

  if (!article) {
    notFound()
  }

  const headings = article.content.match(/<h[23][^>]*>(.*?)<\/h[23]>/g)?.map((heading) => {
    const level = heading.charAt(2)
    const text = heading.replace(/<[^>]+>/g, '')
    const id = text.toLowerCase().replace(/\s+/g, '-')
    return { id, text, level: parseInt(level) }
  }) || []

  const introductionEndIndex = article.content.indexOf('</p>', article.content.indexOf('<h2 id="introduction">')) + 4
  const introductionContent = article.content.slice(0, introductionEndIndex)
  const mainContent = article.content.slice(introductionEndIndex)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{article.title}</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>By {article.author.name}</span>
                <span>•</span>
                <span>Published on {new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  width={1200}
                  height={600}
                  className="rounded-lg"
                />
              </div>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: introductionContent }} />
              <TableOfContents headings={headings} />
              <div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: mainContent }} />
            </CardContent>
          </Card>
          <div className="mt-8">
            <ArticleAuthor author={article.author} />
          </div>
        </div>
        <div className="space-y-8">
          <RelatedArticles articles={relatedArticles} />
        </div>
      </div>
    </div>
  )
}

