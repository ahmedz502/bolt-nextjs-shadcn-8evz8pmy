import { Card, CardContent } from '@/components/ui/card'
import { FileText, Cpu, RefreshCw, Upload } from 'lucide-react'

export function Steps() {
  const steps = [
    {
      title: 'Upload Your Data',
      description: 'Import your content requirements and data sources',
      icon: <Upload className="h-8 w-8 text-electric-teal" />
    },
    {
      title: 'AI Processing',
      description: 'Our AI analyzes and generates optimized content',
      icon: <Cpu className="h-8 w-8 text-electric-teal" />
    },
    {
      title: 'Review & Refine',
      description: 'Review generated content and make adjustments',
      icon: <RefreshCw className="h-8 w-8 text-electric-teal" />
    },
    {
      title: 'Publish & Scale',
      description: 'Deploy your content across multiple channels',
      icon: <FileText className="h-8 w-8 text-electric-teal" />
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="holographic-card relative">
              <CardContent className="p-6">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-stark-white/80">{step.description}</p>
                <div className="absolute top-4 right-4 size-8 rounded-full border-2 border-electric-teal flex items-center justify-center text-electric-teal font-bold">
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

