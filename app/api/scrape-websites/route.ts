import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export const runtime = 'edge'

async function* makeTextFileLineIterator(fileURL: string) {
  const utf8Decoder = new TextDecoder('utf-8')
  const response = await fetch(fileURL)
  const reader = response.body?.getReader()
  let { value: chunk, done: readerDone } = await reader!.read()
  chunk = chunk ? utf8Decoder.decode(chunk) : ''

  const re = /\n|\r|\r\n/gm
  let startIndex = 0

  for (;;) {
    const result = re.exec(chunk)
    if (!result) {
      if (readerDone) {
        break
      }
      const remainder = chunk.substr(startIndex)
      ({ value: chunk, done: readerDone } = await reader!.read())
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : '')
      startIndex = re.lastIndex = 0
      continue
    }
    yield chunk.substring(startIndex, result.index)
    startIndex = re.lastIndex
  }
  if (startIndex < chunk.length) {
    yield chunk.substr(startIndex)
  }
}

async function scrapeWebsite(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Remove script and style elements
    $('script, style').remove()

    const title = $('title').text() || $('h1').first().text() || 'No title found'
    const content = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 1000)

    return {
      url,
      title,
      content,
      status: 'success'
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error)
    return {
      url,
      title: 'Error',
      content: `Failed to scrape website: ${error instanceof Error ? error.message : 'Unknown error'}`,
      status: 'error'
    }
  }
}

export async function POST(req: NextRequest) {
  const { fileId } = await req.json()

  // In a real application, you would fetch the file content based on the fileId
  // For this example, we'll use a mock file URL
  const fileURL = `https://example.com/files/${fileId}`

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let urlCount = 0
        let processedCount = 0

        for await (const line of makeTextFileLineIterator(fileURL)) {
          urlCount++
        }

        for await (const line of makeTextFileLineIterator(fileURL)) {
          const url = line.trim()
          if (url) {
            const result = await scrapeWebsite(url)
            controller.enqueue(JSON.stringify({ result }) + '\n')
            processedCount++
            const progress = Math.round((processedCount / urlCount) * 100)
            controller.enqueue(JSON.stringify({ progress }) + '\n')
          }
        }
        controller.close()
      } catch (error) {
        console.error('Stream error:', error)
        controller.enqueue(JSON.stringify({ 
          error: `An error occurred during scraping: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }) + '\n')
        controller.close()
      }
    }
  })

  return new NextResponse(stream)
}

