import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { fileId } = await req.json()

  const mockData = {
    'AI technology': [
      { keyword: 'AI technology', rank: 1, title: 'What is Artificial Intelligence (AI)?', url: 'https://www.example.com/ai-technology' },
      { keyword: 'AI technology', rank: 2, title: 'Top 10 AI Technologies in 2023', url: 'https://www.example.com/top-ai-tech' },
    ],
    'Machine learning': [
      { keyword: 'Machine learning', rank: 1, title: 'Introduction to Machine Learning', url: 'https://www.example.com/intro-ml' },
      { keyword: 'Machine learning', rank: 2, title: 'Machine Learning Applications', url: 'https://www.example.com/ml-apps' },
    ],
    'Data science': [
      { keyword: 'Data science', rank: 1, title: 'What is Data Science?', url: 'https://www.example.com/data-science' },
      { keyword: 'Data science', rank: 2, title: 'Data Science vs. Machine Learning', url: 'https://www.example.com/ds-vs-ml' },
    ],
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const keywords = Object.keys(mockData)
      for (let i = 0; i < keywords.length; i++) {
        const keyword = keywords[i]
        const results = mockData[keyword]
        for (const result of results) {
          controller.enqueue(encoder.encode(JSON.stringify({ result }) + '\n'))
        }
        const progress = Math.round(((i + 1) / keywords.length) * 100)
        controller.enqueue(encoder.encode(JSON.stringify({ progress }) + '\n'))
      }
      controller.close()
    }
  })

  return new NextResponse(stream)
}

