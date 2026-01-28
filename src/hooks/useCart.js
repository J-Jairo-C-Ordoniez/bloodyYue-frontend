import { useEffect, useState, useCallback } from 'react';
import cart from '../api/cart/index';

export default function useCart(body = null, variant = 'itemsGet') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async (customBody, customVariant) => {
    const activeVariant = customVariant || variant;
    const activeBody = customBody || body;

    setLoading(true);
    setError(null);
    try {
      const res = await cart[activeVariant](activeBody);
      if (res.error) {
        setError(res.message);
      } else {
        setData(res.data);
      }
      return res;
    } catch (err) {
      const msg = err?.message || 'Error loading cart';
      setError(msg);
      return { error: true, message: msg };
    } finally {
      setLoading(false);
    }
  }, [body, variant]);

  useEffect(() => {
    if (variant !== 'none') {
      fetchCart();
    }
  }, []);

  const discardItem = async (id) => {
    return await cart.cartItemDiscardedPatch({ id });
  }

  const addItem = async (data) => {
    return await cart.cartItemsPost(data);
  }

  const updateItem = async (id, data) => {
    return await cart.cartItemPut({ id, data });
  }

  return {
    cartItems: data,
    loading,
    error,
    refreshCart: fetchCart,
    discardItem,
    addItem,
    updateItem
  };
}