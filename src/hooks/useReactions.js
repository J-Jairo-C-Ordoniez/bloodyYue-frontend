import { useEffect, useState } from 'react';
import posts from '../api/posts/index';
import useErrorTokenStore from '../store/errorToken.store';

/**
 * Custom hook para manejar operaciones de reacciones de posts
 * @param {Object|null} body - Parámetros para la petición de reacciones
 * @param {string} variant - Variante de operación ('getReactions')
 * @returns {Object} Estado de reacciones con data, loading y error
 */

export default function useReactions(body = null, variant = 'getReactions') {
  const [reactions, setReactions] = useState(null);
  const [isLoadingReactions, setIsLoadingReactions] = useState(true);
  const [errorReactions, setErrorReactions] = useState(null);

  const variants = {
    getReactions: posts.postReactionsGet,
    postReactions: posts.postReactionsPost,
  }

  useEffect(() => {
    if (variant === '') {
      setIsLoadingReactions(false);
      setReactions(variants[variant]);
      return;
    }

    let isMounted = true;

    (async () => {
      try {
        setIsLoadingReactions(true);
        setErrorReactions(null);
        const data = await variants[variant](body ?? body);

        if (isMounted) {
          if (data?.error === 401) {
            useErrorTokenStore.getState().setErrorToken(true);
            setErrorReactions('Sesión expirada. Por favor, inicia sesión nuevamente.');
          } else {
            setReactions(data);
          }
        }
      } catch (err) {
        if (isMounted) {
          setErrorReactions(err?.message || 'Error al cargar las reacciones');
        }
      } finally {
        if (isMounted) {
          setIsLoadingReactions(false);
        }
      }
    })()

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    reactions,
    isLoadingReactions,
    errorReactions,
  };
}