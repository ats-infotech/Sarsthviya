'use client';
import ProductCard from '@/components/product-card';
import Carousel from '@/components/ui/carousel';
import { bestSellerSection } from '@/constants/text-constants';
import HomePageTitle from '../components/page-title';
import { useWindowWidth } from '@/lib/useWindowWidth';

export default function BestSellerSection() {
  const width = useWindowWidth();
  const slidesToShow =
    width < 710 ? 1 : width < 1024 ? 2 : width < 1301 ? 3 : 4;

  return (
    <div className='bg-background-secondary flex flex-col items-center'>
      <HomePageTitle
        title={bestSellerSection?.title}
        width={width < 640 ? 110 : width < 1024 ? 145 : 177}
        height={width < 640 ? 15 : width < 1024 ? 18 : 24}
      />
      <Carousel
        slidesToShow={slidesToShow}
        slideWidth={width < 400 ? 200 : 280}
        gap={20}
        showDots={false}
      >
        {bestSellerSection?.products?.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </Carousel>
    </div>
  );
}
