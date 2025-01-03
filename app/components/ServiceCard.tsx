interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="holographic-card rounded-lg p-6 transition-all duration-300 hover:scale-105">
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
      <p className="text-white">{description}</p>
    </div>
  )
}

