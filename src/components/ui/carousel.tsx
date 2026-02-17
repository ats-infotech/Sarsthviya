'use client';

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

type CarouselProps = {
  children: ReactNode;
  options?: EmblaOptionsType;
  showArrows?: boolean;
  showDots?: boolean;
  arrowLeftClassName?: string;
  arrowRightClassName?: string;
  dotClassName?: string;
  slidesToShow?: number;
  slideWidth?: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayDelay?: number;
};

export default function Carousel({
  children,
  options = {},
  showArrows = true,
  showDots = true,
  dotClassName = '',
  slidesToShow = 4,
  slideWidth = 280,
  gap = 20,
  autoPlay = false,
  autoPlayDelay = 1000
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    ...options
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  // const [isHovering, setIsHovering] = useState(false)

  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  const shouldShowArrows = showArrows && totalSlides > slidesToShow;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    if (!autoPlay) return;
    // if (isHovering) return

    const interval = setInterval(() => {
      emblaApi.canScrollNext() ? emblaApi.scrollNext() : emblaApi.scrollTo(0);
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [emblaApi, autoPlay, autoPlayDelay]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      className='relative mx-auto'
      // onMouseEnter={() => setIsHovering(true)}
      // onMouseLeave={() => setIsHovering(false)}
    >
      {/* Viewport MUST be full-width relative */}
      <div
        ref={emblaRef}
        className='overflow-hidden'
        style={{
          width: `${slidesToShow * slideWidth + (slidesToShow - 1) * gap}px`
        }}
      >
        {/* Track */}
        <div className='flex'>
          {slides.map((child, index) => (
            <div
              key={index}
              className='flex-[0_0_auto]'
              style={{
                width: `${slideWidth}px`,
                marginRight: index < totalSlides - 1 ? `${gap}px` : '0'
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {shouldShowArrows && (
        <>
          <Button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className='btn-slide-right bg-text-primary absolute top-1/2 -left-4.5 h-9 w-9 -translate-x-full -translate-y-1/2 rounded-full text-black hover:text-white'
          >
            <ChevronLeft className='h-5 w-5' />
          </Button>

          <Button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className='btn-slide-left bg-text-primary absolute top-1/2 -right-2.5 h-9 w-9 translate-x-full -translate-y-1/2 rounded-full text-black hover:text-white'
          >
            <ChevronRight className='h-5 w-5' />
          </Button>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className='mt-6 flex justify-center gap-2'>
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                selectedIndex === index ? 'bg-accent w-6' : 'w-2 bg-gray-300'
              } ${dotClassName}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
