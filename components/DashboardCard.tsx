import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCardProps {
  title: string
  value: number
}

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <Card className="holographic-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-stark-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-electric-teal">{value.toLocaleString()}</p>
      </CardContent>
    </Card>
  )
}

