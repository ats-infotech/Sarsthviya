'use client';

import { Button } from '@/components/ui/button';
import { websiteText } from '@/constants/text-constants';
import { useWindowWidth } from '@/lib/useWindowWidth';
import Image from 'next/image';

export default function AboutUs() {
  const width = useWindowWidth();

  return (
    <div className='bg-background-secondary'>
      <div className='flex flex-col items-center px-5 md:flex-row md:px-15.75 xl:px-32.5'>
        <div className='w-full md:w-[60%]'>
          <Image
            src={'/assets/images/about-us/tradition-reimagined.png'}
            alt='img'
            height={637}
            width={704}
            className='mx-auto min-h-85 min-w-75'
          />
        </div>
        <div>
          <p className='text-text-secondary text-[34px] leading-[90%] font-semibold md:text-[50px] xl:text-[66px]'>
            {websiteText?.traditionReimagined}
          </p>
          <p className='text-text-secondary mt-5 text-base font-bold'>
            {websiteText?.craftingTimelessSilhouetteForTheModernWoman}
          </p>
          <Button className='border-accent/40 text-text-secondary mt-5 h-7.75 w-25 rounded-[10px] border text-sm font-semibold md:h-11 md:w-32.5 md:text-base'>
            {websiteText?.ourStory}
          </Button>
        </div>
      </div>
      <div className='relative h-110'>
        <Image
          src={'/assets/images/about-us/hanging-cloths.png'}
          alt='cloths'
          height={440}
          width={1440}
          className='absolute h-110 w-full object-bottom!'
        />
        <div className='relative z-20 flex h-full flex-col items-center justify-center gap-9 lg:flex-row'>
          {websiteText?.aboutUsImages?.map((item, index) => (
            <div
              key={index}
              className='relative h-29 w-33.5 overflow-hidden border border-white/20 bg-black/20 shadow-[-2.3px_1.5px_6px_rgba(0,0,0,0.6)] backdrop-blur-md lg:h-61 lg:w-70'
            >
              <div className='relative w-full'>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={width < 1024 ? 134 : 280}
                  height={width < 1024 ? 116 : 244}
                  unoptimized
                />
              </div>
              <div className='absolute bottom-0 flex h-[30%] w-full items-center justify-center border-t border-white/20 bg-black/10 backdrop-blur-sm'>
                <p className='max-w-40 px-4 text-center text-xs text-white lg:text-xl'>
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-background-primary relative flex h-34.25 w-full items-center justify-center overflow-hidden sm:h-54.25 xl:h-91.25'>
        <p className='text-text-tertiary absolute text-[12vw] leading-none font-bold whitespace-nowrap opacity-9'>
          {websiteText?.slowFashion}
        </p>
        <p className='text-text-tertiary max-w-154.25 text-center text-sm font-bold sm:text-[26px] xl:text-[34px]'>
          {
            websiteText?.weCreatePiecesThatStayInYourWardrobeNotJustYourSocialFeed
          }
        </p>
      </div>
      <div className='bg-text-primary relative h-fit overflow-hidden px-5 pt-2.75 sm:pt-9.5 md:h-128.5 [@media(min-width:1440px)]:px-32.5'>
        <p className='text-accent mb-5 text-center text-base font-bold uppercase sm:text-[34px] md:mb-9'>
          {websiteText?.wallOfFame}
        </p>
        <div className='mx-auto grid w-fit grid-cols-3 gap-5 md:gap-6.5 lg:grid-cols-4 xl:grid-cols-5'>
          <div>
            <Image
              alt='img1'
              src={'/assets/images/about-us/img1.png'}
              height={width < 768 ? 77 : 164}
              width={215}
              className='mb-3 md:mb-7'
            />
            <Image
              alt='img2'
              src={'/assets/images/about-us/img2.png'}
              height={width < 768 ? 93 : 199}
              width={215}
            />
          </div>
          <div>
            <Image
              alt='img3'
              src={'/assets/images/about-us/img3.png'}
              height={width < 768 ? 115 : 247}
              width={215}
              className='mb-3 md:mb-7'
            />
            <Image
              alt='img4'
              src={'/assets/images/about-us/img4.png'}
              width={215}
              height={width < 768 ? 127 : 274}
            />
          </div>
          <div>
            <Image
              alt='img5'
              src={'/assets/images/about-us/img5.png'}
              height={width < 768 ? 47 : 102}
              width={215}
              className='mb-3 md:mb-7'
            />
            <Image
              alt='img6'
              src={'/assets/images/about-us/img6.png'}
              width={215}
              height={width < 768 ? 133 : 284}
            />
          </div>
          {width > 1279 && (
            <div>
              <Image
                alt='img7'
                src={'/assets/images/about-us/img7.png'}
                height={286}
                width={215}
                className='mb-7'
              />
              <Image
                alt='img8'
                src={'/assets/images/about-us/img8.png'}
                width={215}
                height={161}
              />
            </div>
          )}
          {width > 1023 && (
            <div>
              <Image
                alt='img9'
                src={'/assets/images/about-us/img9.png'}
                height={353}
                width={215}
                className='mb-7'
              />
              <Image
                alt='img10'
                src={'/assets/images/about-us/img10.png'}
                width={215}
                height={164}
              />
            </div>
          )}
        </div>
      </div>
      <div className='bg-background-secondary mx-auto flex h-84 w-full max-w-82.5 items-center justify-between py-2.5 sm:max-w-162.5 lg:max-w-295 lg:px-22.5'>
        <Image
          alt='founder'
          src={'/assets/images/about-us/founder.png'}
          width={179}
          height={207}
        />
        <div className='border-accent-tertiary/40 mx-5 h-full border-2'></div>
        <div className='w-full max-w-54.25 sm:max-w-107.5 lg:max-w-146'>
          <p className='text-base font-semibold text-black lg:text-xl'>
            {websiteText?.founderThought}
          </p>
          <p className='text-base font-semibold text-black lg:text-xl'>
            {websiteText?.founderThoughtDescription}
          </p>
          <p className='mt-5 text-[25px] font-normal text-black sm:text-[40px] lg:text-[60px]'>
            {websiteText?.founderSignature}
          </p>
        </div>
      </div>
    </div>
  );
}
