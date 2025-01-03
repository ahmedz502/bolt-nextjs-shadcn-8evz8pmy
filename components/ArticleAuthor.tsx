import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Author } from "@/types/article"

interface ArticleAuthorProps {
  author: Author;
}

export function ArticleAuthor({ author }: ArticleAuthorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Author</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={author.avatarUrl} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{author.name}</h3>
          <p className="text-sm text-gray-500">{author.bio}</p>
        </div>
      </CardContent>
    </Card>
  )
}

