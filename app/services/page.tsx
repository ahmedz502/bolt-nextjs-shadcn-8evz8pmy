import ServiceCard from '../components/ServiceCard'

const services = [
  {
    title: "Bulk Article Creation",
    description: "Generate hundreds of unique, high-quality articles tailored to your niche.",
    icon: "📚"
  },
  {
    title: "Programmatic SEO Pages",
    description: "Automatically create SEO-optimized pages for maximum search engine visibility.",
    icon: "🔍"
  },
  {
    title: "Web Scraping",
    description: "Extract valuable data from websites to fuel your content creation process.",
    icon: "🕸️"
  },
  {
    title: "Image Import",
    description: "Easily import and manage images for your content creation needs.",
    icon: "🖼️"
  },
  {
    title: "Website Content Scraper",
    description: "Extract content from multiple websites using CSV input for efficient data collection.",
    icon: "🔬"
  }
]

export default function Services() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  )
}

