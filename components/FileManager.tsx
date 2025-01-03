'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Upload, Download, Trash } from 'lucide-react'

interface UploadedFile {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  url: string;
}

interface FileManagerProps {
  onFileSelect?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
}

export function FileManager({ onFileSelect, multiple = false, accept = '*' }: FileManagerProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    const mockFiles: UploadedFile[] = [
      {
        id: '1',
        name: 'Google Search Scraper - keywords.csv',
        uploadDate: '2023-05-01',
        size: '1.2 KB',
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google%20Search%20Scraper%20-%20keywords-kxXEgYdRmp0YLKWVTPdNqHCAPvwUK9.csv'
      },
      {
        id: '2',
        name: 'Websites Content Scraper - Sample.csv',
        uploadDate: '2023-05-02',
        size: '0.8 KB',
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Websites%20Content%20Scraper%20-%20Sample-UzKhQYTuOtPtVdCMYzc6SdYmYPOaBt.csv'
      },
      {
        id: '3',
        name: 'Bulk urls checker - Sample.csv',
        uploadDate: '2023-05-03',
        size: '1.2 KB',
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bulk%20urls%20checker%20-%20Sample-DFpHIeoRbuXoVHdAd291wUW6xsIzzp.csv'
      },
      {
        id: '4',
        name: 'London - Sample.jpg',
        uploadDate: '2023-05-04',
        size: '2.8 MB',
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/London%20-%20Sample-KhYrXwieLl3oAcMVD6XyzZcqOqodam.jpeg'
      }
    ];
    setFiles(mockFiles);
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId) 
        : [...prev, fileId]
    )
  }

  const handleFileDelete = (fileId: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId))
    setSelectedFiles(prev => prev.filter(id => id !== fileId))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (uploadedFiles) {
      // In a real application, you would upload these files to your server
      // For now, we'll just add them to the local state
      const newFiles: UploadedFile[] = Array.from(uploadedFiles).map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024).toFixed(2)} KB`,
        url: URL.createObjectURL(file)
      }))
      setFiles(prev => [...prev, ...newFiles])
      if (onFileSelect) {
        onFileSelect(Array.from(uploadedFiles))
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Manager</CardTitle>
      </CardHeader>
      <CardContent className="text-black">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input 
              type="file" 
              accept={accept}
              onChange={handleFileUpload} 
              className="flex-grow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              multiple={multiple}
            />
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-800">Name</TableHead>
                <TableHead className="text-gray-800">Upload Date</TableHead>
                <TableHead className="text-gray-800">Size</TableHead>
                <TableHead className="text-gray-800">URL</TableHead>
                <TableHead className="text-gray-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="text-gray-800">{file.name}</TableCell>
                  <TableCell className="text-gray-800">{file.uploadDate}</TableCell>
                  <TableCell className="text-gray-800">{file.size}</TableCell>
                  <TableCell className="text-gray-800">
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View File
                    </a>
                  </TableCell>
                  <TableCell className="text-gray-800">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleFileSelect(file.id)}
                      >
                        {selectedFiles.includes(file.id) ? 'Deselect' : 'Select'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleFileDelete(file.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <style jsx>{`
          input[type="file"]::-webkit-file-upload-button {
            visibility: hidden;
          }
          input[type="file"]::before {
            content: 'Select file';
            display: inline-block;
            background: linear-gradient(top, #f9f9f9, #e3e3e3);
            border: 1px solid #999;
            border-radius: 3px;
            padding: 5px 8px;
            outline: none;
            white-space: nowrap;
            -webkit-user-select: none;
            cursor: pointer;
            text-shadow: 1px 1px #fff;
            font-weight: 700;
            font-size: 10pt;
          }
          input[type="file"]:hover::before {
            border-color: black;
          }
          input[type="file"]:active::before {
            background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
          }
        `}</style>
      </CardContent>
    </Card>
  )
}

