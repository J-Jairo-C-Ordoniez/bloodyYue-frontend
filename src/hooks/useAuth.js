import { useState, useCallback } from 'react';
import auth from '../api/auth/index';

export default function useAuth(variant = 'login') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authAction = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await auth[variant](data);
      if (res && res.error) {
        setError(res.message);
      }
      return res;
    } catch (err) {
      const msg = err.message || 'Error occurred during auth operation';
      setError(msg);
      return { error: true, message: msg };
    } finally {
      setLoading(false);
    }
  }, [variant]);

  return {
    auth: authAction,
    loading,
    error
  };
}
