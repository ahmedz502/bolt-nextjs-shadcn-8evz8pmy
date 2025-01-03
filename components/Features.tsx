import { Card, CardContent } from '@/components/ui/card'
import { Code, Zap, Database, GitBranch, Search, Bot } from 'lucide-react'

export function Features() {
  const features = [
    {
      title: 'Automated Content Generation',
      description: 'Generate high-quality, SEO-optimized content at scale using advanced AI technology.',
      icon: <Bot className="h-8 w-8 text-electric-teal" />
    },
    {
      title: 'Programmatic SEO',
      description: 'Create and optimize thousands of pages automatically with our programmatic SEO tools.',
      icon: <Search className="h-8 w-8 text-electric-teal" />
    },
    {
      title: 'Fast Processing',
      description: 'Process large volumes of content quickly with our optimized infrastructure.',
      icon: <Zap className="h-8 w-8 text-electric-teal" />
    },
    {
      title: 'Data Integration',
      description: 'Connect with your existing data sources and content management systems.',
      icon: <Database className="h-8 w-8 text-electric-teal" />
    },
    {
      title: 'API Access',
      description: 'Full API access for seamless integration with your existing workflow.',
      icon: <Code className="h-8 w-8 text-electric-teal" />
    },
    {
      title: 'Version Control',
      description: 'Track and manage your content changes with built-in version control.',
      icon: <GitBranch className="h-8 w-8 text-electric-teal" />
    }
  ]

  return (
    <section className="py-20 bg-deep-space-blue/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Powerful Features for Content Scaling
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="holographic-card">
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-on-dark">{feature.title}</h3>
                <p className="text-on-dark/80">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

