import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import os from 'os'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename
  const imagePath = path.join(os.tmpdir(), 'created-images', filename)

  try {
    const fileBuffer = await readFile(imagePath)
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error reading image file:', error)
    return new NextResponse('Image not found', { status: 404 })
  }
}

