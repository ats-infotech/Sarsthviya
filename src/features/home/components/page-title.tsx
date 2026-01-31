import { newArrivalSection } from '@/constants/text-constants';
import Image from 'next/image';

type HomePageTitleProps = {
  title: string;
  width: number;
  height: number;
};

export default function HomePageTitle({
  title,
  width,
  height
}: HomePageTitleProps) {
  return (
    <div className='flex flex-col items-center justify-center pb-12.5'>
      <p className='text-accent text-lg font-bold sm:text-2xl lg:text-[34px]'>
        {title}
      </p>
      <Image
        alt='title'
        src={newArrivalSection?.titleUnderLinerSvg}
        width={width}
        height={height}
      />
    </div>
  );
}
