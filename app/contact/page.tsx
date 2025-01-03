'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-stark-white">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="holographic-card">
            <CardHeader>
              <CardTitle className="text-stark-white">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input placeholder="Name" className="bg-deep-space-blue text-stark-white" />
                </div>
                <div>
                  <Input type="email" placeholder="Email" className="bg-deep-space-blue text-stark-white" />
                </div>
                <div>
                  <Textarea placeholder="Message" className="bg-deep-space-blue text-stark-white" rows={5} />
                </div>
                <Button type="submit" className="w-full bg-electric-purple text-stark-white hover:bg-electric-purple/90">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="holographic-card">
            <CardHeader>
              <CardTitle className="text-stark-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-stark-white">
                <Mail className="text-electric-teal" />
                <span>support@programmatic-content.com</span>
              </div>
              <div className="flex items-center gap-3 text-stark-white">
                <Phone className="text-electric-teal" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-stark-white">
                <MapPin className="text-electric-teal" />
                <span>123 Tech Street, San Francisco, CA 94105</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

