'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your API to authenticate the user
    console.log('Logging in with:', email, password)
    // For now, we'll just redirect to the dashboard
    router.push('/dashboard')
  }

  return (
    <Card className="w-full max-w-md bg-deep-space-blue">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-white">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-electric-purple text-white py-2 rounded font-semibold hover:bg-opacity-80">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

