'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, Download } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import Papa from 'papaparse'

interface URLStatus {
  url: string;
  status: string;
  category: string;
}

const categorizeStatus = (status: number): string => {
  if (status >= 100 && status < 200) return 'Informational'
  if (status >= 200 && status < 300) return 'Success'
  if (status >= 300 && status < 400) return 'Redirection'
  if (status >= 400 && status < 500) return 'Client Error'
  if (status >= 500 && status < 600) return 'Server Error'
  return 'Unknown'
}

export function BulkURLChecker() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<URLStatus[]>([])
  const [urls, setUrls] = useState<string[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setSelectedFile(file)
      Papa.parse(file, {
        complete: (result) => {
          const csvUrls = result.data.flat().filter(Boolean) as string[]
          setUrls(csvUrls)
        },
        error: (error) => console.error('Error parsing CSV:', error.message),
      })
    }
  }

  const handlePaste = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const pastedUrls = event.target.value.split('\n').filter(Boolean)
    setUrls(pastedUrls)
  }

  const handleCheckURLs = async () => {
    setIsChecking(true)
    setProgress(0)
    setResults([])

    const checkURL = async (url: string): Promise<URLStatus> => {
      try {
        const response = await fetch(url, { method: 'HEAD' })
        const status = response.status
        return { url, status: status.toString(), category: categorizeStatus(status) }
      } catch (error) {
        return { url, status: 'Error', category: 'Unknown' }
      }
    }

    const totalUrls = urls.length
    let checkedUrls = 0

    const newResults: URLStatus[] = []

    for (const url of urls) {
      const result = await checkURL(url)
      newResults.push(result)
      checkedUrls++
      setProgress((checkedUrls / totalUrls) * 100)
      setResults([...newResults])
    }

    setIsChecking(false)
  }

  const handleDownloadResults = () => {
    const csv = [
      ['URL', 'Status', 'Category'],
      ...results.map(result => [result.url, result.status, result.category])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'url_check_results.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Paste URLs here, one per line"
            onChange={handlePaste}
            className="min-h-[100px]"
          />
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <Button
              onClick={handleCheckURLs}
              disabled={urls.length === 0 || isChecking}
            >
              {isChecking ? (
                'Checking URLs...'
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Check URLs
                </>
              )}
            </Button>
          </div>
          {isChecking && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center">{progress.toFixed(0)}% complete</p>
            </div>
          )}
          {results.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Results:</h3>
                <Button onClick={handleDownloadResults} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Download CSV
                </Button>
              </div>
              <div className="max-h-96 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{result.url}</TableCell>
                        <TableCell>{result.status}</TableCell>
                        <TableCell>{result.category}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

