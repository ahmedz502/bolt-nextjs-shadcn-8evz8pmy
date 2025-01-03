import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import os from 'os'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const files = formData.getAll('images') as File[]
  const width = parseInt(formData.get('width') as string, 10)
  const height = parseInt(formData.get('height') as string, 10)

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
  }

  const tempDir = await mkdir(path.join(os.tmpdir(), 'image-resizes'), { recursive: true })
  const resizedFiles: string[] = []

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name.split('.')[0]
    const extension = path.extname(file.name)
    const outputFilename = `${filename}_resized${extension}`
    const outputPath = path.join(tempDir, outputFilename)

    try {
      await sharp(buffer)
        .resize({
          width,
          height,
          fit: sharp.fit.contain,
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFile(outputPath)

      resizedFiles.push(outputFilename)
    } catch (error) {
      console.error(`Error resizing ${file.name}:`, error)
    }
  }

  return NextResponse.json({ resizedFiles })
}

