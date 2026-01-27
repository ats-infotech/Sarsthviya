'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarRail
} from '@/components/ui/sidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import React, { useEffect, useState } from 'react';
import { headerItems } from '@/constants/text-constants';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

export default function HomeMobileSidebar() {
  const { isOpen } = useMediaQuery();
  const [openMenu, setOpenMenu] = useState({
    shopWomen: false,
    collection: false,
    explore: false
  });
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkLargeScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkLargeScreen();
    window.addEventListener('resize', checkLargeScreen);
    return () => window.removeEventListener('resize', checkLargeScreen);
  }, []);

  useEffect(() => {
    if (!isOpen || isLargeScreen) {
      setOpenMenu({
        shopWomen: false,
        collection: false,
        explore: false
      });
    }
  }, [isOpen, isLargeScreen]);

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  if (isLargeScreen) {
    6;
    return null;
  }

  const toggleMenu = (menuKey: keyof typeof openMenu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const getMenuKey = (title: string): keyof typeof openMenu => {
    switch (title) {
      case 'Shop Women':
        return 'shopWomen';
      case 'Collections':
        return 'collection';
      case 'Explore':
        return 'explore';
      default:
        return 'shopWomen';
    }
  };

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent className='bg-background-secondary w-75 overflow-x-hidden px-3'>
        <SidebarGroup>
          <SidebarMenu className='mt-22.5'>
            {headerItems?.length > 0 &&
              headerItems?.map((items) => {
                const menuKey = getMenuKey(items.title);
                const isMenuOpen = openMenu[menuKey];
                return (
                  <div
                    key={items?.title}
                    className='border-text-secondary border-b py-3'
                  >
                    <div
                      className='flex cursor-pointer items-center justify-between'
                      onClick={() =>
                        items.title !== 'Explore' && toggleMenu(menuKey)
                      }
                    >
                      <p className='text-xs font-semibold text-black'>
                        {items?.title}
                      </p>
                      {items?.title !== 'Explore' && isMenuOpen && (
                        <ChevronUp />
                      )}
                      {items?.title !== 'Explore' && !isMenuOpen && (
                        <ChevronDown />
                      )}
                    </div>
                    {isMenuOpen && (
                      <div className='max-w-65'>
                        <ScrollArea className='h-full w-full'>
                          <div className='flex gap-8'>
                            {items?.subchild &&
                              items?.subchild?.length > 0 &&
                              items?.subchild?.map((item) => {
                                return (
                                  <div
                                    className='flex flex-col gap-3 p-0'
                                    key={item?.menuTitle}
                                  >
                                    <div className='border-accent-quaternary/20 mt-5.5 flex h-12 w-12 items-center justify-center rounded-xl border bg-white'>
                                      {item?.icon && (
                                        <Image
                                          alt='cloths'
                                          src={item?.icon}
                                          width={24}
                                          height={24}
                                        />
                                      )}
                                    </div>
                                    <p className='text-text-secondary text-center text-xs font-semibold'>
                                      {item?.menuTitle}
                                    </p>
                                  </div>
                                );
                              })}
                          </div>
                          <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                      </div>
                    )}
                  </div>
                );
              })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
