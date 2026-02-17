import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';
import FileCard from './ui/file-card';
import { FormField, FormItem, FormMessage } from './ui/form';
import { FileUploadFieldProps } from '@/types/upload';
import { Icon } from '@iconify/react';
import { IconsString } from './icons';

export function FileUploadField({
  control,
  name,
  className,
  classNameLabel,
  classNameUpload,
  accept,
  maxSize = 5,
  classNameFileSizeText,
  disabled,
  isPreview = true,
  fileName: propFileName,
  type
}: FileUploadFieldProps) {
  const [fileName, setFileName] = useState(propFileName || '');
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [fileType, setFileType] = useState<
    'image' | 'pdf' | 'txt' | 'xlsx' | ''
  >('');
  const [showPreview, setShowPreview] = useState(isPreview);
  const [inputKey, setInputKey] = useState<number>(Date.now());

  const mapExtensionToFileType = (
    fileName: string
  ): 'image' | 'pdf' | 'txt' | 'xlsx' => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image';
    if (ext === 'pdf') return 'pdf';
    if (['doc', 'docx'].includes(ext)) return 'txt';
    if (ext === 'xlsx') return 'xlsx';
    return 'txt';
  };

  const handleFileChange = (file: File, onChange: any) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setFileUrl(fileUrl);
    setFileName(file.name);
    setFileType(mapExtensionToFileType(file.name));
    setShowPreview(true);

    onChange({
      file: fileUrl,
      fileName: file.name
    });
  };

  const removeFile = (onChange: any) => {
    setFileName('');
    setFileUrl(undefined);
    setShowPreview(false);
    setInputKey(Date.now());
    onChange('');
  };

  const currentSingle = fileUrl;
  const currentFileType = fileType || 'txt';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem className='col-span-2 w-full'>
          <div
            className={cn(
              `relative bg-gray-50 ${className}`,
              currentSingle ? 'h-0' : ''
            )}
          >
            <label
              htmlFor={name}
              className={cn(
                `flex cursor-pointer items-center justify-center gap-4 rounded-md border border-dashed px-3 py-8 text-sm ${classNameLabel}`,
                currentSingle ? 'invisible h-0' : ''
              )}
            >
              {type === 'review' ? (
                <div>
                  <Icon
                    icon={IconsString?.uploadLinear}
                    className='text-text-secondary h-12 w-12'
                  />
                </div>
              ) : (
                <div className='max-w-78'>
                  <p className={`text-base font-semibold ${classNameUpload}`}>
                    Click to upload or drag and drop
                  </p>
                  <p
                    className={`text-xs font-normal text-neutral-500 ${classNameFileSizeText}`}
                  >
                    {fileName ||
                      `Supported file types are ${accept} (Max ${maxSize}MB)`}
                  </p>
                </div>
              )}
            </label>

            {!disabled && (
              <input
                id={name}
                key={inputKey}
                type='file'
                className='hidden'
                accept={accept}
                name={field.name}
                onBlur={field.onBlur}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileChange(e.target.files[0], onChange);
                  }
                }}
              />
            )}
          </div>

          {/* PREVIEW AREA */}
          {currentSingle && showPreview && (
            <div
              className={`relative mt-2 h-20 ${currentFileType === 'image' ? 'w-20' : 'flex w-fit items-center gap-2.5'}`}
            >
              {currentFileType === 'image' ? (
                <Image
                  src={currentSingle}
                  alt='Preview'
                  width={80}
                  height={80}
                  className='h-full w-full rounded-lg object-cover'
                />
              ) : (
                <FileCard type={currentFileType} name={fileName} />
              )}

              {!disabled && (
                <Button
                  type='button'
                  onClick={() => removeFile(onChange)}
                  variant='ghost'
                  className={
                    currentFileType === 'image'
                      ? 'text-destructive-foreground absolute top-0 -right-2 cursor-pointer rounded-full bg-gray-100 p-1'
                      : 'cursor-pointer'
                  }
                >
                  <Trash2 size={currentFileType === 'image' ? 14 : 24} />
                </Button>
              )}
            </div>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
