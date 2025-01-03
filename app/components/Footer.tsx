import Link from 'next/link'

export default function Footer() {
  const currentYear = 2025

  return (
    <footer className="bg-opacity-30 bg-black backdrop-blur-md py-12 relative z-10">
      <div className="container mx-auto px-6 overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-4 text-white">ProgrammaticContent</h3>
            <p className="text-white/70">
              AI-powered content generation and programmatic SEO solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-white/70 hover:text-electric-purple">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/70 hover:text-electric-purple">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-white/70 hover:text-electric-purple">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/70 hover:text-electric-purple">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-electric-purple">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/70 hover:text-electric-purple">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-white/70 hover:text-electric-purple">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-electric-purple">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white/70">
              &copy; {currentYear} ProgrammaticContent. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link href="#" className="text-white/70 hover:text-electric-purple">
                Twitter
              </Link>
              <Link href="#" className="text-white/70 hover:text-electric-purple">
                LinkedIn
              </Link>
              <Link href="#" className="text-white/70 hover:text-electric-purple">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

