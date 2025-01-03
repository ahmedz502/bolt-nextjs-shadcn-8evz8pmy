'use client'

import { useState } from 'react'

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
    <div className="holographic-card p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Import Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {previewUrl && (
        <div className="mb-4">
          <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="bg-electric-teal text-deep-space-blue px-4 py-2 rounded disabled:opacity-50"
      >
        Upload Image
      </button>
    </div>
  )
}

