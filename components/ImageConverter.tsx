'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'

export function ImageConverter() {
  const [convertTo, setConvertTo] = useState<string>('png')
  const [isConverting, setIsConverting] = useState(false)
  const [conversionLog, setConversionLog] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleConvert = async () => {
    const fileInput = fileInputRef.current
    const file = fileInput?.files?.[0]
    
    if (!file) {
      setError('Please select a file.')
      return
    }

    setIsConverting(true)
    setConversionLog([])
    setError(null)

    const formData = new FormData()
    formData.append('image', file)
    formData.append('outputFormat', convertTo)

    try {
      const response = await fetch('/api/convert-images', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      if (result.convertedFile) {
        setConversionLog([`Successfully converted to ${result.convertedFile}`])
      } else {
        throw new Error('No converted file in response')
      }
    } catch (error) {
      console.error('Error converting image:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="cursor-pointer"
          />
          <Select onValueChange={(value) => setConvertTo(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select output format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
              <SelectItem value="webp">WebP</SelectItem>
              <SelectItem value="tiff">TIFF</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleConvert}
            disabled={!fileInputRef.current?.files?.[0] || isConverting}
            className="w-full"
          >
            {isConverting ? (
              'Converting...'
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Convert Image
              </>
            )}
          </Button>
          {conversionLog.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Conversion Log:</h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {conversionLog.map((log, index) => (
                  <li key={index} className="text-sm">{log}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

