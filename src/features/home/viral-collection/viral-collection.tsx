'use client';
import {
  viralCollectionSection,
  websiteText
} from '@/constants/text-constants';
import HomePageTitle from '../components/page-title';
import Image from 'next/image';
import { useWindowWidth } from '@/lib/useWindowWidth';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function ViralCollections() {
  const width = useWindowWidth();
  return (
    <div>
      <HomePageTitle
        title={viralCollectionSection?.title}
        width={width < 640 ? 150 : width < 1024 ? 194 : 280}
        height={width < 640 ? 15 : width < 1024 ? 26 : 37}
      />
      <div className='flex items-center justify-center gap-5 overflow-hidden lg:gap-9.5'>
        <div className='relative h-33.75 w-15.5 overflow-hidden rounded-[15px] md:h-59 md:w-25 md:rounded-[25px] lg:h-88 lg:w-40.5 xl:h-117 xl:w-54'>
          <div className='absolute inset-0 z-10 bg-[linear-gradient(240deg,rgba(255,255,255,0)_-290.43%,#F6F6F6_97.83%)]' />
          <Image
            src='/assets/images/viral-collection/viral-collection.gif'
            alt='viral'
            fill
            className='z-0 object-cover'
          />
        </div>
        <div className='relative h-37.5 w-17 overflow-hidden rounded-[15px] md:h-65 md:w-30 md:rounded-[25px] lg:h-97.5 lg:w-45 xl:h-130 xl:w-60'>
          <Image
            src='/assets/images/viral-collection/viral-collection.gif'
            alt='gif'
            fill
            className='object-cover'
          />
        </div>
        <div className='relative h-44.5 min-w-21.5 md:h-77 md:min-w-36 lg:h-116 lg:min-w-56 xl:h-155 xl:min-w-75'>
          <Image
            alt='iphone'
            src='/assets/images/viral-collection/iPhone-16.png'
            fill
            className='relative'
          />
          <div className='absolute top-1.5 left-1.5 z-10 h-41.5 w-18.5 overflow-hidden rounded-[10px] md:top-2 md:left-2.5 md:h-73 md:w-31 md:rounded-[20px] lg:h-112 lg:w-51 lg:rounded-[30px] xl:h-151 xl:w-70 xl:rounded-[45px]'>
            <Image
              src='/assets/images/viral-collection/viral-collection.gif'
              alt='gif'
              fill
              className='object-cover'
            />
          </div>
          <div className='absolute top-3 left-6.5 z-20 h-3 w-9 rounded-full bg-black md:top-4 md:left-11 md:h-5 md:w-14 lg:top-5 lg:left-17 lg:h-6 lg:w-22 xl:left-27'></div>
          <div className='absolute bottom-0 -left-1 z-20 md:bottom-3 md:left-0 lg:bottom-9 lg:left-3.5'>
            <Button className='text-text-tertiary text-[8px] font-semibold md:text-xs lg:text-lg xl:text-xl'>
              {websiteText?.viewProducts}
              <ChevronRight className='h-3! w-3! md:h-6! md:w-6!' />
            </Button>
          </div>
        </div>
        <div className='relative h-37.5 w-17 overflow-hidden rounded-[15px] md:h-65 md:w-30 md:rounded-[25px] lg:h-97.5 lg:w-45 xl:h-130 xl:w-60'>
          <Image
            src='/assets/images/viral-collection/viral-collection.gif'
            alt='gif'
            fill
            className='object-cover'
          />
        </div>
        <div className='relative h-33.75 w-15.5 overflow-hidden rounded-[15px] md:h-59 md:w-25 md:rounded-[25px] lg:h-88 lg:w-40.5 xl:h-117 xl:w-54'>
          <div className='absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0)_-290.43%,#F6F6F6_97.83%)]' />
          <Image
            src='/assets/images/viral-collection/viral-collection.gif'
            alt='viral'
            fill
            className='z-0 object-cover'
          />
        </div>
      </div>
    </div>
  );
}
