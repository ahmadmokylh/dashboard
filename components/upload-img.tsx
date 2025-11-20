'use client';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Trash } from 'lucide-react';

interface Props {
  onUploaded: (url: string) => void;
}

const UploadImg: React.FC = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();

  const handleDrop = async (files: File[]) => {
    console.log(files[0].name);
    setFiles(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setFilePreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const cancelFile = () => {
    setFiles(undefined);
    setFilePreview(undefined);
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-xl shadow-sm border bg-white">
        <CardContent className="px-6 space-y-6">
          <div className="w-full flex justify-between">
            <h2 className="text-lg font-semibold">صورة المنتج</h2>

            {filePreview && (
              <Button onClick={cancelFile} type="button" variant="outline">
                <Trash />
              </Button>
            )}
          </div>

          {/* Large Preview */}
          <div className="w-full aspect-square rounded-xl bg-muted flex items-center justify-center overflow-hidden">
            <Dropzone
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
              onDrop={handleDrop}
              onError={console.error}
              src={files}
              className="h-full"
            >
              <DropzoneEmptyState />
              <DropzoneContent>
                {filePreview && (
                  <div className="h-[102px] w-full">
                    <Image
                      height={250}
                      width={250}
                      alt="Preview"
                      className="absolute top-0 left-0 h-full w-full object-cover"
                      src={filePreview}
                    />
                  </div>
                )}
              </DropzoneContent>
            </Dropzone>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default UploadImg;
