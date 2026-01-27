'use client';

import usePosts from '../../hooks/usePosts';
import LoginPage from './LoginPage';
import Loader from '../molecules/Loader';
import Error from '../molecules/Error';

export default function LoginLoader() {
    const { posts, loading, error } = usePosts(null, 'random');

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error message={error} />;
    }

    return <LoginPage data={posts} />;
};
