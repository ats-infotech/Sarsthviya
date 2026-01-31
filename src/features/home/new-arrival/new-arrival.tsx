'use client';
import ProductCard from '@/components/product-card';
import Carousel from '@/components/ui/carousel';
import { newArrivalSection } from '@/constants/text-constants';
import HomePageTitle from '../components/page-title';
import { useWindowWidth } from '@/lib/useWindowWidth';

export default function NewArrivalSection() {
  const width = useWindowWidth();
  const slidesToShow =
    width < 710 ? 1 : width < 1024 ? 2 : width < 1301 ? 3 : 4;

  return (
    <div className='bg-background-secondary mt-25 flex flex-col items-center pb-25'>
      <HomePageTitle
        title={newArrivalSection?.title}
        width={width < 640 ? 120 : width < 1024 ? 157 : 219}
        height={width < 640 ? 15 : width < 1024 ? 18 : 29}
      />
      <Carousel
        slidesToShow={slidesToShow}
        slideWidth={width < 400 ? 200 : 280}
        gap={20}
        showDots={false}
      >
        {newArrivalSection?.products?.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </Carousel>
    </div>
  );
}
