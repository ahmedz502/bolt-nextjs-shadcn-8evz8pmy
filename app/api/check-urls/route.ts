import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse/sync'
import fetch from 'node-fetch'

export const runtime = 'nodejs'

async function checkURL(url: string): Promise<string> {
  try {
    const response = await fetch(url, { method: 'HEAD', timeout: 5000 })
    return response.ok ? '200 OK' : `${response.status} ${response.statusText}`
  } catch (error) {
    return 'Error'
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('csv') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const content = buffer.toString()

  const records = parse(content, { columns: true })

  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  const checkURLBatch = async (batch: any[], startIndex: number) => {
    const results = await Promise.all(batch.map(async (record) => {
      const url = record.URL || record.url
      const status = await checkURL(url)
      return { url, status }
    }))

    for (const result of results) {
      writer.write(encoder.encode(JSON.stringify({ result }) + '\n'))
    }

    const progress = ((startIndex + batch.length) / records.length) * 100
    writer.write(encoder.encode(JSON.stringify({ progress }) + '\n'))
  }

  const batchSize = 10
  const processingPromise = (async () => {
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize)
      await checkURLBatch(batch, i)
    }
    writer.close()
  })()

  processingPromise.catch((error) => {
    console.error('Error processing URLs:', error)
    writer.abort(error)
  })

  return new NextResponse(stream.readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

