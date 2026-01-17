import { useEffect, useState } from 'react';
import testimonies from '../api/testimonies/index';

/**
 * Custom hook para manejar operaciones de testimonios
 * @param {Object|null} body - Parámetros para la petición de testimonios
 * @param {string} variant - Variante de operación ('testimoniesGet')
 * @returns {Object} Estado de testimonios con data, loading y error
 */
export default function useTestimonies(body = null, variant = 'testimoniesGet') {
  const [testimony, setTestimony] = useState(null);
  const [isLoadingTestimony, setIsLoadingTestimony] = useState(true);
  const [errorTestimony, setErrorTestimony] = useState(null);

  const variants = {
    testimoniesGet: testimonies.testimoniesGet,
  }

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoadingTestimony(true);
        setErrorTestimony(null);
        const data = await variants[variant](body);

        if (isMounted) {
          setTestimony(data);
        }
      } catch (err) {
        if (isMounted) {
          setErrorTestimony(err?.message || 'Error al cargar los testimonios');
        }
      } finally {
        if (isMounted) {
          setIsLoadingTestimony(false);
        }
      }
    })()

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    testimony,
    isLoadingTestimony,
    errorTestimony,
  };
}