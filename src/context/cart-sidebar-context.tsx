'use client';

import React, { createContext, useContext, useState } from 'react';

interface CartSidebarContextType {
  isCartOpen: boolean;
  openCartSidebar: () => void;
  closeCartSidebar: () => void;
}

const CartSidebarContext = createContext<CartSidebarContextType | undefined>(
  undefined
);

export function CartSidebarProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCartSidebar = () => {
    setIsCartOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartOpen(false);
  };

  return (
    <CartSidebarContext.Provider
      value={{
        isCartOpen,
        openCartSidebar,
        closeCartSidebar
      }}
    >
      {children}
    </CartSidebarContext.Provider>
  );
}

export function useCartSidebar() {
  const context = useContext(CartSidebarContext);
  if (context === undefined) {
    throw new Error('useCartSidebar must be used within a CartSidebarProvider');
  }
  return context;
}
