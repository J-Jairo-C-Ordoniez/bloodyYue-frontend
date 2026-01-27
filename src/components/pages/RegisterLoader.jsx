'use client';

import usePosts from '../../hooks/usePosts';
import RegisterPage from './RegisterPage';
import Loader from '../molecules/Loader';
import Error from '../molecules/Error';

export default function RegisterLoader() {
    const { posts, loading, error } = usePosts(null, 'random');

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error message={error} />;
    }

    return <RegisterPage data={posts} />;
};
