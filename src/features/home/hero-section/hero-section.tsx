'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { websiteText } from '@/constants/text-constants';
import CircularText from '../components/circular-text';

export default function HeroSection() {
  return (
    <>
      <div className='relative w-full'>
        {/* HERO IMAGE */}
        <div className='relative h-screen md:min-h-251'>
          <Image
            src={'/assets/images/hero-section/hero-img.png'}
            alt='hero-img'
            fill
            priority
            className='object-cover'
          />

          {/* HERO CONTENT */}
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 px-2 text-center text-white'>
            <p className='border-x-2 border-white px-2 py-2 text-[10px] font-semibold tracking-[0.25rem] uppercase sm:text-[12px]'>
              {websiteText.Introducing}
            </p>

            <h2 className='text-[28px] font-semibold tracking-[0.1rem] uppercase sm:text-[36px] md:text-[46px]'>
              {websiteText.CordSets}
            </h2>

            <Button className='border-text-primary text-text-primary before:bg-text-primary relative overflow-hidden rounded-sm border px-7 py-4 transition-colors duration-300 before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:text-black hover:before:scale-x-100 sm:px-9 sm:py-5'>
              <span className='relative z-10'>{websiteText.shopNow}</span>
            </Button>
          </div>

          {/* OFFER BADGE */}
          <div className='w-full'>
            <div className='absolute -bottom-16.25 left-1/2 z-20 -translate-x-1/2'>
              <CircularText size={160} text={websiteText.offerText} />
            </div>

            <div className='absolute -bottom-6 w-full overflow-hidden leading-none'>
              <svg
                viewBox='0 0 1440 120'
                className='min-h-33 w-full'
                preserveAspectRatio='xMidYMid slice'
                fill='#fffcf5'
              >
                <path
                  d='M0,120 
         L1440,120 
         L1440,100 
         L920,100 
         C780,100 815,0 720,0 
         C620,5 660,100 550,100 
         L0,100 Z'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
