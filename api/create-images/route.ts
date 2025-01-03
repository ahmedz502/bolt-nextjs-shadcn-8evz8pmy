import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse/sync'
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import os from 'os'

export const runtime = 'nodejs'

const backgroundColors = [
  { r: 160, g: 173, b: 171 },
  { r: 9, g: 81, b: 83 },
  { r: 179, g: 170, b: 145 },
  { r: 193, g: 153, b: 53 },
  { r: 193, g: 188, b: 175 },
  { r: 171, g: 152, b: 106 }
]

async function fitTextToImage(text: string, imageSize: { width: number; height: number }, padding: number) {
  let fontSize = 80
  let textWidth, textHeight

  while (fontSize > 20) {
    const svg = `
      <svg width="${imageSize.width}" height="${imageSize.height}">
        <text
          x="${padding}"
          y="${imageSize.height / 2}"
          font-family="Arial"
          font-size="${fontSize}"
          fill="white"
        >${text}</text>
      </svg>
    `

    const svgBuffer = Buffer.from(svg)
    const { width, height } = await sharp(svgBuffer).metadata()

    textWidth = width! - 2 * padding
    textHeight = height!

    if (textWidth <= imageSize.width - 2 * padding && textHeight <= imageSize.height - 2 * padding) {
      break
    }

    fontSize -= 5
  }

  return { fontSize, textWidth, textHeight }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('csv') as File | null

    if (!file) {
      console.error('No file uploaded')
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const content = buffer.toString()

    let records
    try {
      records = parse(content, { columns: true })
    } catch (error) {
      console.error('Error parsing CSV:', error)
      return NextResponse.json({ error: 'Error parsing CSV file' }, { status: 400 })
    }

    const tempDir = await mkdir(path.join(os.tmpdir(), 'created-images'), { recursive: true })
    const createdImages: { name: string; url: string }[] = []

    const encoder = new TextEncoder()
    const stream = new TransformStream()
    const writer = stream.writable.getWriter()

    const createImage = async (record: any, index: number) => {
      const { Title: title, Name: name } = record
      if (!title || !name) {
        writer.write(encoder.encode(JSON.stringify({ error: `Missing Title or Name in row ${index + 1}` }) + '\n'))
        return
      }

      const outputFilename = `${name}.png`
      const outputPath = path.join(tempDir, outputFilename)

      try {
        const backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
        const imageSize = { width: 1200, height: 800 }
        const padding = 50

        const { fontSize, textWidth, textHeight } = await fitTextToImage(title, imageSize, padding)

        const svg = `
          <svg width="${imageSize.width}" height="${imageSize.height}">
            <rect width="100%" height="100%" fill="rgb(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b})" />
            <text
              x="${padding}"
              y="${(imageSize.height + textHeight) / 2}"
              font-family="Arial"
              font-size="${fontSize}"
              fill="white"
            >${title}</text>
          </svg>
        `

        await sharp(Buffer.from(svg))
          .png()
          .toFile(outputPath)

        const downloadUrl = `/api/images/${encodeURIComponent(outputFilename)}`
        createdImages.push({ name: outputFilename, url: downloadUrl })
        writer.write(encoder.encode(JSON.stringify({ createdImage: { name: outputFilename, url: downloadUrl } }) + '\n'))
      } catch (error) {
        console.error(`Error creating image for ${name}:`, error)
        writer.write(encoder.encode(JSON.stringify({ error: `Error creating image for ${name}: ${error instanceof Error ? error.message : 'Unknown error'}` }) + '\n'))
      }

      const progress = ((index + 1) / records.length) * 100
      writer.write(encoder.encode(JSON.stringify({ progress }) + '\n'))
    }

    const processingPromise = Promise.all(records.map(createImage))

    processingPromise.then(() => writer.close()).catch((error) => {
      console.error('Error in processing:', error)
      writer.write(encoder.encode(JSON.stringify({ error: 'Error in processing: ' + (error instanceof Error ? error.message : 'Unknown error') }) + '\n'))
      writer.close()
    })

    return new NextResponse(stream.readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

