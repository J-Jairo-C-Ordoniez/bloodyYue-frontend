import { useState, useCallback, useEffect } from 'react';
import auth from '../api/auth/index';

export default function useAuth(variant = 'loginPost') {
  const [data, setData] = useState(null);
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
      return setData(res);
    } catch (err) {
      const msg = err.message || 'Error occurred during auth operation';
      setError(msg);
      return { error: true, message: msg };
    } finally {
      setLoading(false);
    }
  }, [variant]);

  useEffect(() => {
    if (variant === 'none') return;
    authAction();
  }, []);

  const codeVerify = useCallback(async (postData) => {
    setLoading(true);
    try {
      const res = await auth.codeVerifyPost(postData);
      if (res.error) setError(res.message);
      return res;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const codeGet = useCallback(async (postData) => {
    setLoading(true);
    try {
      const res = await auth.codeGet(postData);
      if (res.error) setError(res.message);
      return res;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (postData) => {
    setLoading(true);
    try {
      const res = await auth.resetPasswordPost(postData);
      if (res.error) setError(res.message);
      return res;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const login = useCallback(async (postData) => {
    setLoading(true);
    try {
      const res = await auth.loginPost(postData);
      if (res.error) setError(res.message);
      return res;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    setLoading(true);
    try {
      const res = await auth.newToken();
      if (res.error) setError(res.message);
      return res;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    auth: data,
    loading,
    error,
    codeVerify,
    codeGet,
    resetPassword,
    login,
    refreshToken
  };
}
