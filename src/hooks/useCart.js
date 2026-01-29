import { useEffect, useCallback } from 'react';
import { useCartStore } from '../store/cart.store';

export default function useCart() {
  const {
    cartItems,
    loading,
    error,
    fetchCart,
    addItem,
    discardItem,
    updateItem
  } = useCartStore();

  useEffect(() => {
    if (cartItems.length === 0 && !loading && !error) {
      fetchCart();
    }
  }, [fetchCart]);

  return {
    cartItems,
    loading,
    error,
    refreshCart: fetchCart,
    discardItem,
    addItem,
    updateItem
  };
}
