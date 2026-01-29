import { useEffect, useState, useCallback } from 'react';
import users from '../api/users/index';

export default function useTestimonies(body = null, variant = 'testimoniesGet') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTestimonies = useCallback(async (customBody, customVariant) => {
    const activeVariant = customVariant || variant;
    const activeBody = customBody || body;

    setLoading(true);
    setError(null);
    try {
      const res = await users[activeVariant](activeBody);
      if (res.error) {
        setError(res.message);
      } else {
        setData(res.data);
      }
      return res;
    } catch (err) {
      const msg = err?.message || 'Error loading testimonies';
      setError(msg);
      return { error: true, message: msg };
    } finally {
      setLoading(false);
    }
  }, [body, variant]);

  useEffect(() => {
    if (variant !== 'none') {
      fetchTestimonies();
    }
  }, []);

  return {
    testimonies: data,
    loading,
    error,
    refreshTestimonies: fetchTestimonies
  };
}