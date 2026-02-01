'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../components/molecules/Loader';
import useAuthStore from '../../../store/auth.store';
import DashboardLoader from "../../../components/pages/DashboardLoader";
import useErrorTokenStore from '../../../store/errorToken.store';

export default function Dashboard() {
    const { user, token } = useAuthStore.getState();
    const router = useRouter();
    const { error, refreshToken } = useAuth('none');
    const [loading, setLoading] = useState(user && token ? false : true);
    const [errors, setErrors] = useState(false);

    useErrorTokenStore.getState().setErrorToken(user && token ? false : true);

    useEffect(() => {
        const errorToken = useErrorTokenStore.getState().errorToken;

        (async () => {
            if (!errorToken || !loading) return

            const res = await refreshToken();

            setErrors(user?.data?.status);

            if (user && user?.data?.status !== 'active') {
                return setErrors('Su cuenta no esta activa');
            }

            useAuthStore.getState().setAuth(res.data.accessToken, res.data.user);

            useErrorTokenStore.getState().setErrorToken(false)
            setLoading(false);
        })()
    }, []);

    if (error) {
        return router.replace('/');
    }

    return (
        loading ? <Loader /> : errors ? <Error message={errors} typeError="Error 401" /> : <DashboardLoader user={user} />
    );
}