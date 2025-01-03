'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface ScraperResult {
  url: string;
  title: string;
  content: string;
  status: string;
}

export function WebsiteContentScraper() {
  const [file, setFile] = useState<File | null>(null)
  const [results, setResults] = useState<ScraperResult[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile)
      setError(null)
      setResults(null)
    } else {
      setFile(null)
      setError('Please select a valid CSV file.')
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) {
      setError('Please select a CSV file.')
      return
    }

    setIsLoading(true)
    setError(null)
    setProgress(0)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/scrape-websites', {
        method: 'POST',
        body: formData,
      })

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        throw new Error('Failed to parse response as JSON. The server might be experiencing issues.')
      }

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (data.results && Array.isArray(data.results)) {
        setResults(data.results)
      } else if (data.error) {
        throw new Error(data.error)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An error occurred while scraping websites.')
      setResults(null)
    } finally {
      setIsLoading(false)
      setProgress(100)
    }
  }

  const downloadCSV = () => {
    if (!results) return

    const headers = ['URL', 'Title', 'Content', 'Status']
    const csvContent = [
      headers.join(','),
      ...results.map(result => 
        [
          result.url,
          `"${(result.title || '').replace(/"/g, '""')}"`,
          `"${(result.content || '').replace(/"/g, '""')}"`,
          result.status
        ].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'scraping_results.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Website Content Scraper</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input 
              type="file" 
              accept=".csv" 
              onChange={handleFileChange}
              className="cursor-pointer text-black"
            />
            <p className="text-sm text-muted-foreground">
              Upload a CSV file containing website URLs in the first column
            </p>
          </div>
          <Button 
            type="submit" 
            disabled={!file || isLoading} 
            className="w-full"
          >
            {isLoading ? 'Scraping...' : 'Start Scraping'}
          </Button>
        </form>

        {isLoading && (
          <div className="mt-4 space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              Scraping websites... This may take a few minutes.
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {results && results.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Results:</h3>
              <Button onClick={downloadCSV} variant="outline">
                Download CSV
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-md overflow-auto max-h-[600px]">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">URL</th>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Content Preview</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-2 break-all">{result.url}</td>
                      <td className="p-2">{result.title}</td>
                      <td className="p-2">
                        {result.content 
                          ? `${result.content.slice(0, 100)}...` 
                          : 'No content extracted'}
                      </td>
                      <td className="p-2">
                        <span className={`inline-block px-2 py-1 rounded text-sm ${
                          result.status === 'success' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {result.status}
                        </span>
                      </td>
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

