'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ScraperProps {
  selectedFileId: string | null;
}

interface ScraperResult {
  keyword: string;
  rank: number;
  title: string;
  url: string;
}

export function GoogleSearchScraper({ selectedFileId }: ScraperProps) {
  const [results, setResults] = useState<ScraperResult[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleScrape = async () => {
    if (!selectedFileId) {
      setError('Please select a file to scrape')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/scrape-google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId: selectedFileId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to scrape Google search results')
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const convertToCSV = (results: ScraperResult[]) => {
    const headers = ['Keyword', 'Rank', 'Title', 'URL']
    const rows = results.map(result => [
      result.keyword,
      result.rank.toString(),
      `"${result.title.replace(/"/g, '""')}"`,
      result.url
    ])
    return [headers, ...rows].map(row => row.join(',')).join('\n')
  }

  const downloadCSV = () => {
    if (!results) return

    const csv = convertToCSV(results)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'scraper_results.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>Google Search Scraper</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleScrape} disabled={!selectedFileId || isLoading} className="w-full mb-4">
          {isLoading ? 'Scraping...' : 'Start Scraping'}
        </Button>
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {results && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Results:</h3>
            <Button onClick={downloadCSV} className="mb-4">Download CSV</Button>
            <div className="bg-muted p-4 rounded-md overflow-auto max-h-96">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Keyword</th>
                    <th className="text-left">Rank</th>
                    <th className="text-left">Title</th>
                    <th className="text-left">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index}>
                      <td>{result.keyword}</td>
                      <td>{result.rank}</td>
                      <td>{result.title}</td>
                      <td>{result.url}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

