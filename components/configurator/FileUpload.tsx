'use client'

import React, { useState, useCallback } from 'react'
import { FileUpload as FileUploadConfig, UploadedFile } from '@/types/product'

interface FileUploadProps {
  uploadConfig: FileUploadConfig
  files: UploadedFile[]
  onChange: (files: UploadedFile[]) => void
}

export default function FileUpload({ uploadConfig, files, onChange }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }, [])

  const handleFiles = async (fileList: FileList) => {
    setUploading(true)
    
    try {
      const newFiles: UploadedFile[] = []
      
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        
        // Validate file type
        if (!uploadConfig.acceptedTypes.includes(file.type)) {
          alert(`File type ${file.type} is not supported. Please use: ${uploadConfig.acceptedTypes.join(', ')}`)
          continue
        }
        
        // Validate file size
        const maxSizeBytes = parseFloat(uploadConfig.maxSize.replace('MB', '')) * 1024 * 1024
        if (file.size > maxSizeBytes) {
          alert(`File size exceeds ${uploadConfig.maxSize}. Please choose a smaller file.`)
          continue
        }

        // Create file URL (in real app, you'd upload to a server)
        const fileUrl = URL.createObjectURL(file)
        
        const uploadedFile: UploadedFile = {
          id: uploadConfig.id,
          name: file.name,
          url: fileUrl,
          type: file.type
        }
        
        newFiles.push(uploadedFile)
      }
      
      // Update the files array
      const updatedFiles = [...files, ...newFiles]
      onChange(updatedFiles)
      
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Error uploading files. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (fileToRemove: UploadedFile) => {
    const updatedFiles = files.filter(file => file !== fileToRemove)
    onChange(updatedFiles)
    
    // Clean up object URL
    URL.revokeObjectURL(fileToRemove.url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium text-gray-900">
          {uploadConfig.name}
          {uploadConfig.required && <span className="text-red-500 ml-1">*</span>}
        </h4>
      </div>

      {uploadConfig.description && (
        <p className="text-sm text-gray-600">{uploadConfig.description}</p>
      )}

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={uploadConfig.acceptedTypes.join(',')}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <div className="text-center">
          {uploading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-blue-600">Uploading...</span>
            </div>
          ) : (
            <>
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="mt-4">
                <p className="text-base text-gray-600">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {uploadConfig.acceptedTypes.join(', ')} up to {uploadConfig.maxSize}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-700">Uploaded Files:</h5>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center space-x-3">
                {file.type.startsWith('image/') && (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.type}</p>
                </div>
              </div>
              
              <button
                onClick={() => removeFile(file)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Validation */}
      {uploadConfig.required && files.length === 0 && (
        <p className="text-sm text-red-600">At least one file is required</p>
      )}
    </div>
  )
} 