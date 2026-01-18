import { useEffect, useState } from 'react';
import posts from '../api/posts/index';
import useErrorTokenStore from '../store/errorToken.store';

/**
 * Custom hook para manejar operaciones de posts
 * @param {Object|null} body - Parámetros para la petición de posts
 * @param {string} variant - Variante de operación ('random', 'list')
 * @returns {Object} Estado de posts con data, loading y error
 */
export default function usePosts(body = null, variant = 'random') {
  const [post, setPost] = useState(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [errorPost, setErrorPost] = useState(null);

  const variants = {
    random: posts.getPostRandom,
    list: posts.getPostList,
  }

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoadingPost(true);
        setErrorPost(null);
        const data = await variants[variant](body ?? body);

        if (isMounted) {
          if (data?.error === 401) {
            useErrorTokenStore.getState().setErrorToken(true);
            setErrorPost('Sesión expirada. Por favor, inicia sesión nuevamente.');
          } else {
            setPost(data);
          }
        }

      } catch (err) {
        if (isMounted) {
          setErrorPost(err?.message || 'Error al cargar los posts');
        }
      } finally {
        if (isMounted) {
          setIsLoadingPost(false);
        }
      }
    })()

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    post,
    isLoadingPost,
    errorPost,
  };
}