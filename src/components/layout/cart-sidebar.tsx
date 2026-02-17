'use client';
import { useCartSidebar } from '@/context/cart-sidebar-context';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Minus, Plus, ShieldCheck, Trash, X } from 'lucide-react';
import { paymentLogos, websiteText } from '@/constants/text-constants';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { useWindowWidth } from '@/lib/useWindowWidth';

export default function CartSidebar() {
  const { isCartOpen, closeCartSidebar } = useCartSidebar();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const width = useWindowWidth();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      setIsVisible(true);
      setIsAnimating(false);
      const animationTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);

      return () => clearTimeout(animationTimer);
    } else if (!isCartOpen && isVisible) {
      setIsAnimating(false);
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'auto';
      }, 400);

      return () => clearTimeout(hideTimer);
    }
  }, [isCartOpen, isVisible]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleIncrement = (
    itemId: string | number,
    size: string,
    currentQuantity: number
  ) => {
    updateQuantity({
      id: itemId,
      size: size,
      quantity: currentQuantity + 1
    });
  };

  const handleDecrement = (
    itemId: string | number,
    size: string,
    currentQuantity: number
  ) => {
    if (currentQuantity > 1) {
      updateQuantity({
        id: itemId,
        size: size,
        quantity: currentQuantity - 1
      });
    }
  };

  const handleRemove = (itemId: string | number, size: string) => {
    removeFromCart({
      id: itemId,
      size: size
    });
  };

  // Calculate total items count
  const totalItemsCount =
    items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  const totalGST = (totalPrice * 18) / 100;

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-all duration-400 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCartSidebar}
      />
      <div
        ref={sidebarRef}
        className={`bg-background-secondary fixed top-0 right-0 z-50 h-full w-full max-w-125 rounded-l-lg shadow-2xl transition-transform duration-400 ease-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='sticky top-0 z-10'>
          <div className='flex items-center justify-between px-6 py-4'>
            <div className='flex items-center gap-4'>
              <h2 className='text-accent text-base font-semibold'>
                {websiteText?.shoppingCart}
              </h2>
              <div className='bg-accent text-text-tertiary flex h-5 w-5 items-center justify-center rounded-full text-sm font-semibold'>
                {totalItemsCount}
              </div>
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-background-secondary h-8 w-8 rounded-full'
              onClick={closeCartSidebar}
            >
              <X className='h-5.5 w-5.5' />
            </Button>
          </div>
          <div className='h-px bg-[linear-gradient(90deg,#0D0C0A_0%,rgba(13,12,10,0)_100%)]'></div>
        </div>

        <div className='max-h-[calc(100vh-64px)] overflow-y-scroll p-5 py-5 [@media(min-width:500px)]:p-7.5'>
          <div className='flex flex-col gap-8'>
            {items?.length > 0 ? (
              items?.map((item) => {
                const itemId = item.id;
                const itemSize = item.size || '';
                const itemQuantity = item.quantity || 1;

                return (
                  <div
                    key={`${itemId}-${itemSize}`}
                    className='border-accent-quaternary/20 relative flex gap-4 rounded-sm border p-4 shadow-[0px_0px_15px_0px_#C48C5C26]'
                  >
                    <div
                      className='bg-accent hover:bg-accent/90 absolute -top-2 -right-2 z-60 flex h-5.25 w-5.25 cursor-pointer items-center justify-center rounded-full [@media(min-width:500px)]:-top-4 [@media(min-width:500px)]:-right-4 [@media(min-width:500px)]:h-8.5 [@media(min-width:500px)]:w-8.5'
                      onClick={() => handleRemove(itemId, itemSize)}
                    >
                      <Trash className='text-card-primary h-3 w-3 [@media(min-width:500px)]:h-4 [@media(min-width:500px)]:w-4' />
                    </div>
                    <Image
                      alt='product'
                      src={item?.image?.[0]}
                      height={width < 500 ? 114 : 194}
                      width={width < 500 ? 82 : 140}
                      className='h-28.5 rounded-sm object-cover [@media(min-width:500px)]:h-48.5'
                    />
                    <div>
                      <p className='text-accent line-clamp-2 text-[10px] font-semibold [@media(min-width:500px)]:text-sm'>
                        {item?.product_name}
                      </p>
                      <p className='text-text-secondary mt-1 mb-2.5 line-clamp-2 text-[10px] font-semibold [@media(min-width:500px)]:text-xs'>
                        {item?.description}
                      </p>
                      <div className='flex flex-wrap items-center gap-2.5'>
                        <p className='text-text-secondary text-[10px] font-semibold [@media(min-width:500px)]:text-sm'>
                          {websiteText?.total} :
                        </p>
                        <p className='text-accent text-[10px] font-bold [@media(min-width:500px)]:text-sm'>
                          {websiteText?.rupee} {item?.discounted_price}
                        </p>
                        <p className='text-text-secondary text-[10px] font-semibold line-through [@media(min-width:500px)]:text-xs'>
                          {websiteText?.rupee} {item?.original_price}
                        </p>
                        <Button className='bg-accent text-text-primary h-6 w-11 rounded-sm! text-[10px] font-bold [text-shadow:0px_2px_4px_rgba(255,204,128,0.4)] [@media(min-width:500px)]:w-17 [@media(min-width:500px)]:text-xs'>
                          {item?.discount_percentage}
                          {websiteText?.percentage} {websiteText?.off}
                        </Button>
                      </div>
                      <div className='mt-1.5 flex items-center gap-2.5'>
                        <p className='text-text-secondary text-[10px] font-semibold [@media(min-width:500px)]:text-sm'>
                          {websiteText?.size} :
                        </p>
                        <p className='text-accent text-[10px] font-bold uppercase [@media(min-width:500px)]:text-sm'>
                          {itemSize}
                        </p>
                      </div>
                      <div className='mt-2.5 flex flex-wrap items-end justify-between'>
                        <div className='bg-accent text-text-primary flex h-9.25 w-16.75 items-center justify-center gap-3 rounded-sm text-xs font-bold [@media(min-width:500px)]:w-29.25 [@media(min-width:500px)]:text-sm'>
                          <Minus
                            className='h-3 w-3 cursor-pointer'
                            onClick={() =>
                              handleDecrement(itemId, itemSize, itemQuantity)
                            }
                          />
                          {itemQuantity}
                          <Plus
                            className='h-3 w-3 cursor-pointer'
                            onClick={() =>
                              handleIncrement(itemId, itemSize, itemQuantity)
                            }
                          />
                        </div>
                        <Button
                          onClick={() => handleRemove(itemId, itemSize)}
                          className='text-background-primary h-fit w-fit p-0 underline shadow-none!'
                        >
                          {websiteText?.removeItem}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='flex h-50 flex-col items-center justify-center'>
                <p className='text-accent font-semibold'>
                  {websiteText?.yourCartIsEmpty}
                </p>
                <p className='text-accent font-semibold'>
                  {websiteText?.thereIsALotForYouToShopFromSoWhyWait}
                </p>
                <Button className='bg-accent text-text-tertiary mt-7.5 h-10 w-full'>
                  {websiteText?.continueShopping}
                </Button>
              </div>
            )}
          </div>
          {items?.length > 0 && (
            <>
              <div className='mt-12.5'>
                <p className='text-text-quaternary flex items-center justify-center gap-2.5 text-center text-xs font-semibold [@media(min-width:500px)]:text-xl'>
                  <ShieldCheck />
                  {websiteText?.hundredPercentSecurePayment}
                </p>
              </div>

              <div className='relative mt-5 mb-12.5'>
                <div
                  className='pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16'
                  style={{
                    background:
                      'linear-gradient(to right, #fffcf5 0%, rgba(255, 252, 245, 0) 100%)'
                  }}
                />

                <div
                  className='pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16'
                  style={{
                    background:
                      'linear-gradient(to left, #fffcf5 0%, rgba(255, 252, 245, 0) 100%)'
                  }}
                />

                <div className='rounded-lg p-4 pb-0'>
                  <Marquee
                    speed={50}
                    gradient={false}
                    pauseOnHover={true}
                    pauseOnClick={true}
                  >
                    {paymentLogos.map((logo, index) => (
                      <div key={index} className='mx-4'>
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          height={width < 500 ? 24 : 60}
                          width={width < 500 ? 24 : 60}
                          className={logo.className}
                        />
                      </div>
                    ))}
                  </Marquee>
                </div>
              </div>

              <div className='flex justify-between'>
                {websiteText?.productSidebar?.length > 0 &&
                  websiteText?.productSidebar?.map((item, i) => {
                    return (
                      i !== 0 && (
                        <div key={i} className='w-33.25'>
                          <div className='bg-background-secondary relative mx-auto h-10.5 w-10.5 rounded-full p-3 shadow-[0px_0px_30px_0px_#C48C5C1F] [@media(min-width:500px)]:h-17.5 [@media(min-width:500px)]:w-17.5 [@media(min-width:500px)]:p-5'>
                            <div
                              className='pointer-events-none absolute inset-0 rounded-full p-px'
                              style={{
                                background:
                                  'linear-gradient(180deg, #FFE0B2 0%, rgba(255, 224, 178, 0) 100%)',
                                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMask:
                                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                maskComposite: 'exclude',
                                WebkitMaskComposite: 'destination-out'
                              }}
                            />
                            <div className='relative z-10'>
                              <Image
                                alt={item?.title}
                                src={item?.icon}
                                height={width < 500 ? 20 : 30}
                                width={width < 500 ? 20 : 30}
                              />
                            </div>
                          </div>
                          <p className='text-accent [@media(min-width:500px)]text-xs mt-2.5 text-center text-[10px] font-semibold'>
                            {item?.title}
                          </p>
                        </div>
                      )
                    );
                  })}
              </div>
              <div className='relative mt-12.5 mb-5'>
                <Image
                  alt='substract'
                  src={'/assets/images/subtract.svg'}
                  height={400}
                  width={520}
                />
                <div className='absolute top-0 w-full px-3'>
                  <p className='text-accent px-6 py-6.25 pb-4 text-base font-bold'>
                    {websiteText?.orderSummary}
                  </p>
                  <div className='border-text-secondary/30 w-full border-b border-dashed'></div>
                  <div className='px-6 py-3'>
                    <div className='flex justify-between'>
                      <p className='text-text-secondary text-sm font-semibold'>
                        {websiteText?.mrp}
                      </p>
                      <p className='text-accent text-sm font-bold'>
                        {websiteText?.rupee} {totalPrice}
                      </p>
                    </div>
                    <div className='my-1.25 flex justify-between'>
                      <p className='text-text-secondary text-sm font-semibold'>
                        {websiteText?.gst}
                      </p>
                      <p className='text-accent text-sm font-bold'>
                        {websiteText?.rupee} {totalGST}
                      </p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-text-secondary text-sm font-semibold'>
                        {websiteText?.shipping}
                      </p>
                      <p className='text-accent text-sm font-bold'>
                        {websiteText?.rupee}{' '}
                        {totalPrice > 1499 ? websiteText?.free : 89}
                      </p>
                    </div>
                  </div>
                  <div className='border-text-secondary/30 w-full border-b border-dashed'></div>
                  <div className='text-accent mt-4 flex justify-between px-6 text-base font-bold'>
                    <p>{websiteText?.totalPayable}</p>
                    <p>
                      {websiteText?.rupee}{' '}
                      {totalPrice > 1499
                        ? totalPrice + totalGST
                        : totalPrice + totalGST + 89}
                    </p>
                  </div>
                </div>
              </div>
              <Button className='bg-accent text-text-tertiary h-12.5 w-full gap-2.5 text-base font-semibold'>
                <span>{websiteText?.rupee} </span>
                {websiteText?.proceedToBuy}
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
