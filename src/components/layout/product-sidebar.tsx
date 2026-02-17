'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Heart, Ruler, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { websiteText } from '@/constants/text-constants';
import { useProductSidebar } from '@/context/product-sidebar-context';
import { Icon } from '@iconify/react';
import { IconsString } from '../icons';
import Carousel from '../ui/carousel';
import { useChartSidebar } from '@/context/sizechart-sidebar-context';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCartSidebar } from '@/context/cart-sidebar-context';

export default function ProductSidebar() {
  const { isOpen, selectedProduct, closeProductSidebar } = useProductSidebar();
  const { openChartSidebar } = useChartSidebar();
  const { openCartSidebar } = useCartSidebar();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isProductInWishlist = selectedProduct
    ? isInWishlist(selectedProduct.id)
    : false;

  useEffect(() => {
    if (isOpen && selectedProduct) {
      setIsVisible(true);
      setQuantity(1);
      setIsAnimating(false);
      const animationTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);

      return () => clearTimeout(animationTimer);
    } else if (!isOpen && isVisible) {
      setIsAnimating(false);
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'auto';
      }, 400);

      return () => clearTimeout(hideTimer);
    }
  }, [isOpen, selectedProduct]);

  useEffect(() => {
    if (selectedProduct?.size && selectedProduct?.size?.length > 0) {
      setSelectedSize(selectedProduct.size[0]);
    }
  }, [selectedProduct]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (selectedProduct && selectedSize && quantity > 0) {
      const cartItem = {
        id: selectedProduct.id,
        product_name: selectedProduct.product_name,
        image: selectedProduct.image,
        description: selectedProduct.description,
        original_price: selectedProduct.original_price,
        discounted_price: selectedProduct.discounted_price,
        discount_percentage: selectedProduct.discount_percentage,
        cashback_amount: selectedProduct.cashback_amount,
        size: selectedSize,
        quantity: quantity
      };
      addToCart(cartItem);
      openCartSidebar();
    }
  };

  const handleWishlistToggle = () => {
    if (!selectedProduct) return;
    if (isProductInWishlist) {
      removeFromWishlist(selectedProduct.id);
    } else {
      addToWishlist(selectedProduct);
    }
  };

  if (!selectedProduct || !isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-all duration-400 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeProductSidebar}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-background-secondary fixed top-0 right-0 z-50 h-full w-full max-w-125 rounded-l-lg shadow-2xl transition-transform duration-400 ease-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='sticky top-0 z-10'>
          <div className='flex items-center justify-between px-6 py-4'>
            <h2 className='text-accent text-base font-semibold'>
              {websiteText?.chooseOptions}
            </h2>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-background-secondary h-8 w-8 rounded-full'
              onClick={closeProductSidebar}
            >
              <X className='h-5.5 w-5.5' />
            </Button>
          </div>
          <div className='h-px bg-[linear-gradient(90deg,#0D0C0A_0%,rgba(13,12,10,0)_100%)]'></div>
        </div>

        <div className='max-h-[calc(100vh-64px)] overflow-y-scroll px-16.5 pb-12.5'>
          <div className='relative mt-7.5'>
            <Image
              src={selectedProduct?.image?.[selectedImageIndex]}
              alt='image'
              height={360}
              width={280}
              className='mx-auto rounded-2xl'
            />
            <div
              onClick={handleWishlistToggle}
              className={`absolute top-3.5 right-14.5 z-10 flex h-6.5 w-6.5 cursor-pointer items-center justify-center rounded-full ${isProductInWishlist ? 'bg-white' : 'bg-accent'}`}
            >
              {isProductInWishlist ? (
                <Icon
                  icon={IconsString?.heartFilled}
                  className='text-text-quinary'
                />
              ) : (
                <Icon
                  icon={IconsString?.heartOutlined}
                  className='text-text-tertiary h-3 w-3'
                />
              )}
            </div>
          </div>
          <div className='my-5'>
            <Carousel
              slidesToShow={4}
              slideWidth={84}
              gap={10}
              showDots={false}
              showArrows={true}
            >
              {selectedProduct?.image?.map((items, i) => {
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
          {selectedProduct?.product_name && (
            <h6 className='text-accent text-center text-sm font-bold'>
              {selectedProduct?.product_name}
            </h6>
          )}
          {selectedProduct?.description && (
            <p className='text-text-secondary my-2.5 text-center text-xs font-medium'>
              {selectedProduct?.description}
            </p>
          )}
          <div className='my-1 flex items-center justify-center gap-2.5'>
            <p className='text-accent text-base font-bold'>
              {websiteText?.rupee} {selectedProduct?.discounted_price}
            </p>
            <p className='text-text-secondary text-xs font-semibold line-through'>
              {websiteText?.rupee} {selectedProduct?.original_price}
            </p>
            <Button className='bg-accent text-text-primary h-6 w-17 rounded-sm! text-xs font-bold [text-shadow:0px_2px_4px_rgba(255,204,128,0.4)]'>
              {selectedProduct?.discount_percentage}
              {websiteText?.percentage} {websiteText?.off}
            </Button>
          </div>

          {/* Size Chart Section */}
          <div className='mt-7.5 mb-4 flex items-center justify-between'>
            <p className='text-accent text-sm font-semibold'>
              {websiteText?.size} :{' '}
              <span className='uppercase'>{selectedSize}</span>
            </p>
            <Button
              onClick={openChartSidebar}
              className='text-text-secondary text-xs font-medium shadow-none!'
            >
              <Ruler />
              {websiteText?.sizeChart}
            </Button>
          </div>
          <div className='grid grid-cols-4 gap-x-4.5 gap-y-4'>
            {selectedProduct?.size?.length > 0 &&
              selectedProduct?.size?.map((items) => {
                return (
                  <div key={items}>
                    <Button
                      onClick={() => setSelectedSize(items)}
                      className={`h-9 w-19.5 rounded-sm text-sm font-bold uppercase ${selectedSize === items ? 'bg-accent text-text-primary [text-shadow:0px_2px_4px_rgba(255,204,128,0.4)]' : 'border-accent border'}`}
                    >
                      {items}
                    </Button>
                  </div>
                );
              })}
          </div>

          {/* Quantity section */}
          <div className='my-7.5'>
            <p className='text-accent mb-4 text-sm font-semibold'>
              {websiteText?.quantity}
            </p>
            <div className='border-accent/40 text-text-secondary flex h-12.5 w-full items-center justify-center gap-12.5 rounded-sm border text-base font-bold'>
              <Minus
                className='h-4 w-4 cursor-pointer'
                onClick={handleDecrement}
              />
              {quantity}
              <Plus
                className='h-4 w-4 cursor-pointer'
                onClick={handleIncrement}
              />
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            className='bg-accent text-text-tertiary flex h-12.5 w-full gap-2.5 text-base font-semibold'
          >
            <ShoppingCart className='h-5.5 w-5.5' />
            {websiteText?.addToCart}
          </Button>

          <Button
            onClick={handleWishlistToggle}
            className='border-accent text-text-secondary mt-4 mb-7.5 flex h-12.5 w-full gap-2.5 border text-base font-semibold'
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

          <div className='border-accent-quaternary/20 rounded-sm border p-5 shadow-[0px_0px_15px_0px_#C48C5C26]'>
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
            <div className='grid grid-cols-2 gap-y-4'>
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
        </div>
      </div>
    </>
  );
}
