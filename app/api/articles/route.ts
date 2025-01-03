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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate the request body
    const validatedData = articleSchema.parse(body)

    // In a real application, you would save this data to your database
    // For now, we'll just log it and return a success response
    console.log('New article:', validatedData)

    // Generate a mock ID and slug
    const id = Math.random().toString(36).substr(2, 9)
    const slug = validatedData.title.toLowerCase().replace(/\s+/g, '-')

    return NextResponse.json({ 
      message: 'Article created successfully',
      article: {
        id,
        slug,
        ...validatedData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

