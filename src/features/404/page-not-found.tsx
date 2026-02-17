'use client';
import { Button } from '@/components/ui/button';
import { websiteText } from '@/constants/text-constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PageNotFound() {
  const router = useRouter();
  return (
    <>
      <Image
        alt='404'
        src={'/assets/images/404.svg'}
        height={573}
        width={1440}
        className='mx-auto'
      />
      <Image
        alt='404'
        src={'/assets/images/404-background.svg'}
        height={573}
        width={1440}
        className='absolute -z-1 mx-auto w-full pt-23.5'
      />
      <p className='text-center text-base font-medium text-black sm:text-[30px] lg:text-[50px]'>
        {websiteText?.ohNoItSeemsWeHaveLostTheThread}
      </p>
      <p className='text-center text-sm font-medium text-black sm:text-base lg:text-xl'>
        {
          websiteText?.thePageYouAreLookingForIsTangledUpInOurStudioLetsGetYouBackToShopping
        }
      </p>
      <div className='mt-7 flex justify-center gap-5 px-5 pb-25'>
        <Button className='bg-accent text-text-tertiary h-12.5 max-w-87.5 text-sm font-semibold sm:text-base md:w-full'>
          {websiteText?.shopCollection}
        </Button>
        <Button
          className='border-accent text-text-secondary h-12.5 max-w-87.5 border text-base font-semibold md:w-full'
          onClick={() => router.push('/')}
        >
          {websiteText?.backToHome}
        </Button>
      </div>
    </>
  );
}
