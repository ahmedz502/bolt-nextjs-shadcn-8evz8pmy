import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import { CONFIG } from '@/config'

export const runtime = 'edge'

async function* makeTextFileLineIterator(fileId: string) {
  const mockFileContent = `AI technology
Machine learning
Data science`
  const lines = mockFileContent.split('\n')

  for (const line of lines) {
    yield line.trim()
  }
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 3, backoff = 300) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response
    } catch (error) {
      console.error(`Fetch attempt ${i + 1} failed:`, error)
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, backoff))
      backoff *= 2
    }
  }
  throw new Error(`Failed to fetch after ${retries} attempts`)
}

async function scrapeGoogleSearch(keyword: string) {
  const searchUrl = `${CONFIG.SEARCH_URL}?q=${encodeURIComponent(keyword)}`
  const options = {
    headers: {
      'User-Agent': CONFIG.USER_AGENT
    }
  }

  try {
    const response = await fetchWithRetry(searchUrl, options)
    const html = await response.text()
    const $ = cheerio.load(html)
    
    const results = []
    $('.g').each((index, element) => {
      if (index < CONFIG.MAX_RESULTS) {
        const title = $(element).find('h3').text()
        const url = $(element).find('a').attr('href')
        if (title && url) {
          results.push({
            keyword,
            rank: index + 1,
            title,
            url
          })
        }
      }
    })

    if (results.length === 0) {
      throw new Error('No search results found')
    }

    return results
  } catch (error) {
    console.error(`Error scraping for keyword "${keyword}":`, error)
    throw error // Re-throw the error to be caught by the caller
  }
}

export async function POST(req: NextRequest) {
  const { fileId } = await req.json()

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let keywordCount = 0
        let processedCount = 0

        for await (const _ of makeTextFileLineIterator(fileId)) {
          keywordCount++
        }

        for await (const keyword of makeTextFileLineIterator(fileId)) {
          if (keyword) {
            try {
              const results = await scrapeGoogleSearch(keyword)
              for (const result of results) {
                controller.enqueue(encoder.encode(JSON.stringify({ result }) + '\n'))
              }
            } catch (error) {
              console.error(`Error processing keyword "${keyword}":`, error)
              controller.enqueue(encoder.encode(JSON.stringify({ 
                error: error instanceof Error ? error.message : 'Unknown error', 
                keyword 
              }) + '\n'))
            }
            processedCount++
            const progress = Math.round((processedCount / keywordCount) * 100)
            controller.enqueue(encoder.encode(JSON.stringify({ progress }) + '\n'))
          }
        }
      } catch (error) {
        console.error('Stream error:', error)
        controller.enqueue(encoder.encode(JSON.stringify({ 
          error: `An error occurred during scraping: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }) + '\n'))
      } finally {
        controller.close()
      }
    }
  })

  return new NextResponse(stream)
}

