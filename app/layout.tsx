import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ProgrammaticContent - AI-Powered Content Generation',
  description: 'Scale your content creation with AI-powered tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="min-h-screen">
      <body className={`${inter.className} min-h-screen flex flex-col bg-deep-space-blue`}>
        <AuthProvider>
          <Header />
          <main className="flex-grow pt-[100px]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

