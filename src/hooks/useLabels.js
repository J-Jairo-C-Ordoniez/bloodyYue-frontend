import { useEffect, useState } from 'react';
import labels from '../api/labels/index';

/**
 * Custom hook para manejar operaciones de labels/etiquetas
 * @param {Object|null} body - Parámetros para la petición de labels
 * @param {string} variant - Variante de operación ('labelsGet')
 * @returns {Object} Estado de labels con data, loading y error
 */
export default function useLabels(body = null, variant = 'labelsGet') {
  const [label, setLabel] = useState(null);
  const [isLoadingLabel, setIsLoadingLabel] = useState(true);
  const [errorLabel, setErrorLabel] = useState(null);

  const variants = {
    labelsGet: labels.labelsGet,
    labelsGetId: labels.labelsGetId,
    labelsPost: labels.labelsPost,
    labelsPut: labels.labelsPut,
    labelsDelete: labels.labelsDelete,
  }

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoadingLabel(true);
        setErrorLabel(null);
        const data = await variants[variant](body);

        if (isMounted) {
          setLabel(data);
        }

      } catch (err) {
        if (isMounted) {
          setErrorLabel(err?.message || 'Error al cargar las etiquetas');
        }
      } finally {
        if (isMounted) {
          setIsLoadingLabel(false);
        }
      }
    })()

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    label,
    isLoadingLabel,
    errorLabel,
  };
}