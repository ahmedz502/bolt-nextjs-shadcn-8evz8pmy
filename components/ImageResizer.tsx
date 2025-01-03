'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Download } from 'lucide-react'
import { FileManager } from './FileManager'

export function ImageResizer() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [width, setWidth] = useState<number>(1200)
  const [height, setHeight] = useState<number>(728)
  const [isResizing, setIsResizing] = useState(false)
  const [resizedFiles, setResizedFiles] = useState<string[]>([])

  const handleResize = async () => {
    if (selectedFiles.length === 0) return

    setIsResizing(true)
    const formData = new FormData()
    selectedFiles.forEach(fileId => {
      // In a real application, you would get the actual file object here
      formData.append('images', fileId)
    })
    formData.append('width', width.toString())
    formData.append('height', height.toString())

    try {
      const response = await fetch('/api/resize-images', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Resizing failed')
      }

      const result = await response.json()
      setResizedFiles(result.resizedFiles)
    } catch (error) {
      console.error('Error resizing images:', error)
    } finally {
      setIsResizing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Image Resizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FileManager />
          <div className="flex space-x-4">
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              placeholder="Width"
            />
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="Height"
            />
          </div>
          <Button
            onClick={handleResize}
            disabled={selectedFiles.length === 0 || isResizing}
            className="w-full"
          >
            {isResizing ? (
              'Resizing...'
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Resize Images
              </>
            )}
          </Button>
          {resizedFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Resized Files:</h3>
              <ul className="space-y-2">
                {resizedFiles.map((file, index) => (
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
        </div>
      </CardContent>
    </Card>
  )
}

