'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const router = useRouter()
  const { user, logout, isAdmin } = useAuth()

  return (
    <header className="bg-opacity-30 bg-black backdrop-blur-md fixed w-full z-10 mb-[100px]">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            ProgrammaticContent
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/services" className="text-white hover:text-electric-purple">
              Services
            </Link>
            <Link href="/articles" className="text-white hover:text-electric-purple">
              Articles
            </Link>
            {user && (
              <Link href="/dashboard" className="text-white hover:text-electric-purple">
                Dashboard
              </Link>
            )}
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin/dashboard" className="text-white hover:text-electric-purple">
                    Admin Dashboard
                  </Link>
                )}
                <Button 
                  onClick={() => {
                    logout();
                    router.push('/');
                  }} 
                  className="bg-electric-purple text-white px-4 py-2 rounded hover:bg-opacity-80"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text-electric-purple">
                  Login
                </Link>
                <Link href="/signup" className="bg-electric-purple text-white px-4 py-2 rounded hover:bg-opacity-80">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

