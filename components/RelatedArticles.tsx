import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Article } from "@/types/article"

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {articles.map((article) => (
            <li key={article.id}>
              <Link href={`/articles/${article.slug}`} className="text-sm hover:underline">
                {article.title}
              </Link>
              <p className="text-xs text-gray-500">{article.excerpt}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

