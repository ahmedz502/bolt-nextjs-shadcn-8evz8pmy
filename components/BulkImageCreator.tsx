'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, Download } from 'lucide-react'

interface CreatedImage {
  name: string;
  url: string;
  downloadUrl: string;
}

export function BulkImageCreator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [createdImages, setCreatedImages] = useState<CreatedImage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [fileUploadStatus, setFileUploadStatus] = useState<string>('')

  const validateCSV = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const lines = content.split('\n')
        if (lines.length > 1) {
          const headers = lines[0].split(',').map(header => header.trim().replace(/\r$/, ''))
          if (headers.includes('Title') && headers.includes('Name')) {
            resolve(true)
            return
          }
        }
        resolve(false)
      }
      reader.readAsText(file)
    })
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'text/csv') {
      const isValid = await validateCSV(file)
      if (isValid) {
        setSelectedFile(file)
        setError(null)
        setFileUploadStatus(`File "${file.name}" selected and validated`)
      } else {
        setSelectedFile(null)
        setError('Invalid CSV format. Please ensure it contains "Title" and "Name" columns.')
        setFileUploadStatus('')
      }
    } else {
      setSelectedFile(null)
      setError('Please select a valid CSV file.')
      setFileUploadStatus('')
    }
  }

  const handleCreateImages = async () => {
    if (!selectedFile) {
      setError('Please select a CSV file.')
      return
    }

    setIsCreating(true)
    setProgress(0)
    setCreatedImages([])
    setError(null)

    const formData = new FormData()
    formData.append('csv', selectedFile)

    try {
      console.log('Sending request to create images...')
      const response = await fetch('/api/create-images', {
        method: 'POST',
        body: formData,
      })

      console.log('Response received:', response.status, response.statusText)

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json()
          console.error('Error data:', errorData)
          throw new Error(errorData.error || 'Image creation failed')
        } else {
          const errorText = await response.text()
          console.error('Error text:', errorText)
          throw new Error(errorText || 'Image creation failed')
        }
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break

        const chunk = decoder.decode(value)
        console.log('Received chunk:', chunk)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.trim() === '') continue
          try {
            const data = JSON.parse(line)
            console.log('Parsed data:', data)

            if (data.progress) {
              setProgress(data.progress)
            } else if (data.createdImage) {
              setCreatedImages(prev => [...prev, { ...data.createdImage, downloadUrl: `${window.location.origin}${data.createdImage.url}` }])
            } else if (data.error) {
              throw new Error(data.error)
            }
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError, 'Raw line:', line)
            setError(`Error parsing response: ${line}`)
          }
        }
      }

      console.log('Image creation completed successfully')
    } catch (error) {
      console.error('Error creating images:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDownloadCSV = () => {
    const csvContent = [
      ['Name', 'View URL', 'Download URL'],
      ...createdImages.map(image => [image.name, image.url, image.downloadUrl])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'created_images.csv'
    link.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Image Creator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          {fileUploadStatus && (
            <p className="text-sm text-green-600">{fileUploadStatus}</p>
          )}
          <Button
            onClick={handleCreateImages}
            disabled={!selectedFile || isCreating}
            className="w-full"
          >
            {isCreating ? (
              'Creating Images...'
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Create Images
              </>
            )}
          </Button>
          {isCreating && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center">{progress.toFixed(0)}% complete</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          {createdImages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Created Images:</h3>
              <ul className="space-y-2">
                {createdImages.map((image, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{image.name}</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={image.url} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={image.downloadUrl} download>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </a>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <Button onClick={handleDownloadCSV} className="mt-4">
                <Download className="mr-2 h-4 w-4" /> Download CSV
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

