'use client';

import { Product } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const WISHLIST_QUERY_KEY = ['wishlist'];
const initialWishlist: Product[] = [];

export function useWishlist() {
  const queryClient = useQueryClient();

  // Query to get wishlist items
  const { data: items = initialWishlist, isLoading } = useQuery<Product[]>({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: () =>
      queryClient.getQueryData<Product[]>(WISHLIST_QUERY_KEY) ||
      initialWishlist,
    initialData: initialWishlist
  });

  // Add item to wishlist
  const addToWishlist = useMutation({
    mutationFn: async (product: Product) => {
      return product;
    },
    onMutate: async (product) => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });
      const previousWishlist =
        queryClient.getQueryData<Product[]>(WISHLIST_QUERY_KEY) || [];
      const existingItemIndex = previousWishlist.findIndex(
        (item) => item.id === product.id
      );

      let updatedWishlist: Product[];
      if (existingItemIndex > -1) {
        toast.info('Product already in wishlist');
        return { previousWishlist };
      } else {
        updatedWishlist = [...previousWishlist, product];
        queryClient.setQueryData(WISHLIST_QUERY_KEY, updatedWishlist);
        return { previousWishlist };
      }
    },
    onSuccess: () => {
      toast.success('Product added to wishlist');
    },
    onError: (err, product, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(WISHLIST_QUERY_KEY, context.previousWishlist);
      }
      toast.error('Failed to add to wishlist');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    }
  }).mutate;

  // Remove item from wishlist with optional suppressToast parameter
  const removeFromWishlist = useMutation({
    mutationFn: async (params: {
      productId: string | number;
      suppressToast?: boolean;
    }) => {
      return params;
    },
    onMutate: async (params) => {
      const { productId, suppressToast } = params;
      await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });
      const previousWishlist =
        queryClient.getQueryData<Product[]>(WISHLIST_QUERY_KEY) || [];
      const updatedWishlist = previousWishlist.filter(
        (item) => item.id !== productId
      );
      queryClient.setQueryData(WISHLIST_QUERY_KEY, updatedWishlist);
      return { previousWishlist, suppressToast };
    },
    onSuccess: (data, variables, context) => {
      // Only show toast if suppressToast is not true
      if (!context?.suppressToast) {
        toast.success('Product removed from wishlist');
      }
    },
    onError: (err, params, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(WISHLIST_QUERY_KEY, context.previousWishlist);
      }
      toast.error('Failed to remove from wishlist');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    }
  }).mutate;

  // Check if product is in wishlist
  const isInWishlist = (productId: string | number): boolean => {
    return items.some((item) => item.id === productId);
  };

  // Clear wishlist
  const clearWishlist = useMutation({
    mutationFn: async () => {
      return null;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });
      const previousWishlist =
        queryClient.getQueryData<Product[]>(WISHLIST_QUERY_KEY) || [];
      queryClient.setQueryData(WISHLIST_QUERY_KEY, []);
      return { previousWishlist };
    },
    onSuccess: () => {
      toast.success('Wishlist cleared');
    },
    onError: (err, variables, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(WISHLIST_QUERY_KEY, context.previousWishlist);
      }
      toast.error('Failed to clear wishlist');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    }
  }).mutate;

  // Move item from wishlist to cart
  const moveToCart = (product: Product, size: string, quantity: number = 1) => {
    // Remove from wishlist without showing the toast
    removeFromWishlist({ productId: product.id, suppressToast: true });
    toast.success('Product moved to cart');
    // TODO: Add to cart logic here
  };

  // Helper function for backward compatibility (if needed)
  const removeFromWishlistBasic = (productId: string | number) => {
    removeFromWishlist({ productId, suppressToast: false });
  };

  return {
    items,
    addToWishlist,
    removeFromWishlist: removeFromWishlistBasic, // Use the basic version for backward compatibility
    isInWishlist,
    clearWishlist,
    moveToCart,
    totalItems: items.length,
    isLoading
  };
}
