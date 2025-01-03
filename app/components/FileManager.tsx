'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UploadedFile {
  id: string;
  name: string;
  uploadDate: string;
}

interface FileManagerProps {
  onFileSelect: (fileId: string | null) => void;
}

export function FileManager({ onFileSelect }: FileManagerProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files')
      if (response.ok) {
        const data = await response.json()
        setFiles(data)
      } else {
        console.error('Failed to fetch files')
      }
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        await fetchFiles() // Refresh the file list
        const newFile = await response.json()
        handleFileSelect(newFile.id) // Automatically select the newly uploaded file
      } else {
        console.error('Failed to upload file')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const handleFileSelect = (fileId: string) => {
    setSelectedFile(fileId)
    onFileSelect(fileId)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>File Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between">
              <span>{file.name}</span>
              <Button
                onClick={() => handleFileSelect(file.id)}
                variant={selectedFile === file.id ? "default" : "outline"}
              >
                {selectedFile === file.id ? "Selected" : "Select"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

