'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../../hooks/useAuth';
import HomePage from '../../../components/pages/HomePage';
import Loader from '../../../components/molecules/Loader';
import useAuthStore from '../../../store/auth.store';
import Error from '../../../components/molecules/Error';
import useErrorTokenStore from '../../../store/errorToken.store';

export default function Home() {
    const { user, token } = useAuthStore.getState();
    const router = useRouter();
    const [error, setError] = useState(false);
    const { auth } = useAuth('newToken');
    const [loading, setLoading] = useState(user && token ? false : true);

    useErrorTokenStore.getState().setErrorToken(user && token ? false : true);

    useEffect(() => {
        const errorToken = useErrorTokenStore.getState().errorToken;

        (async () => {
            if (!errorToken || !loading) return

            const res = await auth();
            if (res?.error) {
                return router.replace('/');
            }

            setError(user?.data?.status);

            if (user && user?.data?.status !== 'active') {
                return setError('Su cuenta no esta activa');
            }

            useAuthStore.getState().setAuth(res.data.accessToken, res.data.user);

            useErrorTokenStore.getState().setErrorToken(false)
            setLoading(false);
        })()
    }, []);

    return (
        loading ? <Loader /> : error ? <Error message={error} typeError="Error 401" /> : <HomePage user={user} />
    );
}