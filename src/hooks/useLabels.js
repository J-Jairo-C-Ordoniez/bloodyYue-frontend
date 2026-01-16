import { useEffect, useState } from 'react';
import labels from '../api/labels/index';
import useErrorTokenStore from '../store/errorToken.store';

export default function useLabels(body = null, variant = 'labelsGet') {
  const [label, setLabel] = useState(null);
  const [isLoadingLabel, setIsLoadingLabel] = useState(true);
  const [errorLabel, setErrorLabel] = useState(false);

  const variants = {
    labelsGet: labels.labelsGet,
  }

  useEffect(() => {
    (async () => {
        try {
            const data = await variants[variant](body ?? body)
            setLabel(data)
        } catch (err) {
            setErrorLabel(true)
        } finally {
            setIsLoadingLabel(false)
        }
    })()
  }, [variant]);

  if (label?.error === 401) {
    return useErrorTokenStore.getState().setErrorToken(true);
  }

  return {
    label,
    isLoadingLabel,
    errorLabel,
  };
}