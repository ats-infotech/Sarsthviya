'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position='top-right'
      style={
        {
          '--normal-bg': 'var(--white)',
          '--normal-text': 'var(--accent)',
          '--normal-border': 'var(--white)'
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
