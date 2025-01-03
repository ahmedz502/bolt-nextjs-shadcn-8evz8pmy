import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const jobOpenings = [
  {
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    description: "We're looking for an experienced Full Stack Developer to help build and maintain our core platform."
  },
  {
    title: 'AI Research Scientist',
    department: 'Research & Development',
    location: 'San Francisco, CA',
    description: 'Join our R&D team to push the boundaries of AI in content generation and analysis.'
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    description: 'Lead the vision and strategy for our content generation products.'
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Support',
    location: 'Remote',
    description: 'Help our customers get the most out of ProgrammaticContent and ensure their success.'
  }
]

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Join Our Team</h1>
      <p className="text-center text-xl mb-12">
        At ProgrammaticContent, we're revolutionizing the way content is created and managed. 
        Join us in shaping the future of AI-powered content generation.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jobOpenings.map((job, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.department} | {job.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{job.description}</p>
            </CardContent>
            <CardFooter>
              <Button>Apply Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

