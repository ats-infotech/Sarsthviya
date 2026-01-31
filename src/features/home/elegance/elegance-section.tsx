'use client';
import { Button } from '@/components/ui/button';
import { eleganceSection } from '@/constants/text-constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function EleganceSection() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? eleganceSection.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === eleganceSection.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className='relative mx-auto my-30 h-215.75 w-full overflow-hidden'>
      {/* Slides */}
      <div
        className='flex transition-transform duration-700 ease-in-out'
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {eleganceSection.map((slide) => (
          <div key={slide.id} className='relative h-215.75 w-full shrink-0'>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className='object-center'
              unoptimized
            />

            {/* Overlay Text */}
            {/* <div className='relative max-w-auto h-full inset-0 flex justify-between px-6 text-black sm:px-16'>
                  <h3 className='absolute top-35 left-28 text-[80px]! font-bold uppercase sm:text-5xl'>
                    {slide.titleText}
                  </h3>

                  <p
                    className={`tracking-tight! text-3xl! max-h-auto absolute z-10 mt-2 max-w-[470px] font-semibold uppercase sm:text-lg ${
                      index === 0
                        ? 'bottom-60 right-24 text-black text-shadow-black/5!' // slide 1
                        : index === 1
                          ? 'bottom-52! right-24 text-black text-shadow-black!' // slide 2
                          : index === 2
                            ? 'bottom-52! right-16 text-white text-shadow-black!' // slide 3
                            : index === 3
                              ? 'bottom-72! right-16 text-white text-shadow-black!' // slide 4
                              : ''
                    } `}
                  >
                    {slide.subTitleText}
                  </p>
                </div> */}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className='absolute top-1/2 left-0 z-30 flex w-full -translate-y-1/2 justify-between px-4 sm:px-10'>
        <Button
          onClick={prevSlide}
          className='bg-text-primary pointer-events-auto relative left-4 overflow-hidden rounded-full p-2 text-black before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:bg-black before:transition-transform before:duration-300 hover:text-white hover:before:scale-x-100 sm:left-6 sm:p-3 lg:left-10'
        >
          <span className='relative z-10'>
            <ChevronLeft className='h-4 w-4 sm:h-5 sm:w-5' />
          </span>
        </Button>

        <Button
          onClick={nextSlide}
          className='bg-text-primary pointer-events-auto relative right-4 overflow-hidden rounded-full p-2 text-black before:absolute before:inset-0 before:z-0 before:origin-right before:scale-x-0 before:bg-black before:transition-transform before:duration-300 hover:text-white hover:before:scale-x-100 sm:right-6 sm:p-3 lg:right-10'
        >
          <span className='relative z-10'>
            <ChevronRight className='h-4 w-4 sm:h-5 sm:w-5' />
          </span>
        </Button>
      </div>
    </div>
  );
}
