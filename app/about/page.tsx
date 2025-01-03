import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-stark-white">About Us</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-stark-white">Our Mission</h2>
            <p className="text-lg text-stark-white/80">
              At ProgrammaticContent, we're on a mission to revolutionize content creation through AI-powered automation. We believe in making high-quality content generation accessible to businesses of all sizes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-stark-white">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Innovation in AI Technology',
                'Quality Content at Scale',
                'Customer Success',
                'Data Privacy & Security'
              ].map((value, index) => (
                <Card key={index} className="holographic-card">
                  <CardContent className="p-4 flex items-center gap-3">
                    <CheckCircle className="text-electric-teal" />
                    <span className="text-stark-white">{value}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-stark-white">Our Story</h2>
            <p className="text-lg text-stark-white/80">
              Founded in 2024, ProgrammaticContent emerged from the recognition that businesses needed a more efficient way to create and manage content at scale. Our team of AI experts and content strategists came together to build a platform that would transform the content creation landscape.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

