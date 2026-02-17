import { websiteText } from '@/constants/text-constants';

export default function ItemReturnSelection() {
  return (
    <div className='flex flex-col gap-5 py-5'>
      <h2 className='text-accent text-4xl font-bold'>
        {websiteText?.returnorexchange}
      </h2>
      <p className='border-text-secondary/30 bg-card-secondary text-text-secondary inline-block rounded-full border p-3 text-lg font-semibold'>
        <span className='text-accent! text-xl font-bold'>
          {websiteText?.order} #12345gfb
        </span>{' '}
        14 Days left to return this Order
      </p>

      <div className='border-accent/30 h-auto w-full rounded border p-10'></div>
    </div>
  );
}
