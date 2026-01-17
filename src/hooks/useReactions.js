import { useEffect, useState } from 'react';
import posts from '../api/posts/index';

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
    getReactions: posts.getPostReactions,
  }

  useEffect(() => {
    let isMounted = true;
    console.log(body, 'hola');

    (async () => {
      try {
        setIsLoadingReactions(true);
        setErrorReactions(null);
        const data = await variants[variant](body ?? body);

        console.log(data, 'data');

        if (isMounted) {
          setReactions(data);
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