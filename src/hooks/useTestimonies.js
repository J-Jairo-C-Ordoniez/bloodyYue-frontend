import { useEffect, useState } from 'react';
import testimonies from '../api/testimonies/index';

export default function useTestimonies(body = null, variant = 'testimoniesGet') {
  const [testimony, setTestimony] = useState(null);
  const [isLoadingTestimony, setIsLoadingTestimony] = useState(true);
  const [errorTestimony, setErrorTestimony] = useState(false);

  const variants = {
    testimoniesGet: testimonies.testimoniesGet,
  }

  useEffect(() => {
    (async () => {
        try {
            const data = await variants[variant](body ?? body)
            setTestimony(data)
        } catch (err) {
            setErrorTestimony(true)
        } finally {
            setIsLoadingTestimony(false)
        }
    })()
  }, [variant]);

  return {
    testimony,
    isLoadingTestimony,
    errorTestimony,
  };
}