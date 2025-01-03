import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// This is a mock database. In a real application, you'd use a proper database.
let files: { id: string; name: string; uploadDate: string }[] = []

export async function GET() {
  return NextResponse.json(files)
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const fileData = {
    id: uuidv4(),
    name: file.name,
    uploadDate: new Date().toISOString()
  }

  files.push(fileData)

  return NextResponse.json(fileData)
}

