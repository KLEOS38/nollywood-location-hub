
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { X, Upload, Image, Video, FileText } from "lucide-react";
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video' | 'document';
  uploadProgress: number;
  uploaded: boolean;
  url?: string;
}

interface MediaUploaderProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  bucket?: string;
}

const MediaUploader = ({ 
  onUploadComplete, 
  maxFiles = 10,
  acceptedTypes = ['image/*', 'video/*'],
  bucket = 'property-media'
}: MediaUploaderProps) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const getFileType = (file: File): 'image' | 'video' | 'document' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'document';
  };

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        resolve(url);
      } else {
        resolve('');
      }
    });
  };

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    if (files.length + selectedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newFiles: MediaFile[] = [];
    
    for (const file of selectedFiles) {
      // Validate file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 50MB.`);
        continue;
      }

      const preview = await createPreview(file);
      const mediaFile: MediaFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview,
        type: getFileType(file),
        uploadProgress: 0,
        uploaded: false
      };
      
      newFiles.push(mediaFile);
    }

    setFiles(prev => [...prev, ...newFiles]);
  }, [files.length, maxFiles]);

  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const mediaFile of files) {
        if (mediaFile.uploaded) {
          uploadedUrls.push(mediaFile.url!);
          continue;
        }

        const fileExt = mediaFile.file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `${bucket}/${fileName}`;

        // Update progress
        setFiles(prev => prev.map(f => 
          f.id === mediaFile.id ? { ...f, uploadProgress: 50 } : f
        ));

        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, mediaFile.file);

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);

        // Update file as uploaded
        setFiles(prev => prev.map(f => 
          f.id === mediaFile.id 
            ? { ...f, uploadProgress: 100, uploaded: true, url: publicUrl }
            : f
        ));
      }

      toast.success('Files uploaded successfully!');
      onUploadComplete?.(uploadedUrls);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload some files');
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (type: 'image' | 'video' | 'document') => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="media-upload">Upload Media Files</Label>
            <Input
              id="media-upload"
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileSelect}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supports images, videos. Max file size: 50MB each. Max {maxFiles} files.
            </p>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Selected Files</h4>
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                {files.map((mediaFile) => (
                  <div key={mediaFile.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                    <div className="flex-shrink-0">
                      {mediaFile.type === 'image' && mediaFile.preview ? (
                        <img 
                          src={mediaFile.preview} 
                          alt={mediaFile.file.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : mediaFile.type === 'video' && mediaFile.preview ? (
                        <video 
                          src={mediaFile.preview}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                          {getFileIcon(mediaFile.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{mediaFile.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(mediaFile.file.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                      
                      {mediaFile.uploadProgress > 0 && !mediaFile.uploaded && (
                        <Progress value={mediaFile.uploadProgress} className="mt-1 h-1" />
                      )}
                      
                      {mediaFile.uploaded && (
                        <p className="text-xs text-green-600 mt-1">Uploaded</p>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(mediaFile.id)}
                      disabled={isUploading}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={uploadFiles} 
                disabled={isUploading || files.every(f => f.uploaded)}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Upload className="w-4 h-4 mr-2 animate-pulse" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaUploader;
