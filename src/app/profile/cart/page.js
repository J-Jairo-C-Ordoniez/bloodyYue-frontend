'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import HomePage from '@/components/pages/HomePage';
import Loader from '@/components/molecules/Loader';
import useAuthStore from '@/store/auth.store';
import useErrorTokenStore from '@/store/errorToken.store';

export default function Cart() {
    const { user, token } = useAuthStore.getState();
    const router = useRouter();
    const { auth } = useAuth('newToken');
    const [loading, setLoading] = useState(user && token ? false : true);

    useErrorTokenStore.getState().setErrorToken(user && token ? false : true);

    useEffect(() => {
        const errorToken = useErrorTokenStore.getState().errorToken;

        (async () => {
            if (!errorToken) return

            const res = await auth();
            if (res?.error) {
                return router.replace('/');
            }

            useAuthStore.getState().setAuth(res.data.accessToken, res.data.user);

            useErrorTokenStore.getState().setErrorToken(false)
            setLoading(false);
        })()
    }, [user]);

    return (
        loading ? <Loader /> : <HomePage user={user} initialTab="cart" />
    );
}
