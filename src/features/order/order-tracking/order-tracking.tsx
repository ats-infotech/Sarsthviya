'use client';

import { Button } from '@/components/ui/button';
import { products, websiteText } from '@/constants/text-constants';
import { Mail } from 'lucide-react';
import Image from 'next/image';

export default function OrderTracking() {
  const product = products?.[0];

  return (
    <div className='bg-background-secondary pb-25 xl:pb-0'>
      <div className='mx-auto px-5 pt-16.25 md:max-w-182 md:px-0 lg:max-w-249.5! [@media(min-width:888px)]:max-w-212'>
        <div>
          <Image
            alt='order-tracking'
            src={'/assets/images/order-tracking.svg'}
            height={253}
            width={346}
            className='mx-auto'
          />
        </div>
        <div>
          <p className='text-accent mt-6.25 mb-5.25 text-center font-bold sm:text-2xl lg:text-[34px]'>
            {websiteText?.orderTracking}
          </p>
          <p className='text-accent mb-2.5 text-center text-base font-semibold sm:text-[26px]'>
            {websiteText?.trackYourOrderStatusInRealTime}
          </p>
        </div>
        <div className='flex flex-col gap-6.5'>
          <div className='border-accent/40 mt-5.5 flex w-full flex-col gap-6.5 overflow-hidden rounded-[10px] border py-5'>
            <p className='text-accent px-4 text-sm font-semibold sm:text-xl'>
              {websiteText?.orderID}{' '}
              <span className='font-bold'>{websiteText?.tempOrderId}</span>
            </p>
            <div className='flex items-center gap-6 px-8.75'>
              <Mail className='h-7 w-7' />
              <p className='text-accent text-xs font-semibold sm:text-lg'>
                {websiteText?.tempEmail}
              </p>
            </div>
            <div className='flex items-center gap-6 px-8.75'>
              <Image
                src={'/assets/images/calendar.svg'}
                alt='calendar'
                height={28}
                width={28}
              />
              <p className='text-accent text-xs font-semibold sm:text-lg'>
                {websiteText?.expectedDelivery}{' '}
                <span className='font-bold'>
                  {websiteText?.tempDeliveryDate}
                </span>
              </p>
            </div>
            <div>
              <div className='bg-card-secondary border-accent/40 flex gap-6 border-t border-b px-8.75 py-4'>
                <Image
                  src={'/assets/images/green-tick.svg'}
                  alt='step'
                  height={36}
                  width={36}
                />
                <div>
                  <p className='text-accent text-sm font-bold sm:text-xl'>
                    {websiteText?.orderPlaced}
                  </p>
                  <p className='text-accent text-xs font-semibold sm:text-lg'>
                    {websiteText?.tempDeliveryDate}
                  </p>
                </div>
              </div>
              <div className='flex gap-6 px-8.75 py-4'>
                <Image
                  src={'/assets/images/green-tick.svg'}
                  alt='step'
                  height={36}
                  width={36}
                />
                <div>
                  <p className='text-accent text-sm font-bold sm:text-xl'>
                    {websiteText?.orderProcessed}
                  </p>
                  <p className='text-accent text-xs font-semibold sm:text-lg'>
                    {websiteText?.tempDeliveryDate}
                  </p>
                </div>
              </div>
              <div className='bg-card-primary border-accent/40 flex gap-6 border-t border-b px-8.75 py-4'>
                <Image
                  src={'/assets/images/orange-tick.svg'}
                  alt='step'
                  height={36}
                  width={36}
                />
                <div>
                  <p className='text-accent text-sm font-bold sm:text-xl'>
                    {websiteText?.shipped}
                  </p>
                  <p className='text-accent text-xs font-semibold sm:text-lg'>
                    {websiteText?.tempDeliveryDate}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-6 px-8.75 py-4'>
                <div className='border-accent/40 m-1.5 h-6 w-6 rounded-full border-4'></div>
                <div className='flex flex-1 flex-wrap justify-between'>
                  <p className='text-accent text-sm font-bold sm:text-xl'>
                    {websiteText?.outForDelivery}
                  </p>
                  <p className='text-text-secondary text-xs font-semibold sm:text-lg'>
                    {websiteText?.arrivingByTommorrow}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-2.5'>
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
              {websiteText?.viewInvoice}
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
  );
}
