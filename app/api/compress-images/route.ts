import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import os from 'os'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const files = formData.getAll('images') as File[]

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
  }

  const tempDir = await mkdir(path.join(os.tmpdir(), 'compressed-images'), { recursive: true })
  const compressedFiles: string[] = []

  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  const processImage = async (file: File, index: number) => {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name
    const outputFilename = `compressed_${filename}`
    const outputPath = path.join(tempDir, outputFilename)

    try {
      await sharp(buffer)
        .jpeg({ quality: 80, progressive: true })
        .toFile(outputPath)

      compressedFiles.push(outputFilename)
      writer.write(encoder.encode(JSON.stringify({ compressedFile: outputFilename }) + '\n'))
    } catch (error) {
      console.error(`Error compressing ${filename}:`, error)
      writer.write(encoder.encode(JSON.stringify({ error: `Error compressing ${filename}: ${error}` }) + '\n'))
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

