'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your API to create a new user
    console.log('Signing up with:', email, password)
    // For now, we'll just redirect to the dashboard
    router.push('/dashboard')
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="holographic-card p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-stark-white">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-deep-space-blue text-black border border-electric-purple"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-stark-white">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-deep-space-blue text-black border border-electric-purple"
            required
          />
        </div>
        <button type="submit" className="w-full bg-electric-purple text-stark-white py-2 rounded font-semibold hover:bg-opacity-80">
          Sign Up
        </button>
      </form>
    </div>
  )
}

