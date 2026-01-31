'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

interface ProductSidebarContextType {
  isOpen: boolean;
  selectedProduct: Product | null;
  openProductSidebar: (product: Product) => void;
  closeProductSidebar: () => void;
}

const ProductSidebarContext = createContext<
  ProductSidebarContextType | undefined
>(undefined);

export function ProductSidebarProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openProductSidebar = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
    // Prevent body scroll when product sidebar is open
    document.body.style.overflow = 'hidden';
  };

  const closeProductSidebar = () => {
    setIsOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'auto';
    // Clear product after animation completes
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ProductSidebarContext.Provider
      value={{
        isOpen,
        selectedProduct,
        openProductSidebar,
        closeProductSidebar
      }}
    >
      {children}
    </ProductSidebarContext.Provider>
  );
}

export function useProductSidebar() {
  const context = useContext(ProductSidebarContext);
  if (context === undefined) {
    throw new Error(
      'useProductSidebar must be used within a ProductSidebarProvider'
    );
  }
  return context;
}
