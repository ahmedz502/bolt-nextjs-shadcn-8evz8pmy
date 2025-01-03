import { Card, CardContent } from '@/components/ui/card'

export function Stats() {
  const stats = [
    {
      value: '1M+',
      label: 'Pages Generated'
    },
    {
      value: '10K+',
      label: 'Active Users'
    },
    {
      value: '99.9%',
      label: 'Uptime'
    },
    {
      value: '24/7',
      label: 'Support'
    }
  ]

  return (
    <section className="py-12 bg-deep-space-blue/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="holographic-card">
              <CardContent className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-electric-teal mb-2">
                  {stat.value}
                </div>
                <div className="text-on-dark/80">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

