import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for small businesses and startups',
    features: [
      'Up to 1,000 pages scraped per month',
      'Basic content generation',
      'Email support',
      '1 user account'
    ]
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 5,000 pages scraped per month',
      'Advanced content generation',
      'Priority email support',
      '5 user accounts',
      'API access'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale operations',
    features: [
      'Unlimited pages scraped',
      'Custom content generation models',
      '24/7 phone and email support',
      'Unlimited user accounts',
      'Dedicated account manager',
      'Custom integrations'
    ]
  }
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Choose Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

