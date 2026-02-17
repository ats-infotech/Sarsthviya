'use client';

import { IconsString } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Addresses,
  orders,
  profile,
  websiteText
} from '@/constants/text-constants';
import { useCartSidebar } from '@/context/cart-sidebar-context';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Icon } from '@iconify/react';
import {
  BellRing,
  ChevronRight,
  CreditCard,
  Lock,
  SquarePen
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {
  const demoProfile = profile;
  const [activeButton, setActiveButton] = useState(1);
  const lastOrder = orders?.[0];
  const { items: wishlistItems, moveToCart } = useWishlist();
  const router = useRouter();
  const { addToCart } = useCart();
  const { openCartSidebar } = useCartSidebar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = (product: any) => {
    const cartItem = {
      id: product.id,
      product_name: product.product_name,
      image: product.image,
      description: product.description,
      original_price: product.original_price,
      discounted_price: product.discounted_price,
      discount_percentage: product.discount_percentage,
      cashback_amount: product.cashback_amount,
      size: product?.size?.[0],
      quantity: 1
    };
    addToCart(cartItem);
    moveToCart(product, product?.size?.[0], 1);
    openCartSidebar();
  };

  return (
    <div className='bg-background-secondary flex justify-center gap-9 py-20'>
      <div className='w-full max-w-206'>
        <div className='flex items-center rounded-[10px] bg-white p-6.75 shadow-[0px_4px_15px_0px_#00000040]'>
          <div className='relative inline-block rounded-full bg-linear-to-b from-[#FFE0B2] to-[rgba(255,224,178,0)] p-1.25'>
            <Image
              alt='profile'
              src={demoProfile?.profileImg}
              height={148}
              width={148}
              className='h-37 w-37 rounded-full object-cover'
            />
            <div className='bg-text-primary border-accent/40 text-text-secondary absolute right-3 bottom-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border'>
              <SquarePen />
            </div>
          </div>
          <div className='ml-3 flex flex-1 justify-between'>
            <div>
              <p className='text-accent text-[26px] font-semibold'>
                {demoProfile?.firstName} {demoProfile?.lastName}
              </p>
              <p className='text-accent my-4 text-lg font-semibold'>
                {demoProfile?.email}
              </p>
              <p className='text-accent text-lg font-semibold'>
                {demoProfile?.mobileNo}
              </p>
            </div>
            <div className='flex flex-col items-end justify-between'>
              <div className='bg-card-secondary border-accent/40 flex gap-4 rounded-[10px] border p-3'>
                <p className='text-accent text-xl font-bold'>
                  {profile?.memberShipType}
                </p>
                <p className='text-text-quaternary text-xl font-semibold'>
                  {profile?.points} {websiteText?.points}
                </p>
              </div>
              <Button
                className='bg-text-primary text-accent w-fit p-3 text-lg font-semibold'
                onClick={() => router.push('/rewards')}
              >
                {websiteText?.viewRewards}
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
        <div className='mx-auto mt-11 mb-12.5 flex w-fit'>
          {websiteText?.profileActionButtons?.length > 0 &&
            websiteText?.profileActionButtons?.map((items, i) => {
              return (
                <Button
                  key={items}
                  className={`text-accent border-accent/40 flex h-18.5 w-51.25 gap-5 overflow-hidden rounded-[10px] border-r text-base font-bold shadow-[0px_4px_4px_0px_#00000040] ${activeButton === i + 1 ? 'bg-text-primary' : 'bg-card-secondary'}`}
                  onClick={() => setActiveButton(i + 1)}
                >
                  {items === 'Account' ? (
                    <Lock className='text-text-senary min-h-8 min-w-8' />
                  ) : items === 'Notification' ? (
                    <BellRing className='text-text-senary min-h-8 min-w-8' />
                  ) : items === 'Payment' ? (
                    <CreditCard className='text-text-senary min-h-8 min-w-8' />
                  ) : (
                    <Icon
                      icon={IconsString?.setting}
                      className='text-text-senary min-h-8 min-w-8'
                    />
                  )}
                  {items}
                </Button>
              );
            })}
        </div>
        <div>
          <div className='border-accent/40 mb-3.5 flex justify-between border-b pb-3.5'>
            <p className='text-xl font-bold text-black'>
              {websiteText?.orderHistory}
            </p>
            <Button
              className='text-accent pr-0! text-base font-semibold shadow-none'
              onClick={() => router.push('/orders')}
            >
              {websiteText?.viewAllOrders}
              <ChevronRight />
            </Button>
          </div>
          <div className='bg-card-secondary flex gap-7 rounded-[10px] px-6 py-5 shadow-[0px_4px_15px_0px_#00000040]'>
            <div className='h-37.5 w-37.5 overflow-hidden'>
              <Image
                alt='product-image'
                src={lastOrder?.image}
                height={150}
                width={150}
                className='border-text-secondary h-37.5 w-37.5 rounded-[9px] border object-cover object-top'
              />
            </div>
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-accent text-base font-bold'>
                    {lastOrder?.item_name}
                  </p>
                  <p className='text-accent my-2 text-lg font-semibold'>
                    {websiteText?.order} {lastOrder?.order_number}
                  </p>
                  <p className='text-accent text-lg font-semibold'>
                    {websiteText?.placedOn} {lastOrder?.placed_on}
                  </p>
                </div>
                <div>
                  <p className='text-accent text-[26px] font-semibold'>
                    {websiteText?.rupee} {lastOrder?.price?.toFixed(2)}
                  </p>
                  <p className='text-accent text-end text-lg font-semibold'>
                    {lastOrder?.status}
                  </p>
                </div>
              </div>
              <div className='mt-5 flex gap-1.5'>
                <Button
                  className='bg-accent text-text-tertiary h-12.5 min-w-48.5 text-lg font-bold'
                  onClick={() => router.push('/order-tracking/1')}
                >
                  {websiteText?.trackOrder}
                </Button>
                <Button className='bg-text-primary text-accent border-accent/40 h-12.5 min-w-48.5 border text-lg font-bold'>
                  {websiteText?.buyAgain}
                </Button>
                <Button
                  className='text-accent border-accent/40 h-12.5 min-w-48.5 border bg-transparent text-lg font-bold shadow-none'
                  onClick={() => router.push('/view-invoice')}
                >
                  {websiteText?.viewInvoice}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='my-12.5'>
          <div className='border-accent/40 mb-3.5 flex justify-between border-b pb-3.5'>
            <p className='text-xl font-bold text-black'>
              {websiteText?.wishlist}
            </p>
            <Button
              className='text-accent pr-0! text-base font-semibold shadow-none'
              onClick={() => router.push('/wishlist')}
            >
              {websiteText?.viewAllWishlist}
              <ChevronRight />
            </Button>
          </div>
          <div className='flex justify-between'>
            {isClient &&
              wishlistItems?.length > 0 &&
              wishlistItems?.slice(0, 3)?.map((items, i) => {
                return (
                  <div
                    key={i}
                    className='bg-card-secondary flex h-69 w-61.25 flex-col justify-between rounded-[10px] p-4'
                  >
                    <div>
                      <Image
                        src={items?.image?.[0]}
                        alt='product-image'
                        height={130}
                        width={212}
                        className='h-32.5 w-full object-cover object-top'
                      />
                    </div>
                    <p className='text-accent line-clamp-1 text-center text-lg font-semibold'>
                      {items?.product_name}
                    </p>
                    <Button
                      className='border-accent/40 text-accent h-12.5 w-full border text-lg font-semibold'
                      onClick={() => handleAddToCart(items)}
                    >
                      {websiteText?.addToCart}
                    </Button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className='flex justify-center gap-7'>
          <p className='flex items-center gap-4'>
            <Image
              src={'/assets/images/product-sidebar/easy-return.svg'}
              alt='easy-return'
              height={36}
              width={36}
            />
            {websiteText?.returnExchange}
          </p>
          <p className='flex items-center gap-4'>
            <Icon
              icon={IconsString?.chatMessages}
              className='text-text-senary h-9 w-9'
            />
            {websiteText?.customerSupport}
          </p>
          <p className='flex items-center gap-4'>
            <Image
              src={'/assets/images/refer-and-earn.svg'}
              alt='easy-return'
              height={36}
              width={36}
            />
            {websiteText?.referEarn}
          </p>
        </div>
      </div>
      <div className='w-full max-w-80'>
        <div className='bg-card-secondary p-6 shadow-[0px_4px_15px_0px_#00000040]'>
          <p className='text-accent border-accent/40 border-b pb-3 text-xl font-bold'>
            {websiteText?.personalDetails}
          </p>
          <div className='flex items-center gap-3 py-3'>
            <div className='bg-text-secondary h-2 w-2 rounded-full'></div>
            <p className='text-text-secondary text-lg font-semibold'>
              {demoProfile?.firstName} {demoProfile?.lastName}
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='bg-text-secondary h-2 w-2 rounded-full'></div>
            <p className='text-text-secondary text-lg font-semibold'>
              {demoProfile?.email}
            </p>
          </div>
          <div className='flex items-center gap-3 py-3'>
            <div className='bg-text-secondary h-2 w-2 rounded-full'></div>
            <p className='text-text-secondary text-lg font-semibold'>
              {websiteText?.phone}: {demoProfile?.mobileNo}
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='bg-text-secondary h-2 w-2 rounded-full'></div>
            <p className='text-text-secondary text-lg font-semibold'>
              {websiteText?.birthday}: {demoProfile?.birthdate}
            </p>
          </div>
          <div className='mt-7 flex justify-center'>
            <Button className='bg-text-primary border-accent/40 text-accent h-12.5 w-45 border text-lg font-bold'>
              {websiteText?.edit}
            </Button>
          </div>
        </div>
        <div className='bg-card-secondary mt-12.5 p-6 shadow-[0px_4px_15px_0px_#00000040]'>
          <p className='text-accent border-accent/40 border-b pb-3 text-xl font-bold'>
            {websiteText?.addressBook}
          </p>
          <div className='flex items-center gap-3 pt-3'>
            <div className='bg-text-secondary h-2 w-2 rounded-full'></div>
            <p className='text-text-secondary text-lg font-semibold'>
              {Addresses?.length} {websiteText?.savedAddresses}
            </p>
          </div>
          <div className='mt-7 flex justify-center'>
            <Button className='bg-text-primary border-accent/40 text-accent h-12.5 w-full border text-lg font-bold'>
              {websiteText?.manageAddresses}
            </Button>
          </div>
        </div>
        <div className='bg-card-secondary mt-12.5 p-6 shadow-[0px_4px_15px_0px_#00000040]'>
          <p className='text-accent border-accent/40 border-b pb-3 text-xl font-bold'>
            {websiteText?.sizeAndFitPreferences}
          </p>
          <div className='flex items-center gap-3 py-3'>
            <div className='bg-text-secondary h-2 w-2 rounded-full'></div>
            <p className='text-text-secondary text-lg font-semibold'>
              {websiteText?.size}: {demoProfile?.size}
            </p>
          </div>
          <div className='flex items-center gap-3 pb-3'>
            <div className='bg-text-secondary h-2 w-2 rounded-full'></div>
            <p className='text-text-secondary text-lg font-semibold'>
              {demoProfile?.fit}
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='bg-text-secondary h-2 w-2 rounded-full'></div>
            <p className='text-text-secondary text-lg font-semibold'>
              {demoProfile?.style}
            </p>
          </div>
          <div className='mt-7 flex justify-center'>
            <Button className='bg-text-primary border-accent/40 text-accent h-12.5 w-45 border text-lg font-bold'>
              {websiteText?.update}
            </Button>
          </div>
        </div>
        <div className='bg-card-secondary mt-12.5 p-6 shadow-[0px_4px_15px_0px_#00000040]'>
          <p className='text-accent border-accent/40 border-b pb-3 text-xl font-bold'>
            {websiteText?.loyaltyAndWallet}
          </p>
          <div className='flex items-center gap-3 py-3'>
            <div className='bg-text-secondary h-2 w-2 rounded-full'></div>
            <p className='text-text-secondary text-lg font-semibold'>
              {websiteText?.storeCredit}: {websiteText?.rupee}
              {demoProfile?.storeCredit?.toFixed(2)}
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='bg-text-secondary h-2 w-2 rounded-full'></div>
            <p className='text-text-secondary text-lg font-semibold'>
              {websiteText?.points}: {demoProfile?.points}
            </p>
          </div>
          <div className='mt-7 flex justify-center'>
            <Button className='bg-text-primary border-accent/40 text-accent h-12.5 w-45 border text-lg font-bold'>
              {websiteText?.viewWallet}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
