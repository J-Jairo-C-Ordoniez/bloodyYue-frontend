import { useEffect, useState } from 'react';
import settings from '../api/settings/index';

export default function useSettings(id) {
  const [setting, setSetting] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
        try {
            const data = await settings.getSettings(id)
            setSetting(data)
        } catch (err) {
            setError(true)
        } finally {
            setIsLoading(false)
        }
    })()
  }, []);

  return {
    setting,
    isLoading,
    error,
  };
}