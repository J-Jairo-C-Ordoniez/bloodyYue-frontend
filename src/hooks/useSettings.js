import { useEffect, useState } from 'react';
import settings from '../api/settings/index';

/**
 * Custom hook para manejar operaciones de configuración
 * @param {string|number} id - ID de la configuración a obtener
 * @returns {Object} Estado de configuración con data, loading y error
 */
export default function useSettings(id) {
  const [setting, setSetting] = useState(null);
  const [isLoadingSetting, setIsLoadingSetting] = useState(true);
  const [errorSetting, setErrorSetting] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setIsLoadingSetting(true);
        setErrorSetting(null);
        const data = await settings.getSettings(id);

        if (isMounted) {
          setSetting(data);
        }
      } catch (err) {
        if (isMounted) {
          setErrorSetting(err?.message || 'Error al cargar la configuración');
        }
      } finally {
        if (isMounted) {
          setIsLoadingSetting(false);
        }
      }
    })()

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    setting,
    isLoadingSetting,
    errorSetting,
  };
}