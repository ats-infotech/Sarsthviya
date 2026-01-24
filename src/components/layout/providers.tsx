'use client';

import React from 'react';
import { ActiveThemeProvider } from '../active-theme';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/react-query';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ActiveThemeProvider>
    </>
  );
}
