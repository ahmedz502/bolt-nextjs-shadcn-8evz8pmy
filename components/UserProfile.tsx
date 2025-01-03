'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UserData {
  fullName: string
  email: string
  password: string
  contentPreferences: string
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    fullName: 'John Doe',
    email: 'john@example.com',
    password: '********',
    contentPreferences: 'Technology, AI, Web Development'
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your API
    console.log('Updated user data:', userData)
    setIsEditing(false)
  }

  return (
    <Card className="holographic-card">
      <CardHeader>
        <CardTitle className="text-gray-800">User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-800 mb-1">Full Name</label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                className="w-full bg-deep-space-blue text-stark-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full bg-deep-space-blue text-stark-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">Password</label>
              <Input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="w-full bg-deep-space-blue text-stark-white"
              />
            </div>
            <div>
              <label htmlFor="contentPreferences" className="block text-sm font-medium text-gray-800 mb-1">Content Preferences</label>
              <Textarea
                id="contentPreferences"
                name="contentPreferences"
                value={userData.contentPreferences}
                onChange={handleInputChange}
                className="w-full bg-deep-space-blue text-stark-white"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="submit" variant="default">Save</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-gray-800">
            <p><strong>Full Name:</strong> {userData.fullName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Password:</strong> ********</p>
            <p><strong>Content Preferences:</strong> {userData.contentPreferences}</p>
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

