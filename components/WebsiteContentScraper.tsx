'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import { FileManager } from './FileManager'
import { Download, Globe } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface ScraperResult {
  url: string;
  title: string;
  content: string;
  status: string;
}

export function WebsiteContentScraper() {
  const [results, setResults] = useState<ScraperResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)

  const handleScrape = async () => {
    if (!selectedFileId) {
      setError('Please select a file to scrape')
      return
    }

    setIsLoading(true)
    setError(null)
    setResults([])
    setProgress(0)

    try {
      const response = await fetch('/api/scrape-websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId: selectedFileId }),
      })

      if (!response.ok) {
        throw new Error('Failed to start scraping process')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.trim() === '') continue
          const data = JSON.parse(line)

          if (data.result) {
            setResults(prev => [...prev, data.result])
          } else if (data.progress) {
            setProgress(data.progress)
          } else if (data.error) {
            setError(data.error)
          }
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    const csv = [
      ['URL', 'Title', 'Content', 'Status'],
      ...results.map(result => [
        result.url,
        result.title,
        result.content,
        result.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'scraping_results.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const readUrlsFromFile = (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const urls = text.split('\n').map(line => line.trim()).filter(Boolean)
        resolve(urls)
      }
      reader.onerror = (e) => reject(e)
      reader.readAsText(file)
    })
  }

  return (
    <Card className="w-full bg-white shadow">
      <CardHeader>
        <CardTitle className="text-gray-800">Website Content Scraper</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-800">
        <div className="space-y-4">
          <FileManager onFileSelect={(fileId) => setSelectedFileId(fileId)} />
          <Button 
            onClick={handleScrape} 
            disabled={isLoading || !selectedFileId}
            className="w-full bg-gray-800 text-white hover:bg-gray-700"
          >
            {isLoading ? 'Scraping...' : 'Start Scraping'}
          </Button>
          {isLoading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600">Progress: {progress}%</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
        </div>
        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            <Button onClick={handleExport} className="bg-gray-800 text-white hover:bg-gray-700">
              <Download className="mr-2 h-4 w-4" /> Export to CSV
            </Button>
            <div className="overflow-x-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHead className="text-gray-800">URL</TableHead>
                    <TableHead className="text-gray-800">Title</TableHead>
                    <TableHead className="text-gray-800">Content Preview</TableHead>
                    <TableHead className="text-gray-800">Status</TableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-800">{result.url}</TableCell>
                      <TableCell className="text-gray-800">{result.title}</TableCell>
                      <TableCell className="text-gray-800">{result.content.slice(0, 100)}...</TableCell>
                      <TableCell className="text-gray-800">{result.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

