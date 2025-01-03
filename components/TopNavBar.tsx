import { Bell, Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function TopNavBar() {
  return (
    <div className="bg-deep-space-blue border-b border-stark-white/10 p-4 flex justify-between items-center">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-stark-white/50" />
          <Input
            type="search"
            placeholder="Search files or services..."
            className="pl-10 bg-deep-space-blue text-stark-white border-stark-white/30"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-stark-white" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5 text-stark-white" />
        </Button>
      </div>
    </div>
  )
}

