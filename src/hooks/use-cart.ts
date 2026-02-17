'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface CartItem {
  id: string | number;
  product_name: string;
  image: string[];
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  cashback_amount: number;
  size: string;
  description: string;
  quantity: number;
}

// Query keys
const CART_QUERY_KEY = ['cart'];

const initialCart: CartItem[] = [];

export function useCart() {
  const queryClient = useQueryClient();

  // Query to get cart items
  const { data: items = initialCart, isLoading } = useQuery<CartItem[]>({
    queryKey: CART_QUERY_KEY,
    queryFn: () =>
      queryClient.getQueryData<CartItem[]>(CART_QUERY_KEY) || initialCart,
    initialData: initialCart
  });

  // Helper function to generate a unique cart item ID
  const getCartItemId = (item: CartItem): string => {
    // Combine product ID and size to create a unique identifier
    return `${item.id}-${item.size}`;
  };

  // Add item to cart
  const addToCart = useMutation({
    mutationFn: async (newItem: CartItem) => {
      return newItem;
    },
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
      const previousCart =
        queryClient.getQueryData<CartItem[]>(CART_QUERY_KEY) || [];

      // Create unique ID for the new item
      const newItemId = getCartItemId(newItem);

      // Check if item with same ID AND same size exists
      const existingItemIndex = previousCart.findIndex(
        (item) => getCartItemId(item) === newItemId
      );

      let updatedCart: CartItem[];
      if (existingItemIndex > -1) {
        // Same product ID AND same size: Increase quantity
        updatedCart = [...previousCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + newItem.quantity
        };
      } else {
        // Either different product ID OR different size: Add as new item
        updatedCart = [...previousCart, newItem];
      }

      queryClient.setQueryData(CART_QUERY_KEY, updatedCart);
      return { previousCart };
    },
    onSuccess: () => {
      toast.success('Product added to cart');
    },
    onError: (err, newItem, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    }
  }).mutate;

  // Remove item from cart - now needs both id and size
  const removeFromCart = useMutation({
    mutationFn: async ({ id, size }: { id: string | number; size: string }) => {
      return { id, size };
    },
    onMutate: async ({ id, size }) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
      const previousCart =
        queryClient.getQueryData<CartItem[]>(CART_QUERY_KEY) || [];
      const targetId = `${id}-${size}`;
      const updatedCart = previousCart.filter(
        (item) => getCartItemId(item) !== targetId
      );
      queryClient.setQueryData(CART_QUERY_KEY, updatedCart);
      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    }
  }).mutate;

  // Update quantity - needs both id and size
  const updateQuantity = useMutation({
    mutationFn: async ({
      id,
      size,
      quantity
    }: {
      id: string | number;
      size: string;
      quantity: number;
    }) => {
      return { id, size, quantity };
    },
    onMutate: async ({ id, size, quantity }) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
      const previousCart =
        queryClient.getQueryData<CartItem[]>(CART_QUERY_KEY) || [];
      const targetId = `${id}-${size}`;
      const updatedCart = previousCart.map((item) =>
        getCartItemId(item) === targetId ? { ...item, quantity } : item
      );
      queryClient.setQueryData(CART_QUERY_KEY, updatedCart);
      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    }
  }).mutate;

  // Clear cart
  const clearCart = useMutation({
    mutationFn: async () => {
      return null;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
      const previousCart =
        queryClient.getQueryData<CartItem[]>(CART_QUERY_KEY) || [];
      queryClient.setQueryData(CART_QUERY_KEY, []);
      return { previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    }
  }).mutate;

  // Get cart items grouped by product (for UI display)
  const getItemsByProductId = (productId: string | number): CartItem[] => {
    return items.filter((item) => item.id === productId);
  };

  // Get specific cart item by id and size
  const getItem = (id: string | number, size: string): CartItem | undefined => {
    return items.find((item) => item.id === id && item.size === size);
  };

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.discounted_price * item.quantity,
    0
  );

  const totalCashback = items.reduce(
    (sum, item) => sum + item.cashback_amount * item.quantity,
    0
  );

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemsByProductId,
    getItem,
    totalItems,
    totalPrice,
    totalCashback,
    isLoading
  };
}
