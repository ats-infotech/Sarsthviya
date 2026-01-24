export interface UploadFile {
  url: string;
  fileName: string;
  size: number;
  mimeType: string;
}

export interface UploadResponse {
  data: UploadFile;
  message: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export type FileUploadFieldProps<T extends FieldValues = any> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  accept?: string;
  maxSize?: number;
  className?: string;
  classNameLabel?: string;
  classNameUpload?: string;
  classNameFileSizeText?: string;
  imagePath?: string;
  onFileUpload?: (info?: {
    filePath?: string;
    fileType?: string;
    fileSize?: number;
    fileName?: string;
    file?: File;
  }) => void;
  onFileRemove?: () => void;
  isPreview?: boolean;
  uploadText?: string;
  required?: boolean;
  disabled?: boolean;
  fileName?: string;
  expiryDate?: Date | null;
  uploadDialogTriggerBtn?: React.ReactNode;
};
