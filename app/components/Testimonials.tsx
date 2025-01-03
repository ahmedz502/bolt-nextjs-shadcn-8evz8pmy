import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export function Testimonials() {
  const testimonials = [
    {
      quote: "ProgrammaticContent has transformed our content creation process. We're now able to generate and optimize content at a scale we never thought possible.",
      author: "Sarah Johnson",
      role: "Content Director",
      company: "TechCorp"
    },
    {
      quote: "The AI-powered content generation is incredibly sophisticated. It's like having a team of expert writers working 24/7.",
      author: "Michael Chen",
      role: "SEO Manager",
      company: "GrowthLabs"
    },
    {
      quote: "We've seen a 300% increase in our organic traffic since implementing ProgrammaticContent's SEO solutions.",
      author: "Emily Rodriguez",
      role: "Marketing Lead",
      company: "ScaleUp Inc"
    }
  ]

  return (
    <section className="py-20 bg-deep-space-blue/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="holographic-card">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Image
                    src="/placeholder.svg"
                    alt="Quote"
                    width={40}
                    height={40}
                    className="opacity-50"
                  />
                </div>
                <p className="text-lg mb-4 text-stark-white/90">
                  {testimonial.quote}
                </p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-stark-white/70">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

