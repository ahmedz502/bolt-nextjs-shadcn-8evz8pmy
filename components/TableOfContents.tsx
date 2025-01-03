import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  return (
    <Card className="mt-6 mb-6">
      <CardHeader>
        <CardTitle>Table of Contents</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <nav>
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id} style={{ marginLeft: `${(heading.level - 2) * 12}px` }}>
                  <Link
                    href={`#${heading.id}`}
                    className="text-sm hover:underline text-muted-foreground hover:text-foreground"
                  >
                    {heading.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

