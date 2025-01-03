'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Download } from 'lucide-react'
import { FileManager } from './FileManager'

interface ScraperResult {
  keyword: string;
  rank: number;
  title: string;
  url: string;
}

interface ScraperError {
  keyword: string;
  message: string;
}

export function GoogleSearchScraper() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [results, setResults] = useState<ScraperResult[]>([])
  const [errors, setErrors] = useState<ScraperError[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleScrape = async () => {
    if (!selectedFile) {
      setErrors([{ keyword: '', message: 'Please select a file to scrape' }]);
      return;
    }

    setIsLoading(true);
    setErrors([]);
    setResults([]);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch('/api/scrape-google', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to start scraping process');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.trim() === '') continue;
          const data = JSON.parse(line);

          if (data.result) {
            setResults(prev => [...prev, data.result]);
          } else if (data.progress) {
            setProgress(data.progress);
          } else if (data.error) {
            setErrors(prev => [...prev, { keyword: data.keyword || '', message: data.error }]);
          }
        }
      }
    } catch (error) {
      setErrors([{ keyword: '', message: error instanceof Error ? error.message : 'An unknown error occurred' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Keyword', 'Rank', 'Title', 'URL'],
      ...results.map(result => [result.keyword, result.rank, result.title, result.url])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'google_search_results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  console.log('Selected File ID:', selectedFile);

  return (
    <Card className="w-full bg-white shadow">
      <CardHeader>
        <CardTitle className="text-gray-800">Google Search Scraper</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-800">
        <FileManager onFileSelect={setSelectedFile} />
        <Button 
          onClick={handleScrape} 
          disabled={isLoading || !selectedFile} 
          className="w-full mt-4 mb-4 bg-gray-800 text-white hover:bg-gray-700"
        >
          {isLoading ? 'Scraping...' : 'Start Scraping'}
        </Button>
        {isLoading && (
          <div className="mb-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-600 mt-2">Progress: {progress}%</p>
          </div>
        )}
        {errors.length > 0 && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <h3 className="font-bold mb-2">Errors:</h3>
            <ul className="list-disc pl-5">
              {errors.map((error, index) => (
                <li key={index}>
                  {error.keyword ? `${error.keyword}: ` : ''}{error.message}
                </li>
              ))}
            </ul>
          </div>
        )}
        {results.length > 0 && (
          <div className="space-y-4">
            <Button onClick={handleExport} className="bg-gray-800 text-white hover:bg-gray-700">
              <Download className="mr-2 h-4 w-4" /> Export to CSV
            </Button>
            <div className="overflow-x-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHead className="text-gray-800">Keyword</TableHead>
                    <TableHead className="text-gray-800">Rank</TableHead>
                    <TableHead className="text-gray-800">Title</TableHead>
                    <TableHead className="text-gray-800">URL</TableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-800">{result.keyword}</TableCell>
                      <TableCell className="text-gray-800">{result.rank}</TableCell>
                      <TableCell className="text-gray-800">{result.title}</TableCell>
                      <TableCell className="text-gray-800">{result.url}</TableCell>
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

