'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, Download } from 'lucide-react'

export function BulkImageCompressor() {
  const [isCompressing, setIsCompressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [compressedFiles, setCompressedFiles] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCompress = async () => {
    const fileInput = fileInputRef.current
    const files = fileInput?.files

    if (!files || files.length === 0) {
      setError('Please select at least one file.')
      return
    }

    setIsCompressing(true)
    setProgress(0)
    setCompressedFiles([])
    setError(null)

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }

    try {
      const response = await fetch('/api/compress-images', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
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
          try {
            const data = JSON.parse(line)
            if (data.progress) {
              setProgress(data.progress)
            } else if (data.compressedFile) {
              setCompressedFiles(prev => [...prev, data.compressedFile])
            } else if (data.error) {
              throw new Error(data.error)
            }
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError)
          }
        }
      }
    } catch (error) {
      console.error('Error compressing images:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsCompressing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Image Compressor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            multiple
            className="cursor-pointer"
          />
          <Button
            onClick={handleCompress}
            disabled={isCompressing}
            className="w-full"
          >
            {isCompressing ? (
              'Compressing...'
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Compress Images
              </>
            )}
          </Button>
          {isCompressing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center">{progress.toFixed(0)}% complete</p>
            </div>
          )}
          {compressedFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Compressed Files:</h3>
              <ul className="space-y-2">
                {compressedFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{file}</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/api/download?file=${encodeURIComponent(file)}`} download>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

