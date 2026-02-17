'use client';

import React, { createContext, useContext, useState } from 'react';

interface ChartSidebarContextType {
  isChartOpen: boolean;
  openChartSidebar: () => void;
  closeChartSidebar: () => void;
}

const ChartSidebarContext = createContext<ChartSidebarContextType | undefined>(
  undefined
);

export function ChartSidebarProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isChartOpen, setIsChartOpen] = useState(false);

  const openChartSidebar = () => {
    setIsChartOpen(true);
  };

  const closeChartSidebar = () => {
    setIsChartOpen(false);
  };

  return (
    <ChartSidebarContext.Provider
      value={{
        isChartOpen,
        openChartSidebar,
        closeChartSidebar
      }}
    >
      {children}
    </ChartSidebarContext.Provider>
  );
}

export function useChartSidebar() {
  const context = useContext(ChartSidebarContext);
  if (context === undefined) {
    throw new Error(
      'useChartSidebar must be used within a ChartSidebarProvider'
    );
  }
  return context;
}
