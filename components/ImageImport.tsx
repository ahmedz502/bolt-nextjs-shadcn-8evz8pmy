'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'

export function ImageImport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      // Here you would typically send the file to your API
      console.log('Uploading file:', selectedFile.name)
      // Reset the state after upload
      setSelectedFile(null)
      setPreviewUrl(null)
    }
  }

  return (
    <Card className="holographic-card">
      <CardHeader>
        <CardTitle>Import Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          {previewUrl && (
            <div className="mt-4">
              <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg" />
            </div>
          )}
          <Button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload Image
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

