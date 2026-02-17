'use client';

import { Open_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import HomeMobileSidebar from '@/components/layout/home-mobile-sidebar';
import { ProductSidebarProvider } from '@/context/product-sidebar-context';
import ProductSidebar from '@/components/layout/product-sidebar';
import { ChartSidebarProvider } from '@/context/sizechart-sidebar-context';
import ChartSidebar from '@/components/layout/chart-sidebar';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/react-query';
import { CartSidebarProvider } from '@/context/cart-sidebar-context';
import CartSidebar from '@/components/layout/cart-sidebar';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${openSans.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>
            <ProductSidebarProvider>
              <CartSidebarProvider>
                <ChartSidebarProvider>
                  <Toaster />
                  <SidebarProvider defaultOpen={false}>
                    <HomeMobileSidebar />
                    <SidebarInset>{children}</SidebarInset>
                  </SidebarProvider>
                  <ProductSidebar />
                  <ChartSidebar />
                  <CartSidebar />
                </ChartSidebarProvider>
              </CartSidebarProvider>
            </ProductSidebarProvider>
          </NuqsAdapter>
        </QueryClientProvider>
      </body>
    </html>
  );
}
