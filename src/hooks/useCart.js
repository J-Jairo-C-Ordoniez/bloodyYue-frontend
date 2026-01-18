import { useEffect, useState } from 'react';
import cart from '../api/cart/index';

/**
 * Custom hook para manejar operaciones del carrito de compras
 * @param {Object|null} body - Parámetros para la petición del carrito
 * @param {string} variant - Variante de operación ('itemsGet')
 * @returns {Object} Estado del carrito con items, loading y error
 */

export default function useCart(body = null, variant = 'itemsGet') {
  const [cartItems, setCartItems] = useState(null);
  const [isLoadingCartItems, setIsLoadingCartItems] = useState(true);
  const [errorCartItems, setErrorCartItems] = useState(null);

  const variants = {
    itemsPost: cart.cartItemsPost,
    itemsGet: cart.cartItemsGet,
    itemsByIdGet: cart.cartItemsByIdGet,
    itemPut: cart.cartItemPut,
    itemDiscardedPatch: cart.cartItemDiscardedPatch
  }

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoadingCartItems(true);
        setErrorCartItems(null);
        const data = await variants[variant](body);

        if (isMounted) {
          setCartItems(data);
        }
      } catch (err) {
        if (isMounted) {
          setErrorCartItems(err?.message || 'Error al cargar los items del carrito');
        }
      } finally {
        if (isMounted) {
          setIsLoadingCartItems(false);
        }
      }
    })()

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    cartItems,
    isLoadingCartItems,
    errorCartItems,
  };
}