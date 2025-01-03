'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { ShoppingCart, Printer, Bell, CreditCard, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ImageConverter } from './ImageConverter'
import { ImageResizer } from './ImageResizer'
import { BackgroundRemover } from './BackgroundRemover'
import { ArticleInterlinker } from './ArticleInterlinker'
import { BulkImageCompressor } from './BulkImageCompressor'
import { BulkImageCreator } from './BulkImageCreator'
import { BulkURLChecker } from './BulkURLChecker'

const weeklyData = [
  { name: 'Week 1', value: 8000 },
  { name: 'Week 2', value: 9200 },
  { name: 'Week 3', value: 8800 },
  { name: 'Week 4', value: 9900 },
  { name: 'Week 5', value: 9100 },
  { name: 'Week 6', value: 9600 },
]

const monthlyData = [
  { name: 'Jan', sales: 20, views: 15 },
  { name: 'Feb', sales: 8, views: 12 },
  { name: 'Mar', sales: 55, views: 45 },
  { name: 'Apr', sales: 15, views: 18 },
  { name: 'May', sales: 30, views: 25 },
  { name: 'Jun', sales: 22, views: 20 },
  { name: 'Jul', sales: 25, views: 35 },
  { name: 'Aug', sales: 12, views: 8 },
  { name: 'Sep', sales: 28, views: 25 },
]

const userActivityData = [
  { day: 'Mon', users: 45 },
  { day: 'Tue', users: 55 },
  { day: 'Wed', users: 65 },
  { day: 'Thu', users: 85 },
  { day: 'Fri', users: 75 },
  { day: 'Sat', users: 70 },
  { day: 'Sun', users: 60 },
]

export function DashboardContent() {
  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Weekly Sales Chart */}
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-3xl font-bold text-on-dark">$9,568</CardTitle>
              <p className="text-sm text-red-500">↓ 8.6%</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#9933FF"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Metric Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-on-dark">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-on-dark">85,246</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-on-dark">Income</CardTitle>
            <Printer className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-on-dark">$96,147</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Users */}
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-on-dark">Total Users</CardTitle>
              <div className="text-2xl font-bold text-on-dark">97.4K</div>
            </div>
            <p className="text-sm text-emerald-500">↑ 12.5% from last month</p>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData}>
                  <Bar dataKey="users" fill="#000066" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-on-dark">Active Users</CardTitle>
              <div className="text-2xl font-bold text-on-dark">42.5K</div>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="relative h-[200px] w-[200px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-on-dark">78%</div>
              </div>
              <Progress value={78} className="h-2 w-full bg-[#CCCCCC]" />
            </div>
          </CardContent>
        </Card>

        {/* Sales & Views */}
        <Card className="col-span-full">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-on-dark">Sales & Views</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="hsl(var(--text-on-dark))" />
                  <Bar dataKey="views" fill="#9933FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales This Year */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-on-dark">$65,129</CardTitle>
              <p className="text-sm text-emerald-500">↑ 8.6%</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={78} className="h-2 w-full bg-[#CCCCCC]" />
          <div className="mt-2 text-sm text-on-dark">
            285 left to Goal
          </div>
        </CardContent>
      </Card>

      {/* Monthly/Yearly Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-on-dark">Monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-on-dark">65,127</div>
            <div className="text-sm">
              <span className="text-emerald-500">↑ 16.5%</span> <span className="text-on-dark">55.21 USD</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-on-dark">Yearly</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-on-dark">984,246</div>
            <div className="text-sm">
              <span className="text-emerald-500">↑ 24.9%</span> <span className="text-on-dark">267.35 USD</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

