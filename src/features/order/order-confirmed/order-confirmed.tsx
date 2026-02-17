'use client';

import { Button } from '@/components/ui/button';
import { products, websiteText } from '@/constants/text-constants';
import { useWindowWidth } from '@/lib/useWindowWidth';
import Image from 'next/image';

export default function OrderConfirmed() {
  const width = useWindowWidth();
  const product = products?.[0];

  return (
    <div className='bg-background-secondary pb-25 xl:pb-0'>
      <div className='mx-auto px-5 pt-16.25 md:max-w-182 md:px-0 lg:max-w-249.5! [@media(min-width:888px)]:max-w-212'>
        <div>
          <Image
            alt='order-confirmed'
            src={'/assets/images/order-confirmed.svg'}
            height={253}
            width={346}
            className='mx-auto'
          />
        </div>
        <div>
          <p className='text-accent mt-6.25 mb-5.25 text-center font-bold sm:text-2xl lg:text-[34px]'>
            {websiteText?.thankYou}
          </p>
          <p className='text-accent mb-2.5 text-center text-base font-semibold sm:text-[26px]'>
            {websiteText?.yourOrderHasBeenPlacedSuccessfully}
          </p>
          <p className='text-accent text-center text-sm sm:text-xl'>
            {websiteText?.anEmailConfirmationHasBeenSentTo}{' '}
            <span className='font-bold'>{websiteText?.tempEmail}</span>
          </p>
        </div>
        <div className='border-accent/40 mt-5.5 flex w-full flex-col gap-6.5 overflow-hidden rounded-[10px] border'>
          <div className='bg-card-secondary border-accent/40 flex items-center gap-2 border-b px-2.5 py-5'>
            <Image
              src={'/assets/images/green-tick.svg'}
              alt='ordered'
              height={width < 640 ? 30 : 50}
              width={width < 640 ? 30 : 50}
            />
            <p className='text-accent text-sm font-bold sm:text-xl'>
              {websiteText?.orderSummary}
            </p>
          </div>
          <div className='flex flex-col gap-6.5 px-6.5 py-5'>
            <p className='text-accent text-sm font-semibold sm:text-xl'>
              {websiteText?.orderID}{' '}
              <span className='font-bold'>{websiteText?.tempOrderId}</span>
            </p>
            <div className='bg-card-secondary border-accent/40 rounded-[10px] border px-4 py-5.5 md:px-8'>
              <div className='border-accent/40 flex items-center gap-2 border-b pb-4 md:gap-5'>
                <Image
                  src={'/assets/images/green-tick.svg'}
                  alt='ordered'
                  height={28}
                  width={28}
                />
                <div>
                  <p className='text-text-secondary text-sm font-bold sm:text-xl'>
                    {websiteText?.totalPaid}{' '}
                    <span className='text-accent'>
                      {websiteText?.rupee}{' '}
                      {product?.discounted_price?.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
              <div className='border-accent/40 flex items-center gap-2 border-b py-4 md:gap-5'>
                <Image
                  src={'/assets/images/cards.svg'}
                  alt='cards'
                  height={28}
                  width={28}
                />
                <div>
                  <p className='text-text-secondary text-sm font-bold sm:text-xl'>
                    {websiteText?.creditDebitCard}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2 pt-4 md:gap-5'>
                <Image
                  src={'/assets/images/calendar.svg'}
                  alt='calendar'
                  height={28}
                  width={28}
                />
                <div>
                  <p className='text-text-secondary text-sm font-bold sm:text-xl'>
                    {websiteText?.expectedDelivery}{' '}
                    <span className='text-accent'>
                      {websiteText?.tempDeliveryDate}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className='flex gap-2.5'>
              <Image
                src={'/assets/images/inventory.svg'}
                alt='inventory'
                height={28}
                width={28}
              />
              <p className='text-accent text-sm font-bold sm:text-xl'>
                {websiteText?.yourItems}
              </p>
            </div>
            <div className='bg-card-secondary border-accent/40 flex flex-col gap-3.5 rounded-[10px] border p-4 sm:flex-row'>
              <Image
                src={product?.image?.[0]}
                alt='product-image'
                className='mx-auto h-18.75 rounded-sm object-cover object-top'
                width={75}
                height={75}
              />
              <div className='flex flex-1 flex-col sm:flex-row'>
                <div className='sm:w-1/2'>
                  <p className='text-accent text-sm font-bold sm:text-xl'>
                    {product?.product_name}
                  </p>
                  <p className='text-accent mt-2 text-sm font-bold sm:text-xl'>
                    {websiteText?.size}:{' '}
                    <span className='uppercase'>{product?.size?.[0]}</span>
                  </p>
                </div>
                <div className='sm:w-1/2'>
                  <p className='text-accent font-bold sm:text-end sm:text-2xl lg:text-[34px]'>
                    {websiteText?.rupee} {product?.discounted_price?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <Button className='bg-accent text-text-tertiary h-10 w-full max-w-110 text-sm font-bold sm:h-16.5 sm:text-xl'>
                {websiteText?.viewOrderStatus}
              </Button>
            </div>
            <div>
              <p className='text-accent text-center text-sm sm:text-xl'>
                {websiteText?.needHelp}{' '}
                {websiteText?.contactOurCustomerSupportTeam}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
