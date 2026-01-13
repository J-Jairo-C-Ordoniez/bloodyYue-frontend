import { useEffect, useState } from 'react';
import settings from '../api/settings/index';

export default function useSettings(id) {
  const [setting, setSetting] = useState(null);
  const [isLoadingSetting, setIsLoadingSetting] = useState(true);
  const [errorSetting, setErrorSetting] = useState(false);

  useEffect(() => {
    (async () => {
        try {
            const data = await settings.getSettings(id)
            setSetting(data)
        } catch (err) {
            setErrorSetting(true)
        } finally {
            setIsLoadingSetting(false)
        }
    })()
  }, []);

  return {
    setting,
    isLoadingSetting,
    errorSetting,
  };
}