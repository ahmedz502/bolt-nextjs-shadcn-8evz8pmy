import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Define a schema for article validation
const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  authorId: z.string().min(1, "Author ID is required"),
  tags: z.array(z.string()),
  featuredImage: z.string().url("Featured image must be a valid URL"),
})

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  // In a real application, you would fetch the article from your database
  // For now, we'll return mock data
  const article = {
    id: "1",
    title: "Understanding the Power of Next.js",
    content: "Next.js is a powerful React framework...",
    excerpt: "Discover the key features and benefits of using Next.js for your web development projects.",
    author: {
      id: "author1",
      name: "Jane Doe",
      bio: "Experienced web developer and tech writer",
      avatarUrl: "/placeholder.svg?height=400&width=400",
    },
    tags: ["Next.js", "React", "Web Development"],
    featuredImage: "/placeholder.svg?height=600&width=1200",
    slug: params.slug,
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2023-06-05T00:00:00Z",
  }

  if (article.slug !== params.slug) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json(article)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json()
    
    // Validate the request body
    const validatedData = articleSchema.parse(body)

    // In a real application, you would update the article in your database
    // For now, we'll just log it and return a success response
    console.log('Updated article:', { ...validatedData, slug: params.slug })

    return NextResponse.json({ 
      message: 'Article updated successfully',
      article: {
        ...validatedData,
        id: "1", // In a real app, this would be the actual article ID
        slug: params.slug,
        updatedAt: new Date().toISOString(),
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  // In a real application, you would delete the article from your database
  // For now, we'll just return a success response
  console.log('Deleted article with slug:', params.slug)

  return NextResponse.json({ message: 'Article deleted successfully' })
}

