import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { saveAs } from 'file-saver';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNavItemActive(
  currentPathname: string,
  itemUrl: string
): boolean {
  // Handle edge cases
  if (!currentPathname || !itemUrl) {
    return false;
  }

  // Exact match
  if (currentPathname === itemUrl) {
    return true;
  }

  // Check if current pathname starts with item URL followed by a slash
  // This handles child routes like /blogs/new, /blogs/123/edit, etc.
  if (currentPathname.startsWith(itemUrl + '/')) {
    return true;
  }

  return false;
}

export const downloadFile = (file: string, fileName: string | null) => {
  if (fileName) {
    return saveAs(file, fileName);
  }
  return saveAs(file);
};