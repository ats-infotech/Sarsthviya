'use client';
import { seasonalOfferSection } from '@/constants/text-constants';
import HomePageTitle from '../components/page-title';
import Image from 'next/image';
import { useWindowWidth } from '@/lib/useWindowWidth';

export default function SeasonalOffer() {
  const width = useWindowWidth();

  return (
    <div className='pb-25'>
      <HomePageTitle
        title={seasonalOfferSection?.title}
        width={262}
        height={35}
      />
      <div className='mx-auto grid w-fit grid-cols-1 gap-1.5 md:grid-cols-3! [@media(min-width:550px)]:grid-cols-2'>
        {seasonalOfferSection?.offerInfo?.length > 0 &&
          seasonalOfferSection?.offerInfo?.map((items, i) => {
            return (
              <div
                className='relative h-80 w-62.5 overflow-hidden rounded-[10px] xl:h-125 xl:w-97.5'
                key={i}
              >
                <div className='relative z-0'>
                  <Image
                    src={'/assets/images/seasonal-offer/offercard.gif'}
                    width={width < 1280 ? 320 : 390}
                    height={width < 1280 ? 250 : 500}
                    alt='bg'
                  />
                </div>

                <div className='pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-1/2 bg-linear-to-t from-black via-black/40 to-transparent' />

                <div className='absolute top-10 right-0 left-0 flex items-center justify-center'>
                  <Image
                    src={items?.image}
                    alt='img'
                    height={width < 1280 ? 250 : 500}
                    width={width < 1280 ? 110 : 210}
                    className='z-10 h-full'
                    unoptimized
                  />
                </div>
                <div className='absolute bottom-5.5 z-20 flex w-full flex-col justify-center'>
                  <h6 className='order-0 flex-none grow-0 self-stretch bg-linear-to-b from-[#FFB87E] via-[#EED6A5] to-[#FFB87E] bg-clip-text text-center text-sm font-bold text-transparent xl:text-xl'>
                    {items?.offerTitle}
                  </h6>
                  <p className='order-0 flex-none grow-0 self-stretch bg-linear-to-b from-[#FFB87E] via-[#EED6A5] to-[#FFB87E] bg-clip-text text-center text-2xl font-normal text-transparent xl:text-4xl'>
                    {items?.offer}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
