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
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=random&color=fff&size=100`}
                  alt={`Avatar of ${testimonial.author}`}
                  width={100}
                  height={100}
                  className="rounded-full mb-4"
                />
                <p className="text-lg mb-4 text-on-dark/90">
                  {testimonial.quote}
                </p>
                <div>
                  <div className="font-semibold text-on-dark">{testimonial.author}</div>
                  <div className="text-sm text-on-dark/70">
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

