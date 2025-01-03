'use client'

import { useState, useEffect } from 'react'
import DashboardCard from './DashboardCard'
import { Chart } from './Chart'
import { ImageImport } from './ImageImport'
import UserProfile from './UserProfile'
import { FileManager } from './FileManager'
import { GoogleSearchScraper } from './GoogleSearchScraper'
import { WebsiteContentScraper } from './WebsiteContentScraper'

export function DashboardContent() {
  const [userData, setUserData] = useState({
    articlesGenerated: 0,
    seoPages: 0,
    scrapingJobs: 0
  })
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)

  useEffect(() => {
    // Here you would typically fetch the user's data from your API
    // For now, we'll use mock data
    setUserData({
      articlesGenerated: 1250,
      seoPages: 500,
      scrapingJobs: 75
    })
  }, [])

  const chartData = [
    { name: 'Articles', value: userData.articlesGenerated },
    { name: 'SEO Pages', value: userData.seoPages },
    { name: 'Scraping Jobs', value: userData.scrapingJobs },
  ]

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <UserProfile />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Articles Generated" value={userData.articlesGenerated} />
        <DashboardCard title="SEO Pages Created" value={userData.seoPages} />
        <DashboardCard title="Scraping Jobs Completed" value={userData.scrapingJobs} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="holographic-card p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Content Generation Overview</h2>
          <Chart data={chartData} />
        </div>
        <ImageImport />
      </div>
      <div className="mt-8">
        <FileManager onFileSelect={setSelectedFileId} />
        <GoogleSearchScraper selectedFileId={selectedFileId} />
      </div>
      <div className="mt-8">
        <WebsiteContentScraper />
      </div>
    </div>
  )
}

