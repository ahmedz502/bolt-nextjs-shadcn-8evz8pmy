import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import os from 'os'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const filename = searchParams.get('file')

  if (!filename) {
    return NextResponse.json({ error: 'No filename provided' }, { status: 400 })
  }

  const filePath = path.join(os.tmpdir(), 'image-conversions', filename)

  try {
    const fileBuffer = await readFile(filePath)
    const headers = new Headers()
    headers.set('Content-Disposition', `attachment; filename="${filename}"`)
    headers.set('Content-Type', 'application/octet-stream')

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Error reading file:', error)
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}

