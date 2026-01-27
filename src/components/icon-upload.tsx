import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { IconUpload as IconUploadIcon, IconX } from '@tabler/icons-react';

interface IconUploadProps {
  value?: string; // icon URL
  onChange?: (url: string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

const IconUpload: React.FC<IconUploadProps> = ({
  value,
  onChange,
  disabled,
  className,
  label
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange?.(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    setPreview(undefined);
    onChange?.('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`flex flex-col items-start space-y-2 ${className || ''}`}>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className='hidden'
        disabled={disabled}
        onChange={handleFileChange}
        data-testid='icon-upload-input'
        aria-label={label}
      />
      <label
        htmlFor='icon-upload-input'
        className={`flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 ${
          disabled ? 'pointer-events-none opacity-50' : ''
        }`}
        onClick={() => !disabled && inputRef.current?.click()}
        data-testid='icon-upload-label'
      >
        {preview ? (
          <div className='relative h-12 w-12'>
            <Image
              src={preview}
              alt='Icon preview'
              width={48}
              height={48}
              className='rounded object-cover'
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
            <button
              type='button'
              onClick={handleRemove}
              className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600'
              disabled={disabled}
              tabIndex={-1}
              data-testid='icon-upload-remove'
            >
              <IconX className='h-3 w-3' />
            </button>
          </div>
        ) : (
          <IconUploadIcon className='h-6 w-6 text-gray-400' />
        )}
      </label>
      <p className='text-sm text-gray-500'>
        {preview ? 'Icon ready' : 'Click to upload an icon (PNG, JPG, SVG)'}
      </p>
    </div>
  );
};

export default IconUpload;
