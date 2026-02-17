'use client';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { similarProductSection, websiteText } from '@/constants/text-constants';
import HomePageTitle from '@/features/home/components/page-title';
import { useWindowWidth } from '@/lib/useWindowWidth';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';

export default function SimilarProductSection() {
  const [hover, setHover] = useState<boolean>(false);
  const width = useWindowWidth();
  return (
    <>
      <div className='background-secondary pb-25'>
        <HomePageTitle
          title={similarProductSection?.title}
          width={width < 640 ? 105 : width < 1024 ? 140 : 188}
          height={width < 640 ? 15 : width < 1024 ? 18 : 25}
        />
        <div className='mx-auto grid w-fit grid-cols-1 gap-8 [@media(min-width:1024px)]:grid-cols-3! [@media(min-width:1301px)]:grid-cols-4! [@media(min-width:710px)]:grid-cols-2'>
          {similarProductSection?.products?.length > 0 &&
            similarProductSection?.products?.map((items) => {
              return (
                <div key={items?.id}>
                  <ProductCard product={items} />
                </div>
              );
            })}
        </div>
        <div className='mt-10 flex justify-center'>
          <Button
            className='btn-slide-right view-more border-accent relative flex h-10 w-35 items-center justify-center border'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <span>{websiteText?.viewAll}</span>
            {hover && (
              <MoveRight className='ml-2 h-4 w-4 transition-all duration-300' />
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
