interface DashboardCardProps {
  title: string;
  value: number;
}

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="holographic-card rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold text-electric-teal">{value.toLocaleString()}</p>
    </div>
  )
}

