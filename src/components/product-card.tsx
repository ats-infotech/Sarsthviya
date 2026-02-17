'use client';
import { Product } from '@/types';
import Image from 'next/image';
import { Button } from './ui/button';
import { websiteText } from '@/constants/text-constants';
import { Star } from 'lucide-react';
import { Icon } from '@iconify/react';
import { IconsString } from './icons';
import Carousel from './ui/carousel';
import { useEffect, useState } from 'react';
import { useProductSidebar } from '@/context/product-sidebar-context';
import { useWishlist } from '@/hooks/use-wishlist';
import Link from 'next/link';

type ProductCardProps = {
  className?: string;
  product: Product;
  slideWidth?: number;
};

export default function ProductCard({
  product,
  className,
  slideWidth
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { openProductSidebar } = useProductSidebar();
  const { addToWishlist, removeFromWishlist, isInWishlist, isLoading } =
    useWishlist();
  const [wishlistStatus, setWishlistStatus] = useState(false);

  useEffect(() => {
    if (!isLoading && product) {
      setWishlistStatus(isInWishlist(product.id));
    }
  }, [isLoading, product, isInWishlist]);

  const isProductInWishlist = product ? isInWishlist(product.id) : false;
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openProductSidebar(product);
  };
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/product/${product.id}`} className='block'>
      <div
        className='group bg-card-primary w-48.5 overflow-hidden rounded-2xl transition-all duration-300 [@media(min-width:400px)]:w-67.5'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='relative overflow-hidden rounded-2xl'>
          <div
            onClick={handleWishlistToggle}
            className={`absolute top-3.5 right-3.5 z-10 flex h-6.5 w-6.5 cursor-pointer items-center justify-center rounded-full ${isLoading ? 'bg-gray-300' : wishlistStatus ? 'bg-white' : 'bg-accent'}`}
          >
            {isLoading ? (
              <div className='border-text-tertiary h-3 w-3 animate-spin rounded-full border-2 border-t-transparent' />
            ) : wishlistStatus ? (
              <Icon
                icon={IconsString?.heartFilled}
                className='text-text-quinary h-3 w-3'
              />
            ) : (
              <Icon
                icon={IconsString?.heartOutlined}
                className='text-text-tertiary h-3 w-3'
              />
            )}
          </div>

          {/* Image with hover effects */}
          <div className='relative'>
            <Carousel
              slidesToShow={1}
              slideWidth={270}
              gap={20}
              showDots={false}
              showArrows={false}
              autoPlay={isHovered}
              autoPlayDelay={1000}
            >
              {product?.image?.length > 0 &&
                product?.image?.map((items) => {
                  return (
                    <Image
                      key={items}
                      alt='product'
                      src={items}
                      height={380}
                      width={270}
                      className='transition-transform duration-300 group-hover:scale-105'
                    />
                  );
                })}
            </Carousel>

            {/* Rating button - hidden by default, shown on hover */}
            <div className='absolute right-3.5 bottom-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
              <Button className='bg-accent text-text-tertiary h-6.5 w-17.5 overflow-hidden rounded-[5px]! p-0! text-xs font-semibold'>
                <Star className='fill-text-tertiary h-3 w-3' />{' '}
                {product?.rating}/{websiteText?.five}
              </Button>
            </div>
          </div>
        </div>

        {/* Product info section with max height */}
        <div className='px-3 py-5'>
          <div className='max-h-32 overflow-hidden transition-all duration-300 group-hover:max-h-full'>
            <p className='text-accent line-clamp-1 text-xs font-semibold transition-all duration-300 group-hover:line-clamp-none'>
              {product?.product_name}
            </p>
            <div className='my-1 flex items-center gap-2.5'>
              <p className='text-accent text-sm font-bold [@media(min-width:400px)]:text-base'>
                {websiteText?.rupee} {product?.discounted_price}
              </p>
              <p className='text-text-secondary text-xs font-semibold line-through'>
                {websiteText?.rupee} {product?.original_price}
              </p>
              <Button className='bg-accent text-text-primary h-6 w-17 rounded-sm! text-xs font-bold [text-shadow:0px_2px_4px_rgba(255,204,128,0.4)]'>
                {product?.discount_percentage}
                {websiteText?.percentage} {websiteText?.off}
              </Button>
            </div>
            <p className='text-text-quaternary text-sm font-bold [@media(min-width:400px)]:text-base'>
              {websiteText?.rupee} {product?.cashback_amount}{' '}
              {websiteText?.cashback}
            </p>
            <div className='mt-1 flex items-center gap-0.5'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.floor(product.rating || 0) ? 'fill-text-septenary text-text-septenary' : 'text-text-septenary'}`}
                />
              ))}
            </div>

            {/* Quick View Button - hidden by default, shown on hover */}
            <div className='mt-2.5 hidden opacity-0 transition-opacity duration-300 group-hover:block group-hover:opacity-100'>
              <Button
                onClick={handleQuickView}
                className='bg-accent text-text-tertiary flex w-full items-center gap-2.5 text-xs font-semibold'
              >
                <Icon
                  icon={IconsString?.fileView}
                  className='text-text-tertiary h-4 w-6'
                />{' '}
                {websiteText?.quickView}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
