import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Here you would typically validate the user's credentials against your database
  // For now, we'll just return a mock token
  if (email && password) {
    return NextResponse.json({ token: 'mock_token_12345' })
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}

