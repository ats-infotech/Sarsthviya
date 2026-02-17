'use client';
import ProductCard from '@/components/product-card';
import Carousel from '@/components/ui/carousel';
import { otherCategoriesSection } from '@/constants/text-constants';
import HomePageTitle from '@/features/home/components/page-title';
import { useWindowWidth } from '@/lib/useWindowWidth';

export default function OtherCategories() {
  const width = useWindowWidth();
  const slidesToShow =
    width < 710 ? 1 : width < 1024 ? 2 : width < 1301 ? 3 : 4;
  return (
    <>
      <div className='bg-background-secondary flex flex-col items-center justify-center pb-25'>
        <HomePageTitle
          title={otherCategoriesSection?.title}
          width={width < 640 ? 105 : width < 1024 ? 140 : 188}
          height={width < 640 ? 15 : width < 1024 ? 18 : 25}
        />
        <Carousel
          slidesToShow={slidesToShow}
          slideWidth={width < 400 ? 200 : 280}
          gap={20}
          showDots={false}
        >
          {otherCategoriesSection?.products?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </Carousel>
      </div>
    </>
  );
}
