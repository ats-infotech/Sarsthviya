'use client';

import { useState, useEffect } from 'react';
import { Ruler, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChartSidebar } from '@/context/sizechart-sidebar-context';
import Image from 'next/image';
import {
  sizeChartData,
  sizeChartHeader,
  websiteText
} from '@/constants/text-constants';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';

export default function ChartSidebar() {
  const { isChartOpen, closeChartSidebar } = useChartSidebar();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle animation
  useEffect(() => {
    if (isChartOpen) {
      document.body.style.overflow = 'hidden';
      setIsVisible(true);
      const animationTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);

      return () => clearTimeout(animationTimer);
    } else if (!isChartOpen && isVisible) {
      setIsAnimating(false);
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'auto';
      }, 300);

      return () => clearTimeout(hideTimer);
    }
  }, [isChartOpen]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-60 bg-black/60 transition-all duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeChartSidebar}
      />

      <div
        className={`bg-background-secondary fixed top-0 right-0 z-70 h-full w-full max-w-125 overflow-hidden rounded-l-lg! shadow-2xl transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='sticky top-0 z-10'>
          <div className='flex items-center justify-between px-6 py-4'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-background-secondary h-8 w-8 rounded-full'
              onClick={closeChartSidebar}
            >
              <X className='h-5.5 w-5.5' />
            </Button>
          </div>
          <div className='h-px bg-[linear-gradient(90deg,#0D0C0A_0%,rgba(13,12,10,0)_100%)]'></div>
        </div>

        <div className='max-h-[calc(100vh-64px)] overflow-y-scroll px-5 pb-5'>
          <div
            className='relative mt-7.5 rounded-2xl p-0.5 shadow-[0px_0px_30px_0px_#C48C5C1F]'
            style={{
              background:
                'linear-gradient(180deg, #FFE0B2 0%, rgba(255, 224, 178, 0) 100%)',
              backgroundClip: 'padding-box, border-box',
              border: '1px solid transparent',
              position: 'relative'
            }}
          >
            <div
              className='absolute inset-0 -z-10 rounded-2xl'
              style={{
                background:
                  'linear-gradient(180deg, #FFE0B2 0%, rgba(255, 224, 178, 0) 100%)',
                padding: '1px',
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude'
              }}
            />

            <div className='bg-background-secondary relative z-10 rounded-[14px] p-5'>
              <div>
                <p className='text-accent flex items-center gap-2.5 text-sm font-medium'>
                  <Ruler className='h-4 w-4' />
                  {websiteText?.sizeChart}
                </p>
              </div>

              <p className='text-text-secondary mt-4 mb-2.5 text-xs font-medium'>
                {websiteText?.sizeChartDescription}
              </p>

              <div className='overflow-x-auto'>
                <div className='border-accent relative overflow-hidden rounded-lg border'>
                  <Table className='border-collapse border-spacing-0'>
                    <TableHeader>
                      <TableRow className='border-accent border-b'>
                        {sizeChartHeader?.length > 0 &&
                          sizeChartHeader?.map((item, index) => (
                            <TableHead
                              key={index}
                              className='border-accent border-r px-1.5 py-2 text-center text-xs font-semibold last:border-r-0'
                            >
                              {item?.title}
                            </TableHead>
                          ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sizeChartData?.map((row, rowIndex) => (
                        <TableRow
                          key={rowIndex}
                          className={`border-accent border-b ${rowIndex === sizeChartData.length - 1 ? 'border-b-0' : ''}`}
                        >
                          {sizeChartHeader?.map((header, cellIndex) => {
                            const key = header.key as keyof typeof row;
                            return (
                              <TableCell
                                key={cellIndex}
                                className='border-accent border-r px-4 py-2 text-center text-xs last:border-r-0'
                              >
                                {row[key] || '-'}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Image
              src={'/assets/images/size-chart.png'}
              alt='sizeChart'
              width={356}
              height={700}
              className='mx-auto'
            />
          </div>

          <div className='mt-12.5 flex flex-col gap-6'>
            {websiteText?.sizeRules?.length > 0 &&
              websiteText?.sizeRules?.map((items, i) => {
                return (
                  <div
                    key={i}
                    className='bg-background-secondary relative rounded-2xl p-5 shadow-[0px_0px_30px_0px_#C48C5C1F]'
                  >
                    <div
                      className='pointer-events-none absolute inset-0 rounded-2xl p-px'
                      style={{
                        background:
                          'linear-gradient(180deg, #FFE0B2 0%, rgba(255, 224, 178, 0) 100%)',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMask:
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'destination-out'
                      }}
                    />
                    <div className='relative z-10'>
                      <h6 className='text-accent text-xs font-semibold'>
                        {items?.title}
                      </h6>
                      <p className='text-text-secondary mt-4 text-xs font-medium'>
                        {items?.description}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
