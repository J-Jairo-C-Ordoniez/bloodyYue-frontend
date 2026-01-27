import { useEffect, useState, useCallback } from 'react';
import settings from '../api/settings/index';
import media from '../api/media/index';

export default function useSettings(id, variant = 'getSettings') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async (customId) => {
    const activeId = customId || id;

    setLoading(true);
    setError(null);
    try {
      const res = await settings.getSettings(activeId);
      if (res.error) {
        setError(res.message);
      } else {
        setData(res.data);
      }
      return res;
    } catch (err) {
      const msg = err?.message || 'Error loading settings';
      setError(msg);
      return { error: true, message: msg };
    } finally {
      setLoading(false);
    }
  }, [id, variant]);

  useEffect(() => {
    if (variant !== 'none') {
      fetchSettings();
    }
  }, []);

  const updateSettings = async (id, data) => {
    return await settings.settingsPut({ id, data });
  };

  const uploadHero = async ({ file, context }) => {
    return await media.mediaHeroPost({ file, context });
  };

  return {
    settings: data,
    loading,
    error,
    refreshSettings: fetchSettings,
    updateSettings,
    uploadHero
  };
}