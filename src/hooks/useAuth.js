import { useEffect, useState } from 'react';
import auth from '../api/auth/index';

export default function useAuth(body = null, variant = 'login') {
  const [auth, setAuth] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [errorAuth, setErrorAuth] = useState(false);

  const variants = {
    login: auth.loginPost,
  }

  useEffect(() => {
    (async () => {
        try {
            const data = await variants[variant](body ?? body)
            setAuth(data)
        } catch (err) {
            setErrorAuth(true)
        } finally {
            setIsLoadingAuth(false)
        }
    })()
  }, [variant]);

  return {
    auth,
    isLoadingAuth,
    errorAuth,
  };
}