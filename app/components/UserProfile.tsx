'use client'

import { useState } from 'react'

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
    <div className="holographic-card p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-deep-space-blue text-black border border-electric-teal"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-deep-space-blue text-black border border-electric-teal"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-deep-space-blue text-black border border-electric-teal"
              />
            </div>
            <div>
              <label htmlFor="contentPreferences" className="block mb-1">Content Preferences</label>
              <textarea
                id="contentPreferences"
                name="contentPreferences"
                value={userData.contentPreferences}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-deep-space-blue text-black border border-electric-teal"
              />
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="bg-electric-teal text-deep-space-blue px-4 py-2 rounded mr-2">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          <p><strong>Full Name:</strong> {userData.fullName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Password:</strong> ********</p>
          <p><strong>Content Preferences:</strong> {userData.contentPreferences}</p>
          <button onClick={() => setIsEditing(true)} className="mt-4 bg-electric-teal text-deep-space-blue px-4 py-2 rounded">Edit Profile</button>
        </div>
      )}
    </div>
  )
}

