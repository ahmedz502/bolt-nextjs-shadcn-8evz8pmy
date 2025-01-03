'use client'

import { useEffect, useState } from 'react'
import { NODE_ENV } from '../utils/env'

export function EnvironmentInfo() {
  const [environment, setEnvironment] = useState<string>('')

  useEffect(() => {
    setEnvironment(NODE_ENV)
  }, [])

  if (environment !== 'production') {
    return (
      <div className="fixed bottom-0 left-0 bg-electric-teal text-deep-space-blue p-2 text-sm rounded-tr-md z-50">
        Environment: {environment}
      </div>
    )
  }

  return null
}

