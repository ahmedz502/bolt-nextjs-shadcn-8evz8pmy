import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import os from 'os'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File | null
    const outputFormat = formData.get('outputFormat') as string

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!outputFormat) {
      return NextResponse.json({ error: 'No output format specified' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name
    const outputFilename = `${path.parse(filename).name}.${outputFormat}`

    const tempDir = await mkdir(path.join(os.tmpdir(), 'image-conversion-'), { recursive: true })
    const outputPath = path.join(tempDir, outputFilename)

    try {
      await sharp(buffer)
        .toFormat(outputFormat as keyof sharp.FormatEnum)
        .toFile(outputPath)

      return NextResponse.json({ convertedFile: outputFilename, message: 'File converted successfully' })
    } catch (error) {
      console.error(`Error converting ${filename}:`, error)
      return NextResponse.json({ 
        error: 'Error converting file', 
        details: error instanceof Error ? error.message : 'Unknown error',
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ 
      error: 'Server error occurred', 
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}

