'use client';

import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { websiteText } from '@/constants/text-constants';
import { useCartSidebar } from '@/context/cart-sidebar-context';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Wishlist() {
  const { items, moveToCart } = useWishlist();
  const { openCartSidebar } = useCartSidebar();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    if (items?.length > 0) {
      const initialQuantities = items.reduce(
        (acc, item) => {
          acc[item.id] = 1;
          return acc;
        },
        {} as Record<number, number>
      );
      setQuantities(initialQuantities);
    }
  }, [items]);

  const handleAddToCart = (product: any) => {
    const currentQuantity = quantities[product.id] || 1;
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
      quantity: currentQuantity
    };
    addToCart(cartItem);
    moveToCart(product, product?.size?.[0], currentQuantity);
    openCartSidebar();
  };

  const handleIncrement = (productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const handleDecrement = (productId: number) => {
    setQuantities((prev) => {
      const currentQty = prev[productId] || 1;
      return {
        ...prev,
        [productId]: currentQty > 1 ? currentQty - 1 : 1
      };
    });
  };

  return (
    <div className='bg-background-secondary px-5 py-20 sm:px-8 xl:px-32.5'>
      <p className='text-accent border-border-primary border-b text-xl font-bold sm:text-[26px] lg:text-[34px]'>
        {websiteText?.myWishlist}
      </p>
      {items?.length === 0 && (
        <div className='mt-26 flex flex-col items-center justify-center'>
          <p className='text-center text-base font-semibold text-black sm:text-[26px]'>
            {websiteText?.yourWishlistIsEmpty}
          </p>
          <p className='text-center text-sm text-black sm:text-xl'>
            {websiteText?.tapTheHeartIconToStartSavingYourFavourites}
          </p>
          <Button className='bg-accent text-text-tertiary mt-7.5 h-12.5 w-full text-base font-semibold sm:w-132.75'>
            {websiteText?.wishlistNow}
          </Button>
        </div>
      )}
      {items?.length > 0 && (
        <div className='mt-10.5'>
          <div className='mx-auto grid w-fit grid-cols-1 gap-8 [@media(min-width:1024px)]:grid-cols-3! [@media(min-width:1400px)]:grid-cols-4! [@media(min-width:710px)]:grid-cols-2'>
            {items?.map((item) => {
              const productId = item.id; // Assuming each product has a unique id
              const quantity = quantities[productId] || 1;

              return (
                <div key={productId}>
                  <ProductCard product={item} />
                  <div className='mt-5 flex w-67.5 gap-1.5'>
                    <div className='border-accent/40 text-text-secondary flex h-12.5 w-34.25 items-center justify-between rounded-sm border px-4 text-base font-bold'>
                      <Minus
                        className='h-4 w-4 cursor-pointer'
                        onClick={() => handleDecrement(productId)}
                      />
                      {quantity}
                      <Plus
                        className='h-4 w-4 cursor-pointer'
                        onClick={() => handleIncrement(productId)}
                      />
                    </div>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className='bg-accent text-text-tertiary flex h-12.5 w-34.25 gap-2.5 text-base font-semibold'
                    >
                      <ShoppingCart className='h-5.5 w-5.5' />
                      {websiteText?.addToCart}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
