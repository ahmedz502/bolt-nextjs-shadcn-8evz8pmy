'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Home, FileText, Image, Scissors, Layers, Link, FileImage, Globe, User, Search } from 'lucide-react'
import NextLink from 'next/link' // Renamed import to avoid conflict
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'File Manager', href: '/dashboard/file-manager', icon: FileText },
    { name: 'Image Converter', href: '/dashboard/image-converter', icon: Image },
    { name: 'Image Resizer', href: '/dashboard/image-resizer', icon: Scissors },
    { name: 'Background Remover', href: '/dashboard/background-remover', icon: Layers },
    { name: 'Article Interlinker', href: '/dashboard/article-interlinker', icon: Link },
    { name: 'Bulk Image Compressor', href: '/dashboard/bulk-image-compressor', icon: FileImage },
    { name: 'Bulk Image Creator', href: '/dashboard/bulk-image-creator', icon: FileImage },
    { name: 'Bulk URL Checker', href: '/dashboard/bulk-url-checker', icon: Globe },
    { name: 'Google Search Scraper', href: '/dashboard/google-scraper', icon: Search },
    { name: 'Website Scraper', href: '/dashboard/website-scraper', icon: Globe },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-sky-500 text-white transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <NextLink href="/dashboard" className={`font-semibold ${sidebarOpen ? '' : 'hidden'}`}>
            Dashboard
          </NextLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-gray-700 p-2"
          >
            {sidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
          </Button>
        </div>
        <nav className="mt-5 px-2 space-y-1 pb-[100px] flex flex-col h-[calc(100vh-4rem)]">
          <div className="flex-grow overflow-y-auto">
            {/* Profile section (assuming it exists) */}
            <button
              key="profile"
              onClick={() => handleNavigation('/dashboard/profile')}
              className={`flex items-center rounded-lg px-3 py-2 text-base font-medium transition-colors w-full text-left ${
                pathname === '/dashboard/profile'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <User className="h-6 w-6 mr-4 flex-shrink-0" />
              {sidebarOpen && <span>Profile</span>}
            </button>

            {/* Moved button mapping here */}
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`flex items-center rounded-lg px-3 py-2 text-base font-medium transition-colors w-full text-left ${
                  pathname === item.href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="h-6 w-6 mr-4 flex-shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

