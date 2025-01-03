import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Testimonials } from '@/components/Testimonials'
import { Features } from '@/components/Features'
import { Steps } from '@/components/Steps'
import { Stats } from '@/components/Stats'

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-deep-space-blue to-black text-stark-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Scale Your Content Creation with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-stark-white/80">
              Automate your content generation workflow with advanced AI tools and programmatic SEO solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-electric-teal text-deep-space-blue hover:bg-electric-teal/90">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-electric-teal text-electric-teal hover:bg-electric-teal/10">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <Features />

      {/* How it Works Section */}
      <Steps />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-deep-space-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Scale Your Content?</h2>
          <p className="text-xl mb-8 text-stark-white/80">
            Join thousands of businesses already using ProgrammaticContent
          </p>
          <Button size="lg" className="bg-electric-teal text-deep-space-blue hover:bg-electric-teal/90">
            <Link href="/signup">Start Free Trial</Link>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}

