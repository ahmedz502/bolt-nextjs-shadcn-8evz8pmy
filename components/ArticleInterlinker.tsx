'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Download, FileText } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export function ArticleInterlinker() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [processedFile, setProcessedFile] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleInterlink = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setProgress(0)
    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await fetch('/api/interlink-articles', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Interlinking failed')
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

          if (data.progress) {
            setProgress(data.progress)
          } else if (data.processedFile) {
            setProcessedFile(data.processedFile)
          }
        }
      }
    } catch (error) {
      console.error('Error interlinking articles:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Article Interlinker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {selectedFile && (
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="mr-2 h-4 w-4" />
                {selectedFile.name}
              </div>
            )}
          </div>
          <Button
            onClick={handleInterlink}
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              'Processing...'
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Interlink Articles
              </>
            )}
          </Button>
          {isProcessing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center">{progress.toFixed(0)}% complete</p>
            </div>
          )}
          {processedFile && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Processed File:</h3>
              <Button variant="outline" size="sm" asChild className="w-full">
                <a href={`/api/download?file=${encodeURIComponent(processedFile)}`} download>
                  <Download className="mr-2 h-4 w-4" /> Download Interlinked Articles
                </a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

