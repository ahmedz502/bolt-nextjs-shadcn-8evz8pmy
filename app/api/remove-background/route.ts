import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import os from 'os'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const files = formData.getAll('images') as File[]

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
  }

  const tempDir = await mkdir(path.join(os.tmpdir(), 'background-removals'), { recursive: true })
  const processedFiles: string[] = []

  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  const processImage = async (file: File, index: number) => {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name
    const outputFilename = `${path.parse(filename).name}_no_bg.png`
    const outputPath = path.join(tempDir, outputFilename)

    try {
      await sharp(buffer)
        .removeBackground({ threshold: 0 })
        .png()
        .toFile(outputPath)

      processedFiles.push(outputFilename)
      writer.write(encoder.encode(JSON.stringify({ processedFile: outputFilename }) + '\n'))
    } catch (error) {
      console.error(`Error processing ${filename}:`, error)
      writer.write(encoder.encode(JSON.stringify({ error: `Error processing ${filename}: ${error}` }) + '\n'))
    }

    const progress = ((index + 1) / files.length) * 100
    writer.write(encoder.encode(JSON.stringify({ progress }) + '\n'))
  }

  const processingPromise = Promise.all(files.map(processImage))

  processingPromise.then(() => writer.close()).catch((error) => {
    console.error('Error in processing:', error)
    writer.write(encoder.encode(JSON.stringify({ error: 'Error in processing: ' + error.message }) + '\n'))
    writer.close()
  })

  return new NextResponse(stream.readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

