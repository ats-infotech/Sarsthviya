import Image from 'next/image';
import { websiteText } from '@/constants/text-constants';

export default function DiwaliDhamakaSection() {
  return (
    <div className='my-10 md:my-20'>
      <div className='bg-background-secondary relative h-150 w-full overflow-hidden sm:h-200 md:h-262.5'>
        {/* Background Base Image */}
        <Image
          src={'/assets/images/diwali-dhamaka/bg-img.jpg'}
          alt='bg-image'
          fill
          className='object-cover'
        />

        <div className='from-background-secondary/90 to-background-secondary/90 absolute inset-0 bg-linear-to-r via-transparent' />

        {/* Confetti */}
        <div className='absolute top-0 z-10 flex w-full justify-around opacity-70'>
          <Image
            src={'/assets/diwali-dhamaka/confettiLight.gif'}
            className='h-50 w-auto md:h-112.5'
            alt='Confetti'
            fill
          />
          <Image
            src={'/assets/diwali-dhamaka/confettiLight.gif'}
            className='h-50 w-auto md:h-112.5'
            alt='Confetti'
            fill
          />
          <Image
            src={'/assets/diwali-dhamaka/confettiLight.gif'}
            className='h-50 w-auto md:h-112.5'
            alt='Confetti'
            fill
          />
        </div>

        {/* fireCrackers Animation */}
        <div className='absolute top-20 flex w-full justify-evenly gap-10 px-5 md:top-30 md:gap-50 md:px-20'>
          <Image
            src={'/assets/gif/fireCrackers.gif'}
            alt='Fire Crackers'
            className='w-37.5 md:w-100'
            fill
          />
          <Image
            src={'/assets/gif/fireCrackers.gif'}
            alt='Fire Crackers'
            className='w-37.5 md:w-100'
            fill
          />
        </div>

        {/* Text Content */}
        <div className='absolute top-24 z-50 w-full px-4 text-center md:top-36'>
          <h2 className='text-accent text-2xl font-semibold tracking-wide uppercase sm:text-4xl md:text-5xl'>
            {websiteText.diwaliDhamakaDeals}
          </h2>
          <p className='text-text-quinary mt-2 text-5xl font-bold drop-shadow-md sm:text-7xl md:mt-4 md:text-8xl'>
            {websiteText.diwaliOff}
          </p>
        </div>

        {/* Models Layer */}
        <div className='absolute bottom-0 z-30 flex w-full items-end justify-center px-4 pb-5 md:px-10 md:pb-10'>
          <Image
            src={'/assets/images/diwali-dhamaka/4.png'}
            alt='girl-4'
            width={1000}
            height={1000}
            className='-mr-10 h-65 w-auto object-contain opacity-80 transition-transform sm:h-112.5 md:-mr-16 md:h-145'
          />

          <Image
            src={'/assets/images/diwali-dhamaka/2.png'}
            alt='girl-2'
            width={1000}
            height={1000}
            className='z-10 -mr-12 h-77.5 w-auto object-contain opacity-95 sm:h-125 md:-mr-25 md:h-162.5'
          />

          <Image
            src={'/assets/images/diwali-dhamaka/1.png'}
            alt='girl-1'
            width={1000}
            height={1000}
            className='z-40 h-85 w-auto scale-110 object-contain drop-shadow-2xl sm:h-137.5 md:h-175 md:scale-100'
          />

          <Image
            src={'/assets/images/diwali-dhamaka/3.png'}
            alt='girl-3'
            width={1000}
            height={1000}
            className='z-10 -ml-12 h-77.5 w-auto object-contain opacity-95 sm:h-125 md:-ml-20 md:h-162.5'
          />

          <Image
            src={'/assets/images/diwali-dhamaka/5.png'}
            width={1000}
            height={1000}
            alt='girl-5'
            className='-ml-10 h-65 w-auto object-contain opacity-80 sm:h-112.5 md:-ml-16 md:h-145'
          />
        </div>

        {/* Bottom Fade */}
        <div className='from-background-secondary via-background-secondary/80 absolute bottom-0 z-40 h-60 w-full bg-linear-to-t to-transparent md:h-112.5' />
      </div>
    </div>
  );
}
