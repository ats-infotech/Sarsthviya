'use client';

import { IconsString } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Carousel from '@/components/ui/carousel';
import { websiteText } from '@/constants/text-constants';
import { useCartSidebar } from '@/context/cart-sidebar-context';
import { useChartSidebar } from '@/context/sizechart-sidebar-context';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useWindowWidth } from '@/lib/useWindowWidth';
import { Product as productTypes } from '@/types';
import { Icon } from '@iconify/react';
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Dot,
  Heart,
  Minus,
  Plus,
  Ruler,
  Share,
  ShoppingCart
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface DetailSection {
  description: boolean;
  details: boolean;
  care: boolean;
  deliveryAndReturn: boolean;
  shipping: boolean;
}

type ProductProps = {
  product: productTypes;
};

export default function Product({ product }: ProductProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const { openChartSidebar } = useChartSidebar();
  const { openCartSidebar } = useCartSidebar();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isProductInWishlist = product ? isInWishlist(product.id) : false;
  const [isHovered, setIsHovered] = useState(false);
  const [openDetails, setOpenDetails] = useState<DetailSection>({
    description: false,
    details: false,
    care: false,
    deliveryAndReturn: false,
    shipping: false
  });
  const width = useWindowWidth();

  useEffect(() => {
    if (product?.size?.[0]) {
      setSelectedSize(product.size[0]);
    }
  }, [product]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (product && selectedSize && quantity > 0) {
      addToCart({
        id: product.id,
        product_name: product.product_name,
        image: product.image,
        description: product.description,
        original_price: product.original_price,
        discounted_price: product.discounted_price,
        discount_percentage: product.discount_percentage,
        cashback_amount: product.cashback_amount,
        size: selectedSize,
        quantity: quantity
      });
      openCartSidebar();
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    isProductInWishlist
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  const toggleDetail = (key: keyof DetailSection) => {
    setOpenDetails((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyCoupon = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Code copied');
      })
      .catch((err) => {
        toast.error('Failed to copy:', err);
      });
  };

  if (!product) return null;

  const renderDetailSection = (
    key: keyof DetailSection,
    title: string,
    content: React.ReactNode,
    isOpen: boolean,
    hasContent: boolean
  ) => {
    if (!hasContent) return null;

    return (
      <div
        className={`(min-width:401px)]:pb-6.25 pb-3.75 ${isOpen ? 'mb-0' : 'border-border-primary border-b'}`}
      >
        <Button
          className='flex w-full cursor-pointer items-center justify-between shadow-none!'
          onClick={() => toggleDetail(key)}
        >
          <p className='text-accent text-sm font-semibold'>{title}</p>
          {isOpen ? (
            <ChevronUp className='text-accent' />
          ) : (
            <ChevronDown className='text-accent' />
          )}
        </Button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'mt-4 max-h-125 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='transition-opacity delay-100 duration-200'>
            {content}
          </div>
        </div>
      </div>
    );
  };

  return (
    product && (
      <div className='flex flex-col gap-7.5 px-5 pt-7 sm:px-8 sm:pt-12.5 lg:flex-row xl:px-32.5'>
        <div className='hidden lg:block'>
          <div
            className='group relative min-h-200 overflow-hidden rounded-[20px]'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              alt='product'
              src={product.image?.[selectedImageIndex]}
              height={800}
              width={600}
              className='h-200 transition-all duration-300 ease-in-out hover:scale-[1.01]'
              unoptimized
            />

            {/* DARK BACKDROP */}
            <div
              className={`absolute inset-0 flex items-end bg-black/40 p-4 backdrop-blur-sm transition-all duration-300 ease-out ${isHovered ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
              <div className='flex h-fit flex-wrap-reverse content-end justify-start gap-4'>
                {product.image.map(
                  (img, idx) =>
                    idx !== selectedImageIndex && (
                      <div
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        style={{ transitionDelay: `${idx * 60}ms` }}
                        className='flex-shrink-0 flex-grow-0 basis-[calc(33.333%-11px)] transform cursor-pointer overflow-hidden rounded-[20px] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105'
                      >
                        <Image
                          src={img}
                          alt={`view ${idx}`}
                          height={210}
                          width={170}
                          className='h-full w-full object-cover'
                          unoptimized
                        />
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <div className='mt-12.5 mb-6.25 flex items-center justify-between'>
            <p className='text-accent text-sm font-semibold'>
              {websiteText?.couponsAndOffers}
            </p>
            <p className='text-text-secondary text-xs font-semibold'>
              {websiteText?.needHelp}{' '}
              <span className='cursor-pointer underline'>
                {websiteText?.chatWithUs}
              </span>
            </p>
          </div>
          <div>
            {websiteText?.coupons?.length > 0 &&
              websiteText?.coupons?.map((items, i) => {
                return (
                  <div key={i} className='relative'>
                    <Image
                      src={'/assets/images/coupon-subtract.svg'}
                      alt='coupon'
                      height={104}
                      width={550}
                      className='h-31 w-full'
                    />
                    <div className='absolute top-8 right-0 left-0 z-10 flex items-center justify-between px-[11%] xl:top-6'>
                      <div className='flex items-center gap-5'>
                        <div className='bg-background-secondary relative h-13 w-13 rounded-[10px] p-3.5 shadow-[0px_0px_30px_0px_#C48C5C1F] xl:h-15 xl:w-15 xl:p-5'>
                          <div
                            className='pointer-events-none absolute inset-0 rounded-[10px] p-px'
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
                            <Icon
                              icon={IconsString?.discountTag}
                              className='text-text-quaternary h-6 w-6'
                            />
                          </div>
                        </div>
                        <div>
                          <p className='text-accent mb-1 text-base font-semibold'>
                            {items?.title}
                          </p>
                          <p className='text-accent text-xs font-semibold'>
                            {items?.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Copy
                          className='text-text-secondary cursor-pointer'
                          onClick={() => handleCopyCoupon(items?.title)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Mobile product image carousel */}
        <div className='flex flex-col items-center lg:hidden'>
          <div className='relative max-w-70'>
            <Image
              src={product?.image?.[selectedImageIndex]}
              alt='image'
              height={360}
              width={280}
              className='mx-auto rounded-2xl'
            />
            <div
              className={`bg-accent absolute top-3.5 right-3.5 z-10 flex h-6.5 w-6.5 cursor-pointer items-center justify-center rounded-full`}
            >
              <Share className='text-text-tertiary h-4! w-4!' />
            </div>
          </div>
          <div className='my-5'>
            <Carousel
              slidesToShow={width < 400 ? 2 : 3}
              slideWidth={84}
              gap={10}
              showDots={false}
              showArrows={true}
            >
              {product?.image?.map((items, i) => {
                return (
                  <div key={i}>
                    <Image
                      width={84}
                      height={96}
                      src={items}
                      alt='product'
                      className='cursor-pointer rounded-[10px]'
                      onClick={() => setSelectedImageIndex(i)}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>

        {/* Product Details */}
        <div className='flex-1'>
          {/* Header */}
          <div className='flex justify-between gap-5'>
            <h1 className='text-accent text-center text-sm font-semibold sm:text-start sm:text-[26px]'>
              {product.product_name}
            </h1>
            <div className='bg-accent hidden h-8.5 min-w-8.5 cursor-pointer items-center justify-center rounded-full p-0 lg:flex'>
              <Share className='text-text-tertiary h-4! w-4!' />
            </div>
          </div>

          <p className='text-text-secondary mt-2.5 mb-5 text-center text-xs font-semibold sm:text-start sm:text-sm'>
            {product.description}
          </p>

          {/* Price Section */}
          <div className='flex items-center justify-center gap-2.5 sm:justify-start'>
            <p className='text-text-secondary text-sm font-semibold line-through'>
              {websiteText?.rupee} {product.original_price}
            </p>
            <p className='text-accent text-[26px] font-bold'>
              {websiteText?.rupee} {product.discounted_price}
            </p>
            <Button className='bg-accent text-text-primary h-6 w-17 rounded-sm! text-xs font-bold [text-shadow:0px_2px_4px_rgba(255,204,128,0.4)]'>
              {product.discount_percentage}
              {websiteText?.percentage} {websiteText?.off}
            </Button>
          </div>

          {/* Size Selection */}
          <div className='mt-7.5 mb-4 flex items-center justify-between'>
            <p className='text-accent text-sm font-semibold'>
              {websiteText?.size} :{' '}
              <span className='uppercase'>{selectedSize}</span>
            </p>
            <Button
              onClick={openChartSidebar}
              className='text-text-secondary pr-0! text-xs font-medium shadow-none! transition-opacity hover:opacity-80'
            >
              <Ruler />
              {websiteText?.sizeChart}
            </Button>
          </div>

          <div className='flex flex-wrap justify-center gap-4.5 sm:justify-start'>
            {product.size?.map((size) => (
              <Button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-9 w-19 rounded-sm text-sm font-bold uppercase transition-all ${
                  selectedSize === size
                    ? 'bg-accent text-text-primary scale-105 [text-shadow:0px_2px_4px_rgba(255,204,128,0.4)]'
                    : 'border-accent hover:bg-accent/10 border'
                }`}
              >
                {size}
              </Button>
            ))}
          </div>

          {/* Quantity */}
          <div className='my-7.5'>
            <p className='text-accent mb-4 text-sm font-semibold'>
              {websiteText?.quantity}
            </p>
            <div className='border-accent/40 text-text-secondary flex h-12.5 w-full items-center justify-center gap-12.5 rounded-sm border text-base font-bold'>
              <Minus
                className='h-4 w-4 cursor-pointer transition-opacity hover:opacity-70'
                onClick={handleDecrement}
              />
              <span className='transition-all duration-200'>{quantity}</span>
              <Plus
                className='h-4 w-4 cursor-pointer transition-opacity hover:opacity-70'
                onClick={handleIncrement}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <Button
            onClick={handleAddToCart}
            className='bg-accent text-text-tertiary hover:bg-accent/90 flex h-12.5 w-full gap-2.5 text-base font-semibold transition-colors'
          >
            <ShoppingCart className='h-5.5 w-5.5' />
            {websiteText?.addToCart}
          </Button>

          <Button
            onClick={handleWishlistToggle}
            className='border-accent text-text-secondary hover:border-accent/70 mt-4 mb-7.5 flex h-12.5 w-full gap-2.5 border text-base font-semibold transition-colors'
          >
            {isProductInWishlist ? (
              <Icon
                icon={IconsString?.heartFilled}
                className='text-text-quinary'
              />
            ) : (
              <Heart />
            )}
            {isProductInWishlist
              ? websiteText?.removeFromWishlist
              : websiteText?.addToWishlist}
          </Button>

          {/* Features */}
          <div className='hidden justify-between lg:flex'>
            {websiteText?.productSidebar?.slice(1).map((item, i) => (
              <div key={i} className='w-33.25'>
                <div className='bg-background-secondary relative mx-auto h-17.5 w-17.5 rounded-full p-5 shadow-[0px_0px_30px_0px_#C48C5C1F]'>
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
                      alt={item.title}
                      src={item.icon}
                      height={30}
                      width={30}
                    />
                  </div>
                </div>
                <p className='text-accent mt-2.5 text-center text-xs font-semibold'>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <div className='border-accent-quaternary/20 rounded-sm border p-5 shadow-[0px_0px_15px_0px_#C48C5C26] lg:hidden'>
            {websiteText?.productSidebar && (
              <div className='mb-4 flex items-center gap-2.5'>
                <Image
                  alt='icon'
                  src={websiteText?.productSidebar?.[0]?.icon}
                  height={28}
                  width={28}
                />
                <p className='text-accent text-[11px] font-semibold'>
                  {websiteText?.productSidebar?.[0]?.title}
                </p>
              </div>
            )}
            <div className='(min-width:401px)]:grid-cols-2 grid grid-cols-1 gap-y-4'>
              {websiteText?.productSidebar?.length > 0 &&
                websiteText?.productSidebar?.map((items, i) => {
                  return (
                    i !== 0 && (
                      <div className='flex items-center gap-2.5' key={i}>
                        <Image
                          alt='icon'
                          src={items?.icon}
                          height={28}
                          width={28}
                        />
                        <p className='text-accent text-[11px] font-semibold'>
                          {items?.title}
                        </p>
                      </div>
                    )
                  );
                })}
            </div>
          </div>

          {/* Accordion Details */}
          <div className='mt-7.5 space-y-6.25'>
            {renderDetailSection(
              'description',
              websiteText?.productDescription,
              <p className='text-text-secondary ml-3 text-xs font-semibold'>
                {product.info}
              </p>,
              openDetails.description,
              !!product.info
            )}

            {renderDetailSection(
              'details',
              websiteText?.productDetails,
              <div className='flex flex-col gap-1'>
                {product.details?.map((item, i) => (
                  <p
                    key={i}
                    className='text-text-secondary flex items-center text-xs font-bold'
                  >
                    <Dot className='min-h-6 min-w-6' /> {item.title}{' '}
                    <span className='ml-1 font-semibold'>
                      {item.description}
                    </span>
                  </p>
                ))}
              </div>,
              openDetails.details,
              !!product.details?.length
            )}

            {renderDetailSection(
              'care',
              websiteText?.productCare,
              <div className='flex flex-col gap-1'>
                {product.care?.map((item, i) => (
                  <p
                    key={i}
                    className='text-text-secondary flex items-center text-xs font-bold'
                  >
                    <Dot className='min-h-6 min-w-6' /> {item}
                  </p>
                ))}
              </div>,
              openDetails.care,
              !!product.care?.length
            )}

            {renderDetailSection(
              'deliveryAndReturn',
              websiteText?.deliveryAndReturns,
              <div className='flex flex-col gap-2'>
                {product.deliveryAndReturns?.map((item, i) => (
                  <div key={i}>
                    <p className='text-accent flex items-center text-sm font-semibold'>
                      <Dot className='min-h-6 min-w-6' /> {item.title}
                    </p>
                    {item.rules?.map((rule, idx) => (
                      <p
                        key={idx}
                        className='text-text-secondary ml-3 flex items-center text-xs font-bold'
                      >
                        <Dot className='min-h-6 min-w-6' /> {rule}
                      </p>
                    ))}
                  </div>
                ))}
              </div>,
              openDetails.deliveryAndReturn,
              !!product.deliveryAndReturns?.length
            )}

            {renderDetailSection(
              'shipping',
              websiteText?.shipping,
              <div>
                {product.shippingCondition?.map((item, i) => (
                  <p
                    key={i}
                    className='text-text-secondary flex items-center text-xs font-bold'
                  >
                    <Dot className='min-h-6 min-w-6' /> {item}
                  </p>
                ))}
              </div>,
              openDetails.shipping,
              !!product.shippingCondition?.length
            )}
          </div>
          <div className='mt-10'>
            <p className='text-accent text-sm font-semibold sm:text-[26px]'>
              {websiteText?.frequentlyAskedQuestions}
            </p>
            <p className='text-text-secondary my-4 text-[10px] font-semibold sm:text-sm'>
              {websiteText?.frequentlyAskedQuestionsDescription}
            </p>
            <Button className='bg-accent text-text-tertiary h-8.5 w-full rounded-sm! text-sm font-semibold shadow-none sm:h-12.5 sm:text-base'>
              {websiteText?.connectWithUs}
            </Button>
          </div>
        </div>
      </div>
    )
  );
}
